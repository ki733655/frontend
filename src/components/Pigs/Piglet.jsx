

const Piglet = () => {
  return (
    <>
      <form action="">
        <div className="mb-3">
          <label className="form-label">Id</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter piglet id"
          ></input>
          <label className="form-label">Mother Id</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter mother id"
          ></input>
          <label className="form-label">Father Id</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter father id"
          ></input>
          <label className="form-label">Date of birth</label>
          <input
            type="date"
            className="form-control"
            id="exampleFormControlInput4"
          />
          <label className="form-label">Gender</label>
          <select className="form-select" aria-label="Default select example">
            <option selected>Select from the list</option>
            <option value="1">Sow</option>
            <option value="2">Boar</option>
            <option value="3">Khassi</option>
          </select>

          <label className="form-label">Room number</label>
          <input
            type="number"
            className="form-control"
            id="exampleFormControlInput2"
            placeholder="Enter room number"
          ></input>
          <label className="form-label">Select the date of Swine Fever</label>
          <input
            type="date"
            className="form-control"
            id="exampleFormControlInput4"
          />
          <label className="form-label">Select the date of Deworming</label>
          <input
            type="date"
            className="form-control"
            id="exampleFormControlInput5"
          />
          <label className="form-label">Weight</label>
          <input
            type="number"
            className="form-control"
            id="exampleFormControlInput6"
            placeholder="in kgs"
          />
          <input type="submit" value="Submit" />
        </div>
      </form>
    </>
  );
};

export default Piglet;
