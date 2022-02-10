import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard/Dashboard";

const EditStudent = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState({});
  const [updateStudent, setUpdateStudent] = useState({});
  const [confirm, setConfirm] = useState(false);
  const status = 'active';

  useEffect(() => {
    const url = `https://tranquil-chamber-66218.herokuapp.com/students/${studentId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setStudent(data));
  }, [studentId]);
  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newAddData = { ...updateStudent };
    newAddData[field] = value;
    setUpdateStudent(newAddData);
  };
  const handleUpdateStudent = (e) => {
    e.preventDefault();
    const item = {
      ...updateStudent,
      status
    };
    fetch(`https://tranquil-chamber-66218.herokuapp.com/students/${studentId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(item),
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
        <div className="row row-cols-1 row-cols-md-2">
          <div className="col col-sm-12 col-lg-8">
            <h3 className="mt-5">
              Please Provide<span className="text-danger"> Information </span>
              For Update <span className="text-danger">Student</span>
            </h3>
            <form
              className="row g-3 w-100 inputFrom mt-2 d-flex loginFrom"
              id="create-course-form"
              onSubmit={handleUpdateStudent}
            >
              <div className="col-6">
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
                  placeholder="Ex: 011171264"
                />
              </div>
              <div className="col-6">
                <label for="inputEmail4" className="form-label">
                  Student Name
                </label>
                <input
                  type="text"
                  name="name"
                  onBlur={handleOnBlur}
                  className="form-control"
                  id="inputEmail4"
                  placeholder="Name"
                />
              </div>
              <div className="col-6">
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
                  placeholder="Ex: 1234"
                />
              </div>
              <div className="col-6">
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
                  placeholder="Ex: 12"
                />
              </div>
              <div className="col-6">
                <label for="inputEmail4" className="form-label">
                  Student Class
                </label>
                <input
                  type="text"
                  name="class"
                  onBlur={handleOnBlur}
                  className="form-control"
                  id="inputEmail4"
                  placeholder="Ex: Six"
                />
              </div>
              <div className="col-6">
                <label for="inputEmail4" className="form-label">
                  Student Hall
                </label>
                <input
                  type="text"
                  name="hall"
                  onBlur={handleOnBlur}
                  className="form-control"
                  id="inputEmail4"
                  placeholder="Ex: Shapla"
                />
              </div>
              <div className="col-12 mx-auto text-center">
                <button type="submit" className="btn btn-dark">
                  Update
                </button>
              </div>
            </form>
              {confirm && (
                <div class="alert alert-success" role="alert">
                  Update Student Successfully
                </div>
              )}
          </div>
          <div className="col col-sm-12 col-lg-4 mt-5">
            <h4 className="text-center">Previous Information</h4>
            <div className="mx-auto w-50 border border-4 p-3  loginFrom">
              <h6>Id: {student.id}</h6>
              <h6>Name: {student.name}</h6>
              <h6>Roll: {student.roll}</h6>
              <h6>Age: {student.age}</h6>
              <h6>Class: {student.class}</h6>
              <h6>Hall: {student.hall}</h6>
              <h6>Status: {student.status}</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditStudent;
