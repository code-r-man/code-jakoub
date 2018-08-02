import styles from './FullWidthButton.scss';
import React from 'react';
import { Button } from 'react-toolbox/lib/button';

export default (props) => (
  <div className={styles.buttonContainer}>
    <Button {...props} />
  </div>
);
