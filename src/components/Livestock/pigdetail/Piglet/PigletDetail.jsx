import axios from "axios";
import "./PigletDetail.css";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { MdDelete } from "react-icons/md";
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
  const [searchQueryId, setSearchQueryId] = useState("p-");
  const [searchQueryRoomNumber, setSearchQueryRoomNumber] = useState("");
  const [searchQueryWeight, setSearchQueryWeight] = useState("");
  // Fetching the data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/piglet-details"
        );
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
  const handleChangeId = async (e) => {
    const data = e.target.value;
    setSearchQueryId(data);
    try {
      if (data.trim() === "p-") {
        // If search query is empty, fetch all details
        const response = await axios.get(
          "http://localhost:3000/piglet-details"
        );
        setPigletData(response.data);
      } else {
        // If search query is not empty, perform search
        const response = await axios.get(
          `http://localhost:3000/piglet-search-id?search=${data}`
        );
        setPigletData(response.data);
      }
    } catch (error) {
      console.log("Error searching data", error);
    }
  };

  const handleChangeRoomNumber = async (e) => {
    const data = e.target.value;
    setSearchQueryRoomNumber(data);
    try {
      if (data.trim() === "") {
        // If search query is empty, fetch all details
        const response = await axios.get(
          "http://localhost:3000/piglet-details"
        );
        setPigletData(response.data);
      } else {
        // If search query is not empty, perform search
        const response = await axios.get(
          `http://localhost:3000/piglet-search-roomNumber?search=${data}`
        );
        setPigletData(response.data);
      }
    } catch (error) {
      console.log("Error searching data", error);
    }
  };

  const handleChangeWeight = async (e) => {
    const data = e.target.value;
    setSearchQueryWeight(data);
    try {
      if (data.trim() === "") {
        // If search query is empty, fetch all details
        const response = await axios.get(
          "http://localhost:3000/piglet-details"
        );
        setPigletData(response.data);
      } else {
        // If search query is not empty, perform search
        const response = await axios.get(
          `http://localhost:3000/piglet-search-weight?search=${data}`
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
        <Form inline className="piglet-detail-form">
          <h4 style={{ fontWeight: "600" }}>All Piglet detail</h4>
          <Row className="piglet-detail-row">
            <Col xs="auto" className="piglet-detail-column">
              <Form.Control
                style={{ width: "10vw", marginLeft: "2vw" }}
                type="text"
                placeholder="Search by id"
                className=" mr-sm-2"
                value={searchQueryId}
                // onChange={(e) => setSearchQuery(e.target.value)}
                onChange={handleChangeId}
              />
              <Form.Control
                style={{ width: "10vw", marginLeft: "2vw" }}
                type="text"
                placeholder="Search by room number"
                className=" mr-sm-2"
                value={searchQueryRoomNumber}
                // onChange={(e) => setSearchQuery(e.target.value)}
                onChange={handleChangeRoomNumber}
              />
              <Form.Control
                style={{ width: "10vw", marginLeft: "2vw" }}
                type="text"
                placeholder="Search by weight"
                className=" mr-sm-2"
                value={searchQueryWeight}
                // onChange={(e) => setSearchQuery(e.target.value)}
                onChange={handleChangeWeight}
              />
            </Col>
            <Col xs="auto">
              <Button type="submit">Submit</Button>
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
              <th>Note</th>
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
                  <td>{value.note ? value.note : "Null"}</td>

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
