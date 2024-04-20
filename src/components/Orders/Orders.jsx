import axios from "axios";
import "./Orders.css";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
// import BoarEditForm from "./BoarEditForm";
// search field imports
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OrdersEditForm from "./OrdersEditForm/OrdersEditForm";

const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    orderId: "",
    customerName: "",
    phoneNumber: "",
  });
  const [editItem, setEditItem] = useState(null); // State to hold the item being edited
  // const [editConfirm, setEditConfirm] = useState(false)

  // Fetching the data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/order-details");
        setOrderData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [editItem]);

  // Logic for the delete button
  const handleDelete = async (orderId) => {
    console.log("Deleting document with ID:", orderId);
    try {
      // Sending the deletion request
      const response = await axios.delete(
        `http://localhost:3000/order-delete/${orderId}`
      );
      console.log("Deletion response:", response.data);

      // Fetching the updated data after deletion
      const responseAfterDelete = await axios.get(
        "http://localhost:3000/order-details"
      );
      console.log("Updated data after deletion:", responseAfterDelete.data);

      // Extracting the data from the response and setting it to the orderData state
      setOrderData(
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
    setSearchQuery({orderId : data})
    try {
      if (data.trim() === "") {
        // If search query is empty, fetch all details
        const response = await axios.get("http://localhost:3000/order-details");
        setOrderData(response.data);
      } else {
        // If search query is not empty, perform search
        const response = await axios.get(
          `http://localhost:3000/order-search-id?search=${data}`
        );
        setOrderData(response.data);
      }
    } catch (error) {
      console.log("Error searching data", error);
    }
  };

  const handleChangeCustomerName = async (e) => {
    const data = e.target.value;
    setSearchQuery({customerName : data});
    try {
      if (data.trim() === "") {
        // If search query is empty, fetch all details
        const response = await axios.get("http://localhost:3000/order-details");
        setOrderData(response.data);
      } else {
        // If search query is not empty, perform search
        const response = await axios.get(
          `http://localhost:3000/order-search-customerName?search=${data}`
        );
        setOrderData(response.data);
      }
    } catch (error) {
      console.log("Error searching data", error);
    }
  };

  const handleChangePhoneNumber = async (e) => {
    const data = e.target.value;
    setSearchQuery({phoneNumber : data});
    try {
      if (data.trim() === "") {
        // If search query is empty, fetch all details
        const response = await axios.get("http://localhost:3000/order-details");
        setOrderData(response.data);
      } else {
        // If search query is not empty, perform search
        const response = await axios.get(
          `http://localhost:3000/order-search-phoneNumber?search=${data}`
        );
        setOrderData(response.data);
      }
    } catch (error) {
      console.log("Error searching data", error);
    }
  };

  // }
  return (
    <>
    <div className="orders-main">
      <div className="orders-main-2nd">
        <Form inline className="orders-detail-form">
          <h4 style={{ fontWeight: "600" }}>All order detail</h4>
          <Row className="orders-detail-row">
            <Col xs="auto" className="orders-detail-column">
              <Form.Control
                style={{ width: "10vw", marginLeft: "2vw" }}
                type="text"
                placeholder="Search by id"
                className=" mr-sm-2"
                value={searchQuery.orderId}
                // onChange={(e) => setSearchQuery(e.target.value)}
                onChange={handleChangeId}
              />
              <Form.Control
                style={{ width: "10vw", marginLeft: "2vw" }}
                type="text"
                placeholder="Search by Customer name"
                className=" mr-sm-2"
                value={searchQuery.customerName}
                // onChange={(e) => setSearchQuery(e.target.value)}
                onChange={handleChangeCustomerName}
              />
              <Form.Control
                style={{ width: "10vw", marginLeft: "2vw" }}
                type="text"
                placeholder="Search by Phone Number"
                className=" mr-sm-2"
                value={searchQuery.phoneNumber}
                // onChange={(e) => setSearchQuery(e.target.value)}
                onChange={handleChangePhoneNumber}
              />
            </Col>
            <Col xs="auto">
              <Button type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
        <Table className="orders-detail-table" responsive bordered hover>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Customer Name</th>
              <th>Pig Ids</th>
              <th>Total weight</th>
              <th>Address</th>
              <th>Advance </th>
              <th>Final Payment</th>
              <th>Phone Number</th>
              <th>Commnet</th>
              <th>Delivery Date</th>
              <th>Delivery Status</th>
              <th>Action</th>
            </tr>
          </thead>

          {orderData.map((value, index) => {
           const deliveryDate = value.deliveryDate
           ? new Date(value.deliveryDate).toLocaleDateString("en-GB")
           : "Null";
            return (
              <tbody key={index}>
                <tr>
                  <td>{value.orderId ? value.orderId : "Null"}</td>
                  <td>{value.customerName ? value.customerName : "Null"}</td>
                  <td>
                    {value.pigIds
                      ? value.pigIds.map((pigId, index) => (
                          <div key={index}>{pigId.trim()}</div>
                        ))
                      : "Null"}
                  </td>
                  <td>{value.totalWeight ? value.totalWeight : "Null"}</td>
                  <td>{value.address ? value.address : "Null"}</td>
                  <td>{value.advance ? value.advance : "Null"}</td>
                  <td>{value.finalPayment ? value.finalPayment : "Null"}</td>
                  <td>{value.phoneNumber ? value.phoneNumber : "Null"}</td>
                  <td>{value.comment ? value.comment : "Null"}</td>
                  <td>{deliveryDate}</td>
                  <td>
                    {value.deliveryStatus ? value.deliveryStatus : "Null"}
                  </td>
                  <td className="boar-detail-logo">
                    <div className="delete-logo">
                      <MdDelete
                        id="delete"
                        onClick={() => handleDelete(value.orderId)}
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
          <OrdersEditForm editItem={editItem} setEditItem={setEditItem} />
        )}
      </div>
    </div>
    </>
  );
  
};

export default Orders;
