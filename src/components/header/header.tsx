import { Link } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import Logo from '../logo/logo';
import { logoutAction } from '../../store/api-actions';
import { getAppUser, getAuthStatus } from '../../store/user-process/selectors';

function Header(){
  const dispatch = useAppDispatch();

  const user = useAppSelector(getAppUser);
  const authStatus = useAppSelector(getAuthStatus);

  const handleSignOut = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo/>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authStatus === AuthStatus.Auth ? (
                <>
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                      <div
                        className="header__avatar-wrapper user__avatar-wrapper"
                        style={{ backgroundImage: user ? `url(${user.avatarUrl})` : '' }}
                      >
                      </div>
                      <span className="header__user-name user__name">
                        {user?.email}
                      </span>
                      <span className="header__favorite-count">3</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#" onClick={handleSignOut}>
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </>
              ) : (
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
