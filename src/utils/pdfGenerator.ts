import { jsPDF } from "jspdf";
import { BookingConfirmation } from "../types/bookingTypes";

export const generatePDF = (bookingConfirm: BookingConfirmation) => {
  if (!bookingConfirm) return;

  const doc = new jsPDF();
  doc.setLineWidth(0.2); // line width in units

  // The title of the doc
  doc.setFontSize(18);
  doc.setTextColor("#B25E39");
  doc.setFont("bold");
  doc.text("Booking Confirmation", 10, 15);

  // Set the secondary header for the doc
  doc.setFontSize(14);
  doc.setTextColor("#473D3A");
  doc.setFont("normal");
  doc.text(
    "Thanks for your reservation, here are the details of your stay",
    10,
    25
  );

  // Set the sections titles
  doc.setFontSize(13);
  doc.setTextColor("#473D3A");
  doc.setFont("italic");
  doc.text("Payment Information", 10, 38);
  doc.text("Booking Information", 10, 68);

  // Payment Information
  doc.text(`Name: ${bookingConfirm.customerName}`, 20, 45);
  doc.text(`Payment Method: ${bookingConfirm.paymentMethod}`, 20, 50);
  doc.text(`Total: $${bookingConfirm.totalCost}`, 20, 55);

  // Booking Information
  doc.setFontSize(12);
  doc.text(`Hotel Name: ${bookingConfirm.hotelName}`, 20, 75);
  doc.text(`Room Number: ${bookingConfirm.roomNumber}`, 20, 80);
  doc.text(`Room Type: ${bookingConfirm.roomType}`, 20, 85);
  doc.text(`Booking Date & Time: ${bookingConfirm.bookingDateTime}`, 20, 90);
  doc.text(`Booking Status: ${bookingConfirm.bookingStatus}`, 20, 95);
  doc.text(
    `Confirmation Number: ${bookingConfirm.confirmationNumber}`,
    20,
    100
  );

  // Set the footer
  doc.setFontSize(10);
  doc.text(`@TravelHub`, 10, 120);

  // Save the pdf
  doc.save("booking-confirmation.pdf");
};
