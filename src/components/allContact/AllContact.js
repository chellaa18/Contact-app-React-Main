import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component"; // Import DataTable component

import Swal from "sweetalert2";
import "../../App.css";

const AllContact = () => {
  const navigate = useNavigate();
  const [selectedContacts, setSelectedContacts] = useState([]);

  const userDetails = JSON.parse(localStorage.getItem("loggedInUser")) || [];
  const userEmail = userDetails.email;
  const userContacts = JSON.parse(localStorage.getItem(userEmail)) || [];

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("loggedInUser")) || [];
    const userEmail = userDetails.email;
    const userContacts = JSON.parse(localStorage.getItem(userEmail)) || [];
    setSelectedContacts(userContacts);
  }, []);

  //contact Delete functionality
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
        const updatedContacts = selectedContacts.filter(
          (contact) => contact.id !== id
        );
        setSelectedContacts(updatedContacts);

        const userDetails =
          JSON.parse(localStorage.getItem("loggedInUser")) || [];
        const userEmail = userDetails.email;

        localStorage.setItem(userEmail, JSON.stringify(updatedContacts)); // Update local storage
      }
    });
  };

  const columns = [
    {
      name: "S.No",
      selector: "index",
      sortable: true,
    },
    {
      name: "Contact Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Mobile Number",
      selector: "mobile",
      sortable: true,
    },
    {
      name: "Relation",
      selector: "relation",
      sortable: true,
    },
    {
      name: "Actions/Delete",
      cell: (row) => (
        <button
          className="pro-button ms-1"
          onClick={() => deleteContact(row.id)}
        >
          Delete
        </button>
      ),
    },
    {
      name: "Actions/View",
      cell: (row) => (
        <button
          className="pro-button"
          onClick={() => navigate(`/viewcontact/${row.id}`)}
        >
          View
        </button>
      ),
    },
    {
      name: "Actions/Edit",
      cell: (row) => (
        <button
          className="pro-button"
          onClick={() => navigate(`/editcontact/${row.id}`)}
        >
          Edit
        </button>
      ),
    },
  ];

  return (
    <div className="container vh-100">
      <div>
        <div className="d-flex">
          <button
            className="view-button mb-4 me-2"
            onClick={() => navigate("/addcontact")}
          >
            Add Contact
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="view-button mb-4"
          >
            Go to dashboard
          </button>
        </div>

        <h4 className="mt-1 pt-1 text-white">
          Total Contacts:
          <span style={{ color: "royalblue", paddingLeft: "15px" }}>
            {userContacts.length}
          </span>
        </h4>
      </div>
      <div className="table-container" style={{ height: "200px" }}>
        {selectedContacts.length > 0 ? (
          <DataTable
            title="All Contacts"
            columns={columns}
            data={selectedContacts.map((contact, index) => ({
              ...contact,
              index: index + 1,
            }))}
            pagination
            paginationPerPage={6}
            
           
            id="data-table"
            customStyles={{
              rows: {
                style: {
                  backgroundColor: '#403f41', 
                },
              },
              headRow: {
                style: {
                  backgroundColor: '#212529', 
                  color: '#d51c9a' ,
                  
                },
              },
              expandableRow: {
                style: {
                  backgroundColor: 'black', 
                },
              },
              cells: {
                style: {
                  color: 'white', 
                },
              },
            }}
          />
        ) : (
          <p>No Contacts available.</p>
        )}
      </div>
    </div>
  );
};

export default AllContact;
