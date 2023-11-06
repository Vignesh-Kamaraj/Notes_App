import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { UserDataContext } from "./context/UserContext";

function content() {
  let { API_URL } = useContext(UserDataContext);
  let navigate = useNavigate();
  const UserSchema = Yup.object().shape({
    title: Yup.string().required("* Required"),
    note: Yup.string().required("* Required"),
  });
  const handleAddNotes = async (values) => {
    try {
      let res = await axios.post(API_URL, values);
      if (res.status == 201) {
        navigate("/notes");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container-fluid card">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Add a Note</h1>
        </div>
        <div className="row">
          <Formik
            initialValues={{
              title: "",
              note: "",
            }}
            validationSchema={UserSchema}
            onSubmit={(values) => {
              handleAddNotes(values);
            }}
          >
            {({ errors, touched, handleBlur, handleSubmit, handleChange }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.title && touched.title ? (
                    <div style={{ color: "red" }}>{errors.title}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="text"
                    name="note"
                    placeholder="Take a note..."
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.note && touched.note ? (
                    <div style={{ color: "red" }}>{errors.note}</div>
                  ) : null}
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default content;
