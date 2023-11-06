import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { UserDataContext } from "./context/UserContext";
import { Formik, setIn } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

function Edit() {
  const params = useParams();
  const { API_URL } = useContext(UserDataContext);
  const [initialValues, setInitialValues] = useState({
    title: "",
    note: "",
  });
  let navigate = useNavigate();
  const UserSchema = Yup.object().shape({
    title: Yup.string().required("* Required"),
    note: Yup.string().required("* Required"),
  });
  const getData = async (id) => {
    try {
      let res = await axios.get(`${API_URL}/${id}`);
      if (res.status === 200) {
        setInitialValues(res.data);
        console.log(res.data);
        toast.success("User Data Fetched");
      }
    } catch (error) {
      toast("Error Occoured");
    }
  };

  const handleEditNote = async (values) => {
    try {
      let res = await axios.put(`${API_URL}/${params.id}`, values);
      if (res.status === 200) {
        navigate("/notes");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (Number(params.id)) {
      getData(Number(params.id));
    } else {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="height">
        <div className="card edit">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Edit</h1>
          </div>
          <div className="row">
            <Formik
              initialValues={initialValues}
              validationSchema={UserSchema}
              enableReinitialize={true}
              onSubmit={(values) => {
                handleEditNote(values);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleSubmit,
                handleChange,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label></Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      placeholder="Title"
                      value={values.title}
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
                      value={values.note}
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
      </div>
    </>
  );
}

export default Edit;

