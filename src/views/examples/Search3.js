import './css/Information.css'
import {
  Card, CardHeader, CardBody, CardTitle, CardText,
  Table,
  Container,
  Row,
  Col,
  Button,
  Input, Label, FormGroup,
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'

const Search3 = () => {
  const [itemsuniversity, setItemsUniversity] = useState([]);
  const [itemsubject, setItemsSubject] = useState([]);
  const [itemSchool, setItemsSchool] = useState([]);
  const [itemSchool2, setItemsSchool2] = useState([]);
  const [itemSchool3, setItemsSchool3] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [names, setNames] = useState();
  const [group, setGroup] = useState();
  const [unit_university, setUnit_university] = useState();
  const [selectedOption, setSelectedOption] = useState('');
  const [selectName, setSelectName] = useState('');
  const [selectId_subject, setSelectId_subject] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [id_subject, setId_subject] = useState('');
  const [sub_name, setSub_name] = useState('');
  const [explanation, setExplanation] = useState('');

  let indexset
  // function นี้ เปิดมาแล้วทำงานทันที (use effect)
  useEffect(() => {
    let ns = localStorage.getItem("names")
    let id_sub = localStorage.getItem("id_school")
    setNames(ns)
    get_university()
    get_subjectbuids(parseInt(id_sub))
    get_courseby(parseInt(id_sub))
  }, []);

  const get_university = async () => {
    let item = await get_universityAll()
    setItemsUniversity(item)
  };
  const get_subjectbuids = async (id_sub) => {
    let items = await get_subjectbuid({
      id_school: id_sub
    })
    setItemsSubject(items)
  };
  const get_courseby = async (id_sub) => {
    let items = await get_coursebyid({
      id_school: id_sub
    })
    const separatedData = [];
    const Dataname = [];
    const Dataname2 = [];
    items.forEach(item => {
      item.id_universitys = item.id_university
      const { id_university, ...rest } = item;
      if (!separatedData[id_university]) {
        separatedData[id_university] = [rest];
        Dataname.push({ id_universitys: item.id_universitys })
      } else {
        separatedData[id_university].push(rest);
      }
    });

    for (let i = 0; i < Dataname.length; i++) {
      let groupuniversity = []
      for (let j = 0; j < separatedData[Dataname[i].id_universitys].length; j++) {
        let groupsub = {
          id_subject: separatedData[Dataname[i].id_universitys][j].id_subject,
          sub_name: separatedData[Dataname[i].id_universitys][j].name_subject,
          unit_subject: separatedData[Dataname[i].id_universitys][j].unit_subject,
          index_sub: separatedData[Dataname[i].id_universitys][j].index_sub,
          id_course: separatedData[Dataname[i].id_universitys][j].id_course
        }
        groupuniversity.push(groupsub)
      }
      let bor = {
        id_school: separatedData[Dataname[i].id_universitys][0].id_school,
        id_university: separatedData[Dataname[i].id_universitys][0].id_universitys,
        name_university: separatedData[Dataname[i].id_universitys][0].name_university,
        groupuniversity: groupuniversity,
        group: separatedData[Dataname[i].id_universitys][0].group,
        unit_university: separatedData[Dataname[i].id_universitys][0].unit_university,
        index: i + 1
      }
      Dataname2.push(bor)
    }
    setItemsSchool2(Dataname2)
  };
  const handleSelectChange = (event) => {
    console.log(event.target.value)
    setSelectedOption(event.target.value);

    itemsuniversity.forEach(i => {
      if (event.target.value === i.id_subject) {
        setSelectId_subject(i.id_subject)
        setSelectName(i.sub_name)
        setSelectedUnit(i.unit)
        setGroup(i.group)
      }
    });
  };
  const handleSelectChangeAdddata = (event, index) => {
    for (let i = 0; i < itemsubject.length; i++) {
      if (event.target.value === itemsubject[i].id_subject) {
        itemSchool[index].id_subject = event.target.value
        itemSchool[index].sub_name = itemsubject[i].sub_name
        itemSchool[index].unit = itemsubject[i].unit
      }
    }
    const selectedDataFromIndex = itemSchool[index]; // ดึงข้อมูลจากอาร์เรย์ด้วยดัชนีที่ถูกเลือก
    setSelectedData(selectedDataFromIndex);

    // itemsuniversity.forEach(i => {
  }
  const handleSelectcount = (ind) => {
    indexset = ind
    console.log(ind)
  };
  const adddata = () => {
    let ind = 0
    if (itemSchool.length != 0) {
      ind += itemSchool.length
    }

    let body = {
      id_subject: "",
      sub_name: "",
      unit: "",
      index: ind
    }
    setItemsSchool(prevItems => [...prevItems, body])
  };
  const removeItem = (index) => {
    const updatedItems = [...itemSchool];
    updatedItems.splice(index, 1);
    setItemsSchool(updatedItems);
  };
  let args
  const addCourse = async () => {
    // setSelectedData(null)
    setItemsSchool([])
    setSelectName(null)
    setSelectedUnit(null)
    setSelectId_subject(null)
    setSelectedOption(null)
    let id_sub = localStorage.getItem("id_school")
    get_subjectbuids(id_sub)
    toggle()
  }
  const add_course = async () => {
    // console.log(itemSchool2)
    const response = await add_course2(itemSchool2);
    Swal.fire('Save!', '', 'success')
  }
  const addData = async () => {
    let arr = []
    for (let i = 0; i < itemSchool.length; i++) {
      let bo = {
        id_subject: itemSchool[i].id_subject,
        sub_name: itemSchool[i].sub_name,
        unit_subject: itemSchool[i].unit,
        index_sub: i + 1,
        id_course: null
      }
      arr.push(bo)

    }
    let id_sub = localStorage.getItem("id_school")
    let body = {
      id_school: parseInt(id_sub),
      id_university: selectId_subject,
      name_university: selectName,
      groupuniversity: arr,
      group: group,
      unit_university: selectedUnit,
      index: itemSchool2.length
    }

    setItemsSchool2(prevItems => [...prevItems, body])
    toggle()
  }
  const add_sub = async () => {
    let id_sub = localStorage.getItem("id_school")
    let body = {
      id_school: id_sub,
      id_subject: id_subject,
      sub_name: sub_name,
      explanation: explanation,
    }
    const response = await add_subject(body);
    Swal.fire('Save!', '', 'success')
    toggle2()
  }
  const open_sub = async () => {
    setId_subject(null)
    setSub_name(null)
    setExplanation(null)
    toggle2()
  }
  const removeItemsub = (event, index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {

        const updatedItems = [...itemSchool2];
        updatedItems.splice(index, 1);
        setItemsSchool2(updatedItems);
        let body = {
          id_university: itemSchool2[index].id_university,
          id_school: itemSchool2[index].id_school
        }
        // console.log(body)
        const response = await delete_course(body);
        // window.location.reload()

      }
    })
  };
  const backtomainadmin = async() =>{
    window.location.href = '/admin/maps'
    }
  const toggle = () => setModal(!modal);
  const toggle2 = () => setModal2(!modal2);
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
          <Col lg="12" >
            <Button style={{ "margin-left": "9px", float: "right" }} onClick={addCourse}
              color="primary"
            >
              + เพิ่มรายวิชาใหม่
            </Button>
            <Button style={{ "margin-left": "9px", float: "right" }} onClick={add_course}
              color="success"
            >
              + บันทึก
            </Button>
            <Button style={{ "margin-left": "9px", float: "right" }} onClick={open_sub}
              color="warning"
            >
              + เพิ่มรายวิชาเก่า
            </Button>
            <Button color="primary" onClick={backtomainadmin} > กลับหน้าหลัก </Button>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col lg="12">
            <Card className="shadow">
              <Table cellspacing="0" border="0">
                <colgroup span="11" width="80"></colgroup>
                <tbody><tr>
                  <td style={{
                    borderTop: '1px solid #000000',
                    borderBottom: '1px solid #000000',
                    borderLeft: '1px solid #000000',
                    borderRight: '1px solid #000000',
                  }} colspan="11" height="19" align="center" valign="bottom"><font color="#000000">แบบขอเทียบโอนรายวิชา หลักสูตร วิศวกรรมคอมพิวเตอร์</font></td>
                </tr>
                  <tr>
                    <td style={{
                      borderTop: '1px solid #000000',
                      borderBottom: '1px solid #000000',
                      borderLeft: '1px solid #000000',
                      borderRight: '1px solid #000000',
                    }} colspan="6" height="19" align="center" valign="bottom"><font color="#000000">หลักสูตร วิศวกรรมคอมพิวเตอร์ มทร.ล้านนา เชียงราย</font></td>
                    <td style={{
                      borderTop: '1px solid #000000',
                      borderBottom: '1px solid #000000',
                      borderLeft: '1px solid #000000',
                      borderRight: '1px solid #000000',
                    }} colspan="5" align="center" valign="bottom"><font color="#000000">หลักสูตร {names}</font></td>
                  </tr>
                  <tr>
                    <td style={{
                      borderTop: '1px solid #000000',
                      borderBottom: '1px solid #000000',
                      borderLeft: '1px solid #000000',
                      borderRight: '1px solid #000000',
                    }} height="20" align="left" valign="bottom"><font face="Calibri" color="#000000"></font></td>
                    <td style={{
                      borderTop: '1px solid #000000',
                      borderBottom: '1px solid #000000',
                      borderLeft: '1px solid #000000',
                      borderRight: '1px solid #000000',
                    }} align="left" valign="bottom"><font color="#000000">รหัสวิชา</font></td>
                    <td style={{
                      borderTop: '1px solid #000000',
                      borderBottom: '1px solid #000000',
                      borderLeft: '1px solid #000000',
                      borderRight: '1px solid #000000',
                    }} colspan="3" align="center" valign="middle" bgcolor="#FFFFFF"><font color="#000000">ชื่อวิชา</font></td>
                    <td style={{
                      borderTop: '1px solid #000000',
                      borderBottom: '1px solid #000000',
                      borderLeft: '1px solid #000000',
                      borderRight: '1px solid #000000',
                    }} align="center" valign="middle" bgcolor="#FFFFFF"><font color="#000000">หน่วยกิต</font></td>
                    <td style={{
                      borderTop: '1px solid #000000',
                      borderBottom: '1px solid #000000',
                      borderLeft: '1px solid #000000',
                      borderRight: '1px solid #000000',
                    }} align="center" valign="middle" bgcolor="#FFFFFF"><font color="#000000">รหัส</font></td>
                    <td style={{
                      borderTop: '1px solid #000000',
                      borderBottom: '1px solid #000000',
                      borderLeft: '1px solid #000000',
                      borderRight: '1px solid #000000',
                    }} colspan="3" align="center" valign="middle" bgcolor="#FFFFFF"><font color="#000000">ชื่อวิชา</font></td>
                    <td style={{
                      borderTop: '1px solid #000000',
                      borderBottom: '1px solid #000000',
                      borderLeft: '1px solid #000000',
                      borderRight: '1px solid #000000',
                    }} align="center" valign="middle" bgcolor="#FFFFFF"><font color="#000000">หน่วยกิต</font></td>
                  </tr>
                  {itemSchool2.map((data, idx) => (
                    <React.Fragment key={idx}>
                      <tr>
                        <td style={{
                          borderTop: '1px solid #000000',
                          borderBottom: '1px solid #000000',
                          borderLeft: '1px solid #000000',
                          borderRight: '1px solid #000000',
                        }} rowspan={data.groupuniversity.length + 1} height="40" align="center" valign="middle">
                          <Button color="danger" size="sm" style={{ margin: "auto", display: "block" }} onClick={(event) => removeItemsub(event, idx)}>
                            <div>
                              <i class="fa fa-trash" aria-hidden="true"></i>
                            </div>
                          </Button>
                        </td>
                        <td style={{
                          borderTop: '1px solid #000000',
                          borderBottom: '1px solid #000000',
                          borderLeft: '1px solid #000000',
                          borderRight: '1px solid #000000',
                        }} rowspan={data.groupuniversity.length + 1} align="center" valign="middle"><font face="Calibri" color="#000000">{data.id_university}</font></td>
                        <td style={{
                          borderTop: '1px solid #000000',
                          borderBottom: '1px solid #000000',
                          borderLeft: '1px solid #000000',
                          borderRight: '1px solid #000000',
                        }} colspan="3" rowspan={data.groupuniversity.length + 1} align="center" valign="middle"><font color="#000000">{data.name_university}</font></td>
                        <td style={{
                          borderTop: '1px solid #000000',
                          borderBottom: '1px solid #000000',
                          borderLeft: '1px solid #000000',
                          borderRight: '1px solid #000000',
                        }} rowspan={data.groupuniversity.length + 1} align="center" valign="middle" sdval="3" sdnum="1033;"><font color="#000000">{data.unit_university}</font></td>
                      </tr>
                      {data.groupuniversity.map((university, subIndex) => (
                        <tr key={subIndex}>
                          <td
                            style={{
                              borderTop: '1px solid #000000',
                              borderBottom: '1px solid #000000',
                              borderLeft: '1px solid #000000',
                              borderRight: '1px solid #000000',
                            }}
                            align="left"
                            valign="bottom"
                          >
                            {university.id_subject}
                          </td>
                          <td
                            style={{
                              borderTop: '1px solid #000000',
                              borderBottom: '1px solid #000000',
                              borderLeft: '1px solid #000000',
                              borderRight: '1px solid #000000',
                            }}
                            colspan="3"
                            align="center"
                            valign="bottom"
                          >
                            {university.sub_name}
                          </td>
                          <td
                            style={{
                              borderTop: '1px solid #000000',
                              borderBottom: '1px solid #000000',
                              borderLeft: '1px solid #000000',
                              borderRight: '1px solid #000000',
                            }}
                            align="center"
                            valign="bottom"
                          >
                            {university.unit_subject}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={modal} toggle={toggle} {...args} size='lg'>
          <ModalHeader toggle={toggle}>Add</ModalHeader>
          <ModalBody>
            <Card
              className="my-2"
              color="primary"
              style={{
                width: '100%'
              }}
            >
              <CardHeader>
                รายวิชาสถาบันใหม่
              </CardHeader>
              <CardBody>
                <Row>
                  <Col lg="4">
                    <FormGroup>
                      <Label for="Name">
                        รหัสวิชา
                      </Label>
                      {/* <Input type="select" value={selectedOption} onChange={handleSelectChange} >
                        <option value="">Select an option</option>
                        {itemsuniversity.map(option => (
                          <option key={option.id_subject} value={option.id_subject}>{option.id_subject}</option>
                        ))}
                      </Input> */}
                      <Input
                        id="id_subject"
                        name="id_subject"
                        placeholder="Enter Id Subject"
                        type="text" disabled
                        value={selectId_subject}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label for="Name">
                        ชื่อวิชา
                      </Label>

                      <Input type="select" value={selectedOption} onChange={handleSelectChange} >
                        <option value="">Select an option</option>
                        {itemsuniversity.map(option => (
                          <option key={option.id_subject} value={option.id_subject}>{option.sub_name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label for="Name">
                        หน่วยกิต
                      </Label>
                      <Input
                        id="names"
                        name="names"
                        placeholder="Enter Unit"
                        type="text" disabled
                        value={selectedUnit}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <br></br>
            {selectId_subject != null && <Button color="primary" size="sm" style={{ margin: "auto", display: "block" }} onClick={adddata} >
              <div>
                <i class="fa fa-plus" aria-hidden="true"></i>
              </div>
            </Button>}

            <br></br>
            <Card
              className="my-2"
              style={{
                width: '100%'
              }}
            >
              <CardHeader>
                รายวิชาสถาบันเดิม
              </CardHeader>
              {itemSchool.map((data2, idx) => (
                <Card
                  className="my-2"
                  color="primary"
                  outline
                  style={{
                    width: '100%'
                  }}
                >
                  <CardBody>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <Label for="Name">
                            รหัสวิชา
                          </Label>
                          <Input
                            id="names"
                            name="names"
                            placeholder="Enter Name"
                            type="text" disabled
                            value={data2.id_subject}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <Label for="Name">
                            ชื่อวิชา
                          </Label>
                          <Input type="select" value={data2.id_subject}
                            onChange={(event) => handleSelectChangeAdddata(event, idx)}
                          >
                            <option value="">Select an option</option>
                            {itemsubject.map(option => (
                              <option key={option.id_subject} value={option.id_subject}>{option.sub_name}</option>
                            ))}
                          </Input>

                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <Label for="Name">
                            หน่วยกิต
                          </Label>
                          <Input
                            id="names"
                            name="names"
                            placeholder="Enter Name"
                            type="text" disabled
                            value={data2.unit}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <Button color="danger" size="sm" style={{ float: "right" }} onClick={() => removeItem(idx)}>
                          <div>
                            <i class="fa fa-trash" aria-hidden="true"></i>
                          </div>
                        </Button>
                      </Col>


                    </Row>
                  </CardBody>
                </Card>
              ))}
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={addData}>
              Add
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={modal2} toggle={toggle2} {...args} size='lg'>
          <ModalHeader toggle={toggle2}>Add</ModalHeader>
          <ModalBody>
            <Card
              className="my-2"
              color="primary"
              style={{
                width: '100%'
              }}
            >
              <CardHeader>
                รายวิชาสถาบันเดิม
              </CardHeader>
              <CardBody>
                <Row>
                  <Col lg="4">
                    <FormGroup>
                      <Label for="Name">
                        รหัสวิชา
                      </Label>
                      <Input
                        id="names"
                        name="names"
                        placeholder="กรอกรหัสวิชา"
                        type="text"
                        value={id_subject}
                        onChange={e => setId_subject(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label for="Name">
                        ชื่อวิชา
                      </Label>
                      <Input
                        id="names"
                        name="names"
                        placeholder="กรอกชื่อวิชา"
                        type="text"
                        value={sub_name}
                        onChange={e => setSub_name(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label for="Name">
                      อาจารย์ที่ปรึกษา
                      </Label>
                      <Input
                        id="names"
                        name="names"
                        placeholder="กรอกชื่อวิชา"
                        type="text"
                        value={sub_name}
                        onChange={e => setSub_name(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="12">
                    <FormGroup>
                      <Label for="exampleText">
                        รายละเอียด
                      </Label>
                      <Input
                        id="exampleText"
                        name="text"
                        type="textarea"
                        rows="6"
                        value={explanation}
                        onChange={e => setExplanation(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={add_sub}>
              Add
            </Button>{' '}
            <Button color="secondary" onClick={toggle2}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
};

async function get_universityAll() {
  return await fetch('https://api-ii.onrender.com/system/get_universityAll', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(data => data.json())
}
async function get_subjectbuid(bodys) {
  return await fetch('https://api-ii.onrender.com/system/get_subjectbuid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodys)
  })
    .then(data => data.json())
}
async function get_coursebyid(bodys) {
  return await fetch('https://api-ii.onrender.com/system/get_coursebyid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodys)
  })
    .then(data => data.json())
}
async function add_course2(bodys) {
  return await fetch('https://api-ii.onrender.com/system/add_course', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodys)
  })
    .then(data => data.json())
}
async function add_subject(bodys) {
  return await fetch('https://api-ii.onrender.com/system/add_subject', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodys)
  })
    .then(data => data.json())
}
async function delete_course(bodys) {
  return await fetch('https://api-ii.onrender.com/system/delete_course', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodys)
  })
    .then(data => data.json())
}
export default Search3;
