import React, { useState } from "react";
import Dashboard from "../Dashboard/Dashboard/Dashboard";

const AddFood = () => {
  const [addFoods, setAddFoods] = useState({});
  const [confirm, setConfirm] = useState(false);
  // const { user, registerUser, isLoading, authError } = useAuth();

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newAddData = { ...addFoods };
    newAddData[field] = value;
    setAddFoods(newAddData);
  };
  const handleAddFood = (e) => {
    e.preventDefault();
    const product = {
      ...addFoods,
    };
    fetch("http://localhost:5000/foods", {
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
          <div className="col">
            <h3 className="mt-5">
              Please Provide<span className="text-danger"> Information </span>
              For Add <span className="text-danger">Foods</span>
            </h3>
            <form
              className="row g-3 w-100 inputFrom mt-3 loginFrom"
              id="create-course-form"
              onSubmit={handleAddFood}
            >
              <div className="col-12">
                <label for="inputAddress" className="form-label">
                  Food Id
                </label>
                <input
                  type="number"
                  name="id"
                  onBlur={handleOnBlur}
                  className="form-control"
                  id="inputAddress"
                  onkeypress="return event.charCode >= 48"
                  min="1"
                  placeholder="Ex: 1"
                />
              </div>
              <div className="col-12">
                <label for="inputEmail4" className="form-label">
                  Food Name
                </label>
                <input
                  type="text"
                  name="name"
                  onBlur={handleOnBlur}
                  className="form-control"
                  id="inputEmail4"
                  placeholder="Burger"
                />
              </div>
              <div className="col-12">
                <label for="inputEmail4" className="form-label">
                  Cost
                </label>
                <input
                  type="number"
                  name="price"
                  onBlur={handleOnBlur}
                  className="form-control"
                  id="inputEmail4"
                  onkeypress="return event.charCode >= 48"
                  min="1"
                  placeholder="Ex: 70"
                />
              </div>
              <div className="col-12 mx-auto text-center">
                <button type="submit" className="btn btn-dark">
                  Add Food
                </button>
              </div>
            </form>
            {confirm && (
              <div class="alert alert-success" role="alert">
                Add Food Successfully
              </div>
            )}
          </div>
          <div className="col picutre">
            {/* <img src={picture} alt="" /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFood;
