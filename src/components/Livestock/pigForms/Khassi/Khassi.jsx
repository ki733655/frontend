import axios from "axios";
import "./Khassi.css";
import { useState } from "react";
const Khassi = () => {
  const [formData, setFormData] = useState({
    id: '',
    roomNumber: '',
    csfDate: '',
    fmdDate: '',
    dewormDate: '',
    weight: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };
 
  // form submission logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Make an HTTP POST request to your backend endpoint
      const response = await axios.post('http://localhost:3000/submit-form-khassi', formData);
      
      // Handle the response if needed
      console.log(response.data);
      
      // Reset the form data after successful submission
      setFormData({
        id: '',
        roomNumber: '',
        csfDate: '',
        fmdDate: '',
        dewormDate: '',
        weight: ''
      });
      
      alert("Data added successfully");
    } catch (error) {
      // Handle error if the request fails
      console.error('Error occurred:', error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="khassi-form">
        <div className="mb-3">
          <label className="form-label">Khassi Id</label>
          <input
            type="text"
            className="form-control"
            id="id"
            placeholder="Enter Khassi id"
            value={formData.id}
            onChange={handleChange}
          ></input>

          <label className="form-label">Room number</label>
          <input
            type="number"
            className="form-control"
            id="roomNumber"
            placeholder="Enter room number"
            value={formData.roomNumber}
            onChange={handleChange}
          ></input>
          <label className="form-label">Select the date of CSF</label>
          <input
            type="date"
            className="form-control"
            id="csfDate"
            value={formData.csfDate}
            onChange={handleChange}
          />
          <label className="form-label">Select the date of FMD</label>
          <input
            type="date"
            className="form-control"
            id="fmdDate"
            value={formData.fmdDate}
            onChange={handleChange}
          />
          <label className="form-label">Select the date of Deworn</label>
          <input
            type="date"
            className="form-control"
            id="dewormDate"
            value={formData.dewormDate}
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
          <input type="submit" className="btn btn-primary" value="Submit" />
        </div>
      </form>
    </>
  );
};

export default Khassi;
