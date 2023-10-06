import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewContact = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("loggedInUser")) || [];
    const userEmail = userDetails.email;
    const userContacts = JSON.parse(localStorage.getItem(userEmail)) || [];

    // Find the contact with the matching id
    const foundContact = userContacts.find((c) => c.id === params.id);

    if (foundContact) {
      setContact(foundContact);
    } else {
  
      navigate("/allcontact"); // Redirect to the contacts list page or handle it as you wish
    }
  }, [params.id]);

  return (
    <div className="container vh-100">
      <div className="toast-container">
        <ToastContainer limit={1} />
      </div>
      <div className="row d-flex justify-content-center">
        {contact ? (
          <div className="card ms-2 mt-2 col-lg-4 m-1" key={contact.id}>
            <div className="card-body p-4">
              <p className="text-white">Contact Name: {contact.name}</p>
              <p className="text-white">Mobile: {contact.mobile}</p>
              <p className="text-white">Relation: {contact.relation}</p>
            
            </div>
            <button
              className="view-button mb-4"
              onClick={() => navigate("/allcontact")}
            >
              Go back
            </button>
          </div>
        ) : (
          <p>Contact not found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewContact;
