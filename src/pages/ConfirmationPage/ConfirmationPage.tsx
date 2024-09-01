import React, { FC } from 'react';
import { useBookingContext } from '../../context/bookingProvider';
import {
  NotificationType,
  useNotification,
} from '../../context/notificationProvider';
import { generatePDF } from '../../utils/pdfGenerator';
import classes from './ConfirmationPage.module.css';

const ConfirmationPage: FC = () => {
  const { notify } = useNotification();
  const { bookingConfirm } = useBookingContext();

  if (!bookingConfirm) {
    return (
      <div className={classes.confirmationContainer}>
        <p>
          No booking information available <i className="bi bi-emoji-frown" />.
        </p>
      </div>
    );
  }

  const paymentInfoList = [
    { label: 'Name', value: bookingConfirm.customerName },
    { label: 'Payment Method', value: bookingConfirm.paymentMethod },
    { label: 'Total', value: `$${bookingConfirm.totalCost}` },
  ];

  const bookingInfoList = [
    { label: 'Hotel Name', value: bookingConfirm.hotelName },
    { label: 'Room Number', value: bookingConfirm.roomNumber },
    { label: 'Room Type', value: bookingConfirm.roomType },
    { label: 'Booking Date & Time', value: bookingConfirm.bookingDateTime },
    { label: 'Booking Status', value: bookingConfirm.bookingStatus },
    { label: 'Confirmation Number', value: bookingConfirm.confirmationNumber },
  ];

  const handleSavePDF = () => {
    generatePDF(bookingConfirm);
    notify(NotificationType.SUCCESS, 'checkout successfully!');
  };

  return (
    <div className={classes.confirmationContainer}>
      <h2>Thanks for your reservation, here are the details of your stay</h2>

      <section>
        <h3>Payment Information</h3>
        <ul>
          {paymentInfoList.map(({ label, value }) => (
            <li key={label}>
              <p>{label}:</p>
              <p>{value}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Booking Information</h3>
        <ul>
          {bookingInfoList.map(({ label, value }) => (
            <li key={label}>
              <p>{label}:</p>
              <p>{value}</p>
            </li>
          ))}
        </ul>
      </section>

      <button
        type="button"
        className={classes.saveButton}
        aria-label="Save Confirmation as PDF"
        onClick={handleSavePDF}
      >
        Save Confirmation as PDF
        <i className="bi bi-download"></i>
      </button>
    </div>
  );
};

export default ConfirmationPage;
