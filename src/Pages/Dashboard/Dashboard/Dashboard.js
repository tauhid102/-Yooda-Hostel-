import React from "react";
import { Container, Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const { adminEmail, adminLogOut } = useAuth();
  let isLoggedIn=localStorage.getItem("adminLoggedIn");
  return (
    <div className="">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/dashboard">
            <Image className="logo"></Image> Yooda Service
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/allStudents">
                All Student
              </Nav.Link>
              <Nav.Link as={Link} to="/allFoods">
                All Food
              </Nav.Link>
              <Nav.Link as={Link} to="/addStudent">
                Add Student
              </Nav.Link>
              <Nav.Link as={Link} to="/addFoods">
                Add Food
              </Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              {isLoggedIn ? (
                <button className="btn btn-dark logout-button" onClick={adminLogOut}>
                  Logout
                </button>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Dashboard;
