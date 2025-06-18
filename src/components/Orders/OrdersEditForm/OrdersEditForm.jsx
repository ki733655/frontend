import { useEffect, useState } from "react";
import "./OrdersEditForm.css";
import { MdCancel } from "react-icons/md";
import axios from "axios"; // Import Axios for making HTTP requests
import { Typeahead } from "react-bootstrap-typeahead";

const OrdersEditForm = ({ editItem, setEditItem }) => {
    if (!editItem) return null;

    const initialFormData = {
        orderId: editItem.orderId || "",
        customerName: editItem.customerName || "",
        pigIds: editItem.pigIds || [],
        remarks : editItem.remarks || "",
        totalWeight: editItem.totalWeight || "",
        address: editItem.address || "",
        advance: editItem.advance || "",
        finalPayment: editItem.finalPayment || "",
        phoneNumber: editItem.phoneNumber || "",
        comment: editItem.comment || "",
        deliveryDate: editItem.deliveryDate || "",
        deliveryStatus: editItem.deliveryStatus || "pending",
      }
  
    const [formData, setFormData] = useState(initialFormData);
  
    const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    };

    const [pigOptions, setPigOptions] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Assuming your server endpoint is expecting the edited data as JSON in the request body
      await axios.put("https://farmbackend-wsn6.onrender.com/order-edit", formData);
      alert("Data updated successfully");
      // Clear the form data after successful submission
      setFormData({
            orderId: "",
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
      });
      // Reset editItem to null to exit edit mode
      setEditItem(null);
      // Fetching the updated data after deletion
      
      
    } catch (error) {
      // Handle error if the request fails
      console.error("Error occurred:", error);
    }
  };

  

  return (
    <>
      <div className="boar-form">
        <div className="boar-form-container">
          <div className="pig-header">
            <h4 style={{ textAlign: "center" }}>Edit order details</h4>
            <MdCancel style={{fontSize: "4vh"}} onClick={() => setEditItem(null)} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Order Id</label>
              <input
                type="text number"
                className="form-control"
                id="orderId"
                placeholder="Enter order id"
                value={formData.orderId}
                onChange={handleChange}
                readOnly
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

              <label className="form-label">Enter pig IDs</label>
              <Typeahead
              id="pigIds"
              labelKey="label"
              multiple
            //   selected={formData.pigIds}
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
              <label className="form-label">Enter the total weight</label>
              <input
                type="number"
                className="form-control"
                placeholder="in kgs"
                id="totalWeight"
                value={formData.totalWeight}
                onChange={handleChange}
              />
              <label className="form-label">Enter the address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter customer address"
                id="address"
                value={formData.address}
                onChange={handleChange}
              />
              <label className="form-label">Enter the advance</label>
              <input
                type="number"
                className="form-control"
                id="advance"
                placeholder="in rupees"
                value={formData.advance}
                onChange={handleChange}
              />
              <label className="form-label">Enter the Final payment</label>
              <input
                type="number"
                className="form-control"
                id="finalPayment"
                placeholder="in rupees"
                value={formData.finalPayment}
                onChange={handleChange}
              /><label className="form-label">Enter the Phone Numebr</label>
              <input
                type="number"
                className="form-control"
                id="phoneNumber"
                placeholder="Enter mobile number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <label className="form-label">Enter comment</label>
              <input
                type="text"
                className="form-control"
                id="comment"
                placeholder="Enter comment"
                value={formData.comment}
                onChange={handleChange}
              />
              <label className="form-label">Enter the delivery date</label>
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

              <input type="submit" className="btn btn-primary" id="boar-edit-submit" value="Save" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default OrdersEditForm;
