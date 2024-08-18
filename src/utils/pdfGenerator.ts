import { jsPDF } from 'jspdf';
import { BookingConfirmation } from '../types/bookingTypes';

// constants for positioning and styles
const FONT_SIZES = {
  TITLE: 18,
  HEADER: 14,
  SECTION_TITLE: 13,
  TEXT: 12,
  FOOTER: 10,
};

const COLORS = {
  TITLE: '#B25E39',
  HEADER: '#473D3A',
};
const PADDING = 10;

export const generatePDF = (bookingConfirm: BookingConfirmation) => {
  const doc = new jsPDF();
  doc.setLineWidth(0.2); // line width in units

  // Title
  doc.setFontSize(FONT_SIZES.TITLE);
  doc.setTextColor(COLORS.TITLE);
  doc.setFont('bold');
  doc.text('Booking Confirmation', PADDING, 15);

  // Secondary header
  doc.setFontSize(FONT_SIZES.HEADER);
  doc.setTextColor(COLORS.HEADER);
  doc.setFont('normal');
  doc.text(
    'Thanks for your reservation, here are the details of your stay',
    PADDING,
    25,
  );

  // Section titles
  doc.setFontSize(FONT_SIZES.SECTION_TITLE);
  doc.setTextColor(COLORS.HEADER);
  doc.setFont('italic');
  doc.text('Payment Information', PADDING, 38);
  doc.text('Booking Information', PADDING, 68);

  // Payment Information
  doc.setFontSize(FONT_SIZES.TEXT);
  doc.setFont('normal');
  doc.text(`Name: ${bookingConfirm.customerName}`, PADDING * 2, 45);
  doc.text(`Payment Method: ${bookingConfirm.paymentMethod}`, PADDING * 2, 50);
  doc.text(`Total: $${bookingConfirm.totalCost}`, PADDING * 2, 55);

  // Booking Information
  doc.text(`Hotel Name: ${bookingConfirm.hotelName}`, PADDING * 2, 75);
  doc.text(`Room Number: ${bookingConfirm.roomNumber}`, PADDING * 2, 80);
  doc.text(`Room Type: ${bookingConfirm.roomType}`, PADDING * 2, 85);
  doc.text(
    `Booking Date & Time: ${bookingConfirm.bookingDateTime}`,
    PADDING * 2,
    90,
  );
  doc.text(`Booking Status: ${bookingConfirm.bookingStatus}`, PADDING * 2, 95);
  doc.text(
    `Confirmation Number: ${bookingConfirm.confirmationNumber}`,
    PADDING * 2,
    100,
  );

  // Footer
  doc.setFontSize(FONT_SIZES.FOOTER);
  doc.text(`@TravelHub`, PADDING, 120);

  // Save the pdf
  doc.save('booking-confirmation.pdf');
};
