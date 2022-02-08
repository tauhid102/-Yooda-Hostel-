import React, { useState } from "react";
import Dashboard from "../Dashboard/Dashboard";

const AddStudent = () => {
  const [addStudent, setAddStudent] = useState({});
  const [confirm, setConfirm] = useState(false);
  const [status, setStatus] = useState("");
  // const { user, registerUser, isLoading, authError } = useAuth();

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newAddData = { ...addStudent };
    newAddData[field] = value;
    setAddStudent(newAddData);
  };
  const handleAddStudent = (e) => {
    e.preventDefault();
    const product = {
      ...addStudent,
    };
    fetch("http://localhost:5000/students", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setConfirm(true);
          document.getElementById("create-course-form").reset();
        }
      });
  };
  return (
    <>
      <Dashboard></Dashboard>
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2">
          <div className="col-12">
            <h3 className="mt-5">
              Please Provide<span className="text-danger"> Information </span>
              For Add <span className="text-danger">Student</span>
            </h3>
            <form
              className="row g-3 w-100 inputFrom mt-2 d-flex"
              id="create-course-form"
              onSubmit={handleAddStudent}
            >
              <div className="col-12">
                <label for="inputAddress" className="form-label">
                  Student Id
                </label>
                <input
                  type="number"
                  name="id"
                  onBlur={handleOnBlur}
                  className="form-control"
                  id="inputAddress"
                  onkeypress="return event.charCode >= 48"
                  min="1"
                />
              </div>
              <div className="col-12">
                <label for="inputEmail4" className="form-label">
                  Student Name
                </label>
                <input
                  type="text"
                  name="name"
                  onBlur={handleOnBlur}
                  className="form-control"
                  id="inputEmail4"
                />
              </div>
              <div className="col-12">
                <label for="inputEmail4" className="form-label">
                  Student Roll
                </label>
                <input
                  type="number"
                  name="roll"
                  onBlur={handleOnBlur}
                  className="form-control"
                  id="inputEmail4"
                  onkeypress="return event.charCode >= 48"
                  min="1"
                />
              </div>
              <div className="col-12">
                <label for="inputEmail4" className="form-label">
                  Student Age
                </label>
                <input
                  type="number"
                  name="age"
                  onBlur={handleOnBlur}
                  className="form-control"
                  id="inputEmail4"
                  onkeypress="return event.charCode >= 48"
                  min="1"
                />
              </div>
              <div className="col-12">
                <label for="inputEmail4" className="form-label">
                  Student Class
                </label>
                <input
                  type="text"
                  name="class"
                  onBlur={handleOnBlur}
                  className="form-control"
                  id="inputEmail4"
                />
              </div>
              <div className="col-12">
                <label for="inputEmail4" className="form-label">
                  Student Hall
                </label>
                <input
                  type="text"
                  name="hall"
                  onBlur={handleOnBlur}
                  className="form-control"
                  id="inputEmail4"
                />
              </div>
              <div className="col-12">
                <label for="inputEmail4" className="form-label">
                  Status
                </label>
                <input
                  type="text"
                  name="status"
                  onBlur={handleOnBlur}
                  className="form-control"
                  id="inputEmail4"
                  placeholder="active or inActive"
                />
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="status"
                  id="flexRadioDefault1"
                  value="active"
                  checked
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  Active
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="status"
                  id="flexRadioDefault2"
                  value="inActive"
                  checked
                />
                <label class="form-check-label" for="flexRadioDefault2">
                  InActive
                </label>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-dark">
                  Add Student
                </button>
              </div>
              {confirm && (
                <div class="alert alert-success" role="alert">
                  Add Student Successfully
                </div>
              )}
            </form>
          </div>
          <div className="col picutre">
            {/* <img src={picture} alt="" /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddStudent;
