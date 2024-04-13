import "./Orders.css"
import Table from "react-bootstrap/Table";
import { MdDelete, } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import OrdersEditForm from "./OrdersEditForm/OrdersEditForm";
import  axios  from "axios";
const Orders = () => {
  const [ordersData, setOrdersData] = useState([])
  const [searchQuery, setSearchQuery] = useState({
    id : "" ,
    name: "",
  })

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

  const handleChangeId = (e) => {
    const data = e.target.value;
    setSearchQuery({
      id : data,
    })
  }
  const handleChangeName = (e) => {
    const data = e.target.value;
    setSearchQuery({
      name: data,
    })
  }
  const handleSearch = () => {

  }

  const handleEdit = () => {
  }

  return (
    <>
      <div className="orders-main">
        <div className="orders-main-2nd">
        <Form inline className="orders-detail-form">
          <h4 style={{ fontWeight: "600" }}>All Order details</h4>
          <Row className="orders-detail-row">
            <Col xs="auto" className="orders-detail-column">
              <Form.Control
              style={{width : "10vw", marginLeft: "2vw"}}
                type="text"
                placeholder="Search by id"
                className=" mr-sm-2"
                value={searchQuery.id}
                // onChange={(e) => setSearchQuery(e.target.value)}
                onChange={handleChangeId }
              />
              <Form.Control
              style={{width : "10vw", marginLeft: "2vw"}}
                type="text"
                placeholder="Search by name"
                className=" mr-sm-2"
                value={searchQuery.name}
                // onChange={(e) => setSearchQuery(e.target.value)}
                onChange={handleChangeName }
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
                <th>Pig Id's</th>
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
            {
                ordersData.map((val, idx) => {
                  return(
                    <>
                    <tbody key={idx}>
                    <tr>
                      <td>{val.id ? val.id : "Null"}</td>
                      <td>{val.name ? val.name : "Null"}</td>
                      <td>{val.boar ? val.boar : "Null"}</td>
                      <td>{val.boar ? val.sow : "Null"}</td>
                      <td>{val.boar ? val.piglets : "Null"}</td>
                      <td>{val.boar ? val.khassi : "Null"}</td>
                      <td>{val.address ? val.address : "Null"}</td>
                      <td>{val.advance ? val.advance : "Null"}</td>
                      <td>{val.phoneNumber ? val.phoneNumber : "Null"}</td>
                      <td>{val.comment ? val.comment : "Null"}</td>
                      <td>{val.deliveryDate ? val.deliveryDate : "Null"}</td>
                      <td>{val.deliveryStatus ? val.deliveryStatus : "Null"}</td>
                      
                      <td className="boar-detail-logo">
                          <div className="delete-logo">
                            <MdDelete
                              id="delete"
                              // onClick={() => handleDelete(value.id)}
                            />
                          </div>
                          <div className="edit logo">
                            <FaEdit
                              id="edit"
                              style={{ marginLeft: "1.5vw" }}
                              onClick={() => handleEdit()}
                            />
                          </div>
                        </td>
                    </tr>
                    
                  </tbody>
                  </>
                  )
                })
            }
           
          </Table>
        </div>
      </div>
    </>
  );
};

export default Orders;
