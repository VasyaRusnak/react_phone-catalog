import './ShopByCategory.scss';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import productsData from '/public/api/products.json';

export const ShopByCategory: FC = () => {
  const baseUrl = import.meta.env.BASE_URL;

  const tablet = productsData.filter(
    (product: any) => product.category === 'tablets',
  ).length;
  const phone = productsData.filter(
    (product: any) => product.category === 'phones',
  ).length;
  const accessories = productsData.filter(
    (product: any) => product.category === 'accessories',
  ).length;

  return (
    <section>
      <div className="shopByCategory">
        <h2 className="shopByCategory__h1">Shop by Category</h2>
        <div className="shopByCategory__items">
          <Link to="/phones" className="shopByCategory__items__item">
            {/* Прибрали /public/ і додали baseUrl */}
            <img src={`${baseUrl}/img/icons/Phones.png`} alt="Phones" />
            <span className="shopByCategory__items__item__title">Phones</span>
            <span className="shopByCategory__items__item__models">
              {phone} models
            </span>
          </Link>
          <Link to="/tablets" className="shopByCategory__items__item">
            <img src={`${baseUrl}/img/icons/Tablets.png`} alt="Tablets" />
            <span className="shopByCategory__items__item__title">Tablets</span>
            <span className="shopByCategory__items__item__models">
              {tablet} models
            </span>
          </Link>
          <Link to="/accessories" className="shopByCategory__items__item">
            <img src={`${baseUrl}/img/icons/Accesoirs.png`} alt="Accessories" />
            <span className="shopByCategory__items__item__title">
              Accessories
            </span>
            <span className="shopByCategory__items__item__models">
              {accessories} models
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};
