import { useState } from "react";
import "./Piglet.css";
import axios from "axios"; // Import Axios for making HTTP requests

const Piglet = () => {
  const [formData, setFormData] = useState({
    id: "p-",
    motherId: "s-",
    fatherId: "b-",
    dob: "",
    gender: "",
    roomNumber: "",
    swineFever: "",
    deworming: "",
    weight: "",
    note: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    sale: "",
    piglet: "",
  });

  //handleChange logic
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setErrorMessage({
      sale: "",
      piglet: "",
    });
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
        id: "p-",
        motherId: "s-",
        fatherId: "b-",
        dob: "",
        gender: "",
        roomNumber: "",
        swineFever: "",
        deworming: "",
        weight: "",
        note: "",
      });

      alert(" 😄 Data added successfully");
    } catch (error) {
      // Handle error if the request fails
      console.error("Error occurred:", error);
      if (error.response && error.response.status === 400) {
        setErrorMessage({
          sale: "This Piglet's ID is already in a sale",
        });
      } else if (error.response && error.response.status === 401) {
        setErrorMessage({
          piglet: "This Piglet's ID is already being entered",
        });
      }
      else{
        alert("Something went wrong")
      }
    }
  };
  return (
    <>
      <div className="piglet-entry-form">
        <div className="piglet-entry-form-2nd">
          <h4 style={{ textAlign: "center", color: "rgb(115, 115, 243)" }}>
            Enter new piglet
          </h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 content-div">
              <label className="form-label">Piglets Id</label>
              <input
                required
                type="text"
                className="form-control"
                id="id"
                placeholder="Enter piglet id"
                value={formData.id}
                onChange={handleChange}
              ></input>
              {errorMessage.sale && (
                <p className="error-message">{errorMessage.sale}</p>
              )}
              {errorMessage.piglet && (
                <p className="error-message">{errorMessage.piglet}</p>
              )}
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
                <option value="Boar">Male</option>
                {/* <option value="Khassi">Khassi</option> */}
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
              <label className="form-label">
                Select the date of Swine Fever
              </label>
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
              <label className="form-label">Note</label>
              <input
                type="text"
                className="form-control"
                id="note"
                placeholder="Enter notes if any"
                value={formData.note}
                onChange={handleChange}
              />
              <input
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

export default Piglet;
