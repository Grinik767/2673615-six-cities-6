import { NameSpace } from '../../const';
import { State } from '../../types/store';

export const getOffers = (state: State) => state[NameSpace.Data].offers;
export const getOffer = (state: State) => state[NameSpace.Data].offer;
export const getNearbyOffers = (state: State) => state[NameSpace.Data].nearbyOffers;
export const getReviews = (state: State) => state[NameSpace.Data].reviews;
export const getIsOffersLoading = (state: State) => state[NameSpace.Data].isOffersLoading;
export const getIsOfferLoading = (state: State) => state[NameSpace.Data].isOfferLoading;
export const getIsReviewPosting = (state: State) => state[NameSpace.Data].isReviewPosting;
