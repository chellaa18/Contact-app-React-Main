import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator
import { useNavigate } from "react-router-dom";

//schema validation
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name should not exceed 20 characters")
    .matches(/^[a-zA-Z ]*$/g, "Name should be in alphabets")
    .trim(),
  mobile: yup
    .string()
    .required("mobile Number is Required")
    .matches(
      /^[0-9]{10}$/g,
      "mobile number should be in numeric value and  10 digits"
    )
    .trim(),
  relation: yup.string().required("Relation is required"),
});

const AddContact = () => {
  const [contact, setContact] = useState([]);
  const navigate = useNavigate();

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { errors } = formState;
  //generating an id using UUID generator
  const generate10DigitUUID = () => {
    const fullUUID = uuidv4();
    const trimmedUUID = fullUUID.replace(/-/g, "").substring(0, 10);
    return trimmedUUID;
  };

  //onsubmit data
  const onSubmit = (data) => {
    const contactID = generate10DigitUUID();

    const userDetails = JSON.parse(localStorage.getItem("loggedInUser"));
    const userEmail = userDetails.email;
    let userSavedContacts = JSON.parse(localStorage.getItem(userEmail)) || [];

    // check if the mobile number already exists
    const existingContact = userSavedContacts.find(
      (contact) => contact.mobile === data.mobile
    );

    if (existingContact) {
      toast.error("Mobile Number already exist");
    } else {
      userSavedContacts.push({ id: contactID, ...data });

      // Update local storage with the updated array
      localStorage.setItem(userEmail, JSON.stringify(userSavedContacts));

      // Update the state with the new contact
      setContact([...contact, { id: contactID, ...data }]);

      toast.success("Contact added successfully!");
      reset();
      setTimeout(() => {
        navigate("/allcontact");
      }, 2000);
    }
  };

  return (
    <div className="container text-white">
      <button
        onClick={() => navigate("/dashboard")}
        className="view-button mb-4"
      >
        Go to dashboard
      </button>
      <button
        className="view-button mb-4 ms-2"
        onClick={() => navigate("/allcontact")}
      >
        View All Contact
      </button>
      <div className="row d-flex justify-content-center">
        <div className="col-lg-5">
          <div></div>
          <h2>Add Contact</h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-5 rounded"
            style={{ backgroundColor: "rgba(255, 0, 174, 0.12" }}
          >
            <div className="form-group  my-3">
              <label className="text-white">Name</label>
              <input
                autoFocus
                name="name"
                type="text"
                {...register("name")}
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.name?.message}</div>
            </div>
            <div className="form-group my-3">
              <label className="text-white">Mobile:</label>
              <input
                name="mobile"
                type="text"
                {...register("mobile")}
                className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.mobile?.message}</div>
            </div>
            <div className="form-group my-3">
              <label className="text-white">Relation:</label>
              <select
                name="relation"
                {...register("relation")}
                className={`form-control ${
                  errors.relation ? "is-invalid" : ""
                }`}
              >
                <option value="">Select Relation</option>
                <option value="family">Family</option>
                <option value="friend">Friend</option>
                <option value="colleague">Colleague</option>
              </select>
              <div className="invalid-feedback">{errors.relation?.message}</div>
            </div>

            <button type="submit" className="view-button">
              Add contact
            </button>
          </form>
        </div>
      </div>

      <div className="toast-container">
        <ToastContainer limit={2} />
      </div>
    </div>
  );
};

export default AddContact;
