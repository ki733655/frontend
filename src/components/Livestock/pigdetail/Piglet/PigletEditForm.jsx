import { useState } from "react";
import "./PigletEditForm.css";
import { MdCancel } from "react-icons/md";
import axios from "axios"; // Import Axios for making HTTP requests

const PigletEditForm = ({ editItem, setEditItem }) => {
    if (!editItem) return null;
  
    const initialFormData = {
      id: editItem.id || "",
      motherId: editItem.motherId || "",
      fatherId: editItem.fatherId || "",
      dob: editItem.dob || "",
      gender: editItem.gender || "",
      roomNumber: editItem.roomNumber || "",
      swineFever: editItem.swineFever || "",
      deworming: editItem.deworming || "",
      weight: editItem.weight || "",
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
      await axios.put("http://localhost:3000/piglet-edit", formData);
      alert("Data updated successfully");
      // Clear the form data after successful submission
      setFormData({
        id: "",
      motherId: "",
      fatherId:  "",
      dob: "",
      gender:  "",
      roomNumber:  "",
      swineFever:  "",
      deworming:  "",
      weight: "",
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
      <div className="piglet-form">
        <div className="piglet-form-container">
          <div className="pig-header">
            <h4 style={{ textAlign: "center" }}>Edit pig details</h4>
            <MdCancel style={{fontSize: "4vh"}} onClick={() => setEditItem(null)} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Piglet Id</label>
              <input
                type="text"
                className="form-control"
                id="id"
                placeholder="Enter piglet id"
                value={formData.id}
                onChange={handleChange}
              />
              <label className="form-label">Mother Id</label>
              <input
                type="text"
                className="form-control"
                id="motherId"
                placeholder="Enter mother id"
                value={formData.motherId}
                onChange={handleChange}
              />
              <label className="form-label">Father Id</label>
              <input
                type="text"
                className="form-control"
                id="fatherId"
                placeholder="Enter father id"
                value={formData.fatherId}
                onChange={handleChange}
              />
              <label className="form-label">Date of birth</label>
              <input
                type="date"
                className="form-control"
                id="dob"
                placeholder="Enter date of birth"
                value={formData.dob}
                onChange={handleChange}
              />
              <label className="form-label">Gender</label>
              <input
                type="text"
                className="form-control"
                id="gender"
                value={formData.gender}
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

              <label className="form-label">Select the date of Swine fever</label>
              <input
                type="date"
                className="form-control"
                id="swineFever"
                value={formData.swineFever}
                onChange={handleChange}
              />
              <label className="form-label">Select the date of deworming</label>
              <input
                type="date"
                className="form-control"
                id="deworming"
                value={formData.deworming}
                onChange={handleChange}
              />
              <label className="form-label">Weight</label>
              <input
                type="number"
                className="form-control"
                id="weight"
                placeholder="in kgs"
                value={formData.weight}
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

              <input type="submit" className="btn btn-primary" id="piglet-edit-submit" value="Save" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PigletEditForm;
