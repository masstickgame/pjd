import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import swal from 'sweetalert';
const Login = () => {
  // const classes = useStyles();
  // const ^Y&ie = useNavigate();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      username,
      password
    });
    // if ('accessToken' in response) {
    //   swal("Success", response.message, "success", {
    //     buttons: false,
    //     timer: 2000,
    //   })
    //   .then((value) => {
    //     localStorage.setItem('accessToken', response['accessToken']);
    //     localStorage.setItem('user', JSON.stringify(response['user']));
    //     window.location.href = "/profile";
    //   });
    // } else {
    //   swal("Failed", response.message, "error");
    // }
    window.location.replace('/admin/index');
    // window.location("/admin/index")
    // akte("/admin/index");

  }

  return (
    <>
    <p>test</p>
    </>
  );
};
async function loginUser(credentials) {
  console.log(credentials)
  // return fetch('https://www.mecallapi.com/api/login', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(credentials)
  // })
  //   .then(data => data.json())
 }
export default Login;
