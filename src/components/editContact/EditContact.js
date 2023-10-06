import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const schema = yup
  .object({
    name: yup
      .string()
      .matches(/^[a-zA-Z ]*$/g, "Name should be in alphabets")
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name should not exceed 20 characters")
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
  })
  .required();

const EditContact = () => {
  const navigate = useNavigate();
  const params = useParams();

  const userDetails = JSON.parse(localStorage.getItem("loggedInUser")) || [];

  const userEmail = userDetails.email;

  const userContacts = JSON.parse(localStorage.getItem(userEmail));

  const contactToEdit = userContacts.find((contact) => contact.id == params.id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      name: contactToEdit.name,
      mobile: contactToEdit.mobile,
      relation: contactToEdit.relation,
    },
  });

  const onSubmit = (data) => {
    const contactIndex = userContacts.findIndex(
      (contact) => contact.id == params.id
    );

    const updatedUserContacts = [...userContacts];
    updatedUserContacts[contactIndex] = {
      ...updatedUserContacts[contactIndex],
      ...data,
    };

    localStorage.setItem(userEmail, JSON.stringify(updatedUserContacts));
    Swal.fire(
      { icon: "success", title: "Updated", text: "Contact Updated Successfully" },

      navigate("/allcontact")
    );
  };

  return (
    <div className="container vh-100">
      <form onSubmit={handleSubmit(onSubmit)} className="text-white p-5">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Name
          </label>

          <input
            type="text"
            id="name"
            name="name"
            {...register("name")}
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.name?.message}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Mobile
          </label>

          <input
            type="number"
            id="mobile"
            name="mobile"
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
            className={`form-control ${errors.relation ? "is-invalid" : ""}`}
          >
            <option value="">Select Relation</option>
            <option value="family">Family</option>
            <option value="friend">Friend</option>
            <option value="colleague">Colleague</option>
          </select>
          <div className="invalid-feedback">{errors.relation?.message}</div>
        </div>

        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditContact;
