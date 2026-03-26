import React, { useEffect, useState } from 'react';
import productsData from '/public/api/products.json';
import './TabletsPage.scss';
import { SortSection } from '../SortSection/SortSection';
import { CardHP } from '../CardHP/CardHP';
import { useNavigate } from 'react-router-dom';
type TabletsPageProps = {
  favourites: string[];
  addToFav: (product: any) => void;
};
export const TabletsPage: React.FC<TabletsPageProps> = ({
  favourites,
  addToFav,
}) => {
  const navigator = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const navigateTo = (productId: string) => {
    navigator(productId, { relative: 'path' });
  };

  useEffect(() => {
    const tabletsOnly = productsData.filter(
      product => product.category === 'tablets',
    );

    setTablets(tabletsOnly);
  }, []);
  type sortType = 'alpha' | 'cheap' | 'newest';

  const [sortBy, setSortBy] = useState<sortType>('newest');
  const [itemsPerPage, setItemsPerPage] = useState<number>(16);
  const [tablets, setTablets] = useState<typeof productsData>([]);

  const sortedTablets = [...tablets]
    .sort((a, b) => {
      switch (sortBy) {
        case 'cheap':
          return a.price - b.price;
        case 'alpha':
          return a.name.localeCompare(b.name);
        case 'newest':
          return b.year - a.year;
        default:
          return 0;
      }
    })
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(tablets.length / itemsPerPage);

  return (
    <div className="tablets-page">
      <SortSection
        total={tablets.length}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onItemsChange={setItemsPerPage}
        itemsPerPage={itemsPerPage}
      />
      <div className="tablets-page__list">
        {sortedTablets.map(tablet => (
          <CardHP
            onClick={() => navigateTo(`/tablets/${tablet.itemId}`)}
            favourites={favourites}
            addToFav={addToFav}
            product={tablet}
            key={tablet.id}
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
