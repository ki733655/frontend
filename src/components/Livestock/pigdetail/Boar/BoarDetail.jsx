import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const BoarDetail = () => {
  const [boarData, setBoarData] = useState([]);
// fetching the data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/boar-details");
        console.log(response.data);
        // setBoarData(Array.isArray(response.data) ? response.data : []);
        setBoarData(response.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

// logic for the delete button
const handleDelete = async (id) => {
  console.log('Deleting document with ID:', id);
  try {
    // Sending the deletion request
    const response = await axios.delete(`http://localhost:3000/boar-delete/${id}`);
    console.log('Deletion response:', response.data);

    // Fetching the updated data after deletion
    const responseAfterDelete = await axios.get("http://localhost:3000/boar-details");
    console.log('Updated data after deletion:', responseAfterDelete.data);

    // Extracting the data from the response and setting it to the boarData state
    setBoarData(Array.isArray(responseAfterDelete.data) ? responseAfterDelete.data : []);
  } catch (error) {
    console.log('Error deleting data:', error);
  }
};


// Logic for handleEdit
const handleEdit = () => {

}
  return (
    <>
      <Table responsive bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Room Number</th>
            <th>CSF</th>
            <th>Deworm</th>
            <th>FMD</th>
            <th>Weight</th>
            <th>Actions</th>
          </tr>
        </thead>

        {boarData.map((value, index) => {
          {
            console.log(value.id);
          }
          return (
            <tbody key={index}>
              <tr>
                <td>{value.id ? value.id : "Null"}</td>
                <td>{value.roomNumber ? value.roomNumber : "Null"}</td>
                <td>{value.CSF ? value.CSF : "Null"}</td>
                <td>{value.Deworm ? value.Deworm : "Null"}</td>
                <td>{value.FMD ? value.FMD : "Null"}</td>
                <td>{value.Weight ? value.Weight : "Null"}</td>
                <td>
                  <MdDelete  onClick={() => handleDelete(value.id)}/>
                  <FaEdit style={{marginLeft: "1vw"}} onClick={handleEdit} />
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </>
  );
};

export default BoarDetail;
