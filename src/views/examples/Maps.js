import React, { useEffect, useState } from 'react';
// reactstrap components
import {
  Card, Container, Row, Col, Button, Input, Table, Label, FormGroup,
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import Swal from 'sweetalert2'


const Maps = () => {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [names, setNames] = useState();
  const [id_school, setId_school] = useState();
  const [types, setTypes] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const [selectedYear, setSelectedYear] = useState(""); // ค่าเริ่มต้นว่าง
  const currentYear = new Date().getFullYear(); // หาปีปัจจุบัน
  const years = Array.from({ length: 15 }, (_, index) => currentYear - 10 + index);

  useEffect(() => {
    get_school()
  }, []);
  const get_school = async () => {
    let item = await get_schoolAll()
    setItems(item)
  };
  const addschoolData = async () => {
    const response = await add_school({
      names: names,
      year_school: selectedYear,
    });
    toggle()
    get_school()
  };
  const updateSchoolData = async () => {
    const response = await update_school({
      id_school: id_school,
      names: names,
      year_school: selectedYear,
    });
    toggle()
    get_school()
  };
  const goData = async () => {
    window.location.replace('/admin/tables');
  };
  const DataAdd = async () => {
    setId_school(null)
    setNames('')
    setTypes('true')
    setSelectedYear('')
    toggle()
  };
  const goDataAdd = async (id_school) => {
    let ns
    items.forEach(i => {
      if (id_school === i.id_school) {
        ns = i.names
      }
    });
    localStorage.setItem("id_school", id_school)
    localStorage.setItem("names", ns)
    window.location.replace('/admin/search3');
  };
  const goDataupdatae = async (id_school) => {
    setTypes('false')
    items.forEach(i => {
      if (id_school === i.id_school) {
        setNames(i.names)
        setId_school(i.id_school)
      }
      toggle()
    });
  };
  const goDataDelete = async (id_school) => {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Dalete',
      denyButtonText: `Don't Dalete`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const response = await delete_school({
          id_school: id_school,
        });

        // if ('access_token' in response) {}
        Swal.fire('Dalete!', '', 'success')
        get_school()
      }
    })
  };
  const SearchTermdata = async () => {
    // console.log(searchTerm)
    let response
    if (selectedYear == '') {
      response = await SearchTermd({
        searchTerm: searchTerm,
      });
    } else {
      response = await SearchDate({
        selectedYear: selectedYear,
      });
    }

    setItems(response)
  }
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value); // อัปเดต state เมื่อมีการเลือกปีใหม่
  };
  const lavedata = async () => {
    setNames('')
    setSelectedYear('')
    const response = await SearchTermd({
      searchTerm: '',
    });
    setItems(response)
  }
  let args
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
        {/* หัวข้อ */}
        <Row>
          <Col lg="3" >
            <Input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col lg="3" >
            <Input type="select" value={selectedYear} onChange={handleYearChange} >
              <option value="">เลือกปี</option>
              {years.map(year => (
                <option key={year} value={year}>{year + 543}</option>
              ))}
            </Input>
          </Col>
          <Col lg="3" >
            <Button
              color="primary" onClick={SearchTermdata}
            >
              ค้นหา
            </Button>
            <Button
              color="danger" onClick={lavedata}
            >
              ล้างข้อมูล
            </Button>
          </Col>
          <Col lg="3" >
            <Button style={{ "margin-left": "9px", float: "right" }} onClick={DataAdd}
              color="primary"
            >
              + เพิ่มหลักสูตร
            </Button>
            {/* <Button style={{ float: "right" }} onClick={goData}
              color="primary"
            >
              โครงสร้างหลักสูตร
            </Button> */}

          </Col>
        </Row>
        {/*  */}
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
                        หลักสูตร
                      </center>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* funtion loop data by api */}
                  {items.map((data, idx) => (
                    <tr key={data.id}>
                      <td scope="row" style={{ width: "15%" }}>
                        <Row>
                          <Col>
                            <Button color="primary" size="sm" style={{ margin: "auto", display: "block" }} onClick={() => goDataAdd(data.id_school)} >
                              <div>
                                <i class="fa fa-plus" aria-hidden="true"></i>
                              </div>
                            </Button>
                          </Col>
                          <Button color="warning" size="sm" style={{ margin: "auto", display: "block" }} onClick={() => goDataupdatae(data.id_school)} >
                            <div>
                              <i class="fa fa-screwdriver"></i>
                            </div>
                          </Button>
                          <Col>
                            <Button color="danger" size="sm" style={{ margin: "auto", display: "block" }} onClick={() => goDataDelete(data.id_school)} >
                              <div>
                                <i class="fa fa-trash"></i>
                              </div>
                            </Button>
                          </Col>
                        </Row>
                      </td>
                      <td> {data.names} </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={modal} toggle={toggle} {...args}>
          <ModalHeader toggle={toggle}>Add/Edit</ModalHeader>
          <ModalBody>
            <Row>
              <Col lg="12">
                <FormGroup>
                  <Label for="Name">
                    หลักสูตร
                  </Label>
                  <Input
                    id="names"
                    name="names"
                    placeholder="Enter Name"
                    type="text"
                    value={names}
                    onChange={e => setNames(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col lg="12">
                <FormGroup>
                  <label htmlFor="yearSelect">เลือกปี: </label>
                  <Input type="select" value={selectedYear} onChange={handleYearChange} >
                    <option value="">Select an option</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year + 543}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            {types === "true" && <Button color="primary" onClick={addschoolData}>
              Add
            </Button>}
            {types === "false" && <Button color="warning" onClick={updateSchoolData}>
              Edit
            </Button>}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
};
async function get_schoolAll() {
  return await fetch('https://api-ii.onrender.com/system/get_schoolAll', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(data => data.json())
}
async function add_school(bodys) {
  return await fetch('https://api-ii.onrender.com/system/add_school', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodys)
  })
    .then(data => data.json())
}
async function update_school(bodys) {
  return await fetch('https://api-ii.onrender.com/system/update_school', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodys)
  })
    .then(data => data.json())
}
async function delete_school(bodys) {
  return await fetch('https://api-ii.onrender.com/system/delete_school', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodys)
  })
    .then(data => data.json())
}
async function SearchTermd(bodys) {
  return await fetch('https://api-ii.onrender.com/system/search_school', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodys)
  })
    .then(data => data.json())
}
async function SearchDate(bodys) {
  return await fetch('https://api-ii.onrender.com/system/search_date', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodys)
  })
    .then(data => data.json())
}
export default Maps;
