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
const Finish = () => {
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

                        <Button style={{ "margin-left": "9px", float: "right" }}
                            color="primary"
                        >
                            + เทียบรายวิชาใหม่
                        </Button>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col lg="12">
                        <Card className="shadow">
                            <Table bordered>
                                <Row>
                                    <Col>
                                        <thead  style={{ display: "block",width:"100%" }}>
                                            <tr>
                                                <th style={{ display: "block" }}>
                                                    <center>
                                                        แบบขอเทียบโอนรายวิชา   หลักสูตร วิศวกรรมคอมพิวเตอร์
                                                    </center>
                                                </th>
                                            </tr>
                                        </thead>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <thead  style={{  display: "block",width:"100%"  }}>
                                            <tr style={{ display: "block" }}>
                                                <th  style={{ display: "block" }}>
                                                    <center>
                                                        แบบขอเทียบโอนรายวิชา   หลักสูตร วิศวกรรมคอมพิวเตอร์
                                                    </center>
                                                </th>
                                            </tr>
                                        </thead>
                                    </Col>
                                    <Col>
                                        <thead  style={{  display: "block",width:"100%"  }}>
                                            <tr style={{ display: "block" }}>
                                                <th  style={{ display: "block" }}>
                                                    <center>
                                                        แบบขอเทียบโอนรายวิชา   หลักสูตร วิศวกรรมคอมพิวเตอร์
                                                    </center>
                                                </th>
                                            </tr>
                                        </thead>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <thead  style={{  display: "block",width:"100%"  }}>
                                            <tr style={{ display: "block" }}>
                                                <th  style={{ display: "block" }}>
                                                    <center>
                                                        แบบขอเทียบโอนรายวิชา   หลักสูตร วิศวกรรมคอมพิวเตอร์
                                                    </center>
                                                </th>
                                            </tr>
                                        </thead>
                                    </Col>
                                    <Col>
                                        <thead  style={{  display: "block",width:"100%"  }}>
                                            <tr style={{ display: "block" }}>
                                                <th  style={{ display: "block" }}>
                                                    <center>
                                                        แบบขอเทียบโอนรายวิชา   หลักสูตร วิศวกรรมคอมพิวเตอร์
                                                    </center>
                                                </th>
                                            </tr>
                                        </thead>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <thead  style={{  display: "block",width:"100%"  }}>
                                            <tr style={{ display: "block" }}>
                                                <th  style={{ display: "block" }}>
                                                    <center>
                                                        แบบขอเทียบโอนรายวิชา   หลักสูตร วิศวกรรมคอมพิวเตอร์
                                                    </center>
                                                </th>
                                            </tr>
                                        </thead>
                                    </Col>
                                    <Col>
                                        <thead  style={{  display: "block",width:"100%"  }}>
                                            <tr style={{ display: "block" }}>
                                                <th  style={{ display: "block" }}>
                                                    <center>
                                                        แบบขอเทียบโอนรายวิชา   หลักสูตร วิศวกรรมคอมพิวเตอร์
                                                    </center>
                                                </th>
                                            </tr>
                                        </thead>
                                    </Col>
                                    
                                </Row>

                            </Table>
                        </Card>
                    </Col>
                </Row>
                <Container>
                    <Row>
                        <Col >
                            <Table bordered>
                                <thead>
                                    <tr>
                                        <th >
                                            <center>
                                                แบบขอเทียบโอนรายวิชา   หลักสูตร วิศวกรรมคอมพิวเตอร์
                                            </center>
                                        </th>
                                    </tr>
                                </thead>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="bg-light border">
                            .col
                        </Col>
                        <Col className="bg-light border">
                            .col
                        </Col>
                        <Col className="bg-light border">
                            .col
                        </Col>
                        <Col className="bg-light border">
                            .col
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            className="bg-light border"
                            xs="3"
                        >
                            .col-3
                        </Col>
                        <Col
                            className="bg-light border"
                            xs="auto"
                        >
                            .col-auto - variable width content
                        </Col>
                        <Col
                            className="bg-light border"
                            xs="3"
                        >
                            .col-3
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            className="bg-light border"
                            xs="6"
                        >
                            .col-6
                        </Col>
                        <Col
                            className="bg-light border"
                            xs="6"
                        >
                            .col-6
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            className="bg-light border"
                            sm="4"
                            xs="6"
                        >
                            .col-6 .col-sm-4
                        </Col>
                        <Col
                            className="bg-light border"
                            sm="4"
                            xs="6"
                        >
                            .col-6 .col-sm-4
                        </Col>
                        <Col
                            className="bg-light border"
                            sm="4"
                        >
                            .col-sm-4
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            className="bg-light border"
                            sm={{
                                offset: 1,
                                order: 2,
                                size: 6
                            }}
                        >
                            .col-sm-6 .order-sm-2 .offset-sm-1
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            className="bg-light border"
                            md={{
                                offset: 3,
                                size: 6
                            }}
                            sm="12"
                        >
                            .col-sm-12 .col-md-6 .offset-md-3
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            className="bg-light border"
                            sm={{
                                offset: 1,
                                size: 'auto'
                            }}
                        >
                            .col-sm-auto .offset-sm-1
                        </Col>
                        <Col
                            className="bg-light border"
                            sm={{
                                offset: 1,
                                size: 'auto'
                            }}
                        >
                            .col-sm-auto .offset-sm-1
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
};

export default Finish;
