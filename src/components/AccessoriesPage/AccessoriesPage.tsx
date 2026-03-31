import React, { useEffect, useState } from 'react';
import productsData from '/public/api/products.json';
import './AccessoriesPage.scss';
import { SortSection } from '../SortSection/SortSection';
import { CardHP } from '../CardHP/CardHP';
import { useNavigate } from 'react-router-dom';

type AccessoriesPageProps = {
  favourites: string[];
  addToFav: (product: any) => void;
};

export const AccessoriesPage: React.FC<AccessoriesPageProps> = ({
                                                                  favourites,
                                                                  addToFav,
                                                                }) => {
  const [accessories, setAccessories] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState('newest');
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);

  const navigator = useNavigate();

  useEffect(() => {
    const accessoriesOnly = productsData.filter(
      product => product.category === 'accessories',
    );
    setAccessories(accessoriesOnly);
  }, []);

  // 1. Сортуємо ВСІ аксесуари
  const sorted = [...accessories].sort((a, b) => {
    switch (sortBy) {
      case 'cheap':
        return a.price - b.price;
      case 'alpha':
        return a.name.localeCompare(b.name); // Виправлено тут
      case 'newest':
        return b.year - a.year;
      default:
        return 0;
    }
  });

  // 2. Робимо slice тільки для поточної сторінки
  const sortedAccessories = sorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(accessories.length / itemsPerPage);

  const navigateTo = (productId: string) => {
    navigator(`/accessories/${productId}`);
  };

  return (
    <div className="accessories-page">
      <SortSection
        total={accessories.length}
        sortBy={sortBy}
        itemsPerPage={itemsPerPage}
        onSortChange={(value) => {
          setSortBy(value);
          setCurrentPage(1); // Скидаємо на 1 сторінку
        }}
        onItemsChange={(value) => {
          setItemsPerPage(value);
          setCurrentPage(1); // Скидаємо на 1 сторінку
        }}
      />

      <div className="accessories-page__list">
        {sortedAccessories.map(accessor => (
          <CardHP
            onClick={() => navigateTo(accessor.itemId)}
            favourites={favourites}
            addToFav={addToFav}
            product={accessor}
            key={accessor.id}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="phones-page__pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={
                page === currentPage
                  ? 'phones-page__pagination__active'
                  : 'phones-page__pagination__default'
              }
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
