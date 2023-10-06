import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profileLogo from "../../assets/images/profile.jpg";
import Swal from "sweetalert2";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedContacts, setSelectedContacts] = useState([]);

  const userDetails = JSON.parse(localStorage.getItem("loggedInUser")) || [];
  // console.log(userDetails);

  const userEmail = userDetails.email;
  const userContacts = JSON.parse(localStorage.getItem(userEmail)) || [];

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("loggedInUser")) || [];

    const userEmail = userDetails.email;

    const userContacts = JSON.parse(localStorage.getItem(userEmail)) || [];
    setSelectedContacts(userContacts);
  }, []);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
      navigate("/Login");
      return;
    } else if (loggedInUser.isUserLoggedIn === false) {
      navigate("/otp");
    }
  }, []);

  // Contact Delete functionality
  const deleteContact = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");

        const updatedContact = selectedContacts.filter(
          (contact) => contact.id !== id
        );
        console.log(updatedContact);
        setSelectedContacts(updatedContact);

        const userDetails =
          JSON.parse(localStorage.getItem("loggedInUser")) || [];
        const userEmail = userDetails.email;

        localStorage.setItem(userEmail, JSON.stringify(updatedContact)); // Update local storage
      }
    });
  };

  return (
    <div className="container">
      <h1 className="text-white">User Dashboard</h1>

      <div className="row d-flex justify-content-center">
        <div className="card ms-2 mt-2 col-lg-4 m-1" key={userDetails.id}>
          <h4 className="card-title text-center mt-4">
            {userDetails.name}'s Profile
          </h4>
          <img src={profileLogo} className="card-img-top" alt=""></img>
          <div className="card-body p-4">
            <h4 className="card-title">UserID: {userDetails.id}</h4>
            <p>Name: {userDetails.name}</p>
            <p>email: {userDetails.email}</p>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        {" "}
        <div className="d-flex">
          <button
            className="view-button mb-4 me-2"
            onClick={() => navigate("/addcontact")}
          >
            Add Contact
          </button>
          <button
            className="view-button mb-4 me-2"
            onClick={() => navigate("/allcontact")}
          >
            View All Contact
          </button>
          <h4 className="mt-1 pt-1 text-white">
            Total Contacts:
            <span style={{ color: "royalblue", paddingLeft:'15px' }}>
              {userContacts.length}
            </span>
          </h4>
        </div>
        <h3 style={{ color: "#d51c9a" }}>Contact details</h3>
        <div>
          {selectedContacts.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Contact Name</th>
                  <th>Mobile Number</th>
                  <th>Actions/Delete</th>
                  <th>Actions/View</th>
                  <th>Actions/Edit</th>
                </tr>
              </thead>
              <tbody>
                {selectedContacts.slice(0, 5).map((contact, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.mobile}</td>
                    <td>
                      <button
                        className="pro-button ms-3"
                        onClick={() => deleteContact(contact.id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="pro-button ms-3"
                        onClick={() => navigate(`/viewcontact/${contact.id}`)}
                      >
                        View 
                      </button>
                    </td>
                    <td>
                      <button
                        className="pro-button ms-3"
                        onClick={() => navigate(`/editcontact/${contact.id}`)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Contacts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
