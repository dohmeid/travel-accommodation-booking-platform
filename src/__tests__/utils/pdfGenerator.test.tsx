import { jsPDF } from 'jspdf';
import { generatePDF } from '../../utils/pdfGenerator';
import { BookingConfirmation } from '../../types/bookingTypes';

jest.mock('jspdf', () => {
  const mockJsPDFInstance = {
    setLineWidth: jest.fn(),
    setFontSize: jest.fn(),
    setTextColor: jest.fn(),
    setFont: jest.fn(),
    text: jest.fn(),
    save: jest.fn(),
  };
  return {
    jsPDF: jest.fn(() => mockJsPDFInstance),
  };
});

describe('generatePDF', () => {
  let mockDoc: Partial<jsPDF>;

  beforeEach(() => {
    mockDoc = new jsPDF();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should generate a PDF with the correct title and headers', () => {
    const bookingConfirm: BookingConfirmation = {
      customerName: 'John Doe',
      paymentMethod: 'Credit Card',
      totalCost: 500,
      hotelName: 'Grand Hotel',
      roomNumber: 0,
      roomType: 'Deluxe',
      bookingDateTime: '2024-08-19 12:00',
      bookingStatus: 'Confirmed',
      confirmationNumber: 'ABC123456',
    };
    generatePDF(bookingConfirm);

    // Title
    expect(mockDoc.setFontSize).toHaveBeenCalledWith(18);
    expect(mockDoc.setTextColor).toHaveBeenCalledWith('#B25E39');
    expect(mockDoc.setFont).toHaveBeenCalledWith('bold');
    expect(mockDoc.text).toHaveBeenCalledWith('Booking Confirmation', 10, 15);

    // Secondary header
    expect(mockDoc.setFontSize).toHaveBeenCalledWith(14);
    expect(mockDoc.setTextColor).toHaveBeenCalledWith('#473D3A');
    expect(mockDoc.setFont).toHaveBeenCalledWith('normal');
    expect(mockDoc.text).toHaveBeenCalledWith(
      'Thanks for your reservation, here are the details of your stay',
      10,
      25,
    );
  });

  it('should include payment information in the PDF', () => {
    const bookingConfirm: BookingConfirmation = {
      customerName: 'John Doe',
      paymentMethod: 'Credit Card',
      totalCost: 500,
      hotelName: 'Grand Hotel',
      roomNumber: 0,
      roomType: 'Deluxe',
      bookingDateTime: '2024-08-19 12:00',
      bookingStatus: 'Confirmed',
      confirmationNumber: 'ABC123456',
    };
    generatePDF(bookingConfirm);

    expect(mockDoc.setFontSize).toHaveBeenCalledWith(12);
    expect(mockDoc.text).toHaveBeenCalledWith(
      `Name: ${bookingConfirm.customerName}`,
      20,
      45,
    );
    expect(mockDoc.text).toHaveBeenCalledWith(
      `Payment Method: ${bookingConfirm.paymentMethod}`,
      20,
      50,
    );
    expect(mockDoc.text).toHaveBeenCalledWith(
      `Total: $${bookingConfirm.totalCost}`,
      20,
      55,
    );
  });

  it('should include booking information in the PDF', () => {
    const bookingConfirm: BookingConfirmation = {
      customerName: 'John Doe',
      paymentMethod: 'Credit Card',
      totalCost: 500,
      hotelName: 'Grand Hotel',
      roomNumber: 0,
      roomType: 'Deluxe',
      bookingDateTime: '2024-08-19 12:00',
      bookingStatus: 'Confirmed',
      confirmationNumber: 'ABC123456',
    };
    generatePDF(bookingConfirm);

    expect(mockDoc.text).toHaveBeenCalledWith(
      `Hotel Name: ${bookingConfirm.hotelName}`,
      20,
      75,
    );
    expect(mockDoc.text).toHaveBeenCalledWith(
      `Room Number: ${bookingConfirm.roomNumber}`,
      20,
      80,
    );
    expect(mockDoc.text).toHaveBeenCalledWith(
      `Room Type: ${bookingConfirm.roomType}`,
      20,
      85,
    );
    expect(mockDoc.text).toHaveBeenCalledWith(
      `Booking Date & Time: ${bookingConfirm.bookingDateTime}`,
      20,
      90,
    );
    expect(mockDoc.text).toHaveBeenCalledWith(
      `Booking Status: ${bookingConfirm.bookingStatus}`,
      20,
      95,
    );
    expect(mockDoc.text).toHaveBeenCalledWith(
      `Confirmation Number: ${bookingConfirm.confirmationNumber}`,
      20,
      100,
    );
  });

  it('should save the PDF with the correct filename', () => {
    const bookingConfirm: BookingConfirmation = {
      customerName: 'John Doe',
      paymentMethod: 'Credit Card',
      totalCost: 500,
      hotelName: 'Grand Hotel',
      roomNumber: 0,
      roomType: 'Deluxe',
      bookingDateTime: '2024-08-19 12:00',
      bookingStatus: 'Confirmed',
      confirmationNumber: 'ABC123456',
    };
    generatePDF(bookingConfirm);
    expect(mockDoc.save).toHaveBeenCalledWith('booking-confirmation.pdf');
  });
});
