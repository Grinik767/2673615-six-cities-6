import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PlaceCardsList from '../../components/place-cards-list/place-cards-list.tsx';
import ReviewForm from '../../components/review-form/review-form.tsx';
import { OfferCard } from '../../types/offer.ts';
import Map from '../../components/map/map.tsx';
import NotFoundPage from '../not-found-page/not-found-page.tsx';
import { Point } from '../../types/map.ts';
import { PlaceCardLocation } from '../../types/place-card.ts';
import ReviewList from '../../components/reviews-list/review-list.tsx';
import { getRatingWidthPercentage } from '../../utils.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import Header from '../../components/header/header.tsx';
import { fetchOfferAction } from '../../store/api-actions.ts';
import Loader from '../../components/loader/loader.tsx';
import { AuthStatus, MAX_NEARBY_OFFERS, MAX_REVIEW_COUNT } from '../../const.ts';
import { getAuthStatus } from '../../store/user-process/selectors.ts';
import { getIsOfferLoading, getNearbyOffers, getOffer, getReviews } from '../../store/data-process/selectors.ts';


function GoodsList({ goods }: { goods: string[] }){
  return (
    <div className="offer__inside">
      <h2 className="offer__inside-title">What&apos;s inside</h2>
      <ul className="offer__inside-list">
        {goods.map((good) => (
          <li key={good} className="offer__inside-item">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
}

function OfferGallery({ images }: { images: string[] }) {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.map((image) => (
          <div key={image} className="offer__image-wrapper">
            <img className="offer__image" src={image} alt="Photo studio" />
          </div>
        ))}
      </div>
    </div>
  );
}

function OfferPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(getAuthStatus);
  const isOfferLoading = useAppSelector(getIsOfferLoading);
  const currentOffer = useAppSelector(getOffer);
  const nearbyOffers = useAppSelector(getNearbyOffers).slice(0, MAX_NEARBY_OFFERS);
  const reviews = [...useAppSelector(getReviews)]
    .sort((x, y) => new Date(y.date).getTime() - new Date(x.date).getTime())
    .slice(0, MAX_REVIEW_COUNT);

  const [activeNearbyOffer, setActiveNearbyOffer] = useState<OfferCard | undefined>(undefined);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
    }
  }, [id, dispatch]);

  if (isOfferLoading) {
    return <Loader />;
  }

  if (!currentOffer){
    return <NotFoundPage/>;
  }

  const handleNearbyCardHover = (offerId: string | null) => {
    const activeOffer = nearbyOffers.find((offer) => offer.id === offerId);
    setActiveNearbyOffer(activeOffer);
  };

  const points: Point[] = nearbyOffers.concat(currentOffer).map((offer) => ({
    id: offer.id,
    title: offer.title,
    lat: offer.location.latitude,
    lng: offer.location.longitude,
  }));

  const selectedPoint: Point | null = activeNearbyOffer
    ? {
      id: activeNearbyOffer.id,
      title: activeNearbyOffer.title,
      lat: activeNearbyOffer.location.latitude,
      lng: activeNearbyOffer.location.longitude,
    }
    : null;

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery images={currentOffer.images}/>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isFavorite && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>)}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{currentOffer.title}</h1>
                <button className={`offer__bookmark-button ${currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''} button`} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: getRatingWidthPercentage(currentOffer.rating)}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <GoodsList goods={currentOffer.goods}/>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${currentOffer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74" height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {currentOffer.host.name}
                  </span>
                  {currentOffer.host.isPro && (
                    <span className="offer__user-status">
                    Pro
                    </span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOffer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewList reviews={reviews}/>
                {authStatus === AuthStatus.Auth && <ReviewForm offerId={currentOffer.id} />}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map
              city={currentOffer.city}
              points={points}
              selectedPoint={selectedPoint}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <PlaceCardsList
                offers={nearbyOffers}
                onCardHover={handleNearbyCardHover}
                location={PlaceCardLocation.OfferPage}
                activeOfferId={activeNearbyOffer ? activeNearbyOffer.id : null}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
