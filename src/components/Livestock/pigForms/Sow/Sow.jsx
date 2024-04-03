import { useState } from 'react';
import "./Sow.css"
import axios from 'axios'; // Import Axios for making HTTP requests

const Sow = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Make an HTTP POST request to your backend endpoint
      const response = await axios.post('http://localhost:3000/submit-form-sow', formData);
      
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
    <div className="sow-entry-form">
      <div className="sow-entry-form-2nd">

     <h4 style={{textAlign: "center", color: "rgb(115, 115, 243)"}}>Enter new sow</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 content-div">
          <label className="form-label">Sow Id</label>
          <input
          required
            type="text"
            className="form-control"
            id="id"
            placeholder="Enter sow id"
            value={formData.id}
            onChange={handleChange}
          />

          <label className="form-label">Room number</label>
          <input
            type="text"
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
          <label className="form-label">Select the date of Deworm</label>
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

          <input  type="submit" className="btn btn-primary submit-btn" value="Submit" />
        </div>
      </form>
      </div>
      </div>
    </>
  );
};

export default Sow;
