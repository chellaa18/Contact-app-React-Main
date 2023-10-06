import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/pngwing.com.png";
import { Link } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem("loggedInUser"));
  console.log(userDetails);
 // Check if user details exist in local storage
 const isUserIn = userDetails && userDetails.isUserLoggedIn !== false;

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-transparent p-3">
        <div className="container">
          <div className="d-flex navbar-brand text-white flex-grow-1">
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                width="30"
                height="30"
                className="d-inline-block align-text-top me-3"
                onClick={() => navigate("/")}
              />
            </Link>

            <Link to="/" className="text-decoration-none">
              <h4
                className="text-decoration-none mt-1"
                // onClick={() => navigate("/")}
                style={{ color: "#d51c9a" }}
              >
                Contact Management App
              </h4>{" "}
            </Link>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="sidebar offcanvas offcanvas-end"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5
                className="offcanvas-title text-white"
                id="offcanvasNavbarLabel"
              >
                Offcanvas
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav d-flex justify-content-evenly flex-grow-1 pe-3">
                <input
                  className="position-relative"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
               {isUserIn ? (
                  <button
                    className="view-button p-3 text-decoration-none"
                    onClick={() => {
                     navigate('/allcontact')
                    }}
                  >
                    Contacts
                  </button>
                ) : (
                  <Link
                    className="view-button p-3 text-decoration-none"
                    type="submit"
                    to="/registration"
                  >
                    Register
                  </Link>
                )}
                {userDetails ? (
                  <Link
                    onClick={() => {localStorage.removeItem("loggedInUser")}}
                    to="/Login"
                    className="view-button p-3 text-decoration-none"
                  >
                    Log Out
                  </Link>
                ) : (
                  <Link className="view-button p-3 text-decoration-none"   to="/Login" >
                    Login
                  </Link>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
