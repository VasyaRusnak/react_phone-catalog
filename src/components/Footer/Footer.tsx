import { FC } from 'react';
import './Footer.scss';
import { NavLink } from 'react-router-dom';

export const Footer: FC = () => {
  return (
    <div className="footer">
      <div className="footer__content">
        <div className="footer__logo">
          <a href="#">
            <img src="/src/Logo.png" alt={'logo'} />
          </a>
        </div>
        <div className="footer__items">
          <a
            className="footer__items__item"
            href="https://github.com/VasyaRusnak/react_phone-catalog.git"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          <NavLink to="/contacts" className="footer__items__item">
            Contacts
          </NavLink>
          <NavLink
            to="/"
            className="footer__items__item"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Right
          </NavLink>
        </div>
        <div className="footer__back">
          <a className="footer__back__text" href="#">
            Back to top
            <img
              src="/img/icons/Slider button - Default (right).png"
              alt="back icon"
            />
          </a>
        </div>
      </div>
    </div>
  );
};
