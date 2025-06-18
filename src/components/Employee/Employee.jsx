import "./Employee.css";
import Table from "react-bootstrap/Table";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import EmployeeEditForm from "./EmployeeEditForm/EmployeeEditForm"; // Import the EmployeeEditForm component

const Employee = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [editItem, setEditItem] = useState(null); // State to hold the item being edited
  const [searchQuery, setSearchQuery] = useState({
    employeeId: "",
    employeeName: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://farmbackend-wsn6.onrender.com/employee-details");
        setEmployeeData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [editItem]); // Add editItem to the dependency array to trigger re-fetching after editing

  const handleChangeEmployeeId = async (e) => {
    const data = e.target.value;
    setSearchQuery((prevState) => ({
      ...prevState,
      employeeId: data
    }));

    try {
      if (data.trim() === "") {
        const response = await axios.get("https://farmbackend-wsn6.onrender.com/employee-details");
        setEmployeeData(response.data);
      } else {
        const response = await axios.get(
          `https://farmbackend-wsn6.onrender.com/employee-search-id?search=${data}`
        );
        setEmployeeData(response.data);
      }
    } catch (error) {
      console.log("Error searching data", error);
    }
  };

  const handleChangeEmployeeName = async (e) => {
    const data = e.target.value;
    setSearchQuery((prev) => ({
      ...prev,
      employeeName: data
    }));

    try {
      if (data.trim() === "") {
        const response = await axios.get("https://farmbackend-wsn6.onrender.com/employee-details");
        setEmployeeData(response.data);
      } else {
        const response = await axios.get(
          `https://farmbackend-wsn6.onrender.com/employee-search-name?search=${data}`
        );
        setEmployeeData(response.data);
      }
    } catch (error) {
      console.log("Error searching data", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (searchQuery.employeeId.trim() === "" && searchQuery.employeeName.trim() === "") {
        const response = await axios.get("https://farmbackend-wsn6.onrender.com/employee-details");
        setEmployeeData(response.data);
      } else {
        const response = await axios.get(
          `https://farmbackend-wsn6.onrender.com/employee-search?employeeId=${searchQuery.employeeId}&employeeName=${searchQuery.employeeName}`
        );
        setEmployeeData(response.data);
      }
    } catch (error) {
      console.log("Error searching data", error);
    }
  };

  const handleDelete = async (employeeId) => {
    try {
      const response = await axios.delete(
        `https://farmbackend-wsn6.onrender.com/employee-delete/${employeeId}`
      );
      console.log("Deletion response:", response.data);

      const responseAfterDelete = await axios.get(
        "https://farmbackend-wsn6.onrender.com/employee-details"
      );
      setEmployeeData(
        Array.isArray(responseAfterDelete.data) ? responseAfterDelete.data : []
      );
    } catch (error) {
      console.log("Error deleting data:", error);
    }
  };

  const handleEdit = (employee) => {
    try {
      setEditItem(employee);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="employee-main">
        <div className="employee-main-2nd">
          <Form inline className="employee-detail-form" onSubmit={handleSearch}>
            <h4 style={{ fontWeight: "600" }}>All Employee Details</h4>
            <Row className="employee-detail-row">
              <Col xs="auto" className="employee-detail-column">
                {/* <Form.Control
                  style={{ width: "10vw", marginLeft: "60vw", }}
                  type="text"
                  placeholder=" "
                  className=" mr-sm-2"
                  value={searchQuery.employeeId}
                  onChange={handleChangeEmployeeId}
                /> */}
                {/* <Form.Control
                  style={{ width: "10vw", marginLeft: "2vw" }}
                  type="text"
                  placeholder=" "
                  className=" mr-sm-2"
                  value={searchQuery.employeeName}
                  onChange={handleChangeEmployeeName}
                /> */}
              </Col>
              <Col xs="auto">
  <Link to="/employee/addemployee" style={{ width: "10vw", marginLeft: "64vw",}}>
    <Button className="add-employee-button">
      Add New Employee
    </Button>
  </Link>
</Col>
            </Row>
          </Form>
          <Table className="employee-detail-table" responsive bordered hover>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Joining Date</th>
                <th>Duty Shift</th>
                <th>Salary</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employeeData.map((employee, idx) => (
                <tr key={idx}>
                  <td>{employee.employeeId}</td>
                  <td>{employee.employeeName}</td>
                  <td>{employee.address}</td>
                  <td>{employee.phoneNumber}</td>
                  <td>
                    {new Date(employee.joiningDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit"
                    })}
                  </td>
                  <td>{employee.dutyShift}</td>
                  <td>{employee.salary}</td>
                  <td>{employee.jobRole}</td> {/* Assuming jobRole is the role */}
                  <td>
                    <MdDelete
                      id="delete"
                      onClick={() => handleDelete(employee.employeeId)}
                    />
                    <FaEdit
                      id="edit"
                      style={{ marginLeft: "50px", marginTop: "-16px" }}
                      onClick={() => handleEdit(employee)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      {/* Render the edit form if editItem is not null */}
      {editItem && (
        <EmployeeEditForm editItem={editItem} setEditItem={setEditItem} />
      )}
    </>
  );
};

export default Employee;
