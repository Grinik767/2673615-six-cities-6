import { createSlice } from '@reduxjs/toolkit';
import { Offer, OfferCards, Reviews } from '../../types/offer';
import {
  fetchOffersAction,
  fetchOfferAction,
  addReviewAction
} from '../api-actions';
import { NameSpace } from '../../const';

export type AppData = {
  offers: OfferCards;
  offer: Offer | null;
  nearbyOffers: OfferCards;
  reviews: Reviews;
  isOffersLoading: boolean;
  isOfferLoading: boolean;
  isReviewPosting: boolean;
};

const initialState: AppData = {
  offers: [],
  offer: null,
  nearbyOffers: [],
  reviews: [],
  isOffersLoading: false,
  isOfferLoading: false,
  isReviewPosting: false,
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersLoading = false;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload.offer;
        state.nearbyOffers = action.payload.nearbyOffers;
        state.reviews = action.payload.reviews;
        state.isOfferLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferLoading = false;
      })
      .addCase(addReviewAction.pending, (state) => {
        state.isReviewPosting = true;
      })
      .addCase(addReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.isReviewPosting = false;
      })
      .addCase(addReviewAction.rejected, (state) => {
        state.isReviewPosting = false;
      });
  },
});
