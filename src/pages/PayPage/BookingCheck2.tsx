import React, { useState, useEffect } from 'react';
import { parseISO, differenceInDays, isValid } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { setCheckInDate, setCheckOutDate, setGuests, clearDates } from '../calendarSlice';
import ButtonBook from '../../../components/ButtonBook/ButtonBook';
import calenderLine from '../../../images/booking/calendarLine.svg';
import minus from '../../../images/booking/minus.svg';
import plus from '../../../images/booking/plus.svg';
import { useCalendar } from '../../../context/CalendarContex';

interface BookingCheckProps {
  selectedItems: { label: string; price: string }[];
}

interface BookingDetails {
  nightsCount: number;
  subtotal: number;
  total: number;
  showPrice: boolean;
}

type PromoCodeType = 'DISCOUNT10' | 'SAVE200' | 'SPECIAL';

interface PromoDiscount {
  title: string;
  value: string;
  discount: number;
}

const NIGHTLY_RATE = 3200;
const MAX_GUESTS = 5;

const promoDiscounts: Record<PromoCodeType, PromoDiscount> = {
  'DISCOUNT10': { title: '10% discount', value: '-200kr', discount: 200 },
  'SAVE200': { title: 'Save 200', value: '-200kr', discount: 200 },
  'SPECIAL': { title: 'Special Offer', value: '-300kr', discount: 300 }
};

const validPromoCodes = Object.keys(promoDiscounts) as PromoCodeType[];

const BookingCheck2: React.FC<BookingCheckProps> = ({ selectedItems }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { checkInDate, checkOutDate, guests } = useSelector((state: RootState) => state.booking);
  const navigate = useNavigate();
  const { openCalendar } = useCalendar();

  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [appliedPromoCode, setAppliedPromoCode] = useState<PromoCodeType | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    nightsCount: 0,
    subtotal: 0,
    total: 0,
    showPrice: false
  });

  const parseCustomDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    const parts = dateString.split('/');
    if (parts.length !== 3) return null;
    const [day, month, year] = parts.map(part => parseInt(part, 10));
    if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
    return new Date(year, month - 1, day);
  };

  const calculateBooking = () => {
    if (!checkInDate || !checkOutDate) {
      setBookingDetails({
        nightsCount: 0,
        subtotal: 0,
        total: 0,
        showPrice: false
      });
      return;
    }

    try {
      const startDate = parseCustomDate(checkInDate);
      const endDate = parseCustomDate(checkOutDate);

      if (!startDate || !endDate || !isValid(startDate) || !isValid(endDate)) {
        throw new Error('Invalid dates');
      }

      const nightsCount = Math.max(0, differenceInDays(endDate, startDate));
      const subtotal = nightsCount * NIGHTLY_RATE;

      const servicesTotal = selectedItems.reduce((sum, item) => {
        return sum + parseInt(item.price.replace('kr', ''), 10);
      }, 0);

      const discount = appliedPromoCode ? promoDiscounts[appliedPromoCode].discount : 0;
      const total = Math.max(0, subtotal + servicesTotal - discount);

      setBookingDetails({
        nightsCount,
        subtotal,
        total,
        showPrice: nightsCount > 0
      });
    } catch (error) {
      console.error('Date calculation error:', error);
      setBookingDetails({
        nightsCount: 0,
        subtotal: 0,
        total: 0,
        showPrice: false
      });
    }
  };

  useEffect(() => {
    calculateBooking();
  }, [checkInDate, checkOutDate, appliedPromoCode, selectedItems]);

  const bookClick = () => {
    if (checkInDate && checkOutDate) {
      navigate('/pay', {
        state: {
          checkIn: checkInDate,
          checkOut: checkOutDate,
          guests: guests
        }
      });
    } else {
      alert('Please select both check-in and check-out dates');
    }
  };

  const handleDecreaseGuests = () => {
    if (guests > 1) dispatch(setGuests(guests - 1));
  };

  const handleIncreaseGuests = () => {
    if (guests < MAX_GUESTS) dispatch(setGuests(guests + 1));
  };

  const handlePromoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value.toUpperCase());
  };

  const applyPromoCode = () => {
    const isValidPromo = validPromoCodes.includes(promoCode as PromoCodeType);
    setAppliedPromoCode(isValidPromo ? promoCode as PromoCodeType : null);
    setIsPromoApplied(true);
  };

  const isPromoValid = appliedPromoCode !== null;

  return (
    <div className='check'>
      <div className='price'>
        <p>{NIGHTLY_RATE}kr</p>
        <p>/ night</p>
      </div>

      <div className='check-main'>
        <div className='check-date'>
          <div className="check-date-input">
            <label>Check in</label>
            <input
              placeholder="Add dates"
              value={checkInDate || ""}
              readOnly
              className={checkInDate ? "has-value" : ""}
              onClick={openCalendar}
            />
          </div>
          <img src={calenderLine} alt="" />
          <div className="check-date-input">
            <label>Check out</label>
            <input
              placeholder="Add dates"
              onClick={openCalendar}
              value={checkOutDate || ""}
              readOnly
              className={checkOutDate ? "has-value" : ""}
            />
          </div>
          <img src={calenderLine} alt="" />
          <div className="check-guests">
            <label>Guests</label>
            <div className="check-guest-control">
              <button
                style={{ backgroundImage: `url(${minus})` }}
                onClick={handleDecreaseGuests}
                disabled={guests <= 1}
                className={guests <= 1 ? "disabled" : ""}
              />
              <span>{guests}</span>
              <button
                style={{ backgroundImage: `url(${plus})`, height: '10px' }}
                onClick={handleIncreaseGuests}
                disabled={guests >= MAX_GUESTS}
                className={guests >= MAX_GUESTS ? "disabled" : ""}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='services'>
        {bookingDetails.showPrice && (
          <div className='accomodation-price'>
            <p>{NIGHTLY_RATE} x {bookingDetails.nightsCount} {bookingDetails.nightsCount === 1 ? 'night' : 'nights'}</p>
            <p>{bookingDetails.subtotal.toLocaleString()}kr</p>
          </div>
        )}

        {selectedItems.map((item, index) => (
          <div key={index} className='position'>
            <p>{item.label}</p>
            <p>{item.price}</p>
          </div>
        ))}

        {isPromoValid && appliedPromoCode && (
          <div className='sale'>
            <p>{promoDiscounts[appliedPromoCode].title}</p>
            <p>{promoDiscounts[appliedPromoCode].value}</p>
          </div>
        )}

        <div className='total'>
          <p>Total</p>
          <p>{bookingDetails.total.toLocaleString()}kr</p>
        </div>
        {isPromoApplied && (
          <p className={`promokod-message ${isPromoValid ? 'success' : 'error'}`}>
            {isPromoValid ? 'Promo code applied' : 'Invalid promo code'}
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingCheck2;