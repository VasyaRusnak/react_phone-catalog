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
  type sortType = 'alpha' | 'cheap' | 'newest';
  const navigator = useNavigate();
  const navigateTo = (productId: string) => {
    navigator(productId, { relative: 'path' });
  };

  useEffect(() => {
    const accessoriesOnly = productsData.filter(
      product => product.category === 'accessories',
    );

    setAccessories(accessoriesOnly);
  }, []);

  const [accessories, setAccessories] = useState<typeof productsData>([]);
  const [sortBy, setSortBy] = useState<sortType>('newest');
  const [itemsPerPage, setItemsPerPage] = useState<number>(16);
  const [currentPage, setCurrentPage] = useState(1);
  const sortedAccessories = [...accessories]
    .sort((a, b) => {
      switch (sortBy) {
        case 'cheap':
          return a.price - b.price;
        case 'alpha':
          return a.name.localeCompare(b.name.localeCompare);
        case 'newest':
          return b.year - a.year;
        default:
          return 0;
      }
    })
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(accessories.length / itemsPerPage);

  return (
    <div className="accessories-page">
      <SortSection
        total={accessories.length}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onItemsChange={setItemsPerPage}
      />

      <div className="accessories-page__list">
        {sortedAccessories.map(accessor => (
          <CardHP
            onClick={() => navigateTo(`/accessories/${accessor.itemId}`)}
            favourites={favourites}
            addToFav={addToFav}
            product={accessor}
            key={accessor.id}
          />
        ))}
      </div>
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
    </div>
  );
};
