import { useEffect, useState } from "react";
import "./EmployeeEditForm.css";
import { MdCancel } from "react-icons/md";
import axios from "axios"; // Import Axios for making HTTP requests
import { Typeahead } from "react-bootstrap-typeahead";

const EmployeeEditForm = ({ editItem, setEditItem }) => {
    if (!editItem) return null;

    const initialFormData = {
        employeeId: editItem.employeeId || "",
        employeeName: editItem.employeeName || "",
        address: editItem.address || "",
        phoneNumber: editItem.phoneNumber || "",
        joiningDate: editItem.joiningDate || "",
        dutyShift: editItem.dutyShift || "",
        salary: editItem.salary || "",
        jobRole: editItem.jobRole || "",
      }
  
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
        await axios.put("https://farmbackend-wsn6.onrender.com/employee-edit", formData);
        alert("Data updated successfully");
        // Clear the form data after successful submission
        setFormData(initialFormData);
        // Reset editItem to null to exit edit mode
        setEditItem(null);
      } catch (error) {
        // Handle error if the request fails
        console.error("Error occurred:", error);
      }
    };

    return (
        <>
            <div className="employee-edit-form">
                <div className="employee-edit-form-container">
                    <div className="employee-edit-header">
                        <h4>Edit Employee Details</h4>
                        <MdCancel className="cancel-icon" onClick={() => setEditItem(null)} />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="employeeId">Employee ID</label>
                            <input
                                type="text"
                                className="form-control"
                                id="employeeId"
                                value={formData.employeeId}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="employeeName">Employee Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="employeeName"
                                value={formData.employeeName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="joiningDate">Joining Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="joiningDate"
                                value={formData.joiningDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dutyShift">Duty Shift</label>
                            <select
                                className="form-control"
                                id="dutyShift"
                                value={formData.dutyShift}
                                onChange={handleChange}
                            >
                                <option value="">Select duty shift</option>
                                <option value="Morning">Morning</option>
                                <option value="Afternoon">Afternoon</option>
                                <option value="Evening">Evening</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="salary">Salary</label>
                            <input
                                type="text"
                                className="form-control"
                                id="salary"
                                value={formData.salary}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="jobRole">Job Role</label>
                            <input
                                type="text"
                                className="form-control"
                                id="jobRole"
                                value={formData.jobRole}
                                onChange={handleChange}
                            />
                        </div>
                        <input type="submit" className="btn btn-primary" id="employee-edit-submit" value="Save" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default EmployeeEditForm;
