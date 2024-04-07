import { useState } from "react";
import "./OrdersForm.css";
import axios from "axios"; // Import Axios for making HTTP requests

const OrdersForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    customerName: "",
    boar: "",
    sow: "",
    piglet: "",
    khassi: "",
    totalWeight: "",
    address: "",
    advance: "",
    finalPayment: "",
    phoneNumber: "",
    comment: "",
    deliveryDate: "",
    deliveryStatus: "",
  });
  //handleChange logic
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  //handle the option data value separately
  //   const handleGenderChange = (e) => {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       gender: e.target.value, // Update gender state when selection changes
  //     }));
  //   };
  // submission form logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an HTTP POST request to your backend endpoint
      const response = await axios.post(
        "http://localhost:3000/submit-form-order",
        formData
      );

      // Handle the response if needed
      console.log(response.data);

      // Reset the form data after successful submission
      setFormData({
        id: "",
        customerName: "",
        boar: "",
        sow: "",
        piglet: "",
        khassi: "",
        address: "",
        advance: "",
        finalPayment: "",
        phoneNumber: "",
        comment: "",
        deliveryDate: "",
        deliveryStatus: "",
      });

      alert("Data added successfully");
    } catch (error) {
      // Handle error if the request fails
      console.error("Error occurred:", error);
    }
  };
  return (
    <>
      <div className="orders-entry-form">
        <div className="orders-entry-form-2nd">
          <h4 style={{ textAlign: "center", color: "rgb(115, 115, 243)" }}>
            Enter new Order
          </h4>
          {/* <form onSubmit={handleSubmit}> */}
          <form>

            <div className="mb-3 content-div">
              <label className="form-label">Order Id</label>
              <input
                required
                type="text"
                className="form-control"
                id="id"
                placeholder="Enter order id"
                value={formData.id}
                onChange={handleChange}
              ></input>
              <label className="form-label">Customer Name</label>
              <input
                type="text"
                className="form-control"
                id="customerName"
                placeholder="Enter customer name"
                value={formData.customerName}
                onChange={handleChange}
              ></input>
              <label className="form-label">Boar</label>
              <input
                type="number"
                className="form-control"
                placeholder="Number of boar"
                id="boar"
                value={formData.boar}
                onChange={handleChange}
              ></input>
              <label className="form-label">Sow</label>
              <input
                type="number"
                className="form-control"
                placeholder="Number of sow"
                id="sow"
                value={formData.sow}
                onChange={handleChange}
              />

              <label className="form-label">Piglet</label>
              <input
                type="number"
                className="form-control"
                id="piglet"
                placeholder="Number of piglet"
                value={formData.piglet}
                onChange={handleChange}
              ></input>
              <label className="form-label">Khassi</label>
              <input
                type="number"
                className="form-control"
                placeholder="Number of khassi"
                id="khassi"
                value={formData.khassi}
                onChange={handleChange}
              />
              <label className="form-label">Total weight</label>
              <input
                type="number"
                className="form-control"
                placeholder="Total weight"
                id="totalWeight"
                value={formData.totalWeight}
                onChange={handleChange}
              />
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the address"
                id="address"
                value={formData.address}
                onChange={handleChange}
              />
              <label className="form-label">Advance</label>
              <input
                type="number"
                className="form-control"
                placeholder="in rupees"
                id="advance"
                value={formData.advance}
                onChange={handleChange}
              />
              <label className="form-label">Final payment</label>
              <input
                type="number"
                className="form-control"
                placeholder="in rupees"
                id="finalPayment"
                value={formData.finalPayment}
                onChange={handleChange}
              />
              <label className="form-label">Phone Number</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter the phone number"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <label className="form-label">Comment</label>
              <input
                type="text"
                className="form-control"
                placeholder="Type comment"
                id="comment"
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
              <select name="" id="deliveryStatus">
                <option selected>Select from the list</option>
                <option value="pending">pending</option>
                <option value="delivered">delivered</option>
              </select>

              <input
                onClick={handleSubmit}
                type="submit"
                className="btn btn-primary submit-btn"
                value="Submit"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default OrdersForm;
