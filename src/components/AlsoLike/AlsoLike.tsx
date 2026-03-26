import React, { useState } from 'react';
import { CardHP } from '../CardHP/CardHP';
import './AlsoLike.scss';
import productsData from '/public/api/products.json';
import { Product } from '../../types';
type BrandNewModelsProps = {
  favourites: Product[];
  addToFav?: (product: Product) => void;
  fullPrice: number;
  price: number;
};

const VISIBLE_COUNT = 4;

export const AlsoLike: React.FC<BrandNewModelsProps> = ({
  favourites,
  addToFav,
  price,
  fullPrice,
}) => {
  const models = React.useMemo(() => {
    return [...productsData].sort(() => 0.5 - Math.random()).slice(0, 10);
  }, []);
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex(prev =>
      prev + 1 > models.length - VISIBLE_COUNT ? 0 : prev + 1,
    );
  };

  const handlePrev = () => {
    setStartIndex(prev =>
      prev - 1 < 0 ? models.length - VISIBLE_COUNT : prev - 1,
    );
  };

  const visibleModels = models.slice(startIndex, startIndex + VISIBLE_COUNT);

  return (
    <section className="also-like">
      <div className="also-like__header">
        <h2 className="also-like__title">You may also like</h2>

        <div className="also-like__arrows">
          <button onClick={handleNext} className="also-like__arrow">
            ←
          </button>
          <button onClick={handlePrev} className="also-like__arrow">
            →
          </button>
        </div>
      </div>

      <div className="also-like__list">
        {visibleModels.map(product => (
          <CardHP
            favourites={favourites}
            addToFav={addToFav}
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};
