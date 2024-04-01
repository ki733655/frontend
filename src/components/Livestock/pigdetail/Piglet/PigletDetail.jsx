import axios from "axios";
import "./PigletDetail.css";
import  { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { MdDelete, } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import PigletEditForm from "./PigletEditForm";
// search field imports
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PigletDetail = () => {
  const [pigletData, setPigletData] = useState([]);
  const [editItem, setEditItem] = useState(null); // State to hold the item being edited
  // const [editConfirm, setEditConfirm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");

  // Fetching the data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/piglet-details");
        setPigletData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [editItem]);

  // Logic for the delete button
  const handleDelete = async (id) => {
    console.log("Deleting document with ID:", id);
    try {
      // Sending the deletion request
      const response = await axios.delete(
        `http://localhost:3000/piglet-delete/${id}`
      );
      console.log("Deletion response:", response.data);

      // Fetching the updated data after deletion
      const responseAfterDelete = await axios.get(
        "http://localhost:3000/piglet-details"
      );
      console.log("Updated data after deletion:", responseAfterDelete.data);

      // Extracting the data from the response and setting it to the boarData state
      setPigletData(
        Array.isArray(responseAfterDelete.data) ? responseAfterDelete.data : []
      );
    } catch (error) {
      console.log("Error deleting data:", error);
    }
  };

  // Logic for handleEdit
  const handleEdit = (item) => {
    try {
      setEditItem(item);
    } catch (error) {
      console.log(error);
    }
  };
  //logic for handling the search field
  // Logic for handling the search field
const handleSearch = async (e) => {
  e.preventDefault();
  try {
    if (searchQuery.trim() === "") {
      // If search query is empty, fetch all details
      const response = await axios.get("http://localhost:3000/piglet-details");
      setPigletData(response.data);
    } else {
      // If search query is not empty, perform search
      const response = await axios.get(
        `http://localhost:3000/piglet-search?search=${searchQuery}`
      );
      setPigletData(response.data);
    }
  } catch (error) {
    console.log("Error searching data", error);
  }
};


const handleChange = async (e) => {
  const data = e.target.value;
  setSearchQuery(data);
  try {
    if (data.trim() === "") {
      // If search query is empty, fetch all details
      const response = await axios.get("http://localhost:3000/piglet-details");
      setPigletData(response.data);
    } else {
      // If search query is not empty, perform search
      const response = await axios.get(
        `http://localhost:3000/piglet-search?search=${data}`
      );
      setPigletData(response.data);
    }
  } catch (error) {
    console.log("Error searching data", error);
  }
};


   

  // }
  return (
    <div className="piglet-detail-main">
      <div className="piglet-detail-2nd">
        <Form inline className="piglet-detail-search">
          <h4 style={{ fontWeight: "600" }}>All piglet details</h4>
          <Row>
            <Col xs="auto" className="piglet-detail-column">
              <Form.Control
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
                value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                onChange={handleChange }
              />
            </Col>
            <Col xs="auto">
              <Button onClick={handleSearch} type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
        <Table className="piglet-detail-table" responsive bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Mother Id</th>
              <th>Father Id</th>
              <th>Date of birth</th>
              <th>Gender</th>
              <th>Room Number</th>
              <th>Swine Fever</th>
              <th>Deworming</th>
              <th>Weight</th>
              <th>Actions</th>
            </tr>
          </thead>

          {pigletData.map((value, index) => {
            const dob = value.dob
              ? new Date(value.dob).toLocaleDateString("en-GB")
              : "Null";
            const swineFever = value.swineFever
              ? new Date(value.swineFever).toLocaleDateString("en-GB")
              : "Null";
            const deworming = value.deworming
              ? new Date(value.deworming).toLocaleDateString("en-GB")
              : "Null";

            return (
              <tbody key={index}>
                <tr>
                  <td>{value.id ? value.id : "Null"}</td>
                  <td>{value.motherId ? value.motherId : "Null"}</td>
                  <td>{value.fatherId ? value.fatherId : "Null"}</td>
                  <td>{dob}</td>
                  <td>{value.gender ? value.gender : "Null"}</td>
                  <td>{value.roomNumber ? value.roomNumber : "Null"}</td>
                  <td>{swineFever}</td>
                  <td>{deworming}</td>
                  <td>{value.weight ? value.weight : "Null"}</td>
                  <td className="boar-detail-logo">
                    <div className="delete-logo">
                      <MdDelete
                        id="delete"
                        onClick={() => handleDelete(value.id)}
                      />
                    </div>
                    <div className="edit logo">
                      <FaEdit
                        id="edit"
                        style={{ marginLeft: "1.5vw" }}
                        onClick={() => handleEdit(value)}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
        {/* Render the edit form if editItem is not null */}
        {editItem && (
          <PigletEditForm editItem={editItem} setEditItem={setEditItem} />
        )}
      </div>
    </div>
  );
};

export default PigletDetail;
