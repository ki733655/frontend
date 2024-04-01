import { useState } from "react";
import "./Piglets.css";
import axios from "axios";

const Piglet = () => {
  const [formData, setFormData] = useState({
    id: "",
    motherId: "",
    fatherId: "",
    dob: "",
    gender: "",
    roomNumber: "",
    swineFever: "",
    deworming: "",
    weight: "",
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
  const handleGenderChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: e.target.value, // Update gender state when selection changes
    }));
  };
  // submission form logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an HTTP POST request to your backend endpoint
      const response = await axios.post(
        "http://localhost:3000/submit-form-piglet",
        formData
      );

      // Handle the response if needed
      console.log(response.data);

      // Reset the form data after successful submission
      setFormData({
        id: "",
        motherId: "",
        fatherId: "",
        dob: "",
        gender: "",
        roomNumber: "",
        swineFever: "",
        deworming: "",
        weight: "",
      });

      alert("Data added successfully");
    } catch (error) {
      // Handle error if the request fails
      console.error("Error occurred:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="piglet-form">
        <div className="mb-3">
          <label className="form-label">Piglets Id</label>
          <input
            type="text"
            className="form-control"
            id="id"
            placeholder="Enter piglet id"
            value={formData.id}
            onChange={handleChange}
          ></input>
          <label className="form-label">Mother Id</label>
          <input
            type="text"
            className="form-control"
            id="motherId"
            placeholder="Enter mother id"
            value={formData.motherId}
            onChange={handleChange}
          ></input>
          <label className="form-label">Father Id</label>
          <input
            type="text"
            className="form-control"
            id="fatherId"
            placeholder="Enter father id"
            value={formData.fatherId}
            onChange={handleChange}
          ></input>
          <label className="form-label">Date of birth</label>
          <input
            type="date"
            className="form-control"
            id="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          <label className="form-label">Gender</label>
          <select
            className="form-select"
            aria-label="Default select example"
            value={formData.gender}
            onChange={handleGenderChange}
          >
            <option selected>Select from the list</option>
            <option value="Sow">Sow</option>
            <option value="Boar">Boar</option>
            <option value="Khassi">Khassi</option>
          </select>

          <label className="form-label">Room number</label>
          <input
            type="number"
            className="form-control"
            id="roomNumber"
            placeholder="Enter room number"
            value={formData.roomNumber}
            onChange={handleChange}
          ></input>
          <label className="form-label">Select the date of Swine Fever</label>
          <input
            type="date"
            className="form-control"
            id="swineFever"
            value={formData.swineFever}
            onChange={handleChange}
          />
          <label className="form-label">Select the date of Deworming</label>
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
          <input type="submit" className="btn btn-primary" value="Submit" />
        </div>
      </form>
    </>
  );
};

export default Piglet;
