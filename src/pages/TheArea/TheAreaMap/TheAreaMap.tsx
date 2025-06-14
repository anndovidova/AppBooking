import React from 'react';
import './TheAreaMap.css';
import map from '../../../../images/the-area/map2.svg';
import point from '../../../../images/the-area/point.svg';

const TheAreaMap: React.FC = () => {
  return (
    <section className="the-area-map">
      <div className="map-text">
        <p data-i18n="text.map">
          Lorem ipsum dolor sit
          <br /> amet, consectetur
          <br /> adipiscing...
        </p>
      </div>
      <div className="map-points">
        <img src={map} alt="" />
        <p className="first" data-i18n="map.copenhagen">
          Copenhagen
        </p>
        <p className="second" data-i18n="map.vesterborg">
          Vesterborg
        </p>
        <img className="first-point" src={point} alt="" />
        <img className="second-point" src={point} alt="" />
      </div>
    </section>
  );
};
export default TheAreaMap;
