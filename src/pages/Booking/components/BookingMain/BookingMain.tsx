import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingMain.css'
import BookElem from './components/BookElem';
import Rules from './components/Rules';
import ButtonBook from '../../components/ButtonBook/ButtonBook';
const BookingMain: React.FC=()=>{
  const navigate = useNavigate();
  const readFaqClick = () => {
    navigate('/faq');
  };
  return (
    <div className="bookingMain">
      <div className='service'>
        <h1>Choose Additional Services</h1>
        <BookElem title1={'Fresh Breakfast for one '} title2={'400kr'} description1={'Classic Dinner'} description2={'Bread, Coffee, milk, juice, and a selection of spreads + toppings.'}/>
        <BookElem title1={'Fresh Breakfast for two '} title2={'600kr'} description1={'Classic Dinner'} description2={'Bread, Coffee, milk, juice, and a selection of spreads + toppings.'}/>
        <BookElem title1={'Classic Dinner for one '} title2={'600kr'} description1={'Classic Dinner'} description2={'Bread, Coffee, milk, juice, and a selection of spreads + toppings.'}/>
        <BookElem title1={'Classic Dinner for two '} title2={'800kr'} description1={'Classic Dinner'} description2={'Bread, Coffee, milk, juice, and a selection of spreads + toppings.'}/>
        <BookElem title1={'Electric Car Charge '} title2={'800kr'} description1={'Classic Dinner'} description2={'Bread, Coffee, milk, juice, and a selection of spreads + toppings.'}/>
        <Rules title={'Hut rules'} rules={['Check-in:  2:00 PM - 11:00 PM', 'Checkout: 11:00 AM' ,'Not suitable for children and infants' ,'No smoking','No pets']}/>
        <Rules title={'Cancellation policy'} rules={['Free cancellation until 1:00 PM on Mar 27' ,'After that, cancel before 2:00 PM on Apr 1 and get a 50% refund, minus the first night and service fee']}/>
        <Rules title={'Important Information'} rules={['You need to hike a steep hill to arrive at the treehouses, it takes approx 20-30 minutes on a trail with stairs and uneven ground.']}/>
        <ButtonBook title={'Read faq'} flag={false} size={''} height={'55px'} width={'180px'} onClick={readFaqClick} />
      </div>
      <div className='check'></div>
    </div>
  )
}
export default BookingMain;