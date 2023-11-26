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


const Rooms = () => {
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
    const [user_firstname_th, setUserFirstnameTH] = useState();
    const [user_lastname_th, setUserLastnameTH] = useState();
    const [user_year, setuseYear] = useState('2020');
    const [user_unit, setUserUnit] = useState();
    const [id_card, setIdCarde] = useState();
    const [tel, setTel] = useState();
    const [student_id, setStudentId] = useState();
    const [id, setId] = useState();
    const [teacher_id, setTeacher_id] = useState();
    const [teacher, setTeacher] = useState([]);
    const [teacher_name, setTeacherName] = useState([]);
    useEffect(() => {
        // getuserData()
        getuserDataTeacher()
    }, []);

    const getuserData = async () => {

        let users = await get_userall_user()
        setItems(users)
    };
    const getuserDataTeacher = async () => {
        let users = await get_userall_teacher()
        setTeacher(users)
    };
    const getuserDataYear = async () => {
        if (user_year != null && user_year != '') {
            let users = await get_userall_teacher_user_year({
                user_year: user_year
            })
            setItems(users)
        } else{
            setItems([])
        }
    };
    const getuserbyidData = async (ids) => {
        const response = await get_userbyid({
            id: ids,
        });

        setId(ids)
        setUserFirstname(response[0].user_firstname)
        setUserLastname(response[0].user_lastname)
        setUserType(response[0].user_type)
        setuseYear(response[0].user_year)
        setUserUnit(response[0].user_unit)
        setIdCarde(response[0].id_card)
        setTel(response[0].tel)
        setStudentId(response[0].student_id)
        toggleEdit()
    };
    const adduserData = async () => {
        const substringResult = user_lastname.substring(0, 1);
        let nameStr = user_firstname + '.' + substringResult
        if (user_type === 'teacher') {
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
        });
        toggle()
        getuserData()
    };
    const updateuserData = async () => {
        const substringResult = user_lastname.substring(0, 1);
        let nameStr = user_firstname + '.' + substringResult
        if (user_type === 'teacher') {
            student_id = tel
        }
        console.log(teacher_id)
        console.log(teacher_name)
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
            teacher_id : teacher_id,
            teacher_name : teacher_name
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
    const handleSelectChangeYear = (event) => {
        setuseYear(event.target.value); // เมื่อมีการเปลี่ยนแปลงค่าใน <select> ให้อัปเดตค่า selectedValue
    };
    const handleteacherChange = (event) => {
        setTeacher_id(event.target.value); // เมื่อมีการเปลี่ยนแปลงค่าใน <select> ให้อัปเดตค่า selectedValue
        console.log(teacher)
        teacher.forEach(i => {
        
            if (i.id === parseInt(event.target.value)) {
                setTeacherName(i.user_firstname_th + ' ' + i.user_lastname_th)
                setTeacher_id(parseInt(event.target.value))
            } 
        });
    };
    const gotoSearch1 = async (id) => {
        let item = await get_course_grade({
            id_user: id,
        });
        let datauser
        items.forEach(ns => {
            if (ns.id === id) {
                datauser = ns
            }
        });
        const separatedData = [];
        const Dataname = [];
        const Dataname2 = [];
        let json = []
        item.forEach(item => {
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
                    indextea: separatedData[Dataname[i].id_universitys][j].indextea
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
        await Dataname2.forEach(arr => {
            arr.groupuniversitys = []
            arr.groupuniversity.forEach(arrs => {
                if (arrs.grade != null && arrs.grade >= 2) {
                    arr.groupuniversitys.push(arrs)
                }
            });
            if (arr.groupuniversitys.length != 0) {
                json.push(arr)
            }
        });
        for (let i = 0; i < items.length; i++) {
            if (parseInt(id) === items[i].id_school) {
                sessionStorage.setItem('nameS', items[i].names)
            }
        }
        sessionStorage.removeItem('teacherCols')
        sessionStorage.setItem('itemSchool2', JSON.stringify(json))
        sessionStorage.setItem('datauser', JSON.stringify(datauser))

        // console.log(Dataname2)
        window.location.href = '/admin/Search1/'
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
                        <FormGroup>

                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                                value={user_year} onChange={handleSelectChangeYear}
                            >
                                <option value={''}>
                                    กรุณาเลือกปีที่ต้องการ
                                </option>
                                <option value={'2563'}>
                                    2563
                                </option>
                                <option value={'2564'}>
                                    2564
                                </option>
                                <option value={' 2565'}>
                                    2565
                                </option>
                                <option value={'2566'}>
                                    2566
                                </option>
                                <option value={'2567'}>
                                    2567
                                </option>
                                <option value={'2568'}>
                                    2568
                                </option>
                                <option value={'2569'}>
                                    2569
                                </option>
                                <option value={'2570'}>
                                    2570
                                </option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col lg="4" >
                        <Button
                            color="primary" onClick={getuserDataYear}
                        >
                            ค้นหา
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
                                                ปีการศึกษา
                                            </center>
                                        </th>
                                        <th>
                                            <center>
                                                อาจารย์ที่ปรึกษา
                                            </center>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* funtion loop data by api */}
                                    {items.map((data, idx) => (
                                        <tr key={data.id}>
                                            <td scope="row" style={{ width: "10%" }}>
                                                <Row>
                                                    <Col>      <Button color="primary" size="sm" style={{ margin: "auto", display: "block" }} onClick={() => getuserbyidData(data.id)} >
                                                        <div>
                                                            <i class="fa fa-plus" aria-hidden="true"></i>
                                                        </div>
                                                    </Button></Col>
                                                    <Col>   <Button color="warning" size="sm" style={{ margin: "auto", display: "block" }} onClick={() => gotoSearch1(data.id)} >
                                                        <div>
                                                            <i class="fa fa-screwdriver"></i>
                                                        </div>
                                                    </Button></Col>
                                                </Row>

                                            </td>
                                            <td> {data.user_firstname} </td>
                                            <td> {data.user_lastname}</td>
                                            <td>
                                                {data.user_year != null && data.user_year}
                                            </td>
                                            <td>
                                                {data.teacher}
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
                                        ชื่อ
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
                                            นามสกุล
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
                                        onChange={e => setUserUnit(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                            }
                            {user_type == 'user' && <Col lg="6">
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
                            }
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
                                        disabled onChange={e => setUserFirstname(e.target.value)}
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
                                        disabled onChange={e => setUserLastname(e.target.value)}
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
                                        disabled onChange={e => setuseYear(e.target.value)}
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
                                        disabled onChange={e => setUserUnit(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>

                            {/* <Col lg="6">
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
                                        disabled onChange={e => setIdCarde(e.target.value)}
                                    />
                                </FormGroup>
                            </Col> */}

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
                                        disabled onChange={e => setTel(e.target.value)}
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
                                        disabled onChange={e => setStudentId(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="12">
                                <FormGroup>
                                    <Label for="student_id">
                                        อาจารย์ที่ปรึกษา
                                    </Label>
                                    <Input type="select" value={teacher_id} onChange={handleteacherChange} >
                                        <option value="">Select an option</option>
                                        {teacher.map(teach => (
                                            <option key={teach.id} value={teach.id}>{teach.user_firstname_th} {teach.user_lastname_th}</option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={updateuserData}>
                            Edit
                        </Button>{' '}
                        {/* <Button color="danger" onClick={deleteuserData}>
                            Delete
                        </Button>{' '} */}
                        <Button color="secondary" onClick={toggleEdit}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </Container>
        </>
    );
};
async function get_userall_user() {
    // let token = localStorage.getItem("accessToken")
    return await fetch('https://api-ii.onrender.com/system/get_userall_user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
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
async function get_userall_teacher_user_year(bodys) {
    // let token = localStorage.getItem("accessToken")
    return await fetch('https://api-ii.onrender.com/system/get_userall_teacher_user_year', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodys)
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
async function get_course_grade(bodys) {
    return await fetch('https://api-ii.onrender.com/system/get_course_grade', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodys)
    })
        .then(data => data.json())
}
export default Rooms;
