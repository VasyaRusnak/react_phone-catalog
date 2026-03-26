import { useEffect, useState } from 'react';
import productsData from '/public/api/products.json';
import './PhonesPage.scss';
import { SortSection } from '../SortSection/SortSection';
import { CardHP } from '../CardHP/CardHP';
import { useNavigate } from 'react-router-dom';

type PhonesPageProps = {
  favourites: string[];
  addToFav: (product: any) => void;
};

export const PhonesPage: React.FC<PhonesPageProps> = ({
  favourites,
  addToFav,
}) => {
  type sortType = 'alpha' | 'cheap' | 'newest';
  const [currentPage, setCurrentPage] = useState(1);
  const navigator = useNavigate();
  const navigateTo = (productId: string) => {
    navigator(productId, { relative: 'path' });
  };

  const [phones, setPhones] = useState<(typeof productsData)[0][]>([]);
  const [sortBy, setSortBy] = useState<sortType>('newest');
  const [itemsPerPage, setItemsPerPage] = useState<number>(16);
  const totalPages = Math.ceil(phones.length / itemsPerPage);

  useEffect(() => {
    const onlyPhones = productsData.filter(
      product => product.category === 'phones',
    );

    setPhones(onlyPhones);
  }, []);

  const sortedPhones = [...phones]
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

  return (
    <div className="phones-page">
      <SortSection
        total={phones.length}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onItemsChange={setItemsPerPage}
        itemsPerPage={itemsPerPage}
      />

      <div className="phones-page__list">
        {sortedPhones.map(phone => (
          <CardHP
            onClick={() => navigateTo(`/phones/${phone.itemId}`)}
            key={phone.id}
            product={phone}
            favourites={favourites}
            addToFav={addToFav}
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
