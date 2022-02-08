import React from "react";
import "../../Style/style.css";
import useAuth from "../hooks/useAuth";
const AdminLogin = () => {
  const { adminLogin, handleAdminEmailChange, handleAdminPassChange } =
    useAuth();
  return (
    <div className="container mt-5">
      <div className="row row-cols-1 row-cols-md-3 ">
        <div className="col"></div>
        <div className="col">
          <div className="w-100 m-auto mt-5 loginFrom">
            <h3 className=" text-center">Admin Login</h3>
            <div>
              <form class="row g-3">
                <div class="col-12">
                  <label for="inputEmail4" class="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Your Email"
                    onBlur={(e) => handleAdminEmailChange(e)}
                  />
                </div>
                <div class="col-12">
                  <label for="inputPassword4" class="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="pass"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Your Password"
                    onBlur={(e) => handleAdminPassChange(e)}
                  />
                </div>
                <div class="col-12 text-center">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={adminLogin}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default AdminLogin;
