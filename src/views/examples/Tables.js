
import {
  Card,
  Table,
  Container,
  Row,
  Col,
  Button,
  Input, Modal, ModalHeader, ModalBody, ModalFooter, Label, FormGroup
} from "reactstrap";
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { event } from "jquery";
// const Tables = ({ onFunctionCall, onGetUserData }) => {
//   const [modal, setModal] = useState(false);
//   const toggle = () => setModal(!modal);
//   const [items, setItems] = useState([]);
//   const [des, setDes] = useState([]);

//   useEffect(() => {
//     getuserData()
//   }, []);
//   let getuserData = async () => {
//     let item = await get_universityAll()
//     setSortedData(item)
//     setItems(item)
//     onFunctionCall()

//   };
//   const getuserbyidData = async (ids) => {
//     for (let i = 0; i < items.length; i++) {
//       if (ids === items[i].id_subject) {
//         setDes(items[i].explanation)
//       }
//     }
//     toggle()
//   };
//   let [sortedData, setSortedData] = useState([{ id: "", group: "", id_subject: "", sub_name: "", unit: "" }]);
//   let [sortDirection, setSortDirection] = useState('asc');
//   const handleSort = (column) => {
//     const sorted = [...sortedData].sort((a, b) => {
//       if (sortDirection === 'asc') {
//         return a[column] > b[column] ? 1 : -1;
//       } else {
//         return a[column] < b[column] ? 1 : -1;
//       }
//     });
//     setSortedData(sorted);
//     setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//   };


//   return (
//     <Table bordered>
//       <thead>
//         <tr>
//           <th>
//             <center>
//               รายละเอียด
//             </center>
//           </th>
//           <th >
//             <center>
//               group
//             </center>
//           </th>
//           <th  >
//             <center>
//               รหัสรายวิชา
//             </center>
//           </th>
//           <th  >
//             <center>
//               ชื่อรายวิชา
//             </center>
//           </th>
//           <th  >
//             <center>
//               หน่วยกิต
//             </center>
//           </th>
//         </tr>
//       </thead>
//       <tbody>
//         {sortedData.map((data, idx) => (
//           <tr key={data.id_subject}>
//             <td scope="row" style={{ width: "10%" }}>
//               <Button color="primary" size="sm" style={{ margin: "auto", display: "block" }} onClick={() => getuserbyidData(data.id_subject)}>
//                 <div>
//                   <i class="fa fa-plus" aria-hidden="true"></i>
//                 </div>
//               </Button>
//             </td>
//             {/* <td>   <Button
//               color="primary"
//               size="sm"
//               style={{ margin: "auto", display: "block" }}
//               onClick={() => {
//                 handleClickInsideTables(); // Call the handleClick function
//               }}
//             >
//               <div>
//                 <i className="fa fa-plus" aria-hidden="true"></i>
//               </div>
//             </Button> </td> */}
//             <td> {data.group} </td>
//             <td> {data.id_subject} </td>
//             <td> {data.sub_name} </td>
//             <td> {data.unit}</td>
//           </tr>
//         ))}
//       </tbody>
//       <Modal isOpen={modal} toggle={toggle} >
//         <ModalHeader toggle={toggle}>Des</ModalHeader>
//         <ModalBody>
//           <Row>
//             <Col lg="12">
//               <FormGroup>
//                 <Label for="exampleText">
//                   Text Area
//                 </Label>
//                 <Input
//                   id="exampleText"
//                   name="text"
//                   type="textarea"
//                   value={des}
//                 />
//               </FormGroup>
//             </Col>

