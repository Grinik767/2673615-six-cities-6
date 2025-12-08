import {Navigate} from 'react-router-dom';
import {AppRoute, AuthStatus} from '../../const';
import { useAppSelector } from '../../hooks/store';
import { getAuthStatus } from '../../store/user-process/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps) {
  const {children} = props;
  const authStatus = useAppSelector(getAuthStatus);

  return (
    authStatus === AuthStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login}/>
  );
}

export default PrivateRoute;
