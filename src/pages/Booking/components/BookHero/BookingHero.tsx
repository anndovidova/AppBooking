import React from 'react';
import './BookingHero.css'
import geo from '../../../images/the-area/geo.svg';

const BookingHero: React.FC = () => {
  return (
    <div className="area-hero" style={{ textAlign: 'center' }}>
      <h1 style={{margin: '0 0 15px 0',paddingTop:'67px'}}>{'Booking'}</h1>
      <div style={{display:'flex'}} className="geo">
        <img src={geo} alt="" />
        <p style={{font: '300 clamp(15px, 1.3vw, 1.3vw)/24px "Open Sans", sans-serif',paddingRight: '1px'}} data-i18n="location.name">Vesterborg, Denmark</p>
      </div>
    </div>
  );
}
export default BookingHero;
