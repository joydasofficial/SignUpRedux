import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from '../../features/UserSlice';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";


const register = () => {
  const [successful, setSuccessful] = useState(false);
  const dispatch = useDispatch();

  const {name} = useSelector((state)=> state.user);
  console.log(name);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    cpassword: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val) =>
          val &&
          val.toString().length >= 3 &&
          val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val) =>
          val &&
          val.toString().length >= 6 &&
          val.toString().length <= 40
      )
      .required("This field is required!"),
    cpassword: Yup.string()
    .test(
      "len",
      "The password must be between 6 and 40 characters.",
      (val) =>
        val &&
        val.toString().length >= 6 &&
        val.toString().length <= 40
    )
    .required("This field is required!"),
  });

  const handleRegister = (formValue) => {
    const { username, email, password, cpassword } = formValue;

    setSuccessful(false);

    dispatch(registerUser({ username, email, password, cpassword }));
      
  };

  return (
    <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Field name="username" type="text" className="form-control" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cpassword">Confirm Password</label>
                  <Field
                    name="cpassword"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="cpassword"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <button type="submit">Sign Up</button>
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
  );
}

export default register