import { useState } from "react";
import "./KhassiEditForm.css";
import { MdCancel } from "react-icons/md";
import axios from "axios"; // Import Axios for making HTTP requests

const KhassiEditForm = ({ editItem, setEditItem }) => {
    if (!editItem) return null;
  
    const initialFormData = {
      id: editItem.id || "",
      roomNumber: editItem.roomNumber || "",
      CSF: editItem.CSF || "",
      FMD: editItem.FMD || "",
      Deworm: editItem.Deworm || "",
      Weight: editItem.Weight || "",
      note: editItem.note || "",
    };
  
    const [formData, setFormData] = useState(initialFormData);
  
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
      // Assuming your server endpoint is expecting the edited data as JSON in the request body
      await axios.put("https://farmbackend-wsn6.onrender.com/khassi-edit", formData);
      alert("Data updated successfully");
      // Clear the form data after successful submission
      setFormData({
        id: "",
        roomNumber: "",
        CSF: "",
        FMD: "",
        Deworm: "",
        Weight: "",
        note: "",
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
      <div className="khassi-form">
        <div className="khassi-form-container">
          <div className="pig-header">
            <h4 style={{ textAlign: "center" }}>Edit pig details</h4>
            <MdCancel style={{fontSize: "4vh"}} onClick={() => setEditItem(null)} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Khassi Id</label>
              <input
                type="text"
                className="form-control"
                id="id"
                placeholder="Enter khassi id"
                value={formData.id}
                onChange={handleChange}
              />

              <label className="form-label">Room number</label>
              <input
                type="number"
                className="form-control"
                id="roomNumber"
                placeholder="Enter room number"
                value={formData.roomNumber}
                onChange={handleChange}
              />

              <label className="form-label">Select the date of CSF</label>
              <input
                type="date"
                className="form-control"
                id="CSF"
                value={formData.CSF}
                onChange={handleChange}
              />
              <label className="form-label">Select the date of FMD</label>
              <input
                type="date"
                className="form-control"
                id="FMD"
                value={formData.FMD}
                onChange={handleChange}
              />
              <label className="form-label">Select the date of Deworm</label>
              <input
                type="date"
                className="form-control"
                id="Deworm"
                value={formData.Deworm}
                onChange={handleChange}
              />
              <label className="form-label">Weight</label>
              <input
                type="text"
                className="form-control"
                id="Weight"
                placeholder="in kgs"
                value={formData.Weight}
                onChange={handleChange}
              />
               <label className="form-label">Note</label>
              <input
                type="text"
                className="form-control"
                id="note"
                placeholder="Enter note if any"
                value={formData.note}
                onChange={handleChange}
              />

              <input type="submit" className="btn btn-primary" id="khassi-edit-submit" value="Save" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default KhassiEditForm;
