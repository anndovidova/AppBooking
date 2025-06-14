import React from 'react';
import HeroSlide from './components/HeroSlide/HeroSlide';
import Card from '../../components/card/Card'
import Map from './components/Map/Map';
import TheAreaMap from './components/TheAreaMap/TheAreaMap';
import titleOutside from '../../components/card/TextOutside/title.txt'
import categoryOutside1 from '../../components/card/TextOutside/category1.txt'
import categoryOutSide2 from '../../components/card/TextOutside/category2.txt'
import textOutside from '../../components/card/TextOutside/text.txt'
import hut1 from '../../images/images-the-hut/slider1/hut1.svg';
import hut2 from '../../images/images-the-hut/slider1/hut2.svg';
import hut3 from '../../images/images-the-hut/slider1/hut3.svg';


const images = [hut1, hut2, hut3];
const categoryOutside = [categoryOutside1,categoryOutSide2]

const TheArea: React.FC = () => {
  return (
    <>
      <main>
        <HeroSlide />
        <Card flag={true} title={titleOutside} text={textOutside} category={categoryOutside} images={images} />
        <TheAreaMap />
        <Card flag={true} title={titleOutside} text={textOutside} category={categoryOutside} images={images} />
        <Card flag={false} title={titleOutside} text={textOutside} category={categoryOutside} images={images} />
        <Card flag={true} title={titleOutside} text={textOutside} category={categoryOutside} images={images} />
        <Card flag={true} title={titleOutside} text={textOutside} category={categoryOutside} images={images} />
        <Map />
      </main>
    </>
  );
};

export default TheArea;
