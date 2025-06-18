import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeeForm.css";

const EmployeeForm = () => {
  const initialForm = {
    employeeId: "",
    employeeName: "",
    address: "",
    phoneNumber: "",
    joiningDate: "",
    dutyShift: "",
    salary: "",
    jobRole: "",
  };
  const [formData, setFormData] = useState(initialForm);

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
        "https://farmbackend-wsn6.onrender.com/submit-form-employee",
        formData
      );

      console.log("Form submitted successfully:", response.data);

      // Reset form data after successful submission
      setFormData(initialForm);

      alert("Employee data submitted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit employee data. Please try again.");
    }
  };

  return (
    <div className="employee-entry-form">
      <div className="employee-entry-form-2nd">
        <h4 style={{ textAlign: "center", color: "rgb(115, 115, 243)" }}>
          Enter new Employee Details
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 content-div">
            <label className="form-label">Employee ID</label>
            <input
              required
              type="text"
              className="form-control"
              id="employeeId"
              placeholder="Enter employee ID"
              value={formData.employeeId}
              onChange={handleChange}
            />

            <label className="form-label">Employee Name</label>
            <input
              required
              type="text"
              className="form-control"
              id="employeeName"
              placeholder="Enter employee name"
              value={formData.employeeName}
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

            <label className="form-label">Phone Number</label>
            <input
              type="number"
              className="form-control"
              id="phoneNumber"
              placeholder="Enter the phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />

            <label className="form-label">Joining Date</label>
            <input
              type="date"
              className="form-control"
              id="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
            />

            <label className="form-label">Duty Shift</label>
            <select
              className="form-select"
              id="dutyShift"
              value={formData.dutyShift}
              onChange={handleChange}
            >
              <option selected>Select duty shift</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>

            <label className="form-label">Salary</label>
            <input
              type="number"
              className="form-control"
              id="salary"
              placeholder="Enter salary"
              value={formData.salary}
              onChange={handleChange}
            />
           <label className="form-label">Job Role</label>
            <input
              required
              type="text"
              className="form-control"
              id="jobRole"
              placeholder="Enter Job Role"
              value={formData.jobRole}
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
  );
};

export default EmployeeForm;
