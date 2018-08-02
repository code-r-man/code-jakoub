import { connect as connectRedux } from 'react-redux';

function connect(
  mapStateToProps = () => {},
  mapDispatchToProps,
  mergeProps,
  options = {}
) {
  return component => {
    // by default additionalProps will return an empty object...
    let additionalProps = () => ({});

    // if the component has a query calculate the additional props map...
    if (!!component.query) {
      additionalProps = (state) => {
        const queryInStore = state.lokka[component.query.name] || {};
        return {
          [component.query.prop]: queryInStore.data || component.query.default,
          [`${component.query.prop}Loading`]: (queryInStore.loading === true),
          [`${component.query.prop}Error`]: queryInStore.error || '',
        };
      };
    }

    // add the additional props to the default map defined in the component...
    const lokkaMapStateToProps = (state) => ({
      ...mapStateToProps(state),
      ...additionalProps(state),
    });

    // define a HoC to connect the new component state, props, and actions...
    const lokkaHocComponent = connectRedux(
      lokkaMapStateToProps, mapDispatchToProps, mergeProps, options
    )(component);

    // then expose the static props required by graphql client...
    lokkaHocComponent.query = component.query;
    // lokkaHocComponent.childFragment = component.childFragment;

    return lokkaHocComponent;
  };
}

export { connect };
export default connect;
