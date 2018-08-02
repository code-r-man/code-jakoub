import React, { PropTypes } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid/lib';
import styles from './CenteredBoxPage.scss';
import classNames from 'classnames';

const CenteredBoxPage = ({ children, route }) => (
  <Grid className={classNames({ [styles.centeredBoxPage]: true })}>

    {route.title && (
      <h1 className={styles.title}>{route.title}</h1>
    )}

    <Row center="xs">
      <Col xs={12} sm={10} md={8} lg={6}>
        {children}
      </Col>
    </Row>
  </Grid>
);

CenteredBoxPage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  route: PropTypes.object,
};

export default CenteredBoxPage;
