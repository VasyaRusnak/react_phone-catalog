import { useState } from 'react';
import './Slider.scss';

const images = [
  '/public/img/icons/Banner (1).png',
  '/public/img/icons/img.png',
  '/public/img/banner-phones.png',
];

export const Slider = () => {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex(i => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = () => {
    setIndex(i => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <section className="slider">
      <h1>Welcome to Nice Gadgets store!</h1>
      <button className="slider__arrow slider__arrow--left" onClick={prev}>
        ‹
      </button>

      <div className="slider__window">
        <div
          className="slider__track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map(src => (
            <img key={src} src={src} className="slider__image" />
          ))}
        </div>
      </div>

      <button className="slider__arrow slider__arrow--right" onClick={next}>
        ›
      </button>
    </section>
  );
};
