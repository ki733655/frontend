import { useState } from "react";
import "./OrdersEditForm.css";
import { MdCancel } from "react-icons/md";
import axios from "axios"; // Import Axios for making HTTP requests

const OrdersEditForm = ({ editItem, setEditItem }) => {
  // if (!editItem) return null;

  // const initialFormData = {
  //   id: editItem.id || "",
  //   roomNumber: editItem.roomNumber || "",
  //   CSF: editItem.CSF || "",
  //   FMD: editItem.FMD || "",
  //   Deworm: editItem.Deworm || "",
  //   Weight: editItem.Weight || "",
  // };

  // const [formData, setFormData] = useState(initialFormData);

  // const handleChange = (e) => {
  //   const { id, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [id]: value,
  //   }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // Assuming your server endpoint is expecting the edited data as JSON in the request body
  //     await axios.put("http://localhost:3000/boar-edit", formData);
  //     alert("Data updated successfully");
  //     // Clear the form data after successful submission
  //     setFormData({
  //       id: "",
  //       roomNumber: "",
  //       CSF: "",
  //       FMD: "",
  //       Deworm: "",
  //       Weight: "",
  //     });
  //     // Reset editItem to null to exit edit mode
  //     setEditItem(null);
  //     // Fetching the updated data after deletion
  //   } catch (error) {
  //     // Handle error if the request fails
  //     console.error("Error occurred:", error);
  //   }
  // };

  return (
    <>
      <div className="orders-form">
        <div className="orders-form-container">
          <div className="pig-header">
            <h4 style={{ textAlign: "center" }}>Edit order details</h4>
            <MdCancel
              style={{ fontSize: "4vh" }}
              onClick={() => setEditItem(null)}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Order Id</label>
              <input
                type="text"
                className="form-control"
                id="id"
                placeholder="Enter boar id"
                value={formData.id}
                onChange={handleChange}
              />

              <label className="form-label">Customer name</label>
              <input
                type="number"
                className="form-control"
                id="customerName"
                placeholder="Enter customer name"
                value={formData.customerName}
                onChange={handleChange}
              />

              <label className="form-label">Boar</label>
              <input
                type="number"
                className="form-control"
                id="boar"
                value={formData.boar}
                onChange={handleChange}
              />
              <label className="form-label">Sow</label>
              <input
                type="number"
                className="form-control"
                id="sow"
                value={formData.sow}
                onChange={handleChange}
              />
              <label className="form-label">Khassi</label>
              <input
                type="number"
                className="form-control"
                id="khassi"
                value={formData.khassi}
                onChange={handleChange}
              />
              <label className="form-label">Piglet</label>
              <input
                type="number"
                className="form-control"
                id="piglet"
                value={formData.piglet}
                onChange={handleChange}
              />
              <label className="form-label">Address</label>
              <input
                type="number"
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
                value={formData.advance}
                onChange={handleChange}
              />
              <label className="form-label">Final payment</label>
              <input
                type="number"
                className="form-control"
                id="finalPayment"
                value={formData.finalPayment}
                onChange={handleChange}
              />
              <label className="form-label">Phone Number</label>
              <input
                type="number"
                className="form-control"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <label className="form-label">Comment</label>
              <input
                type="number"
                className="form-control"
                id="comment"
                value={formData.comment}
                onChange={handleChange}
              />
              <label className="form-label">Delivery Date</label>
              <input
                type="date"
                className="form-control"
                id="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleChange}
              />
              <label className="form-label">Delivery Status</label>
              <select id="deliveryStatus" name="options">
                <option value="option1">Pending</option>
                <option value="option2">Delivered</option>
              </select>
              <input
                type="submit"
                className="btn btn-primary"
                id="boar-edit-submit"
                value="Save"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default OrdersEditForm;
