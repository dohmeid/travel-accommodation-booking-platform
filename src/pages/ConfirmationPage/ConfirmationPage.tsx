import React, { useState, FC } from "react";
import classes from "./ConfirmationPage.module.css";
import { useCartContext } from "../../context/cartProvider";
import { Booking, BookingConfirmation } from "../../interfaces/booking";
import { jsPDF } from "jspdf";

const ConfirmationPage: FC = () => {
  const { bookingConfirm } = useCartContext();
  console.log("bookingConfirm", bookingConfirm);

  const saveAsPdf = () => {
    if (!bookingConfirm) return;

    const doc = new jsPDF();
    doc.setLineWidth(0.2); //line width in units

    //the title of the doc
    doc.setFontSize(18);
    doc.setTextColor("#B25E39");
    doc.setFont("bold");
    doc.text("Booking Confirmation", 10, 15);

    //set the secondary header for the doc
    doc.setFontSize(14);
    doc.setTextColor("#473D3A");
    doc.setFont("normal");
    doc.text(
      "Thanks for your reservation, here are the details of your stay",
      10,
      25
    );

    //set the sections titles
    doc.setFontSize(13);
    doc.setTextColor("#473D3A");
    doc.setFont("italic");
    doc.text("Payment Information", 10, 38);
    doc.text("Booking Information", 10, 68);

    //Payment Information
    doc.text(`Name: ${bookingConfirm.customerName}`, 20, 45);
    doc.text(`Payment Method: ${bookingConfirm.paymentMethod}`, 20, 50);
    doc.text(`Total: $${bookingConfirm.totalCost}`, 20, 55);

    //Booking Information
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

    //set the footer
    doc.setFontSize(10);
    doc.text(`@TravelHub`, 10, 120);

    //save the pdf
    doc.save("booking-confirmation.pdf");
  };

  return (
    <div className={classes.confirmationContainer}>
      <h2>Thanks for your reservation, here are the details of your stay</h2>

      {bookingConfirm && (
        <>
          <ul>
            <h3>Payment Information</h3>
            <li>
              <p>Name:</p>
              <p>{bookingConfirm.customerName}jj</p>
            </li>
            <li>
              <p>Payment Method:</p>
              <p>{bookingConfirm.paymentMethod}</p>
            </li>
            <li>
              <p>Total:</p>
              <p>${bookingConfirm.totalCost}</p>
            </li>
          </ul>

          <ul>
            <h3>Booking Information</h3>
            <li>
              <p>Hotel Name:</p>
              <p>{bookingConfirm.hotelName}</p>
            </li>
            <li>
              <p>Room Number:</p>
              <p>{bookingConfirm.roomNumber}</p>
            </li>
            <li>
              <p>Room Type:</p>
              <p>{bookingConfirm.roomType}</p>
            </li>
            <li>
              <p>Booking Date & Time:</p>
              <p>{bookingConfirm.bookingDateTime}</p>
            </li>
            <li>
              <p>Booking Status:</p>
              <p>{bookingConfirm?.bookingStatus}</p>
            </li>
            <li>
              <p>Confirmation Number:</p>
              <p>{bookingConfirm?.confirmationNumber}</p>
            </li>
          </ul>
        </>
      )}
      <button type="button" className={classes.saveButton} onClick={saveAsPdf}>
        Save Confirmation as PDF
        <i className="bi bi-download"></i>
      </button>
    </div>
  );
};

export default ConfirmationPage;
