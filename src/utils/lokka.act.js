import * as types from 'redux/actionTypes';
import _uniqBy from 'lodash/uniqBy';

export function lokkaRequest(query) {
  return { type: types.LOKKA_REQUEST, query };
}

export function lokkaSuccess(result, query) {
  return { type: types.LOKKA_SUCCESS, result, query };
}

export function lokkaError(error, query) {
  // should be able to parse error argument as string or as a graphQl error object...
  const errorMessage = typeof error === 'string' ? error : error.rawError[0].message;
  return { type: types.LOKKA_ERROR, errorMessage, query };
}

export function handleQuery(queries, params) {
  return (dispatch, getState, { lokkaClient }) => {
    // validate queries...
    const validQueries = queries.filter(query => {
      if (Object.keys(query).length === 0) {
        return false;
      }

      // if the query has a custom action creator...
      const onError = query.onError || lokkaError;

      // simple name validation...
      if (!query.name) {
        dispatch(onError('Query name is required', query));
        return false;
      }

      // simple query validation...
      if (!query.query) {
        dispatch(onError('Query query is required', query));
        return false;
      }

      // if query vars, vars should be correctly defined...
      const varErrors = (query.vars || []).reduce((buffer, queryVar) => {
        if (buffer) {
          // early return in case of previous validation error...
          return buffer;
        }
        // it requires a name...
        if (!queryVar.name) {
          return 'Query var requires a name';
        }
        // it requires a type...
        if (!queryVar.type) {
          return `Query var ${queryVar.name} requires a type...`;
        }

        return null;
      }, null);

      if (varErrors) {
        // dispatch error and exclude query from execution...
        dispatch(onError(varErrors, query));
        return false;
      }

      return true;
    }).map((query) => {
      let newQuery = query.query;

      // if the query has fragments collect the fragments...
      if (query.fragments && query.fragments.length > 0) {
        newQuery = [
          // open the last curly bracket to append the fragments...
          query.query.slice(0, query.query.lastIndexOf('}')),

          // effectively append the fragments...
          ',',
          ...query.fragments.map(
            fragment => `...${lokkaClient.createFragment(fragment)}`
          ).join(','),

          // close the query again...
          '}',
        ].join('');
      }

      // collect the object key to read the data from the results...
      // we need to get the query name from the query itself...
      const newRead = query.read || query.query.split('{')[0].split('(')[0].trim();


      return {
        // keep original query...
        ...query,

        // override with collected fragments and variables...
        query: newQuery,

        // override the read
        read: newRead,

        // resolve variables...
        vars: (query.vars || []).map(queryVar => ({
          ...queryVar,
          value: queryVar.resolve(getState(), params),
        })),
      };
    });

    // compose the query
    if (validQueries.length > 0) {
      validQueries.forEach(query => {
        const onRequest = query.onRequest || lokkaRequest;
        dispatch(onRequest(query));
      });

      const mergedQueries = validQueries.reduce((context, query) => ({
        vars: [
          ...context.vars,
          ...query.vars,
        ],
        name: `${context.name}_${query.name}`,
      }), {
        vars: [],
        name: '',
      });

      // reduce all vars as an object we can pass to the query...
      const varsAsObject = mergedQueries.vars.reduce(
        (queryVars, singleVar) => ({
          ...queryVars,
          [singleVar.name]: singleVar.value,
        }),
        {}
      );

      // get the variable names and their types as graphql syntax...
      const varsAsString = mergedQueries.vars.length > 0 ? `(${
        _uniqBy(mergedQueries.vars, 'name').map(
          queryVar => `$${queryVar.name}: ${queryVar.type}`
        ).join(', ')
      })` : '';

      // wrap the simple query in a complex syntax query and apply variables...
      const mergedQuery = `query ${mergedQueries.name}${varsAsString} {
        ${`${validQueries.map(query => query.query).join(', ')}`}
      }`;

      // we only perform one query but dispatch one action for each query we included...
      lokkaClient.query(
        mergedQuery,
        varsAsObject
      ).then(
        result => {
          // for each query dispatch a success handler...
          validQueries.forEach(query => {
            const onSuccess = query.onSuccess || lokkaSuccess;
            dispatch(onSuccess(result, query));
          });
        },
        // for each query dispatch an error handler...
        err => {
          validQueries.forEach(query => {
            const onError = query.onError || lokkaError;
            dispatch(onError(err, query));
          });
        }
      );
    }
  };
}
