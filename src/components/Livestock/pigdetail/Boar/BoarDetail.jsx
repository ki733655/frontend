import axios from "axios";
import "./BoarDetail.css";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import BoarEditForm from "./BoarEditForm";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const BoarDetail = () => {
  const [boarData, setBoarData] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [excelFile, setExcelFile] = useState(null);
  const [searchQueryId, setSearchQueryId] = useState("b-");
  const [searchQueryRoomNumber, setSearchQueryRoomNumber] = useState("");
  const [searchQueryWeight, setSearchQueryWeight] = useState("");

  const handleFileChange = (event) => {
    setExcelFile(event.target.files[0]);
  };

  const handelUpload = async () => {
    if (!excelFile) {
      console.log("No file selected.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("excelFile", excelFile);
      
      const response = await axios.post(
        "http://localhost:3000/boar-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    
      console.log("Upload successful:", response.data);
      // Optionally, you can fetch updated data after successful upload
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/boar-details");
        setBoarData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [editItem]);

  const handleDelete = async (id) => {
    console.log("Deleting document with ID:", id);
    try {
      const response = await axios.delete(
        `http://localhost:3000/boar-delete/${id}`
      );
      console.log("Deletion response:", response.data);

      const responseAfterDelete = await axios.get(
        "http://localhost:3000/boar-details"
      );
      console.log("Updated data after deletion:", responseAfterDelete.data);

      setBoarData(
        Array.isArray(responseAfterDelete.data) ? responseAfterDelete.data : []
      );
    } catch (error) {
      console.log("Error deleting data:", error);
    }
  };

  const handleEdit = (item) => {
    try {
      setEditItem(item);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeId = async (e) => {
    const data = e.target.value;
    setSearchQueryId(data);
    try {
      if (data.trim() === "b-") {
        const response = await axios.get("http://localhost:3000/boar-details");
        setBoarData(response.data);
      } else {
        const response = await axios.get(
          `http://localhost:3000/boar-search-id?search=${data}`
        );
        setBoarData(response.data);
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
        const response = await axios.get("http://localhost:3000/boar-details");
        setBoarData(response.data);
      } else {
        const response = await axios.get(
          `http://localhost:3000/boar-search-roomNumber?search=${data}`
        );
        setBoarData(response.data);
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
        const response = await axios.get("http://localhost:3000/boar-details");
        setBoarData(response.data);
      } else {
        const response = await axios.get(
          `http://localhost:3000/boar-search-weight?search=${data}`
        );
        setBoarData(response.data);
      }
    } catch (error) {
      console.log("Error searching data", error);
    }
  };

  return (
    <div className="boar-detail-main">
      <div className="boar-detail-2nd">
        <Form inline className="boar-detail-form">
          <h4 style={{ fontWeight: "600" }}>All boars detail</h4>
          <Row className="boar-detail-row">
            <Col xs="auto" className="boar-detail-column">
              <Form.Control
                style={{ width: "10vw", marginLeft: "2vw" }}
                type="text"
                placeholder="Search by id"
                className=" mr-sm-2"
                value={searchQueryId}
                onChange={handleChangeId}
              />
              <Form.Control
                style={{ width: "10vw", marginLeft: "2vw" }}
                type="text"
                placeholder="Search by room number"
                className=" mr-sm-2"
                value={searchQueryRoomNumber}
                onChange={handleChangeRoomNumber}
              />
              <Form.Control
                style={{ width: "10vw", marginLeft: "2vw" }}
                type="text"
                placeholder="Search by weight"
                className=" mr-sm-2"
                value={searchQueryWeight}
                onChange={handleChangeWeight}
              />
            </Col>
            <Col xs="auto">
              <input type="file" onChange={handleFileChange} />
              <Button variant="primary" onClick={handelUpload}>
                Upload
              </Button>
            </Col>
          </Row>
        </Form>
        <Table className="boar-detail-table" responsive bordered hover>
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

          {boarData.map((value, index) => {
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
        {editItem && (
          <BoarEditForm editItem={editItem} setEditItem={setEditItem} />
        )}
      </div>
    </div>
  );
};

export default BoarDetail;
