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
  const handleAddProduct = (e) => {
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
              className="row g-3 w-100 inputFrom mt-2"
              id="create-course-form"
              onSubmit={handleAddProduct}
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
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-dark">
                  Add Food
                </button>
              </div>
              {confirm && (
                <div class="alert alert-success" role="alert">
                  Add Food Successfully
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

export default AddFood;
