import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard/Dashboard";
import "../../Style/style.css";

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [active, setActive] = useState(true);
  const [inActive, setInActive] = useState(true);
  // const size=10;
  useEffect(() => {
    fetch(`http://localhost:5000/students?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setStudents(data.students);
        const count = data.count;
        const pageNumber = Math.ceil(count / 10);
        setPageCount(pageNumber);
      });
  }, [page,active,inActive]);

  const handleDeleteStudent = (id) => {
    const proceed = window.confirm("Are you sure, you want to delete?");
    if (proceed) {
      const url = `http://localhost:5000/students/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.deletedCount > 0) {
            alert("Cancel Successfully");
            const restStudents = students.filter((food) => food._id !== id);
            setStudents(restStudents);
          }
        });
    }
  };
  const handleActiveStatus =(id)=>{
    setActive(true);
    const ids = { id };
        const proceed = window.confirm('Are you sure, you want to active?');
        if (proceed) {
            const url = `http://localhost:5000/students/active/${id}`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(ids)
            })
                .then(res => res.json())
                .then(result => {
                    if (result.modifiedCount > 0) {
                        alert('Active Successfully');
                        setActive(false);
                    }
                })
        }

  }
  const handleInActiveStatus =(id)=>{
    setInActive(true);
    const ids = { id };
        const proceed = window.confirm('Are you sure, you want to InActive?');
        if (proceed) {
            const url = `http://localhost:5000/students/inActive/${id}`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(ids)
            })
                .then(res => res.json())
                .then(result => {
                    if (result.modifiedCount > 0) {
                        alert('InActive Successfully');
                        setInActive(false);
                    }
                })
        }
  }
  return (
    <>
      <Dashboard></Dashboard>
      <div className="container mt-2">
        <h3 className="text-center">All Students Are Here</h3>

        <div className="table-responsive">
          <table className="table table-hover table-light">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Id</th>
                <th scope="col">Full Name</th>
                <th scope="col">Roll</th>
                <th scope="col">Age</th>
                <th scope="col">CLass</th>
                <th scope="col">Hall</th>
                <th scope="col">Status</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {students?.map((student) => (
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
                  <td>{student.name}</td>
                  <td>{student.roll}</td>
                  <td>{student.age}</td>
                  <td>{student.class}</td>
                  <td>{student.hall}</td>
                  <td>
                    
                    <div className="btn-group" role="group">
                      <button
                        id="btnGroupDrop1"
                        type="button"
                        className="btn border ms-2 dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {student.status}
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                        <li>
                          <button onClick={() => handleActiveStatus(student._id)} className="btn btn-group btn-info w-100">Active</button>
                        </li>
                        <li>
                          <button onClick={() => handleInActiveStatus(student._id)} className="btn btn-group btn-warning w-100">InActive</button>
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td>
                    <Link to={`/students/${student._id}`}>
                      <button className="btn btn-primary b-0">
                        <i class="far fa-edit"></i>
                      </button>
                    </Link>
                  </td>
                  <td>
                    {" "}
                    <button
                      onClick={() => handleDeleteStudent(student._id)}
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
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllStudents;
