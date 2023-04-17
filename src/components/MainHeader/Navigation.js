import React, {useContext} from 'react';
import AuthContext from '../../context/auth-context';
import classes from './Navigation.module.css';

const Navigation = (props) => {
  const csx = useContext(AuthContext)
  return (
    <nav className={classes.nav}>
      <ul>
        {csx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {csx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {csx.isLoggedIn && (
          <li>
            <button onClick={csx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
