import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard/Dashboard";
import '../../Style/style.css'


const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  // const size=10;
  useEffect(() => {
    fetch(`http://localhost:5000/foods?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setFoods(data.foods);
        const count = data.count;
        const pageNumber = Math.ceil(count / 10);
        setPageCount(pageNumber);
      });
  }, [page]);

  const handleDeleteFood = (id) => {
    const proceed = window.confirm("Are you sure, you want to delete?");
    if (proceed) {
      const url = `http://localhost:5000/foods/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.deletedCount > 0) {
            alert("Cancel Successfully");
            const restFoods = foods.filter((food) => food._id !== id);
            setFoods(restFoods);
          }
        });
    }
  };
  return (
    <>
      <Dashboard></Dashboard>
      <div className="container mt-5">
        <h1 className="text-center">All Foods Are Here</h1>
        <div className="table-responsive">
          <table className="table table-hover table-light">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Id</th>
                <th scope="col">Price</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {foods?.map((food) => (
                <tr key={food._id}>
                  <td>{food.name}</td>
                  <td>{food.id}</td>
                  <td>{food.price}</td>
                  <td>
                    <Link to={`/foods/${food._id}`}>
                      <button className="btn btn-primary b-0"><i class="far fa-edit"></i></button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteFood(food._id)}
                      className="btn btn-danger b-0"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          {[...Array(pageCount).keys()].map((number) => (
            <button
              className={number === page ? "selected" : ""}
              key={number}
              onClick={() => setPage(number)}
            >
              {number+1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllFoods;
