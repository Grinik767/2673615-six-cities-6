import Map from '../../components/map/map.tsx';
import { useMemo, useState } from 'react';

import { City, OfferCard } from '../../types/offer.ts';
import { Point, Points } from '../../types/map.ts';
import PlaceCardsList from '../../components/place-cards-list/place-cards-list.tsx';
import { PlaceCardLocation } from '../../types/place-card.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import { changeCity, setSortingOption } from '../../store/app-process/app-process.ts';
import CitiesList from '../../components/cities-list/cities-list.tsx';
import SortingOptions from '../../components/sorting-options/sorting-options.tsx';
import { SortingOption } from '../../const.ts';
import Header from '../../components/header/header.tsx';
import { getCity, getSortingOption } from '../../store/app-process/selectors.ts';
import { getOffers } from '../../store/data-process/selectors.ts';


function MainPage() {
  const dispatch = useAppDispatch();

  const currentCity = useAppSelector(getCity);
  const currentSortingOption = useAppSelector(getSortingOption);

  const allOffers = useAppSelector(getOffers);

  const offers = useMemo(
    () => allOffers.filter((offer) => offer.city.name === currentCity.name),
    [currentCity, allOffers]
  );

  const [activeOffer, setActiveOffer] = useState<OfferCard | undefined>(undefined);

  const points: Points = offers.map((offer) => ({
    id: offer.id,
    title: offer.title,
    lat: offer.location.latitude,
    lng: offer.location.longitude,
  }));

  const selectedPoint: Point | null = activeOffer
    ? {
      id: activeOffer.id,
      title: activeOffer.title,
      lat: activeOffer.location.latitude,
      lng: activeOffer.location.longitude,
    }
    : null;

  const sortedOffers = useMemo(() => {
    switch (currentSortingOption) {
      case SortingOption.PriceLowToHigh:
        return [...offers].sort((x, y) => x.price - y.price);
      case SortingOption.PriceHighToLow:
        return [...offers].sort((x, y) => y.price - x.price);
      case SortingOption.TopRatedFirst:
        return [...offers].sort((x, y) => y.rating - x.rating);
      default:
        return offers;
    }
  }, [currentSortingOption, offers]);

  const handleCardHover = (offerId: string | null) => {
    const currentOffer = offers.find((offer) => offer.id === offerId);
    setActiveOffer(currentOffer);
  };

  const handleCityChange = (newCity: City) => {
    dispatch(changeCity(newCity));
  };

  const handleSortingOptionChange = (newSortingOption: SortingOption) => {
    dispatch(setSortingOption(newSortingOption));
  };


  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList activeCity={currentCity} onCityChange={handleCityChange}/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {currentCity.name}</b>
              <SortingOptions
                activeSortingOption={currentSortingOption}
                onSortingOptionChange={handleSortingOptionChange}
              />
              <div className="cities__places-list places__list tabs__content">
                <PlaceCardsList
                  offers={sortedOffers}
                  onCardHover={handleCardHover}
                  location={PlaceCardLocation.MainPage}
                  activeOfferId={activeOffer ? activeOffer.id : null}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  city={currentCity}
                  points={points}
                  selectedPoint={selectedPoint}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
