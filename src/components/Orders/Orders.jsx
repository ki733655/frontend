import "./Orders.css";
import Table from "react-bootstrap/Table";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
// import OrdersEditForm from "./OrdersEditForm/OrdersEditForm";
import axios from "axios";
const Orders = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    orderId: "",
    customerName: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/order-details");
        setOrdersData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleChangeOrderId = async(e) => {
    const data = e.target.value;
    setSearchQuery((prevState) => ({
      ...prevState,
      orderId: data,
    }));
    

    try {
      if (data.trim() === "") {
        // If search query is empty, fetch all details
        const response = await axios.get("http://localhost:3000/order-details");
        setOrdersData(response.data);
      } else {
        // If search query is not empty, perform search
        const response = await axios.get(
          `http://localhost:3000/order-search-id?search=${data}`
        );
        setOrdersData(response.data);
      }
    } catch (error) {
      console.log("Error searching data", error);
    }
  };

  const handleChangeCustomerName = async(e) => {
    const data = e.target.value;
    setSearchQuery( (prev) => ({
      ...prev,
      customerName: data,
    }));

    try {
      if (data.trim() === "") {
        // If search query is empty, fetch all details
        const response = await axios.get("http://localhost:3000/order-details");
        setOrdersData(response.data);
      } else {
        // If search query is not empty, perform search
        const response = await axios.get(
          `http://localhost:3000/order-search-name?search=${data}`
        );
        setOrdersData(response.data);
      }
    } catch (error) {
      console.log("Error searching data", error);
    }
    
  };
  const handleSearch = (e) => {
        e.preventDefault();
  };

  const handleDelete = async(orderId) => {
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
      // setOrdersData(responseAfterDelete.data)
      // Extracting the data from the response and setting it to the boarData state
      setOrdersData(
        Array.isArray(responseAfterDelete.data) ? responseAfterDelete.data : []
      );
    } catch (error) {
      console.log("Error deleting data:", error);
    }
  }

  // const handleEdit = () => {

  // };

  return (
    <>
      <div className="orders-main">
        <div className="orders-main-2nd">
          <Form inline className="orders-detail-form">
            <h4 style={{ fontWeight: "600" }}>All Order details</h4>
            <Row className="orders-detail-row">
              <Col xs="auto" className="orders-detail-column">
                <Form.Control
                  style={{ width: "10vw", marginLeft: "2vw" }}
                  type="text"
                  placeholder="Search by id"
                  className=" mr-sm-2"
                  value={searchQuery.id}
                  // onChange={(e) => setSearchQuery(e.target.value)}
                  onChange={handleChangeOrderId}
                />
                <Form.Control
                  style={{ width: "10vw", marginLeft: "2vw" }}
                  type="text"
                  placeholder="Search by name"
                  className=" mr-sm-2"
                  value={searchQuery.name}
                  // onChange={(e) => setSearchQuery(e.target.value)}
                  onChange={handleChangeCustomerName}
                />
              </Col>
              <Col xs="auto">
                <Button onClick={handleSearch} type="submit">
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
                <th>Advance</th>
                <th>Final payment</th>
                <th>Phone number</th>
                <th>Comment</th>
                <th>Delivery date</th>
                <th>Delivery Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {ordersData.map((val, idx) => {
              const deliveryDate = val.deliveryDate
                ? new Date(val.deliveryDate).toLocaleDateString("en-GB")
                : "Null";
              return (
                <>
                  <tbody key={idx}>
                    <tr>
                      <td>{val.orderId ? val.orderId : "Null"}</td>
                      <td>{val.customerName ? val.customerName : "Null"}</td>
                      <td>
                        {val.pigIds
                          ? val.pigIds.map((pigId, index) => (
                              <div key={index}>{pigId.trim()}</div>
                            ))
                          : "Null"}
                      </td>
                      <td>{val.totalWeight ? val.totalWeight : "Null"}</td>
                      <td>{val.address ? val.address : "Null"}</td>
                      <td>{val.advance ? val.advance : "Null"}</td>
                      <td>{val.finalPayment ? val.finalPayment : "Null"}</td>
                      <td>{val.phoneNumber ? val.phoneNumber : "Null"}</td>
                      <td>{val.comment ? val.comment : "Null"}</td>
                      <td>{deliveryDate}</td>
                      <td>
                        {val.deliveryStatus ? val.deliveryStatus : "Null"}
                      </td>

                      <td className="boar-detail-logo">
                        <div className="delete-logo">
                          <MdDelete
                            id="delete"
                            onClick={() => handleDelete(val.orderId)}
                          />
                        </div>
                        <div className="edit logo">
                          <FaEdit
                            id="edit"
                            style={{ marginLeft: "1.5vw" }}
                            // onClick={() => handleEdit()}
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </>
              );
            })}
          </Table>
        </div>
      </div>
    </>
  );
};

export default Orders;
