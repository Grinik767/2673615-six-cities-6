import leaflet from 'leaflet';
import { PlaceCardLocation } from './types/place-card';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  NotFound = '*'
}

export enum ApiRoute {
  Offers = '/offers',
  Reviews = '/comments',
  Login = '/login',
  Logout = '/logout'
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum SortingOption {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first'
}

export enum NameSpace {
  Data = 'DATA',
  App = 'APP',
  User = 'USER',
}

export const DEFAULT_CUSTOM_ICON = leaflet.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

export const CURRENT_CUSTOM_ICON = leaflet.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

export const PLACE_CARD_CONFIG_DATA: Record<PlaceCardLocation, string> = {
  [PlaceCardLocation.MainPage]: 'cities',
  [PlaceCardLocation.OfferPage]: 'near-places'
};

export const MAX_NEARBY_OFFERS = 3;

export const MAX_RATING = 5;

export const CITIES = [
  {
    'name': 'Paris',
    'location': {
      'latitude': 48.85661,
      'longitude': 2.351499,
      'zoom': 13
    }
  },
  {
    'name': 'Cologne',
    'location': {
      'latitude': 50.938361,
      'longitude': 6.959974,
      'zoom': 13
    }
  },
  {
    'name': 'Brussels',
    'location': {
      'latitude': 50.846557,
      'longitude': 4.351697,
      'zoom': 13
    }
  },
  {
    'name': 'Amsterdam',
    'location': {
      'latitude': 52.37454,
      'longitude': 4.897976,
      'zoom': 13
    }
  },
  {
    'name': 'Hamburg',
    'location': {
      'latitude': 53.550341,
      'longitude': 10.000654,
      'zoom': 13
    }
  },
  {
    'name': 'Dusseldorf',
    'location': {
      'latitude': 51.225402,
      'longitude': 6.776314,
      'zoom': 13
    }
  }];

export const INITIAL_CITY = CITIES[0];

export const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
export const REQUEST_TIMEOUT = 5000;

export const MAX_REVIEW_COUNT = 10;
export const MIN_REVIEW_LENGTH = 50;
export const MAX_REVIEW_LENGTH = 300;
