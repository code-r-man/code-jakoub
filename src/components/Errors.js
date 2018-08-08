import React from 'react';
import style from './Form.scss';

const ErrorTag = (props) => {
    return ( 
        <div className={style.errorBlock}>{props.msg}</div>
    );
}

export default ErrorTag;