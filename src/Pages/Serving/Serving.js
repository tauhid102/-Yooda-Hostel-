import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard/Dashboard/Dashboard";

const Serving = () => {
  const [students, setStudents] = useState({});
  const [filter, setFilter] = useState({});
  const [brakFast, setBrakFast] = useState({});
  const [lanch, setLanch] = useState({});
  const [dinner, setDinner] = useState({});
  const [date, setDate] = useState({});
  const [foodList, setFoodList] = useState({});
  const [served,setServed]=useState({});
  const status = "Served";
  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data.students);
      });
  }, []);
  let match;
  const handleSerch = (e) => {
    const searchText = e.target.value;
    match = students.filter((student) => student?.roll == searchText);
    setFilter(match);
  };
  const handleBreakFast = (e) => {
    setBrakFast(e.target.value);
  };
  const handleLanch = (e) => {
    
    setLanch(e.target.value);
  };
  const handleDinner = (e) => {
    setDinner(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleFoodList = (e) => {
    setFoodList(e.target.value);
  };
   useEffect(()=>{
    const id=filter[0]?._id;
    const url = `http://localhost:5000/served/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setServed(data));
      console.log(served);
   },[brakFast])
  const servied = (e) => {
    e.preventDefault();
    const {id,roll}=filter[0];
    const serve = {
      id,
      roll,
      date,
      brakFast,
      lanch,
      dinner,
      status,
      foodList,
    };
    fetch("http://localhost:5000/served", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(serve),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          //   setConfirm(true);
          document.getElementById("create-course-form").reset();
        }
      });
  };
  return (
    <>
      <Dashboard></Dashboard>
      <div className="container">
        <div>
          <input type="text" onChange={handleSerch}></input>
        </div>
        <form
          className="row g-3 w-100 inputFrom mt-2 d-flex loginFrom mt-3"
          id="create-course-form"
          onSubmit={servied}
        >
          <div className="col-6">
            <label for="inputAddress" className="form-label">
              Id
            </label>
            <input
              type="number"
              name="id"
              className="form-control"
              id="inputAddress"
              onkeypress="return event.charCode >= 48"
              min="1"
              placeholder="Ex: 011171264"
              value={filter[0]?.id}
            />
          </div>
          <div className="col-6">
            <label for="inputEmail4" className="form-label">
              Student Id
            </label>
            <input
              type="text"
              name="studentId"
              className="form-control"
              id="inputEmail4"
              value={filter[0]?.roll}
            />
          </div>
          <div className="col-6">
            <label for="inputEmail4" className="form-label">
              Date
            </label>
            <input
              type="date"
              name="date"
              className="form-control"
              id="inputEmail4"
              onChange={handleDate}
            />
          </div>
          <div className="col-6">
            <label for="inputEmail4" className="form-label">
              Food Iteam List
            </label>
            <input
              type="text"
              name="hall"
              onBlur={handleFoodList}
              className="form-control"
              id="inputEmail4"
              placeholder=""
            />
          </div>
          <div className="col-6">
            <label for="inputEmail4" className="form-label">
              Shift
            </label>
            <input
              type="radio"
              onClick={handleBreakFast}
              name="shift"
              id="break fast"
              value="break-fast"
            />
            Break Fast
            <input
              type="radio"
              onClick={handleLanch}
              name="shift"
              id="Lanch"
              value="lanch"
            />
            Lanch
            <input
              type="radio"
              onClick={handleDinner}
              name="shift"
              id="Dinner"
              value="dinner"
            />
            Dinner
          </div>
          <div className="col-6 mx-auto text-center">
            <button type="submit" className="btn btn-dark">
              Served
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Serving;
