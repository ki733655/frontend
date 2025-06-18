import axios from "axios";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Sales = () => {
  const [orderData, setOrderData] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    orderId: "",
    customerName: "",
    phoneNumber: "",
  });

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  const fetchData = async () => {
    try {
      let url = "https://farmbackend-wsn6.onrender.com/sale-details";
      if (searchQuery.orderId.trim() !== "") {
        url = `https://farmbackend-wsn6.onrender.com/sale-search-id?search=${searchQuery.orderId}`;
      } else if (searchQuery.customerName.trim() !== "") {
        url = `https://farmbackend-wsn6.onrender.com/sale-search-customerName?search=${searchQuery.customerName}`;
      } else if (searchQuery.phoneNumber.trim() !== "") {
        url = `https://farmbackend-wsn6.onrender.com/sale-search-phoneNumber?search=${searchQuery.phoneNumber}`;
      }

      const response = await axios.get(url);
      const filteredData = response.data.map(({ _id, __v, deliveryDate, ...rest }) => ({
        ...rest,
        deliveryDate: deliveryDate ? new Date(deliveryDate).toLocaleDateString() : "Null"
      }));
      setOrderData(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeId = (e) => {
    setSearchQuery({ ...searchQuery, orderId: e.target.value });
  };

  const handleChangeCustomerName = (e) => {
    setSearchQuery({ ...searchQuery, customerName: e.target.value });
  };

  const handleChangePhoneNumber = (e) => {
    setSearchQuery({ ...searchQuery, phoneNumber: e.target.value });
  };

  return (
    <>
      <div className="orders-main">
        <div className="orders-main-2nd">
          <Form inline className="orders-detail-form">
            <h4 style={{ fontWeight: "600" }}>All Sales records</h4>
            <Row className="orders-detail-row">
              <Col xs="auto" className="orders-detail-column">
                <Form.Control
                  style={{ width: "10vw", marginLeft: "2vw" }}
                  type="text"
                  placeholder="Search by id"
                  className="mr-sm-2"
                  value={searchQuery.orderId}
                  onChange={handleChangeId}
                />
                <Form.Control
                  style={{ width: "10vw", marginLeft: "2vw" }}
                  type="text"
                  placeholder="Search by Customer name"
                  className="mr-sm-2"
                  value={searchQuery.customerName}
                  onChange={handleChangeCustomerName}
                />
                <Form.Control
                  style={{ width: "10vw", marginLeft: "2vw" }}
                  type="text"
                  placeholder="Search by Phone Number"
                  className="mr-sm-2"
                  value={searchQuery.phoneNumber}
                  onChange={handleChangePhoneNumber}
                />
              </Col>
              <Col xs="auto">
                <Button
                  variant="success"
                  style={{ backgroundColor: "#78ccf0", color: "#FFFFFF" }}
                >
                  <CSVLink
                    data={orderData}
                    filename={"sales_data.csv"}
                    style={{ color: "#FFFFFF" }}
                  >
                    Export to Excel
                  </CSVLink>
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
                <th>Final Payment</th>
                <th>Phone Number</th>
                <th>Comment</th>
                <th>Delivery Date</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((value, index) => (
                <tr key={index}>
                  <td>{value.orderId || "Null"}</td>
                  <td>{value.customerName || "Null"}</td>
                  <td>{value.pigIds ? value.pigIds.join(", ") : "Null"}</td>
                  <td>{value.totalWeight || "Null"}</td>
                  <td>{value.address || "Null"}</td>
                  <td>{value.advance || "Null"}</td>
                  <td>{value.finalPayment || "Null"}</td>
                  <td>{value.phoneNumber || "Null"}</td>
                  <td>{value.comment || "Null"}</td>
                  <td>{value.deliveryDate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Sales;
