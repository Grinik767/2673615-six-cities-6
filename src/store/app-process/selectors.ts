import { NameSpace } from '../../const';
import { State } from '../../types/store';

export const getCity = (state: State) => state[NameSpace.App].city;
export const getSortingOption = (state: State) => state[NameSpace.App].sortingOption;
