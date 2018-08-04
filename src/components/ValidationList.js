import React, { Component } from 'react';

import styles from 'components/FormError.scss';

const ValidationList = (props) => {
    const outputList = props.listContent;

    let tagList = null;

    if (props.listVisible) { // show list if there is user input
      tagList = props.listTags.map(item => {
        return <li
         key={item.id}
         className={item.sts ? styles.formError : null}>
         {item.msg}
         </li>
      });
    }
    return (
        <ul>
            {tagList}
        </ul>
    );
}

export default ValidationList;