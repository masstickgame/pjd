/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components

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
import './css/Information.css'
// core components
// import Header from "components/Headers/Header.js";

const people = [
];
const Search1 = () => {
  const [user_type, setUserType] = useState(localStorage.getItem('user_type'));
  const [user_firstname, setUserFirstname] = useState();
  const [user_lastname, setUserLastname] = useState();
  const [user_firstname_th, setUserFirstnameTH] = useState();
  const [user_lastname_th, setUserLastnameTH] = useState();
  const [user_year, setuseYear] = useState();
  const [user_unit, setUserUnit] = useState();
  const [id_card, setIdCarde] = useState();
  const [tel, setTel] = useState();
  const [student_id, setStudentId] = useState();
  const [id, setId] = useState();
  const [university, setUniversity] = useState();
  const [university_old, setUniversity_old] = useState();
  const [group, setGroup] = useState();
  const [branch, setBranch] = useState();
  const [items, setItems] = useState([]);
  const [item2, setItem2] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [selected, setSelected] = useState('');
  const [names, setNames] = useState();
  const [itemSchool, setItemsSchool] = useState([]);
  const [itemSchool2, setItemsSchool2] = useState([]);
  const [user_flag_ther, setUser_flag_ther] = useState([]);
  const [teacher1, setTaecher1] = useState([]);
  const [teacher2, setTaecher2] = useState([]);
  const [teacher3, setTaecher3] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [selectedOption1, setSelectedOption1] = useState([]);
  const [selectedOption2, setSelectedOption2] = useState([]);
  const [selectedOption3, setSelectedOption3] = useState([]);
  const [itemteacher, setitemteacher] = useState([]);
  const [flagselectedOption, setFlagselectedOption] = useState(true);




  useEffect(() => {
    let Items = sessionStorage.getItem('itemSchool2')
    setNames(sessionStorage.getItem('nameS'))
    let json = JSON.parse(Items)
    if (json.length != 0) {
      if(json[0].groupuniversitys[0].indextea != null){
        setTeacherCols(json[0].groupuniversitys[0].indextea);
      }
      setItemsSchool2(json)
      if (selectedOption1 != null && selectedOption2 != null && selectedOption3 != null) {
        setFlagselectedOption(false)
      }
    }

    getuserbyidData()
    getuserDataTeacher()
  }, []);
  const getuserbyidData = async () => {

    let ids = localStorage.getItem('user_id')
    const response = await get_userbyid({
      id: ids,
    });
    if (localStorage.getItem('user_type') === 'admin') {
      let jsons = sessionStorage.getItem('datauser')
      let jsons2 = JSON.parse(jsons)
      response[0] = jsons2
    } if (localStorage.getItem('user_type') === 'teacher') {
      let jsons = sessionStorage.getItem('datauser')
      let jsons2 = JSON.parse(jsons)
      response[0] = jsons2

    }

    setId(ids)
    setUserFirstnameTH(response[0].user_firstname_th)
    setUserLastnameTH(response[0].user_lastname_th)
    setuseYear(response[0].user_year)
    setUserUnit(response[0].user_unit)
    setIdCarde(response[0].id_card)
    setTel(response[0].tel)
    setStudentId(response[0].student_id)
    setUniversity(response[0].university)
    setBranch(response[0].branch)
    setGroup(response[0].group)
    setUniversity_old(response[0].university_old)
    setSelectedOption(response[0].university_old)
    setUser_flag_ther(response[0].user_flag_ther)
  };
  //---
  const handleSelectChange1 = async (event) => {
    console.log(event.target.value);
    for (let i = 0; i < itemteacher.length; i++) {
      itemteacher[i].teacher1 = teacher1;
    }
    await setSelectedOption1(event.target.value)
    await setTaecher1(event.target.value);
    if (teacher1 != null && teacher2 != null && teacher3 != null) {
      setFlagselectedOption(false)
    }
  };
  const handleSelectChange2 = async (event) => {
    console.log(event.target.value);
    for (let i = 0; i < itemteacher.length; i++) {
      itemteacher[i].teacher2 = teacher2;
    }
    await setSelectedOption2(event.target.value)
    await setTaecher2(event.target.value);
    if (teacher1 != null && teacher2 != null && teacher3 != null) {
      setFlagselectedOption(false)
    }
  };
  const handleSelectChange3 = async (event) => {
    console.log(event.target.value);
    for (let i = 0; i < itemteacher.length; i++) {
      itemteacher[i].teacher3 = teacher3;
    }
    await setSelectedOption3(event.target.value)
    await setTaecher3(event.target.value);
    checkteacher()
  };
  const checkteacher = async () => {
    if (teacher1 != null && teacher2 != null && teacher3 != null) {
      setFlagselectedOption(false)
    }
  }
  //---
  const getuserDataTeacher = async () => {
    let users = await get_userall_teacher()
    setTeacher(users)
  };
  const backtomainuser = async () => {
    window.location.href = '/admin/information'
  }
  const backtomainadmin = async () => {
    window.location.href = '/admin/search'
  }
  const backtomainteacher = async () => {
    window.location.href = '/admin/rooms'
  }
  const nextpage = async () => {
    if (user_type === 'admin'){
      window.location.href = '/admin/compare'
  }
    if (teacherCols.length === 0) {
      Swal.fire({
        title: "แจ้งเตือน!",
        text: "ไม่มีข้อมูลอาจารย์",
        icon: "error"
      });
      return; // ออกจากฟังก์ชันถ้าไม่มีข้อมูล
    }

    for (let index = 0; index < teacherCols.length; index++) {
      // เช็คว่าในแต่ละ teacherCol มีข้อมูลหรือไม่
      if (!teacherCols[index].selectedOption) {
        Swal.fire({
          title: "แจ้งเตือน!",
          text: `กรุณาเลือกครูใน ${teacherCols[index].label}`,
          icon: "error"
        });
        return; // ออกจากฟังก์ชันถ้าไม่มีข้อมูล
      }
      

    }
    for (let index = 0; index < itemSchool2.length; index++) {
      itemSchool2[index].teacher =''
      itemSchool2[index].teacher = JSON.stringify(teacherCols)
      for(let ith = 0; ith < itemSchool2[index].groupuniversitys.length; ith++){
        itemSchool2[index].groupuniversitys[ith].teacher =  JSON.stringify(teacherCols)
        itemSchool2[index].groupuniversitys[ith].indextea =  teacherCols
      }
    }
    
    // ตรวจสอบความถูกต้องและดำเนินการต่อ
    const response = await update_course_grade2(itemSchool2);
    const response2 = await add_teacher(itemSchool2);

    // คุณอาจต้องเปลี่ยน itemSchool2 เป็น teacherCols ที่ใช้ในโค้ดของคุณ

    sessionStorage.setItem('teacherCols', JSON.stringify(teacherCols))
    sessionStorage.setItem('itemSchool2', JSON.stringify(itemSchool2))
    window.location.href = '/admin/compare'
  }

  const handleSelectCh = (event, index, subIndex,teacher, id_course) => {
    setSelected(event.target.value);
    itemSchool2[index].result_tc = event.target.value
    itemSchool2[index].groupuniversity[subIndex].result_tc = event.target.value
    itemSchool2[index].groupuniversitys[subIndex].result_tc = event.target.value
    
    console.log(itemSchool2)
  }

  const [teacherCols, setTeacherCols] = useState([
    {
      id: 1,
      label: 'อาจารย์ท่านที่ 1',
      selectedOption: '',
    },
  ]);

  const handleSelectChange = (colIndex, value) => {
    const newTeacherCols = [...teacherCols];
    newTeacherCols[colIndex].selectedOption = value;
    console.log(newTeacherCols)
    setTeacherCols(newTeacherCols);
  };

  const handleAddButtonClick = () => {
    const newCol = {
      id: teacherCols.length + 1,
      label: `อาจารย์ท่านที่ ${teacherCols.length + 1}`,
      selectedOption: '',
    };
    setTeacherCols([...teacherCols, newCol]);
  };

  const handleRemoveColClick = () => {
    if (teacherCols.length > 1) {
      const newTeacherCols = [...teacherCols];
      newTeacherCols.pop(); // ลบจากเลขสุดท้าย
      setTeacherCols(newTeacherCols);
    }
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
        <Card
          style={{

          }}
        >
          <CardHeader className="bg-white border-0">
            <Row className="align-items-center">

              <Col xs="8">
                <h3 className="mb-0">สรุปผล</h3>

              </Col>

              <Col className="text-right" xs="4">

                {user_type === 'admin' && <Button color="success" onClick={nextpage} > ถัดไป </Button>}
                {user_type === 'user' && user_flag_ther === 1 && <Button color="success" onClick={nextpage} > ถัดไป </Button>}
                {user_type === 'teacher' && <Button color="success" onClick={nextpage} > ถัดไป </Button>}
                {/*  */}
                {user_type === 'admin' && <Button color="primary" onClick={backtomainadmin} > กลับหน้าหลัก </Button>}
                {user_type === 'user' && <Button color="primary" onClick={backtomainuser} > กลับหน้าหลัก </Button>}
                {user_type === 'teacher' && <Button color="primary" onClick={backtomainteacher} > กลับหน้าหลัก </Button>}
              </Col>
            </Row>
            <br></br>
            <Row>

              {teacherCols.map((teacherCol, index) => (
                <Col key={teacherCol.id} xs="4">
                  {user_type === 'teacher' && <Label>{teacherCol.label}</Label>}
                  {user_type === 'teacher' && (
                    <>
                      <Row>
                        <Col>
                          <Input
                            type="select"
                            value={teacherCol.selectedOption}
                            onChange={(e) => handleSelectChange(index, e.target.value)}
                          >
                            <option value=""></option>
                            {teacher.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.user_firstname_th} {option.user_lastname_th}
                              </option>
                            ))}
                          </Input>
                        </Col>
                      </Row>
                    </>
                  )}
                </Col>
              ))}

            </Row>


            {/* <Row >
              <Col  xs="4" >
              {user_type == 'teacher' && <Label> อาจารย์ท่านที่ 1 </Label>}
                {user_type == 'teacher' &&  <Input type="select" value={selectedOption1} onChange={handleSelectChange1} >
                  <option value=""></option>
                  {teacher.map(option => (
                          <option key={option.id} value={option.id}>{option.user_firstname_th} {option.user_lastname_th}</option>
                        ))}
                </Input> }
              </Col>
              <Col  xs="4" >
              {user_type == 'teacher' && <Label> อาจารย์ท่านที่ 2 </Label>}
                {user_type == 'teacher' && <Input type="select" value={selectedOption2} onChange={handleSelectChange2} >
                  <option value=""></option>
                  {teacher.map(option => (
                          <option key={option.id} value={option.id}>{option.user_firstname_th} {option.user_lastname_th}</option>
                        ))}
                </Input>}
              </Col>
              <Col  xs="4" >
              {user_type == 'teacher' && <Label> อาจารย์ท่านที่ 3 </Label>}
                {user_type == 'teacher' && <Input type="select" value={selectedOption3} onChange={handleSelectChange3} >
                  <option value=""></option>
                  {teacher.map(option => (
                          <option key={option.id} value={option.id}>{option.user_firstname_th} {option.user_lastname_th}</option>
                        ))}
                </Input>}
              </Col>
            </Row> */}

          </CardHeader>
          <Col xs="12">
          {user_type === 'teacher' && <Button style={{ "margin-left": "9px", float: "right" }} onClick={handleAddButtonClick}
              color="primary"
            >
              + เพิ่มอาจารย์
            </Button>}
            {user_type === 'teacher' && <Button style={{ "margin-left": "9px", float: "right" }} onClick={handleRemoveColClick}
              color="danger"
            >
              - ลบอาจารย์
            </Button>}
          </Col>

          <CardBody>
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
                      }} colspan="12" height="19" align="center" valign="bottom"><font color="#000000">แบบขอเทียบโอนรายวิชา หลักสูตร วิศวกรรมคอมพิวเตอร์</font></td>
                    </tr>
                      <tr>
                        <td style={{
                          borderTop: '1px solid #000000',
                          borderBottom: '1px solid #000000',
                          borderLeft: '1px solid #000000',
                          borderRight: '1px solid #000000',
                        }} colspan="12" height="19" align="center" valign="bottom"><font color="#000000">ชื่อ-สกุล {user_firstname_th} {user_lastname_th}</font></td>

                      </tr>
                      <tr>
                        <td style={{
                          borderTop: '1px solid #000000',
                          borderBottom: '1px solid #000000',
                          borderLeft: '1px solid #000000',
                          borderRight: '1px solid #000000',
                        }} colspan="5" height="19" align="center" valign="bottom"><font color="#000000">หลักสูตร วิศวกรรมคอมพิวเตอร์ มทร.ล้านนา เชียงราย</font></td>
                        <td style={{
                          borderTop: '1px solid #000000',
                          borderBottom: '1px solid #000000',
                          borderLeft: '1px solid #000000',
                          borderRight: '1px solid #000000',
                        }} colspan="7" align="center" valign="bottom"><font color="#000000">หลักสูตร {names}</font></td>
                      </tr>
                      <tr>
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
                        <td style={{
                          borderTop: '1px solid #000000',
                          borderBottom: '1px solid #000000',
                          borderLeft: '1px solid #000000',
                          borderRight: '1px solid #000000',
                        }} align="center" valign="middle"><font face="Calibri" color="#000000" >เกรด</font></td>
                        <td style={{
                          borderTop: '1px solid #000000',
                          borderBottom: '1px solid #000000',
                          borderLeft: '1px solid #000000',
                          borderRight: '1px solid #000000',
                          width: '90px',
                        }} align="center" valign="middle"><font face="Calibri" color="#000000">ผล</font></td>

                      </tr>
                      {itemSchool2.map((data, idx) => (
                        <React.Fragment key={idx}>
                          <tr>

                            <td style={{
                              borderTop: '1px solid #000000',
                              borderBottom: '1px solid #000000',
                              borderLeft: '1px solid #000000',
                              borderRight: '1px solid #000000',
                            }} rowspan={data.groupuniversitys.length + 1} align="center" valign="middle"><font face="Calibri" color="#000000">{data.id_university}</font></td>
                            <td style={{
                              borderTop: '1px solid #000000',
                              borderBottom: '1px solid #000000',
                              borderLeft: '1px solid #000000',
                              borderRight: '1px solid #000000',
                            }} colspan="3" rowspan={data.groupuniversitys.length + 1} align="center" valign="middle"><font color="#000000">{data.name_university}</font></td>
                            <td style={{
                              borderTop: '1px solid #000000',
                              borderBottom: '1px solid #000000',
                              borderLeft: '1px solid #000000',
                              borderRight: '1px solid #000000',
                            }} rowspan={data.groupuniversitys.length + 1} align="center" valign="middle" sdval="3" sdnum="1033;"><font color="#000000">{data.unit_university}</font></td>
                          </tr>
                          {data.groupuniversitys.map((university, subIndex) => (
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
                                {university.grade}
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

                                {user_type == 'admin' && <Input type="select" disabled value={university.result_tc} onChange={(event) => handleSelectCh(event, idx, subIndex, university.id_course)}>
                                  <option value=""></option>
                                  <option value="tc">TC</option>
                                  <option value="ce">CE</option>
                                  <option value="cs">CS</option>
                                  <option value="nct">ไม่อนุมัติ</option>
                                </Input>}
                                {user_type == 'user' && <Input type="select" disabled value={university.result_tc} onChange={(event) => handleSelectCh(event, idx, subIndex, university.id_course)}>
                                  <option value=""></option>
                                  <option value="tc">TC</option>
                                  <option value="ce">CE</option>
                                  <option value="cs">CS</option>
                                  <option value="nct">ไม่อนุมัติ</option>
                                </Input>}
                                {user_type == 'teacher' && <Input type="select" value={university.result_tc} onChange={(event) => handleSelectCh(event, idx, subIndex, university.id_course)}>
                                  <option value=""></option>
                                  <option value="tc">TC</option>
                                  <option value="ce">CE</option>
                                  <option value="cs">CS</option>
                                  <option value="nct">ไม่อนุมัติ</option>
                                </Input>}

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
          </CardBody>
        </Card>
      </Container>
    </>
  );
};
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
async function update_course_grade2(bodys) {
  return await fetch('https://api-ii.onrender.com/system/update_course_grade', {
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
async function get_userall_teacher() {
  // let token = localStorage.getItem("accessToken")
  return await fetch('https://api-ii.onrender.com/system/get_userall_teacher', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(data => data.json())
}
//--- 
async function add_teacher(bodys) {
  return await fetch('https://api-ii.onrender.com/system/add_teacher', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodys)
  })
    .then(data => data.json())
}
///---
export default Search1;
