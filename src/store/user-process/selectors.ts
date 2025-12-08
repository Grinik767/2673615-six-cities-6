import { NameSpace } from '../../const';
import { State } from '../../types/store';

export const getAuthStatus = (state: State) => state[NameSpace.User].authStatus;
export const getAppUser = (state: State) => state[NameSpace.User].appUser;
