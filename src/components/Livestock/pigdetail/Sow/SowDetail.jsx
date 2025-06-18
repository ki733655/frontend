import axios from "axios";
import "./SowDetail.css";
import  { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { MdDelete, } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
// import SowEditForm from "./BoarEditForm";
// search field imports
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SowEditForm from "./SowEditForm";

const SowDetail = () => {
  const [sowData, setSowData] = useState([]);
  const [editItem, setEditItem] = useState(null); // State to hold the item being edited
  // const [editConfirm, setEditConfirm] = useState(false)
  const [searchQueryId, setSearchQueryId] = useState("s-");
  const [searchQueryRoomNumber, setSearchQueryRoomNumber] = useState("");
  const [searchQueryWeight, setSearchQueryWeight] = useState("");

  // Fetching the data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://farmbackend-wsn6.onrender.com/sow-details");
        setSowData(response.data);
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
        `https://farmbackend-wsn6.onrender.com/sow-delete/${id}`
      );
      console.log("Deletion response:", response.data);

      // Fetching the updated data after deletion
      const responseAfterDelete = await axios.get(
        "https://farmbackend-wsn6.onrender.com/sow-details"
      );
      console.log("Updated data after deletion:", responseAfterDelete.data);

      // Extracting the data from the response and setting it to the boarData state
      setSowData(
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

  const handleChangeId = async (e) => {
    const data = e.target.value;
    setSearchQueryId(data);
    try {
      if (data.trim() === "s-") {
        // If search query is empty, fetch all details
        const response = await axios.get("https://farmbackend-wsn6.onrender.com/sow-details");
        setSowData(response.data);
      } else {
        // If search query is not empty, perform search
        const response = await axios.get(
          `https://farmbackend-wsn6.onrender.com/sow-search-id?search=${data}`
        );
        setSowData(response.data);
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
        const response = await axios.get("https://farmbackend-wsn6.onrender.com/sow-details");
        setSowData(response.data);
      } else {
        // If search query is not empty, perform search
        const response = await axios.get(
          `https://farmbackend-wsn6.onrender.com/sow-search-roomNumber?search=${data}`
        );
        setSowData(response.data);
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
        const response = await axios.get("https://farmbackend-wsn6.onrender.com/sow-details");
        setSowData(response.data);
      } else {
        // If search query is not empty, perform search
        const response = await axios.get(
          `https://farmbackend-wsn6.onrender.com/sow-search-weight?search=${data}`
        );
        setSowData(response.data);
      }
    } catch (error) {
      console.log("Error searching data", error);
    }
  };
  

   

  // }
  return (
    <div className="sow-detail-main">
      <div className="sow-detail-2nd">
      <Form inline className="sow-detail-form">
          <h4 style={{ fontWeight: "600" }}>All Sow details</h4>
          <Row className="sow-detail-row">
            <Col xs="auto" className="sow-detail-column">
              <Form.Control
              style={{width : "10vw", marginLeft: "2vw"}}
                type="text"
                placeholder="Search by id"
                className=" mr-sm-2"
                value={searchQueryId}
                // onChange={(e) => setSearchQuery(e.target.value)}
                onChange={handleChangeId }
              />
              <Form.Control
              style={{width : "10vw", marginLeft: "2vw"}}
                type="text"
                placeholder="Search by room number"
                className=" mr-sm-2"
                value={searchQueryRoomNumber}
                // onChange={(e) => setSearchQuery(e.target.value)}
                onChange={handleChangeRoomNumber }
              />
               <Form.Control
              style={{width : "10vw", marginLeft: "2vw"}}
                type="text"
                placeholder="Search by weight"
                className=" mr-sm-2"
                value={searchQueryWeight}
                // onChange={(e) => setSearchQuery(e.target.value)}
                onChange={handleChangeWeight }
              />
            </Col>
            <Col xs="auto">
              <Button type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
        <Table className="sow-detail-table" responsive bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Room Number</th>
              <th>CSF</th>
              <th>FMD</th>
              <th>Deworm</th>
              <th>Weight</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
          </thead>

          {sowData.map((value, index) => {
            const CSF = value.CSF
              ? new Date(value.CSF).toLocaleDateString("en-GB")
              : "Null";
            const FMD = value.FMD
              ? new Date(value.FMD).toLocaleDateString("en-GB")
              : "Null";
            const Deworm = value.Deworm
              ? new Date(value.Deworm).toLocaleDateString("en-GB")
              : "Null";

            return (
              <tbody key={index}>
                <tr>
                  <td>{value.id ? value.id : "Null"}</td>
                  <td>{value.roomNumber ? value.roomNumber : "Null"}</td>
                  <td>{CSF}</td>
                  <td>{FMD}</td>
                  <td>{Deworm}</td>
                  <td>{value.Weight ? value.Weight : "Null"}</td>
                  <td>{value.note ? value.note : "Null"}</td>

                  <td className="sow-detail-logo">
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
          <SowEditForm editItem={editItem} setEditItem={setEditItem} />
        )}
      </div>
    </div>
  );
};

export default SowDetail;
