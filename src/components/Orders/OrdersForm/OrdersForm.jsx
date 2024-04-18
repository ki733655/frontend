import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./OrdersForm.css";

const OrdersForm = () => {
  const initialForm = {
    orderId: "",
    customerName: "",
    pigIds: [],
    totalWeight: "",
    address: "",
    advance: "",
    finalPayment: "",
    phoneNumber: "",
    comment: "",
    deliveryDate: "",
    deliveryStatus: "pending",
  }
  const [formData, setFormData] = useState(initialForm);

  const [pigOptions, setPigOptions] = useState([]);

  useEffect(() => {
    const fetchPigOptions = async () => {
      try {
        const responseBoar = await axios.get(
          "http://localhost:3000/boar-details"
        );
        const responseSow = await axios.get(
          "http://localhost:3000/sow-details"
        );
        const responseKhassi = await axios.get(
          "http://localhost:3000/khassi-details"
        );
        const responsePiglet = await axios.get(
          "http://localhost:3000/piglet-details"
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
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        "http://localhost:3000/submit-form-order",
        formData
      );
  
      console.log("Form submitted successfully:", response.data);
  
      // Reset form data after successful submission
      setFormData({
        ...initialForm, // Reset all form fields
        pigIds: [], // Reset pigIds array specifically
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

            <label className="form-label">Total weight</label>
            <input
              type="number"
              className="form-control"
              id="totalWeight"
              placeholder="Total weight"
              value={formData.totalWeight}
              onChange={handleChange}
            />

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
              type="number"
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
// orders form
export default OrdersForm;
