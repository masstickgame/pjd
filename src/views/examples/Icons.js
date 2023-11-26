import React, { useEffect, useState } from 'react';
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Alert,
  Table,
  CardTitle,
  Button,
  Input, Label, FormGroup,
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
// import { useNavigate } from 'react-router-dom';
// core components
import Header from "components/Headers/Header.js";


const Icons = () => {
  const [items, setItems] = useState([]);
  const [copiedText, setCopiedText] = useState();
  const [modalShow, setModalShow] = React.useState(false);
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdi] = useState(false);
  const [user_name, setUserName] = useState();
  const [password, setPassword] = useState();
  const [user_type, setUserType] = useState("undefined");
  const [user_firstname, setUserFirstname] = useState();
  const [user_lastname, setUserLastname] = useState();
  const [user_year, setuseYear] = useState();
  const [user_unit, setUserUnit] = useState();
  const [id_card, setIdCarde] = useState();
  const [tel, setTel] = useState();
  const [student_id, setStudentId] = useState();
  const [id, setId] = useState();
  const [user_firstname_th, setFirstnameth] = useState();
  const [user_lastname_th, setLastnameth] = useState();

  useEffect(() => {
    getuserData()
  }, []);

  const getuserData = async () => {
    let users = await get_userall()
    setItems(users)
    console.log(user_type)
  };
  const getuserbyidData = async (ids) => {
    const response = await get_userbyid({
      id: ids,
    });

    setId(ids)
    setUserFirstname(response[0].user_firstname)
    setUserLastname(response[0].user_lastname)
    setuseYear(response[0].user_year)
    setUserUnit(response[0].user_unit)
    setIdCarde(response[0].id_card)
    setTel(response[0].tel)
    setStudentId(response[0].student_id)
    setUserType(response[0].user_type)
    toggleEdit()

  };
  const adduserData = async () => {
    const substringResult = user_lastname.substring(0, 1);
    let nameStr = user_firstname + '.' + substringResult
    if(user_type === 'teacher'){
      setStudentId(tel) 
    }
    const response = await add_user({
      user_name: nameStr,
      password: student_id,
      user_type,
      user_firstname,
      user_lastname,
      user_year,
      user_unit,
      id_card,
      tel,
      student_id,
      user_firstname_th,
      user_lastname_th
    });
    toggle()
    getuserData()
  };
  const updateuserData = async () => {
    const substringResult = user_lastname.substring(0, 1);
    let nameStr = user_firstname + '.' + substringResult
    if(user_type === 'teacher'){
      setStudentId(tel) 
    }
    const response = await updateuser({
      id: id,
      user_name: nameStr,
      password: student_id,
      user_type,
      user_firstname,
      user_lastname,
      user_year,
      user_unit,
      id_card,
      tel,
      student_id,
      user_firstname_th,
      user_lastname_th
    });
    toggleEdit()
    getuserData()
  };
  const deleteuserData = async () => {
    const response = await deleteuser({
      id: id,
    });
    toggleEdit()
    getuserData()
  };
  let args
  const toggle = () => setModal(!modal);
  const toggleEdit = () => setModalEdi(!modalEdit);

  const handleSelectChange = (event) => {
    setUserType(event.target.value); // เมื่อมีการเปลี่ยนแปลงค่าใน <select> ให้อัปเดตค่า selectedValue
  };

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
          </div>
        </Container>
      </div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <Col lg="4" >
            <Input
            />
          </Col>
          <Col lg="4" >
            <Button
              color="primary"
            >
              ค้นหา
            </Button>
          </Col>
          <Col lg="4" >
            <Button style={{ float: "right" }} color="primary" onClick={toggle}>
              + เพิ่มรายชื่อผู้ใช้งาน
            </Button>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col lg="12">
            <Card className="shadow">
              <Table bordered>
                <thead>
                  <tr>
                    <th>
                      <center>
                        รายละเอียด
                      </center>
                    </th>
                    <th>
                      <center>
                      Firstname
                      </center>
                    </th>
                    <th>
                      <center>
                      Lastname
                      </center>
                    </th>
                    <th>
                      <center>
                        ชื่อ
                      </center>
                    </th>
                    <th>
                      <center>
                        สกุล
                      </center>
                    </th>
                    <th>
                      <center>
                        สิทธิ์การใช้งาน
                      </center>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* funtion loop data by api */}
                  {items.map((data, idx) => (
                    <tr key={data.id}>
                      <td scope="row" style={{ width: "10%" }}>
                        <Button color="primary" size="sm" style={{ margin: "auto", display: "block" }} onClick={() => getuserbyidData(data.id)} >
                          <div>
                            <i class="fa fa-plus" aria-hidden="true"></i>
                          </div>
                        </Button>
                      </td>
                      <td> {data.user_firstname} </td>
                      <td> {data.user_lastname}</td>
                      <td> {data.user_firstname_th} </td>
                      <td> {data.user_lastname_th}</td>
                      <td>
                        {data.user_type === "admin" && "ผู้ดูแล"}
                        {data.user_type === "user" && "ผู้ใช้ทั่วไป"}
                        {data.user_type === "teacher" && "อาจารย์"}

                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={modal} toggle={toggle} {...args}>
          <ModalHeader toggle={toggle}>Add</ModalHeader>
          <ModalBody>
            <Row>
              <Col lg="12">
                <FormGroup>
                  <Label for="user_type">
                    สิทธิ์การใช้งาน
                  </Label>
                  <Input
                    id="exampleSelectMulti"
                    name="select"
                    type="select"
                    onChange={handleSelectChange}
                  >
                    <option value="undefined">
                      กรุณาเลือก
                    </option>
                    <option value="admin">
                      ผู้ดูแล
                    </option>
                    <option value="user">
                      ผู้ใช้ทั่วไป
                    </option>
                    <option value="teacher">
                      อาจารย์
                    </option>
                  </Input>
                </FormGroup>
              </Col>
              {user_type != "undefined" && <Col lg="6">
                <FormGroup>
                  <Label for="user_firstname">
                  Firstname
                  </Label>
                  <Input
                    id="user_firstname"
                    name="user_firstname"
                    placeholder="Enter Firstname"
                    type="text"
                    onChange={e => setUserFirstname(e.target.value)}
                  />
                </FormGroup>
              </Col>}
              {user_type != "undefined" &&
                <Col lg="6">
                  <FormGroup>
                    <Label for="user_lastname">
                    Lastname
                    </Label>
                    <Input
                      id=""
                      name="user_lastname"
                      placeholder="Enter Firstname"
                      type="text"
                      onChange={e => setUserLastname(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              }
                {user_type != "undefined" && <Col lg="6">
                <FormGroup>
                  <Label for="user_firstname">
                    ชื่อ
                  </Label>
                  <Input
                    id="user_firstname"
                    name="user_firstname"
                    placeholder="Enter Firstname"
                    type="text"
                    onChange={e => setFirstnameth(e.target.value)}
                  />
                </FormGroup>
              </Col>}
              {user_type != "undefined" &&
                <Col lg="6">
                  <FormGroup>
                    <Label for="user_lastname">
                      นามสกุล
                    </Label>
                    <Input
                      id=""
                      name="user_lastname"
                      placeholder="Enter Firstname"
                      type="text"
                      onChange={e => setLastnameth(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              }
              {user_type == 'user' && <Col lg="6">
                <FormGroup>
                  <Label for="user_year">
                    ปี
                  </Label>
                  <Input
                    id="user_year"
                    name="user_year"
                    placeholder="Enter year"
                    type="number"
                    onChange={e => setuseYear(e.target.value)}
                  />
                </FormGroup>
              </Col>
              }
              {user_type == 'user' && <Col lg="6">
                <FormGroup>
                  <Label for="user_unit">
                    หน่วยกิต
                  </Label>
                  <Input
                    id="user_unit"
                    name="user_unit"
                    placeholder="Enter unit"
                    type="number"
                    value={user_unit}
                    onChange={e => setUserUnit(e.target.value)}
                  />
                </FormGroup>
              </Col>
              }
              
              {/* {user_type == 'user' && <Col lg="6">
                <FormGroup>
                  <Label for="id_card">
                    เลขบัตรประชาชน
                  </Label>
                  <Input
                    id="id_card"
                    name="id_card"
                    placeholder="Enter id card"
                    type="text"
                    onChange={e => setIdCarde(e.target.value)}
                  />
                </FormGroup>
              </Col>
              } */}
              {user_type != "undefined" &&
                <Col lg="6">
                  <FormGroup>
                    <Label for="tel">
                      เบอร์โทร
                    </Label>
                    <Input
                      id="tel"
                      name="tel"
                      placeholder="Enter Tel"
                      type="text"
                      onChange={e => setTel(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              }
              {user_type == 'user' && <Col lg="6">
                <FormGroup>
                  <Label for="student_id">
                    เลขประจำตัวนักศึกษา
                  </Label>
                  <Input
                    id="student_id"
                    name="student_id"
                    placeholder="Enter student id"
                    type="text"
                    onChange={e => setStudentId(e.target.value)}
                  />
                </FormGroup>
              </Col>
              }
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={adduserData}>
              Add
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={modalEdit} toggle={toggleEdit} {...args}>
          <ModalHeader toggle={toggleEdit}>Edit</ModalHeader>
          <ModalBody>
            <Row>
              <Col lg="12">
                <FormGroup>
                  <Label for="user_type">
                    สิทธิ์การใช้งาน
                  </Label>
                  <Input
                    id="exampleSelectMulti"
                    name="select"
                    type="select"
                    value={user_type}
                    onChange={handleSelectChange}
                  >
                    <option value="undefined">
                      กรุณาเลือก
                    </option>
                    <option value="admin">
                      ผู้ดูแล
                    </option>
                    <option value="user">
                      ผู้ใช้ทั่วไป
                    </option>
                    <option value="teacher">
                      อาจารย์
                    </option>
                  </Input>
                </FormGroup>
              </Col>
              {user_type != "undefined" && <Col lg="6">
                <FormGroup>
                  <Label for="user_firstname">
                  Firstname
                  </Label>
                  <Input
                    id="user_firstname"
                    name="user_firstname"
                    placeholder="Enter Firstname"
                    type="text"
                    value={user_firstname}
                    onChange={e => setUserFirstname(e.target.value)}
                  />
                </FormGroup>
              </Col>}
              {user_type != "undefined" &&
                <Col lg="6">
                  <FormGroup>
                    <Label for="user_lastname">
                    Lastname
                    </Label>
                    <Input
                      id=""
                      name="user_lastname"
                      placeholder="Enter Firstname"
                      type="text"
                      value={user_lastname}
                      onChange={e => setUserLastname(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              }
              {user_type != "undefined" && <Col lg="6">
                <FormGroup>
                  <Label for="user_firstname">
                    ชื่อ
                  </Label>
                  <Input
                    id="user_firstname"
                    name="user_firstname"
                    placeholder="Enter Firstname"
                    type="text"
                    value={user_firstname_th}
                    onChange={e => setFirstnameth(e.target.value)}
                  />
                </FormGroup>
              </Col>}
              {user_type != "undefined" &&
                <Col lg="6">
                  <FormGroup>
                    <Label for="user_lastname">
                      นามสกุล
                    </Label>
                    <Input
                      id=""
                      name="user_lastname"
                      placeholder="Enter Firstname"
                      type="text"
                      value={user_lastname_th}
                      onChange={e => setLastnameth(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              }
              {user_type == 'user' && <Col lg="6">
                <FormGroup>
                  <Label for="user_year">
                    ปี
                  </Label>
                  <Input
                    id="user_year"
                    name="user_year"
                    placeholder="Enter year"
                    type="number"
                    value={user_year}
                    onChange={e => setuseYear(e.target.value)}
                  />
                </FormGroup>
              </Col>
              }
              
              {user_type == 'user' && <Col lg="6">
                <FormGroup>
                  <Label for="user_unit">
                    หน่วยกิต
                  </Label>
                  <Input
                    id="user_unit"
                    name="user_unit"
                    placeholder="Enter unit"
                    type="number"
                    value={user_unit}
                    onChange={e => setUserUnit(e.target.value)}
                  />
                </FormGroup>
              </Col>
              }
              {/* {user_type == 'user' && <Col lg="6">
                <FormGroup>
                  <Label for="id_card">
                    เลขบัตรประชาชน
                  </Label>
                  <Input
                    id="id_card"
                    name="id_card"
                    placeholder="Enter id card"
                    type="text"
                    value={id_card}
                    onChange={e => setIdCarde(e.target.value)}
                  />
                </FormGroup>
              </Col>
              } */}
              {user_type != "undefined" &&
                <Col lg="6">
                  <FormGroup>
                    <Label for="tel">
                      เบอร์โทร
                    </Label>
                    <Input
                      id="tel"
                      name="tel"
                      placeholder="Enter Tel"
                      type="text"
                      value={tel}
                      onChange={e => setTel(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              }
              {user_type == 'user' && <Col lg="6">
                <FormGroup>
                  <Label for="student_id">
                    เลขประจำตัวนักศึกษา
                  </Label>
                  <Input
                    id="student_id"
                    name="student_id"
                    placeholder="Enter student id"
                    type="text"
                    value={student_id}
                    onChange={e => setStudentId(e.target.value)}
                  />
                </FormGroup>
              </Col>
              }
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={updateuserData}>
              Edit
            </Button>{' '}
            <Button color="danger" onClick={deleteuserData}>
              Delete
            </Button>{' '}
            <Button color="secondary" onClick={toggleEdit}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {/* <Modal isOpen={modalEdit} toggle={toggleEdit} {...args}>
          <ModalHeader toggle={toggleEdit}>Edit</ModalHeader>
          <ModalBody>
            <Row>
              <Col lg="6">
                <FormGroup>
                  <Label for="user_firstname">
                    ชื่อ
                  </Label>
                  <Input
                    id="user_firstname"
                    name="user_firstname"
                    placeholder="Enter Firstname"
                    type="text"
                    value={user_firstname}
                    onChange={e => setUserFirstname(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <Label for="user_lastname">
                    นามสกุล
                  </Label>
                  <Input
                    id=""
                    name="user_lastname"
                    placeholder="Enter Firstname"
                    type="text"
                    value={user_lastname}
                    onChange={e => setUserLastname(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col lg="6">
                <FormGroup>
                  <Label for="user_year">
                    ปี
                  </Label>
                  <Input
                    id="user_year"
                    name="user_year"
                    placeholder="Enter year"
                    type="number"
                    value={user_year}
                    onChange={e => setuseYear(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col lg="6">
                <FormGroup>
                  <Label for="user_unit">
                    หน่วยกิต
                  </Label>
                  <Input
                    id="user_unit"
                    name="user_unit"
                    placeholder="Enter unit"
                    type="number"
                    value={user_unit}
                    onChange={e => setUserUnit(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col lg="6">
                <FormGroup>
                  <Label for="id_card">
                    บัตรประชาชน
                  </Label>
                  <Input
                    id="id_card"
                    name="id_card"
                    placeholder="Enter id card"
                    type="text"
                    value={id_card}
                    onChange={e => setIdCarde(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col lg="6">
                <FormGroup>
                  <Label for="tel">
                    เบอร์โทร
                  </Label>
                  <Input
                    id="tel"
                    name="tel"
                    placeholder="Enter Tel"
                    type="text"
                    value={tel}
                    onChange={e => setTel(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col lg="6">
                <FormGroup>
                  <Label for="student_id">
                    เลขประจำนักเรียน
                  </Label>
                  <Input
                    id="student_id"
                    name="student_id"
                    placeholder="Enter student id"
                    type="text"
                    value={student_id}
                    onChange={e => setStudentId(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col lg="6">
                <FormGroup>
                  <Label for="user_type">
                    สิทธิ์การใช้งาน
                  </Label>
                  <Input
                    id="exampleSelectMulti"
                    name="select"
                    type="select"
                    value={user_type}
                    onChange={handleSelectChange}
                  >
                    <option >
                      กรุณาเลือก
                    </option>
                    <option value="admin">
                      ผู้ดูแล
                    </option>
                    <option value="user">
                      ผู้ใช้ทั่วไป
                    </option>
                    <option value="teacher">
                      อาจารย์
                    </option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={updateuserData}>
              Edit
            </Button>{' '}
            <Button color="danger" onClick={deleteuserData}>
              Delete
            </Button>{' '}
            <Button color="secondary" onClick={toggleEdit}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal> */}
      </Container>
    </>
  );
};

async function get_userall() {
  // let token = localStorage.getItem("accessToken")
  return await fetch('https://api-ii.onrender.com/system/get_userall', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(data => data.json())
}
async function get_userbyid(bodys) {
  // let token = localStorage.getItem("accessToken")
  return await fetch('https://api-ii.onrender.com/system/get_userid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodys)
  })
    .then(data => data.json())
}
async function add_user(bodys) {
  // let token = localStorage.getItem("accessToken")
  // console.log(bodys)
  return await fetch('https://api-ii.onrender.com/system/add_user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodys)
  })
    .then(data => data.json())
}
async function updateuser(bodys) {
  // let token = localStorage.getItem("accessToken")
  // console.log(bodys)
  return await fetch('https://api-ii.onrender.com/system/update_user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodys)
  })
    .then(data => data.json())
}
async function deleteuser(bodys) {
  // let token = localStorage.getItem("accessToken")
  // console.log(bodys)
  return await fetch('https://api-ii.onrender.com/system/dalete_user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodys)
  })
    .then(data => data.json())
}
export default Icons;
