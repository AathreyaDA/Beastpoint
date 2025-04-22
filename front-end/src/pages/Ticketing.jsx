import React, { useState, useEffect } from "react";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PageWrapper from "../components/PageWrapper";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import { FaFileDownload } from "react-icons/fa";

const ticketTypes = [
  { name: "Single", price: 100, includes: 1 },
  { name: "Two", price: 180, includes: 2 }, // 10% discount
  { name: "Family", price: 320, includes: 4 }, // 20% discount
];

const paymentMethods = ["Cash", "UPI", "Debit/Credit Card"];

const Ticketing = () => {
  const [form, setForm] = useState({
    name: "",
    visitorCount: 1,
    phone: "",
    type: "",
    paymentMethod: "",
    termsAccepted: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [paid, setPaid] = useState(false);
  const [amount, setAmount] = useState(0);
  const [qrCodeData, setQrCodeData] = useState("");
  const [priceBreakdown, setPriceBreakdown] = useState([]);
  const [ticketId, setTicketId] = useState("");

  useEffect(() => {
    if (form.type && form.visitorCount) {
      calculateAmount();
    }
  }, [form.type, form.visitorCount]);

  const calculateAmount = () => {
    const selectedType = ticketTypes.find((t) => t.name === form.type);
    if (!selectedType) return;

    const visitorCount = parseInt(form.visitorCount) || 0;
    let breakdown = [];
    let total = 0;

    if (selectedType.includes > 1) {
      // Package tickets (Family or Two)
      const packages = Math.floor(visitorCount / selectedType.includes);
      const remaining = visitorCount % selectedType.includes;

      if (packages > 0) {
        breakdown.push({
          description: `${packages} × ${selectedType.name} ticket (${selectedType.includes} people)`,
          amount: packages * selectedType.price,
        });
        total += packages * selectedType.price;
      }

      if (remaining > 0) {
        const singlePrice = ticketTypes.find((t) => t.name === "Single").price;
        breakdown.push({
          description: `${remaining} × Single ticket`,
          amount: remaining * singlePrice,
        });
        total += remaining * singlePrice;
      }
    } else {
      // Single tickets
      breakdown.push({
        description: `${visitorCount} × Single ticket`,
        amount: visitorCount * selectedType.price,
      });
      total = visitorCount * selectedType.price;
    }

    setPriceBreakdown(breakdown);
    setAmount(total);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Reset visitor count to max 4 if Family ticket is selected
    if (name === "type" && value === "Family") {
      setForm((prev) => ({
        ...prev,
        visitorCount: Math.min(prev.visitorCount, 10),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.termsAccepted) {
      alert("Please accept the terms and conditions");
      return;
    }
    setSubmitted(true);
    setTicketId(`PESZ-${Date.now().toString().slice(-4)}`);
  };

  const handlePayment = async () => {
    const ticketData = {
      ticketId: ticketId,
      name: form.name,
      type: form.type,
      phone: form.phone,
      visitors: form.visitorCount,
      amount: amount,
      paymentMethod: form.paymentMethod,
    };

    console.log(ticketData.name.split(" ")[0]);
    const firstName = ticketData.name.split(" ")[0];
    const secondName = ticketData.name.split(" ")[1];
    const sendingData = {
      id: ticketData.ticketId,
      firstName: firstName,
      secondName: secondName,
      phone: ticketData.phone,
      visitors: ticketData.visitors,
      price: ticketData.amount,
    }

    fetch("http://localhost:8080/ticket/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendingData)
      }
    )



    try {
      const qrData = await QRCode.toDataURL(JSON.stringify(ticketData));
      setQrCodeData(qrData);
      setPaid(true);
    } catch (err) {
      console.error("QR generation failed:", err);
      alert("Error generating ticket. Please try again.");
    }
  };

  const generateTicket = () => {
    const doc = new jsPDF();

    // Add jungle theme background
    doc.setFillColor(34, 139, 34);
    doc.rect(0, 0, 210, 297, "F");

    // Add header
    doc.setFontSize(25);
    doc.setTextColor(255, 255, 0);
    doc.text("PES ZOO ENTRY TICKET", 105, 20, { align: "center" });

    // Ticket details
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text(`Ticket ID: ${ticketId}`, 15, 40);

    // Visitor details
    doc.setFontSize(14);
    doc.text("Visitor Details:", 15, 70);
    doc.text(`Name: ${form.name}`, 20, 80);
    doc.text(`Phone: ${form.phone}`, 20, 110);

    // Visit details
    doc.text("Visit Details:", 15, 130);
    doc.text(`Total Visitors: ${form.visitorCount}`, 20, 150);
    doc.text(`Ticket Type: ${form.type}`, 20, 160);

    // Price breakdown
    doc.text("Price Breakdown:", 15, 180);
    let yPos = 190;
    priceBreakdown.forEach((item) => {
      doc.text(`${item.description}: ₹${item.amount}`, 20, yPos);
      yPos += 10;
    });
    doc.text(`Total Amount: ₹${amount}`, 20, yPos);
    yPos += 10;
    doc.text(`Payment Method: ${form.paymentMethod}`, 20, yPos);

    // Add QR code
    if (qrCodeData) {
      doc.addImage(qrCodeData, "JPEG", 85, yPos + 20, 40, 40);
      doc.setTextColor(255, 255, 0);
      doc.text("Scan at entrance", 105, yPos + 65, { align: "center" });
    }

    // Terms
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text("Terms & Conditions:", 15, 280);
    doc.text("- Non-refundable and non-transferable", 20, 290);
    doc.text("- Follow all zoo rules and regulations", 20, 295);

    doc.save(`PES_Zoo_Ticket_${ticketId}.pdf`);
  };

  return (
    <PageWrapper>
      <div className="ticket-form jungle-panel">
        <h1 className="ticket-title">
          <ConfirmationNumberIcon /> Ticket Booking
        </h1>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-group">
              <label>Number of Visitors</label>
              <input
                type="number"
                name="visitorCount"
                min="1"
                max={form.type === "Family" ? "10" : "20"}
                value={form.visitorCount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                pattern="[0-9]{10}"
                required
              />
            </div>

            <div className="form-group">
              <label>Ticket Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
              >
                <option value="">Select a ticket type</option>
                {ticketTypes.map((type) => (
                  <option key={type.name} value={type.name}>
                    {type.name} - ₹{type.price} ({type.includes} people
                    {type.includes > 1
                      ? ` (₹${Math.round(
                          type.price / type.includes
                        )} per person)`
                      : ""}
                    )
                  </option>
                ))}
              </select>
            </div>

            {amount > 0 && (
              <div className="amount-preview">
                <strong>Price Breakdown:</strong>
                <ul>
                  {priceBreakdown.map((item, index) => (
                    <li key={index}>
                      {item.description}: ₹{item.amount}
                    </li>
                  ))}
                </ul>
                <p>
                  Total Amount to Pay: <strong>₹{amount}</strong>
                </p>
              </div>
            )}

            <div className="form-group checkbox">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={form.termsAccepted}
                onChange={handleChange}
                required
              />
              <label>I agree to the terms and conditions</label>
            </div>

            <button type="submit" className="jungle-button">
              Continue to Payment
            </button>
          </form>
        ) : !paid ? (
          <div className="payment-section">
            <h2>Payment Details</h2>
            <div className="amount-display">
              <strong>Ticket Summary:</strong>
              <p>
                Visitors: {form.visitorCount} ({form.type})
              </p>

              <strong>Price Breakdown:</strong>
              <ul>
                {priceBreakdown.map((item, index) => (
                  <li key={index}>
                    {item.description}: ₹{item.amount}
                  </li>
                ))}
              </ul>
              <p>
                Total Amount to Pay: <strong>₹{amount}</strong>
              </p>
            </div>

            <div className="form-group">
              <label>Payment Method</label>
              <select
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
                required
              >
                <option value="">Select payment method</option>
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>

            {form.paymentMethod && (
              <button onClick={handlePayment} className="jungle-button">
                Complete Payment
              </button>
            )}
          </div>
        ) : (
          <div className="confirmation-section">
            <h2>Payment Successful!</h2>
            <div className="ticket-summary">
              <p>
                <strong>Ticket ID:</strong> {ticketId}
              </p>
              <p>
                <strong>Visitor:</strong> {form.name}
              </p>
              <p>
                <strong>Visitors:</strong> {form.visitorCount} ({form.type})
              </p>

              <div className="price-summary">
                <strong>Payment Details:</strong>
                <ul>
                  {priceBreakdown.map((item, index) => (
                    <li key={index}>
                      {item.description}: ₹{item.amount}
                    </li>
                  ))}
                </ul>
                <p>
                  <strong>Total Paid:</strong> ₹{amount}
                </p>
                <p>
                  <strong>Payment Method:</strong> {form.paymentMethod}
                </p>
              </div>
            </div>

            <button
              onClick={generateTicket}
              className="jungle-button download-button"
            >
              <FaFileDownload /> Download Ticket
            </button>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Ticketing;
