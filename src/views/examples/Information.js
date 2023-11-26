
import { Tab } from "bootstrap";
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
import './css/Information.css'
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
// core components
// import Header from "components/Headers/Header.js";

const people = [
];
const Information = () => {
  const [user_type, setUserType] = useState();
  const [user_firstname_th, setFirstnameth] = useState();
  const [user_lastname_th, setLastnameth] = useState();
  const [user_year, setuseYear] = useState();
  const [user_unit, setUserUnit] = useState();
  const [id_card, setIdCarde] = useState();
  const [tel, setTel] = useState();
  const [student_id, setStudentId] = useState();
  const [id, setId] = useState();
  const [user_flag_Ther, setUser_flag_Ther] = useState(0);
  const [university, setUniversity] = useState();
  const [university_old, setUniversity_old] = useState();
  const [group, setGroup] = useState();
  const [branch, setBranch] = useState();
  const [items, setItems] = useState([]);
  const [item2, setItem2] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptionniversity, setSelectedOptionniversity] = useState('');
  const [selected, setSelected] = useState('');
  const [names, setNames] = useState();
  const [itemSchool, setItemsSchool] = useState([]);
  const [itemSchool2, setItemsSchool2] = useState([]);
  const [modal, setModal] = useState(false);
  const [modaldes, setModaldes] = useState(false);
  const [id_subject, setId_subject] = useState([]);
  const [sub_name, setSub_name] = useState([]);
  const [unit_subject, setUnit_subject] = useState([]);
  const [itemsuniversity, setItemsUniversity] = useState([])
  const [selectId_subject, setSelectId_subject] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedGroup, setselectedGroup] = useState('');
  const [id_subject2, setId_subject2] = useState('');
  const [sub_name2, setSub_name2] = useState('');
  const [des, setDes] = useState([]);
  const [itemsubject, setItemsSubject] = useState([]);
  useEffect(() => {
    getuserbyidData()
    get_school()
    get_university()

  }, []);
  const POST_subject = async () => {
    let id_sub = localStorage.getItem("id_school") || university_old
    let item2 = await get_coursebyid({
      id_school: id_sub
    })

    const separatedData = [];
    const Dataname = [];
    const Dataname2 = itemSchool2;
    item2.forEach(item => {
      item.id_universitys = item.id_university
      const { id_university, ...rest } = item;
      if (!separatedData[id_university]) {
        separatedData[id_university] = [rest];
        Dataname.push({ id_universitys: item.id_universitys })
      } else {
        separatedData[id_university].push(rest);
      }
    });

    let ids = localStorage.getItem('user_id')

    let groupuniversity = []
    // for (let i = 0; i < Dataname.length; i++) {
    let groupsub = {
      id_subject: id_subject,
      sub_name: sub_name,
      unit_subject: unit_subject,
      index_sub: 1,
      id_course: null
    }
    await groupuniversity.push(groupsub)
    // }
    let bor = {
      id_school: id_sub,
      id_university: selectId_subject,
      name_university: sub_name2,
      groupuniversity: groupuniversity,
      group: selectedGroup,
      unit_university: selectedUnit,
      index: Dataname.length + 1,
      id_user: ids,
      flagboo: true
    }
    Dataname2.push(bor)

    console.log(Dataname2.length)
    setItemsSchool2(Dataname2)
    toggle()
  };

  const getuserbyidData = async () => {
    let ids = localStorage.getItem('user_id')
    const response = await get_userbyid({
      id: ids,
    });
    setId(ids)
    setFirstnameth(response[0].user_firstname_th)
    setLastnameth(response[0].user_lastname_th)
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

    get_course_gradeby(response[0].university_old, ids)
    setUser_flag_Ther(response[0].user_flag_ther)
    get_subjectbuids(response[0].university_old)



  };
  const get_school = async () => {
    let item = await get_schoolAll()
    // console.log(item)
    setItems(item)
  };
  const handleSelectChange = (event) => {
    // console.log(event.target.value)
    setSelectedOption(event.target.value);
    get_courseby(event.target.value)
    items.forEach(i => {
      if (event.target.value === i.id_school) {
        setNames(i.sub_name)
      }
    });
  };
  const updateuserData = async () => {
    let id = localStorage.getItem('user_id')
    const response = await updateuser({
      id: id,
      user_firstname_th,
      user_lastname_th,
      user_year,
      user_unit,
      id_card,
      tel,
      student_id,
      university: 'มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา เชียงราย',
      group: 'คณะวิศวกรรมศาสตร์',
      branch: 'วิศวกรรมคอมพิวเตอร์',
      university_old: selectedOption
    });
    getuserbyidData()
  };
  const get_courseby = async (id_sub) => {
    let item2 = await get_coursebyid({
      id_school: id_sub
    })
    const separatedData = [];
    const Dataname = [];
    const Dataname2 = [];
    item2.forEach(item => {
      item.id_universitys = item.id_university
      const { id_university, ...rest } = item;
      if (!separatedData[id_university]) {
        separatedData[id_university] = [rest];
        Dataname.push({ id_universitys: item.id_universitys })
      } else {
        separatedData[id_university].push(rest);
      }
    });
    let ids = localStorage.getItem('user_id')
    for (let i = 0; i < Dataname.length; i++) {
      let groupuniversity = []
      for (let j = 0; j < separatedData[Dataname[i].id_universitys].length; j++) {
        let groupsub = {
          id_subject: separatedData[Dataname[i].id_universitys][j].id_subject,
          sub_name: separatedData[Dataname[i].id_universitys][j].name_subject,
          unit_subject: separatedData[Dataname[i].id_universitys][j].unit_subject,
          index_sub: separatedData[Dataname[i].id_universitys][j].index_sub,
          indextea: separatedData[Dataname[i].id_universitys][j].indexteam,
          id_course: null,

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
        index: i + 1,
        id_user: ids,

      }
      Dataname2.push(bor)
    }
    setItemsSchool2(Dataname2)
  };
  const get_course_gradeby = async (id_sub, id_user) => {
    let item2 = await get_course_gradebyid({
      id_school: id_sub,
      id_user: id_user
    })
    const separatedData = [];
    const Dataname = [];
    const Dataname2 = [];
    let teacher1s = ''
    let teacher2s = ''
    let teacher3s = ''
    if (item2.length != 0) {
      item2.forEach(item => {
        item.id_universitys = item.id_university
        const { id_university, ...rest } = item;
        if (!separatedData[id_university]) {
          separatedData[id_university] = [rest];
          Dataname.push({ id_universitys: item.id_universitys })
        } else {
          separatedData[id_university].push(rest);
        }
      });
      let ids = localStorage.getItem('user_id')
      for (let i = 0; i < Dataname.length; i++) {
        let groupuniversity = []
        for (let j = 0; j < separatedData[Dataname[i].id_universitys].length; j++) {
          let groupsub = {
            id_subject: separatedData[Dataname[i].id_universitys][j].id_subject,
            sub_name: separatedData[Dataname[i].id_universitys][j].name_subject,
            unit_subject: separatedData[Dataname[i].id_universitys][j].unit_subject,
            index_sub: separatedData[Dataname[i].id_universitys][j].index_sub,
            id_course: separatedData[Dataname[i].id_universitys][j].id_course,
            grade: separatedData[Dataname[i].id_universitys][j].grade,
            result_tc: separatedData[Dataname[i].id_universitys][j].result_tc,
            teacher1s: separatedData[Dataname[i].id_universitys][j].teacher1,
            teacher2s: separatedData[Dataname[i].id_universitys][j].teacher2,
            teacher3s: separatedData[Dataname[i].id_universitys][j].teacher3,
            indextea: separatedData[Dataname[i].id_universitys][j].indextea
          }
          if (groupsub.teacher1s != '[]') {
            teacher1s = groupsub.teacher1s
            teacher2s = groupsub.teacher2s
            teacher3s = groupsub.teacher3s
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
          index: i + 1,
          teacher1: teacher1s,
          teacher2: teacher2s,
          teacher3: teacher3s,
          id_user: ids
        }
        Dataname2.push(bor)
      }
      console.log(Dataname2)
      setItemsSchool2(Dataname2)
    } else {
      get_courseby(id_sub)
    }

  };
  const handleSelectCh = (event, index, subIndex) => {
    setSelected(event.target.value);
    console.log(event.target.value, index)
    itemSchool2[index].grade = event.target.value
    itemSchool2[index].groupuniversity[subIndex].grade = event.target.value
    // console.log(itemSchool2)
  };
  const add_course_grade = async () => {
    let id = localStorage.getItem('user_id')
    Swal.fire({
      title: 'ตรวจสอบข้อมูลให้ถูกต้องก่อนยืนยัน',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const response = await add_course_grade2(itemSchool2);
        const response2 = await updateuserflag({
          id: id,
          user_flag: 1
        });
        Swal.fire('Saved!', '', 'success')
        setTimeout(() => {
          rounttosum()
        }, 2000);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

    // window.location.reload()
  };
  const rounttosum = async () => {
    let json = []
    await itemSchool2.forEach(arr => {
      arr.groupuniversitys = []
      arr.groupuniversity.forEach(arrs => {
        console.log(arrs.grade)
        if (arrs.grade != null && arrs.grade != '' && arrs.grade >= 2) {
          arr.groupuniversitys.push(arrs)
        }
      });
      if (arr.groupuniversitys.length != 0) {
        json.push(arr)
      }
    });
    for (let i = 0; i < items.length; i++) {
      if (parseInt(selectedOption) === items[i].id_school) {
        sessionStorage.setItem('nameS', items[i].names)
      }
    }

    sessionStorage.setItem('itemSchool2', JSON.stringify(json))
    window.location.href = '/admin/Search1'
  }

  const toggle = () => setModal(!modal);
  const toggledes = () => setModaldes(!modaldes);
  const handleSelectChangeuniversity = (event) => {
    setSelectedOptionniversity(event.target.value);
    itemsuniversity.forEach(i => {
      if (event.target.value === i.id_subject) {
        setSelectId_subject(i.id_subject)
        setSub_name2(i.sub_name)
        setSelectedUnit(i.unit)
        setselectedGroup(i.group)
      }
    });
  };
  const get_university = async () => {
    let item = await get_universityAll()
    setItemsUniversity(item)
  };
  const getuserbyidDatauniversity = async (ids) => {
    for (let i = 0; i < itemsuniversity.length; i++) {
      if (ids === itemsuniversity[i].id_subject) {
        setDes(itemsuniversity[i].explanation)
      }
    }
    toggledes()
  };
  const getuserbyidDatasubject = async (ids) => {
    console.log(ids)
    for (let i = 0; i < itemsubject.length; i++) {
      if (ids === itemsubject[i].id_subject) {
        setDes(itemsubject[i].explanation)
      }
    }
    toggledes()
  };
  const get_subjectbuids = async (id_sub) => {
    let items = await get_subjectbuid({
      id_school: id_sub
    })
    setItemsSubject(items)
  };
  const deleteindex = async (idx) => {
    const newData = [...itemSchool2]; // Create a copy of the array
    newData.splice(idx, 1);  // Remove 1 element at the specified index
    setItemsSchool2(newData);    
  }
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
            <Button style={{ "margin-left": "9px", float: "right" }} onClick={updateuserData}
              color="success"
            >
              + บันทึก
            </Button>
          </Col>
        </Row>
        <Card
          className="my-2"
          style={{
          }}
        >
          <CardHeader>
            ข้อมูลนักศึกษา
          </CardHeader>

          <CardBody>
            <Row>
              <Col lg="4" >
                ชื่อ
                <Input
                  id="user_firstname_th"
                  name="user_firstname_th"
                  placeholder="Enter Firstname"
                  type="text"
                  value={user_firstname_th}
                  onChange={e => setFirstnameth(e.target.value)}
                />
              </Col>
              <Col lg="4" >
                สกุล
                <Input
                  id="user_lastname_th"
                  name="user_lastname_th"
                  placeholder="Enter Lastname"
                  type="text"
                  value={user_lastname_th}
                  onChange={e => setLastnameth(e.target.value)}
                />
              </Col>
              <Col lg="4" >
                หมายเลขประจำตัว
                <Input
                  id="student_id"
                  name="student_id"
                  placeholder="Enter student_id"
                  type="text"
                  value={student_id}
                  onChange={e => setStudentId(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col lg="4" >
                ปีการศึกษา
                <Input
                  id="user_year"
                  name="user_year"
                  placeholder="Enter year"
                  type="number"
                  value={user_year}
                  onChange={e => setuseYear(e.target.value)}
                />
              </Col>
              <Col lg="4" >
                หน่วยกิตทั้งหมด
                <Input
                  id="user_unit"
                  name="user_unit"
                  placeholder="Enter Unit"
                  type="text"
                  value={user_unit}
                  onChange={e => setUserUnit(e.target.value)}
                />
              </Col>
              <Col lg="4" >
                เบอร์ติดต่อ
                <Input
                  id="tel"
                  name="tel"
                  placeholder="Enter tel"
                  type="text"
                  value={tel}
                  onChange={e => setTel(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col lg="4" >
                มหาลัย
                <Input
                  id="university"
                  name="university"
                  placeholder="Enter University"
                  type="text"
                  value={'มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา เชียงราย'}
                // onChange={e => setUniversity(e.target.value)}
                />
              </Col>
              <Col lg="4" >
                คณะ
                <Input
                  id="group"
                  name="group"
                  placeholder="Enter Group"
                  type="text"
                  value={'คณะวิศวกรรมศาสตร์'}
                // onChange={e => setGroup(e.target.value)}
                />
              </Col>
              <Col lg="4" >
                สาขา
                <Input
                  id="branch"
                  name="branch"
                  placeholder="Enter Branch"
                  type="text"
                  value={'วิศวกรรมคอมพิวเตอร์'}
                // onChange={e => setBranch(e.target.value)}
                />
              </Col>
              <Col lg="4" >


              </Col>
              <Col lg="4" >


              </Col>
              <Col lg="4" >


              </Col>
              <Col lg="4" >
                มหาลัยเดิม
                {university_old === null && <Input type="select" value={selectedOption} onChange={handleSelectChange} >
                  <option value="">Select an option</option>
                  {items.map(option => (
                    <option key={option.id_school} value={option.id_school}>{option.names}</option>
                  ))}
                </Input>}
                {university_old != null && <Input type="select" value={selectedOption} onChange={handleSelectChange} disabled>
                  <option value="">Select an option</option>
                  {items.map(option => (
                    <option key={option.id_school} value={option.id_school}>{option.names}</option>
                  ))}
                </Input>}
                {/* <Input type="select" value={selectedOption} onChange={handleSelectChange} >
                  <option value="">Select an option</option>
                  {items.map(option => (
                    <option key={option.id_school} value={option.id_school}>{option.names}</option>
                  ))}
                </Input> */}
              </Col>
            </Row>
            <br></br>
          </CardBody>
        </Card>
        <Card
          className="my-2"
          style={{

          }}
        >
          <CardHeader>
            แบบขอเทียบโอนรายวิชา
          </CardHeader>
          <CardBody>
            <Row>
              <Col lg="12" >
                {user_flag_Ther == 0 || user_flag_Ther == null && <Button style={{ "margin-left": "9px", float: "right" }} onClick={add_course_grade}
                  color="info"
                  outline
                >
                  + บันทึกแบบขอเทียบโอนรายวิชา
                </Button>}
                {user_flag_Ther == 0 || user_flag_Ther == null && <Button style={{ "margin-left": "9px", float: "right" }} onClick={toggle}
                  color="danger"
                  outline
                >
                  + เพิ่มรายวิชาเพิ่มเติม
                </Button>}
                {user_flag_Ther == 1 && <Button style={{ "margin-left": "9px", float: "right" }} onClick={rounttosum}
                  color="warning"
                  outline
                >
                  + สรุปผล
                </Button>}


              </Col>
            </Row>

            <Row style={{ marginTop: '10px' }}>
              <Table cellspacing="0" border="0">
                <colgroup span="11" width="80"></colgroup>
                <tbody><tr>
                  <td style={{
                    fontSize: '18px',
                    borderTop: '1px solid #000000',
                    borderBottom: '1px solid #000000',
                    borderLeft: '1px solid #000000',
                    borderRight: '1px solid #000000',
                  }} colspan="11" height="19" align="center" valign="bottom"><font color="#000000">แบบขอเทียบโอนรายวิชา หลักสูตร วิศวกรรมคอมพิวเตอร์</font></td>
                </tr>
                  <tr>
                    <td style={{
                      fontSize: '18px',
                      borderTop: '1px solid #000000',
                      borderBottom: '1px solid #000000',
                      borderLeft: '1px solid #000000',
                      borderRight: '1px solid #000000',
                    }} colspan="6" height="19" align="center" valign="bottom"><font color="#000000">หลักสูตร วิศวกรรมคอมพิวเตอร์ มทร.ล้านนา เชียงราย</font></td>
                    <td style={{
                      fontSize: '18px',
                      borderTop: '1px solid #000000',
                      borderBottom: '1px solid #000000',
                      borderLeft: '1px solid #000000',
                      borderRight: '1px solid #000000',
                    }} colspan="5" align="center" valign="bottom"><font color="#000000">หลักสูตร {names}</font></td>
                  </tr>
                  <tr>
                    {/* <td style={{
                  borderTop: '1px solid #000000',
                  borderBottom: '1px solid #000000',
                  borderLeft: '1px solid #000000',
                  borderRight: '1px solid #000000',
                }} height="20" align="left" valign="bottom"><font face="Calibri" color="#000000"></font></td> */}
                    <td style={{
                      fontSize: '18px',
                      borderTop: '1px solid #000000',
                      borderBottom: '1px solid #000000',
                      borderLeft: '1px solid #000000',
                      borderRight: '1px solid #000000',
                    }} align="left" valign="bottom"><font color="#000000">รหัสวิชา</font></td>
                    <td style={{
                      fontSize: '18px',
                      width: '300px',
                      borderTop: '1px solid #000000',
                      borderBottom: '1px solid #000000',
                      borderLeft: '1px solid #000000',
                      borderRight: '1px solid #000000',
                    }} colspan="3" align="center" valign="middle" bgcolor="#FFFFFF"><font color="#000000">ชื่อวิชา</font></td>
                    <td style={{
                      fontSize: '18px',

                      borderTop: '1px solid #000000',
                      borderBottom: '1px solid #000000',
                      borderLeft: '1px solid #000000',
                      borderRight: '1px solid #000000',
                    }} align="center" valign="middle" bgcolor="#FFFFFF"><font color="#000000">หน่วยกิต</font></td>
                    <td style={{
                      fontSize: '18px',

                      borderTop: '1px solid #000000',
                      borderBottom: '1px solid #000000',
                      borderLeft: '1px solid #000000',
                      borderRight: '1px solid #000000',
                    }} align="center" valign="middle" bgcolor="#FFFFFF"><font color="#000000">รหัส</font></td>
                    <td style={{
                      fontSize: '18px',
                      borderTop: '1px solid #000000',
                      borderBottom: '1px solid #000000',
                      borderLeft: '1px solid #000000',
                      borderRight: '1px solid #000000',
                    }} colspan="3" align="center" valign="middle" bgcolor="#FFFFFF"><font color="#000000">ชื่อวิชา</font></td>
                    <td style={{

                      fontSize: '18px',
                      borderTop: '1px solid #000000',
                      borderBottom: '1px solid #000000',
                      borderLeft: '1px solid #000000',
                      borderRight: '1px solid #000000',
                    }} align="center" valign="middle" bgcolor="#FFFFFF"><font color="#000000">หน่วยกิต</font></td>
                    <td style={{
                      fontSize: '18px',
                      borderTop: '1px solid #000000',
                      borderBottom: '1px solid #000000',
                      borderLeft: '1px solid #000000',
                      borderRight: '1px solid #000000',
                    }} align="center" valign="middle" bgcolor="#FFFFFF"><font color="#000000">เกรด</font></td>
                  </tr>
                  {itemSchool2.map((data, idx) => (
                    <React.Fragment key={idx}>
                      <tr>
                        <td style={{
                          fontSize: '15px',
                          borderTop: '1px solid #000000',
                          borderBottom: '1px solid #000000',
                          borderLeft: '1px solid #000000',
                          borderRight: '1px solid #000000',
                        }} rowspan={data.groupuniversity.length + 1} align="center" valign="middle"><font face="Calibri" color="#000000">{data.id_university}</font>
                        <br></br>
                          {data.flagboo == true && <Button color="danger"  onClick={() => deleteindex(idx)}>
                            ลบรายวิชา
                          </Button>}
                        </td>
                        <td style={{
                          fontSize: '15px',
                          borderTop: '1px solid #000000',
                          borderBottom: '1px solid #000000',
                          borderLeft: '1px solid #000000',
                          borderRight: '1px solid #000000',
                        }} colspan="3" rowspan={data.groupuniversity.length + 1} align="center" valign="middle"><font color="#000000">    <a style={{ color: "blue", cursor: "pointer" }} onClick={() => getuserbyidDatauniversity(data.id_university)}>{data.name_university}</a></font></td>
                        <td style={{
                          fontSize: '15px',
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
                              fontSize: '15px',
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
                              fontSize: '15px',
                              borderTop: '1px solid #000000',
                              borderBottom: '1px solid #000000',
                              borderLeft: '1px solid #000000',
                              borderRight: '1px solid #000000',
                            }}
                            colspan="3"
                            align="center"
                            valign="bottom"
                          >
                            <a style={{ color: "blue", cursor: "pointer" }} onClick={() => getuserbyidDatasubject(university.id_subject)}>    {university.sub_name}</a>

                          </td>
                          <td
                            style={{
                              fontSize: '15px',
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
                              width: '100px',
                              fontSize: '15px',
                              borderTop: '1px solid #000000',
                              borderBottom: '1px solid #000000',
                              borderLeft: '1px solid #000000',
                              borderRight: '1px solid #000000',
                            }}
                            align="center"
                            valign="bottom"
                          >
                            {user_flag_Ther == 0 || user_flag_Ther == null && <Input type="select" value={university.grade} onChange={(event) => handleSelectCh(event, idx, subIndex)}>
                              <option value=""></option>
                              <option value="0">0</option>
                              <option value="1">1</option>
                              <option value="1.5">1.5</option>
                              <option value="2">2</option>
                              <option value="2.5">2.5</option>
                              <option value="3">3</option>
                              <option value="3.5">3.5</option>
                              <option value="4">4</option>

                            </Input>}
                            {user_flag_Ther == 1 && <Input type="select" disabled value={university.grade} onChange={(event) => handleSelectCh(event, idx, subIndex)}>
                              <option value=""></option>
                              <option value="0">0</option>
                              <option value="1">1</option>
                              <option value="1.5">1.5</option>
                              <option value="2">2</option>
                              <option value="2.5">2.5</option>
                              <option value="3">3</option>
                              <option value="3.5">3.5</option>
                              <option value="4">4</option>
                            </Input>}

                            {/* <Input maxLength={3} max={4} min={1}></Input> */}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </Table>
            </Row>
          </CardBody>
        </Card>
        <Modal isOpen={modal} toggle={toggle} >
          <ModalHeader toggle={toggle}>เพิ่มรายวิชาเพิ่มเติม</ModalHeader>
          <ModalBody>
            <CardBody>
              <Row>
                <Col lg="12">
                  <FormGroup>
                    <Label for="Name">
                      ชื่อวิชา
                    </Label>

                    <Input type="select" value={selectedOptionniversity} onChange={handleSelectChangeuniversity} >
                      <option value="">Select an option</option>
                      {itemsuniversity.map(option => (
                        <option key={option.id_subject} value={option.id_subject}>{option.sub_name}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col lg="12">
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
                <Col lg="12">
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
                <Col lg="12">
                  <FormGroup>
                    <Label for="Name">
                      หน่วยกิต
                    </Label>
                    <Input
                      id="unit_subject"
                      name="unit_subject"
                      placeholder="กรอกหน่วยกิจ"
                      type="text"
                      value={unit_subject}
                      onChange={e => setUnit_subject(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={POST_subject}>
              Add
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={modaldes} toggle={toggledes} >
          <ModalHeader toggle={toggledes}>Des</ModalHeader>
          <ModalBody>
            <Row>
              <Col lg="12">
                <FormGroup>
                  <Label for="exampleText">
                    รายละเอียด
                  </Label>
                  <Input
                    id="exampleText"
                    name="text"
                    type="textarea"
                    rows="10"
                    value={des}
                    onChange={e => setDes(e.target.value)}
                    disabled
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggledes}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
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
async function get_schoolAll() {
  return await fetch('https://api-ii.onrender.com/system/get_schoolAll', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(data => data.json())
}
async function updateuser(bodys) {
  return await fetch('https://api-ii.onrender.com/system/update_user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodys)
  })
    .then(data => data.json())
}
async function updateuserflag(bodys) {
  return await fetch('https://api-ii.onrender.com/system/update_user_flag', {
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
async function get_course_gradebyid(bodys) {
  return await fetch('https://api-ii.onrender.com/system/get_course_gradebyid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodys)
  })
    .then(data => data.json())
}
async function add_course_grade2(bodys) {
  return await fetch('https://api-ii.onrender.com/system/add_course_grade', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodys)
  })
    .then(data => data.json())
}

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
export default Information;
