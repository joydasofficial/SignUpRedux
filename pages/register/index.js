import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from '../../features/UserSlice';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from 'next/router'
import styles from './style.module.css'


const register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fieldValue, setFieldValue] = useState({});

  const dispatch = useDispatch();
  const router = useRouter()

  const userData = useSelector((state)=> state.user);

  if(userData.email !== ""){
    router.push('/profile');
  }

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

  const handleRegister = (formValue, values) => {
    const { username, email, password, cpassword } = formValue;

    if(password !== cpassword){
      alert('Password does not match')
    }
    else{
      dispatch(registerUser({ username, email, password, cpassword, fieldValue}));f
    }

    
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <div className={styles.header}>
          <h1>Register</h1>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
              <div>
                <div className={styles.formGroup}>
                  <label htmlFor="username">Username</label>
                  <Field name="username" type="text" className={styles.formInput} />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className={styles.formError}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <Field name="email" type="email" className={styles.formInput} />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={styles.formError}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className={styles.formInput}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={styles.formError}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="cpassword">Confirm Password</label>
                  <Field
                    name="cpassword"
                    type={showPassword ? 'text' : 'password'}
                    className={styles.formInput}
                  />
                  <ErrorMessage
                    name="cpassword"
                    component="div"
                    className={styles.formError}
                  />
                </div>
                <input id="file" name="file" type="file" className={styles.avatarInput} onChange={(e) => {
                  const fileReader = new FileReader();
                  fileReader.onload = () => {
                    if (fileReader.readyState === 2) {
                      setFieldValue(fileReader.result);
                    }
                  };
                  fileReader.readAsDataURL(e.target.files[0]);
                }}/>
                <div className={styles.formGroup}>
                  <button type="button" className={styles.button} onClick={()=>setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'} password</button>
                </div>
                <div className={styles.formGroup}>
                  <button type="submit" className={styles.button}>Sign Up</button>
                </div>
              </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default register