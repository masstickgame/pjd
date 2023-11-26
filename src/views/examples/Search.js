import React, { useEffect, useState } from 'react';
import {
  Card, Container, Row, Col, Button, Input, Table, Label, FormGroup,
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import Swal from 'sweetalert2'

const people = [
];
const Search = () => {
  const [items, setItems] = useState([]);
  const [itemsschoo, setItemsschoo] = useState([]);
  const [user_year, setUser_year] = useState('2020');
  useEffect(() => {
    get_school()
  }, []);
  const get_userflag = async () => {
    let item = await get_user_flag({
      user_flag: 1,
      user_year: user_year
    });
    item.forEach(i => {
      itemsschoo.forEach(j => {
        if (parseInt(i.university_old) === j.id_school) {
          i.university_old = j.names
        }
      });
    });
    setItems(item)
  };
  const get_school = async () => {
    let item = await get_schoolAll()
    // console.log(item)
    setItemsschoo(item)
  };
  const handleSelectChange = (event) => {
    setUser_year(event.target.value);
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
    console.log(separatedData)
    let ids = localStorage.getItem('user_id')
    let teacher1s = '' 
    let teacher2s = ''
    let teacher3s = ''
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
        console.log(groupsub)
        if(groupsub.teacher1s != '[]'){
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
    sessionStorage.setItem('itemSchool2', JSON.stringify(json))
    sessionStorage.setItem('datauser', JSON.stringify(datauser))

    // console.log(Dataname2)
    window.location.href = '/admin/Search1'
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
        <Row>
          <Col lg="4" >
            <FormGroup>

              <Input
                id="exampleSelect"
                name="select"
                type="select"
                value={user_year} onChange={handleSelectChange}
              >
                 <option value={''}>
                  เลือกปี
                </option>
                <option value={'2563'}>
                  2563
                </option>
                <option value={'2564'}>
                  2564
                </option>
                <option value={'2565'}>
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
              </Input>
            </FormGroup>
          </Col>
          <Col lg="4" >
            <Button
              color="primary" onClick={get_userflag}
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
                        มหาลัยใหม่
                      </center>
                    </th>
                    <th>
                      <center>
                        มหาลัยเดิม
                      </center>
                    </th>
                    <th>
                      <center>
                        สถานะ
                      </center>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((data, idx) => (
                    <tr key={data.id}>
                      <td scope="row" style={{ width: "15%" }}>
                        <Row>
                          <Col>
                            <Button color="primary" size="sm" style={{ margin: "auto", display: "block" }} onClick={() => gotoSearch1(data.id)} >
                              <div>
                                <i class="fa fa-plus" aria-hidden="true"></i>
                              </div>
                            </Button>
                          </Col>
                        </Row>
                      </td>
                      <td> {data.user_firstname} </td>
                      <td> {data.user_lastname} </td>
                      <td> {data.user_firstname_th} </td>
                      <td> {data.user_lastname_th} </td>
                      <td> {data.university} </td>
                      <td> {data.university_old} </td>
                      <td> {'โอนเกรดเรียบร้อย'} </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
async function get_user_flag(bodys) {
  return await fetch('https://api-ii.onrender.com/system/get_user_flag', {
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
export default Search;
