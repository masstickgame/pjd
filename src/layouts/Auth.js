
import React, { useState } from 'react';
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import { Container, Button, Card, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Col } from "reactstrap";
import Swal from 'sweetalert2'
// core components
// import AuthNavbar from "components/Navbars/AuthNavbar.js";
// import AuthFooter from "components/Footers/AuthFooter.js";

// import routes from "routes.js";

const Auth = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.body.classList.add("bg-default");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const [user_name, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      user_name,
      password,
      strategy: 'local',
    });
    // console.log(credentials)
    if ('access_token' in response) {
      Swal.fire("Success", 'Login Success', "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        console.log(response)
        localStorage.setItem('accessToken', response['access_token']);
        localStorage.setItem('name', response['name']);
        localStorage.setItem('user_id', response['id']);
        localStorage.setItem('user_type', response['user_type']);
        if(response['user_type'] === 'admin'){
          window.location.replace('/admin/index');
        }else   if(response['user_type'] === 'user'){
          window.location.replace('/admin/information');
        }else{
          window.location.replace('/admin/index');
        }
      });
    } else {
      Swal.fire("Failed", 'Please check your Username or Password again.', "error");
    }
  }

  return (
    <>
      <div className="main-content" ref={mainContent}>
        {/* <AuthNavbar /> */}
        <div className="header bg-gradient-info py-7 py-lg-8">
          <Container>
            <Col lg="6" md="6" style={{ top: "100px", margin: "auto" }}>
              <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Login To Your Account </small>
                  </div>
                  <Form role="form" onSubmit={handleSubmit}>
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="User"
                          type="text"
                          autoComplete="text"
                          onChange={e => setUserName(e.target.value)}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password"
                          type="password"
                          autoComplete="new-password"
                          onChange={e => setPassword(e.target.value)}
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id=" customCheckLogin"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor=" customCheckLogin"
                      >
                        <span className="text-muted">Remember me</span>
                      </label>
                    </div>
                    <div className="text-center">
                      <Button color="primary" type="submit" >
                        Sign in
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Container>
        </div>

      </div>
    </>
  );
};

async function loginUser(credentials) {

  return fetch('https://api-ii.onrender.com/system/loginCheck', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',

    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}
export default Auth;
