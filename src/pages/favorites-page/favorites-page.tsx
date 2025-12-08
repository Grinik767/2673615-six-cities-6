import FavoritePlaceCard from '../../components/favorite-place-card/favorite-place-card.tsx';
import Header from '../../components/header/header.tsx';
import { useAppSelector } from '../../hooks/store.ts';
import { getOffers } from '../../store/data-process/selectors.ts';
import { OfferCards } from '../../types/offer.ts';


function getGroupedFavorites(offers: OfferCards){
  const grouped = offers.reduce((map, offer) => {
    if (offer.isFavorite) {
      const city = offer.city.name;
      const cityOffers = map.get(city) || [];
      cityOffers.push(offer);
      map.set(city, cityOffers);
    }
    return map;
  }, new Map<string, OfferCards>());

  return Array.from(grouped);
}

function FavoritesPage() {
  const offers = useAppSelector(getOffers);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {getGroupedFavorites(offers).map(([cityName, cityOffers]) => (
                <li key={cityName} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{cityName}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {cityOffers.map((offer) => (
                      <FavoritePlaceCard
                        key={offer.id}
                        offer={offer}
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
