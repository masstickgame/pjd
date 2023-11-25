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
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Col,
  Button,
  Input
} from "reactstrap";

// core components
// import Header from "components/Headers/Header.js";

const people = [  
];
const Process = () => {
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
        <Col lg="6" >
        ชื่อรายวิชา :
          <Input
          />
        </Col>
        <Col lg="6" >
        หลักสูตร :
         <Input
         />
        </Col>
        </Row>
        <br></br>
        <br></br>
        <Row>
        <Col lg="2" >
        รหัสวิชา :
          <Input
          />
        </Col>
        <Col lg="2" >
        หน่วยกิต :
         <Input
         />
        </Col>
        <Col lg="2" >
        เกรด :
         <Input
         />
        </Col>
        </Row>
        <br></br>
        <br></br>
        <Row>
        <Col lg="6" >
        ชื่อรายวิชา :
          <Input
          />
        </Col>
        </Row>
        <br></br>
        <br></br>
        <Row>
        <Col lg="2" >
        รหัสวิชา :
          <Input
          />
        </Col>
        <Col lg="2" >
        หน่วยกิต :
         <Input
         />
        </Col>
        <Col lg="2" >
        เกรด :
         <Input
         />
        </Col>
        <Col lg="6" >
        หลักสูตร :
          <Input
          />
        </Col>
        </Row>
      </Container>
    </>
  );
};

export default Process;
