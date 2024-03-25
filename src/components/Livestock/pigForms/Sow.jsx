import "./Sow.css";
const Sow = () => {
  return (
    <>
      <form action="" className="sow-form">
        <div className="mb-3">
          <label className="form-label">Sow Id</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter sow id"
          ></input>

          <label className="form-label">Room number</label>
          <input
            type="number"
            className="form-control"
            id="exampleFormControlInput2"
            placeholder="Enter room number"
          ></input>
          <label className="form-label">Select the date of CSF</label>
          <input
            type="date"
            className="form-control"
            id="exampleFormControlInput3"
          />
          <label className="form-label">Select the date of FMD</label>
          <input
            type="date"
            className="form-control"
            id="exampleFormControlInput4"
          />
          <label className="form-label">Select the date of Deworn</label>
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
          <input type="submit" className="btn btn-primary" value="Submit" />
        </div>
      </form>
    </>
  );
};

export default Sow;
