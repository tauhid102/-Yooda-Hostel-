import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard/Dashboard/Dashboard";

const Serving = () => {
  const [students, setStudents] = useState({});
  const [filter, setFilter] = useState({});
  const [breakFast, setBreakFast] = useState("non-served");
  const [lanch, setLanch] = useState("non-served");
  const [dinner, setDinner] = useState("non-served");
  const [date, setDate] = useState({});
  const [foodList, setFoodList] = useState({});
  const [food, setServed] = useState({});
  const [search, setSearch] = useState({});
  const [confirm, setConfirm] = useState(false);
  const status = "Served";
  useEffect(() => {
    fetch("https://tranquil-chamber-66218.herokuapp.com/students")
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
    // const id = filter[0]?.id;
    // let m = food.filter((student) => student?.id == id);
    // const url = `http://localhost:5000/served/${id}`;
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((data) => setSearch(data));
    setBreakFast("Served");
    // console.log(id);
    console.log(food);
    // console.log(m);
  };
  const handleLanch = (e) => {
    setLanch("Served");
  };
  const handleDinner = (e) => {
    setDinner("served");
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleFoodList = (e) => {
    setFoodList(e.target.value);
  };
  const servied = (e) => {
    e.preventDefault();
    const { id, roll } = filter[0];
    const serve = {
      id,
      roll,
      date,
      breakFast,
      lanch,
      dinner,
      status,
      foodList,
    };
    // const match = food.filter(
    //   (student) => student?.date == date && student?.brakFast == "Served"
    // );
    // if (match.breakFast === "Served") {
    //   alert("Already Served");
    // } else if (match.lanch === "lanch") {
    //   alert("Already Served");
    // }
    // console.log(match);

    fetch("https://tranquil-chamber-66218.herokuapp.com/served", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(serve),
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
        <div>
          <input
            className="loginFrom mt-3 mb-3 w-50 text-center border-0 mx-auto"
            placeholder="Search By Roll"
            type="text"
            onChange={handleSerch}
          ></input>
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
            <label for="inputEmail4" className="form-label"></label>
            <input type="radio" onClick={handleBreakFast} name="break-fast" />
            Break Fast
            <input type="radio" onClick={handleLanch} name="lanch" />
            Lanch
            <input type="radio" onClick={handleDinner} name="dinner" />
            Dinner
          </div>
          <div className="col-6 mx-auto text-center">
            <button type="submit" className="btn btn-dark">
              Served
            </button>
          </div>
        </form>
        {confirm && (
          <div class="alert alert-success" role="alert">
            Served Student Successfully
          </div>
        )}
      </div>
    </>
  );
};

export default Serving;
