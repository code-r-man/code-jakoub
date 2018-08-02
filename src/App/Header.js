import React, {
  PropTypes,
} from 'react';
import { IndexLink } from 'react-router';
import { AppBar } from 'react-toolbox/lib/app_bar';
import Logo from 'App/Logo';
import styles from './Header.scss';


const Header = () => (
  <header>
    <AppBar theme={styles}>
      <IndexLink to="/" className={styles.logo}>
        <Logo />
      </IndexLink>
    </AppBar>
  </header>
);

Header.contextTypes = {
  router: PropTypes.object,
};

export default Header;
