import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./OrdersForm.css";
// import { v4 as uuidv4 } from 'uuid';
const generateOrderId = () => {
  return Math.random().toString(36).substr(2, 10);
};

const OrdersForm = () => {
  const initialForm = {
    orderId: generateOrderId(), // Automatically generate order ID
    customerName: "",
    pigIds: [],
    remarks: "",
    totalWeight: "",
    address: "",
    advance: "",
    finalPayment: "",
    phoneNumber: "",
    comment: "",
    deliveryDate: "",
    deliveryStatus: "pending",
  };

  const [formData, setFormData] = useState(initialForm);
  const [pigOptions, setPigOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState({
    totalWeight: "", // Added weight error message state
  });

  useEffect(() => {
    const fetchPigOptions = async () => {
      try {
        const responseBoar = await axios.get(
          "https://farmbackend-wsn6.onrender.com/boar-details"
        );
        const responseSow = await axios.get(
          "https://farmbackend-wsn6.onrender.com/sow-details"
        );
        const responseKhassi = await axios.get(
          "https://farmbackend-wsn6.onrender.com/khassi-details"
        );
        const responsePiglet = await axios.get(
          "https://farmbackend-wsn6.onrender.com/piglet-details"
        );

        const response = [
          ...responseBoar.data,
          ...responseSow.data,
          ...responseKhassi.data,
          ...responsePiglet.data,
        ];

        const options = response.map((pig) => ({
          id: pig.id,
          label: `${pig.id}`,
        }));
        setPigOptions(options);
      } catch (error) {
        console.error("Error fetching pig options:", error);
      }
    };

    fetchPigOptions();
  }, []);

  const handlePigIdChange = (selectedOptions) => {
    const selectedPigIds = selectedOptions.map((option) => option.id);
    setFormData((prevData) => ({
      ...prevData,
      pigIds: selectedPigIds,
    }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'totalWeight') {
      if (!/^\d*\.?\d*$/.test(value)) {
        setErrorMessage({
          ...errorMessage,
          totalWeight: "Weight must be a numeric value"
        });
        return;
      }
      if (parseFloat(value) < 0) {
        setErrorMessage({
          ...errorMessage,
          totalWeight: "Weight cannot be negative"
        });
        return;
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    
    setErrorMessage({
      totalWeight: "", // Reset weight error message
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://farmbackend-wsn6.onrender.com/submit-form-order",
        formData
      );

      console.log("Form submitted successfully:", response.data);

      // Reset form data after successful submission
      setFormData({
        ...initialForm, // Reset all form fields
        orderId: generateOrderId(), // Generate new order ID
       // Reset pigIds array specifically
      });

      alert("Order submitted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit order. Please try again.");
    }
  };

  return (
    <div className="orders-entry-form">
      <div className="orders-entry-form-2nd">
        <h4 style={{ textAlign: "center", color: "rgb(115, 115, 243)" }}>
          Enter new Order
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 content-div">
            <label className="form-label">Order Id</label>
            <input
              required
              type="text"
              className="form-control"
              id="orderId"
              placeholder="Enter order id"
              value={formData.orderId}
              onChange={handleChange}
              readOnly // Make it read-only to prevent manual editing
            />

            <label className="form-label">Customer Name</label>
            <input
              type="text"
              className="form-control"
              id="customerName"
              placeholder="Enter customer name"
              value={formData.customerName}
              onChange={handleChange}
            />

            <label className="form-label">Pig Id</label>
            <Typeahead
              id="pigIds"
              labelKey="label"
              multiple
              // selected={formData.pigIds}
              value={formData.pigIds}
              options={pigOptions}
              onChange={handlePigIdChange}
              placeholder="Search and select pig IDs"
            />
            <label className="form-label">Remarks</label>
            <input
              type="text"
              className="form-control"
              id="remarks"
              placeholder="You can write here !"
              value={formData.remarks}
              onChange={handleChange}
            />

            <label className="form-label">Total weight</label>
            <input
              type="text"
              className="form-control"
              id="totalWeight"
              placeholder="Total weight"
              value={formData.totalWeight}
              onChange={handleChange}
            />
            {errorMessage.totalWeight && <p className="error-message">{errorMessage.totalWeight}</p>}

            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Enter the address"
              value={formData.address}
              onChange={handleChange}
            />

            <label className="form-label">Advance</label>
            <input
              type="number"
              className="form-control"
              id="advance"
              placeholder="in rupees"
              value={formData.advance}
              onChange={handleChange}
            />

            <label className="form-label">Final payment</label>
            <input
              type="number"
              className="form-control"
              id="finalPayment"
              placeholder="in rupees"
              value={formData.finalPayment}
              onChange={handleChange}
            />

            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              placeholder="Enter the phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />

            <label className="form-label">Comment</label>
            <input
              type="text"
              className="form-control"
              id="comment"
              placeholder="Type comment"
              value={formData.comment}
              onChange={handleChange}
            />

            <label className="form-label">Delivery date</label>
            <input
              type="date"
              className="form-control"
              id="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
            />

            <label className="form-label">Delivery Status</label>
            <select
              name="deliveryStatus"
              id="deliveryStatus"
              value={formData.deliveryStatus}
              onChange={handleChange}
            >
              <option selected>Select from the list</option>
              <option value="pending">pending</option>
              <option value="delivered">delivered</option>
            </select>

            <input
              type="submit"
              className="btn btn-primary submit-btn"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};


export default OrdersForm;
