import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard/Dashboard/Dashboard";

const Served = () => {
  const [servedData, setServed] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  useEffect(() => {
    fetch(`https://tranquil-chamber-66218.herokuapp.com/served?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setServed(data.serveds);
        const count = data.count;
        const pageNumber = Math.ceil(count / 10);
        setPageCount(pageNumber);
      });
  }, [page]);
  console.log(servedData);
  return (
    <>
      <Dashboard></Dashboard>
      <div className="container mt-2">
        <h3 className="text-center">Served Student List</h3>
        <div className="table-responsive">
          <table className="table table-hover table-light">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Id</th>
                <th scope="col">Roll</th>
                <th scope="col">Date</th>
                <th scope="col">Break Fast</th>
                <th scope="col">Lanch</th>
                <th scope="col">Dinner</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {servedData?.map((student) => (
                <tr key={student._id}>
                  <td>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={student._id}
                        id="flexCheckDefault"
                      />
                    </div>
                  </td>
                  <td>{student.id}</td>
                  <td>{student.roll}</td>
                  <td>{student.date}</td>
                  <td>{student.breakFast}</td>
                  <td>{student.lanch}</td>
                  <td>{student.dinner}</td>
                  <td>{student.foodList}</td>
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
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Served;
