import './Header.scss';
import { Page } from '../../App';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

type Props = {
  page?: Page;
  setPage?: (page: Page) => void;
};

export const Header: React.FC<Props> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = ''; // Повертаємо скрол сторінці
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  return (
    <header className="header">
      <div className="header__nav">
        {/* ЛІВА ЧАСТИНА: Логотип і меню */}
        <div className="header__nav__items">
          <NavLink to="/" className="header__nav__logo">
            <img src="/src/Logo.png" alt="logo" />
          </NavLink>

          <NavLink to="/" className="header__nav__items__item">
            Home
          </NavLink>
          <NavLink to="/phones" className="header__nav__items__item">
            Phones
          </NavLink>
          <NavLink to="/tablets" className="header__nav__items__item">
            Tablets
          </NavLink>
          <NavLink to="/accessories" className="header__nav__items__item">
            Accessories
          </NavLink>
        </div>

        <div className="header__nav__right">
          <div className="header__nav__icons">
            <NavLink to="/favorites" className="header__nav__icons__fav" />
            <NavLink to="/cart" className="header__nav__icons__cart" />
          </div>

          <button
            type="button"
            className={`header__nav__burger ${isMenuOpen ? 'is-active' : ''}`}
            onClick={toggleMenu}
          >
            <span className="header__nav__burger__line" />
          </button>
        </div>
      </div>

      <div className={`header__menu ${isMenuOpen ? 'is-open' : ''}`}>
        <div className="header__menu__content">
          <NavLink to="/" className="header__menu__item">
            Home
          </NavLink>
          <NavLink to="/phones" className="header__menu__item">
            Phones
          </NavLink>
          <NavLink to="/tablets" className="header__menu__item">
            Tablets
          </NavLink>
          <NavLink to="/accessories" className="header__menu__item">
            Accessories
          </NavLink>
        </div>
      </div>
    </header>
  );
};
