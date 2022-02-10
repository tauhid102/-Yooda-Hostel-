import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard/Dashboard";

const EditFood = () => {
  const { foodId } = useParams();
  const [food, setFood] = useState({});
  const [updateFood, setUpdateFood] = useState({});
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    const url = `https://tranquil-chamber-66218.herokuapp.com/foods/${foodId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setFood(data));
  }, [foodId]);
  console.log(food);
  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newAddData = { ...updateFood };
    newAddData[field] = value;
    setUpdateFood(newAddData);
  };
  const handleAddProduct = (e) => {
    e.preventDefault();
    const item = {
      ...updateFood,
    };
    fetch(`https://tranquil-chamber-66218.herokuapp.com/foods/${foodId}`, {
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
        <div className="row row-cols-1 row-cols-sm-2">
          <div className="col">
            <h3 className="mt-5">
              Please Provide<span className="text-danger"> Information </span>
              For Update <span className="text-danger">Foods</span>
            </h3>
            <form
              className="row g-3 w-100 inputFrom mt-2 loginFrom"
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
              <div className="col-12 mx-auto text-center">
                <button type="submit" className="btn btn-dark">
                  Update Food
                </button>
              </div>
            </form>
            {confirm && (
              <div class="alert alert-success" role="alert">
                Update Food Successfully
              </div>
            )}
          </div>
          <div className="col mt-5">
            <h4 className="text-center">Previous Information</h4>
            <div className="mx-auto w-50 border border-4 p-3 loginFrom">
              <h6>Food Id: {food.id}</h6>
              <h6>Food name: {food.name}</h6>
              <h6>Food Price: {food.price}</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditFood;
