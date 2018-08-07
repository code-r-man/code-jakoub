import React, { Component } from 'react';

import styles from 'components/ValidationList.scss';
import tick from 'components/symbols/checked.svg';
import error from 'components/symbols/cancel.svg';

const ValidationList = (props) => {
    const outputList = props.listContent;

    let tagList = null;

    if (props.listVisible) { // show list if there is user input
      tagList = props.listTags.map(item => {
        return <li
         key={item.id}
         className={item.sts ? styles.listTagsError : null}>
            <img src={item.sts ? error : tick} className={styles.listIcon}/>
            {item.msg}
         </li>
      });
    }
    return (
        <ul className={styles.listTags}>
            {tagList}
        </ul>
    );
}

export default ValidationList;