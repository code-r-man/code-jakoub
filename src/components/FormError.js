import React, { PropTypes } from 'react';
import styles from './FormError.scss';

const FormError = ({ error }) => (error ? (<div className={styles.formError}>{error}</div>) : null);

FormError.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

export default FormError;
