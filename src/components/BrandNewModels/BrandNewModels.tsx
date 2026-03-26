import React, { useState } from 'react';
import { CardHP } from '../CardHP/CardHP';
import './BrandNewModels.scss';
import productsData from '/public/api/products.json';
import { Product } from '../../types';
type BrandNewModelsProps = {
  favourites: Product[];
  addToFav?: (product: Product) => void;
  year: number;
};

const VISIBLE_COUNT = 4;

export const BrandNewModels: React.FC<BrandNewModelsProps> = ({
  favourites,
  addToFav,
  year,
}) => {
  const models = productsData.sort((a, b) => b.year - a.year).slice(0, 10);
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
    <section className="brand-new">
      <div className="brand-new__header">
        <h2 className="brand-new__title">Brand new models</h2>

        <div className="brand-new__arrows">
          <button onClick={handlePrev} className="brand-new__arrow">
            ←
          </button>
          <button onClick={handleNext} className="brand-new__arrow">
            →
          </button>
        </div>
      </div>

      <div className="brand-new__list">
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
