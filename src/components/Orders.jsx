const Orders = () => {
  return (
    <>
      <div className="orders-main">
        <div className="all-orders">
          <h2>All Orders</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Sl no.</th>
                <th scope="col">Name</th>
                <th scope="col">Male</th>
                <th scope="col">Female</th>
                <th scope="col">Khassi</th>
                <th scope="col">Piglets</th>
                <th scope="col">Place</th>
                <th scope="col">Advance</th>
                <th scope="col">Phone number</th>
                <th scope="col">Comment</th>
                <th scope="col">Delivery date</th>
                <th scope="col">Delivery Status</th>
                <th scope="col">man</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Subrata</td>
                <td>2</td>
                <td>5</td>
                <td>7</td>
                <td>0</td>
                <td>Dibrugarh</td>
                <td>12,000</td>
                <td>91027366749</td>
                <td>bhal bhal gahori</td>
                <td>18/12/24</td>
                <td>Deliverd</td>
              </tr>
              <tr>
                <th scope="row">1</th>
                <td>Subrata</td>
                <td>2</td>
                <td>5</td>
                <td>7</td>
                <td>0</td>
                <td>Dibrugarh</td>
                <td>12,000</td>
                <td>91027366749</td>
                <td>bhal bhal gahori</td>
                <td>18/12/24</td>
                <td>Deliverd</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Orders;