//           </Row>
//         </ModalBody>
//         <ModalFooter>
//           <Button color="secondary" onClick={toggle}>
//             Cancel
//           </Button>
//         </ModalFooter>
//       </Modal>
//     </Table>
//   );
// };
const Information = () => {
  const [searchTerm, setSearchTerm] = useState();

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [items, setItems] = useState([]);
  const [des, setDes] = useState([]);
  const [id_subject, setIdsubject] = useState([]);
  const [sub_name, setSubname] = useState([]);
  const [groupss, setGroup] = useState([]);
  const [group, setGroups] = useState([]);
  const [ids, setIds] = useState([]);
  const [unit, setUnit] = useState([]);
  const [flagboo, setFlagboo] = useState(false);
  const [university_year, setUniversity_year] = useState('');
  useEffect(() => {
    //  getuserData()
    handleSelectChange()
  }, []);
  const handleClickInsideTables = async () => {
    const response = await SearchTermd({
      searchTerm: searchTerm,
    });
    console.log(response)
    setSortedData(response)
  };
  let getuserData = async () => {
    let item = await get_universityAll()
    setGroup([])
    let arr = []
    item.forEach(i => {
      let bo = {
        groups: i.group
      }
      arr.push(i.group)
    });
    const duplicates = findDuplicates(arr);
    setGroup(duplicates)
    setSortedData(item)
    setItems(item)
    // handleSort("group")
  };
  const getuserbyidData = async (ids) => {
    setFlagboo(false)
    for (let i = 0; i < items.length; i++) {
      if (ids === items[i].id_subject) {
        setIds(ids)
        setDes(items[i].explanation)
        setIdsubject(items[i].id_subject)
        setSubname(items[i].sub_name)
      }
    }
    toggle()
  };
  let [sortedData, setSortedData] = useState([{ id: "", group: "", id_subject: "", sub_name: "", unit: "" }]);
  let [sortDirection, setSortDirection] = useState('asc');
  const handleSort = (column) => {
    const sorted = [...sortedData].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });
    setSortedData(sorted);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };
  const editdata = async () => {

    const response = await update_university({
      id_subject: id_subject,
      sub_name: sub_name,
      explanation: des,
      university_year: university_year,
    });
    getuserData()
    toggle()
    // setSortedData(response)
  };
  const adddata = async () => {

    const response = await add_university({
      id_subject: id_subject,
      sub_name: sub_name,
      explanation: des,
      group: group,
      unit: unit,
      university_year: university_year,
    });
    getuserData()
    toggle()
    // setSortedData(response)
  };
  const popupdata = async () => {
    setFlagboo(true)
    setGroups('')
    setSubname('')
    setIdsubject('')
    setDes('')
    setUnit('')
    toggle()
  };
  const handleSelectChangeAdddata = (event) => {
    setGroups(event.target.value)
  }
  const deldata = async (ids) => {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Dalete',
      denyButtonText: `Don't Dalete`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const response = await del_university({
          id_subject: ids
        });
        Swal.fire('Dalete!', '', 'success')
        getuserData()
      }
    })

  }
  const handleSelectChange = async (event) => {
    // console.log(event.target.value)
    // setUniversity_year(event.target.value);
    const response = await university_years({
      searchTerm: event?.target?.value || undefined,
    });
    setSortedData(response)


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
          <Col lg="3" >
            <Input
              onChange={e => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col lg="3" >
            <FormGroup>

              <Input
                id="exampleSelect"
                name="select"
                type="select"
                onChange={(event) => handleSelectChange(event)}
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
          <Col lg="3" >
            <Button color="primary" onClick={handleClickInsideTables}>
              ค้นหา
            </Button>
          </Col>
          <Col lg="3" >
            <Button style={{ float: "right" }} onClick={popupdata}
              color="primary"
            >
              + เพิ่มรายวิชา
            </Button>
          </Col>
        </Row>

        <br></br>
        <Row>
          <Col lg="12">
            <Card className="shadow">
              {/* <Tables onFunctionCall ={handleClickInsideTables}  onGetUserData={handleButtonClick}/> */}
              <Table bordered>
                <thead>
                  <tr>
                    <th>
                      <center>
                        รายละเอียด
                      </center>
                    </th>
                    <th >
                      <center>
                        group
                      </center>
                    </th>
                    <th  >
                      <center>
                        รหัสรายวิชา
                      </center>
                    </th>
                    <th  >
                      <center>
                        ชื่อรายวิชา
                      </center>
                    </th>
                    <th  >
                      <center>
                        หน่วยกิต
                      </center>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((data, idx) => (
                    <tr key={data.id_subject}>
                      <td scope="row" style={{ width: "15%" }}>
                        <Row>
                          <Col> <Button color="primary" size="sm" style={{ margin: "auto", display: "block" }} onClick={() => getuserbyidData(data.id_subject)}>
                            <div>
                              <i class="fa fa-plus" aria-hidden="true"></i>
                            </div>
                          </Button>
                          </Col>
                          <Col>
                            <Button color="danger" size="sm" style={{ margin: "auto", display: "block" }} onClick={() => deldata(data.id_subject)}>
                              <div>
                                <i class="fa fa-trash" aria-hidden="true"></i>
                              </div>
                            </Button></Col>
                        </Row>
                      </td>
                      <td> {data.group} </td>
                      <td> {data.id_subject} </td>
                      <td> {data.sub_name} </td>
                      <td> {data.unit}</td>
                    </tr>
                  ))}
                </tbody>
                <Modal isOpen={modal} toggle={toggle} >
                  <ModalHeader toggle={toggle}>Des</ModalHeader>
                  <ModalBody>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <Label for="exampleText">
                            รหัสรายวิชา
                          </Label>
                          {flagboo == false && <Input
                            id="exampleText"
                            name="text"
                            type="text"
                            value={id_subject}
                            disabled
                          />}
                          {flagboo == true && <Input
                            id="exampleText"
                            name="text"
                            type="text"
                            value={id_subject}
                            onChange={e => setIdsubject(e.target.value)}
                          />}

                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleText">
                            GROUP
                          </Label>
                          <Input type="select" value={group}
                            onChange={(event) => handleSelectChangeAdddata(event)}
                          >
                            <option value="">Select an option</option>
                            {groupss.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleText">
                            ชื่อรายวิชา
                          </Label>
                          <Input
                            id="exampleText"
                            name="text"
                            type="text"
                            value={sub_name}
                            onChange={e => setSubname(e.target.value)}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleText">
                            หน่วยกิต
                          </Label>
                          <Input
                            id="exampleText"
                            name="text"
                            type="number"
                            value={unit}
                            onChange={e => setUnit(e.target.value)}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleText">
                            ปีหลักสูตร
                          </Label>
                          <Input
                            id="exampleText"
                            name="text"
                            type="text"
                            value={university_year}
                            onChange={e => setUniversity_year(e.target.value)}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleText">
                            รายละเอียด
                          </Label>
                          <Input
                            id="exampleText"
                            name="text"
                            type="textarea"
                            value={des}
                            onChange={e => setDes(e.target.value)}
                          />
                        </FormGroup>
                        
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter>
                    {flagboo == false && <Button color="secondary" onClick={editdata}>
                      Edit
                    </Button>}
                    {flagboo == true && <Button color="secondary" onClick={adddata}>
                      add
                    </Button>}


                    <Button color="secondary" onClick={toggle}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
              </Table>
            </Card>
          </Col>
        </Row>

      </Container>

    </>
  );
};
function findDuplicates(arr) {
  let duplicates = {};
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (duplicates[arr[i]] === undefined) {
      duplicates[arr[i]] = 1;
    } else {
      duplicates[arr[i]]++;
    }
  }

  for (let key in duplicates) {
    if (duplicates[key] > 1) {
      result.push(key);
    }
  }

  return result;
}
async function get_universityAll() {
  // let token = localStorage.getItem("accessToken")
  return await fetch('https://api-ii.onrender.com/system/get_universityAll', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(data => data.json())
}
async function SearchTermd(bodys) {
  return await fetch('https://api-ii.onrender.com/system/search_university', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodys)
  })
    .then(data => data.json())
}
async function university_years(bodys) {
  return await fetch('https://api-ii.onrender.com/system/search_university_year', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodys)
  })
    .then(data => data.json())
}
async function add_university(bodys) {
  return await fetch('https://api-ii.onrender.com/system/add_university', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodys)
  })
    .then(data => data.json())
}
async function update_university(bodys) {
  return await fetch('https://api-ii.onrender.com/system/update_university', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodys)
  })
    .then(data => data.json())
}
async function del_university(bodys) {
  return await fetch('https://api-ii.onrender.com/system/dalete_university', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodys)
  })
    .then(data => data.json())
}
export default Information;
