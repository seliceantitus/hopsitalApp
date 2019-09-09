import React from "react";
import './Team.css';
import {Button, Col, Form, Media, ProgressBar, Row, Table} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import * as jwt from "jsonwebtoken";
// import Alert from "react-bootstrap/Alert";

export default class Team extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'medics': [],
            'specializations': [],
            'dataLoaded': false
        };

        this.saveMedic = this.saveMedic.bind(this);
        // this.renderSuccessMessage = this.renderSuccessMessage.bind(this);
        this.deleteMedic = this.deleteMedic.bind(this);
        this.renderContent = this.renderContent.bind(this);
    }

    componentWillMount() {
        fetch('http://localhost:8000/api/medics',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    medics: json,
                    dataLoaded: true
                });
            });
    }

    saveMedic(item) {
        localStorage.medicName = item['name'];
        localStorage.medicId = item['id'];
    }

    createMedicMedia() {
        const unitId = this.props.location.search.split('=')[1];
        let medics = this.state.medics;
        if (unitId !== undefined) {
            medics = this.state.medics
                .filter((item) => item['units'].find(medicalUnit => medicalUnit['id'] === parseInt(unitId)));
        }
        return medics.map((item) => {
                let adminButtons = null;
                if (localStorage.getItem('jwt-token')) {
                    if (jwt.decode(localStorage.getItem('jwt-token')).role.toLowerCase() === 'admin') {
                        adminButtons =
                            <>
                                <Form inline>
                                    <Form.Row>
                                        <Col>
                                            <Button variant={"outline-danger"} className={"float-left"}
                                                    onClick={() => {
                                                        this.props.history.push(
                                                            '/editMedic',
                                                            {
                                                                medic: item
                                                            }
                                                        )
                                                    }}>
                                                Edit
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button variant={"danger"} className={"float-left"}
                                                    onClick={() => this.deleteMedic(item.id)}>
                                                Delete
                                            </Button>
                                        </Col>
                                    </Form.Row>
                                </Form>
                            </>
                    }
                }
                return (<Media key={item['name']}>
                        <img src={item['image']} width={164} height={164}
                             alt={"Doctor-".concat(item['name'])} className={"align-self-start mr-3"}/>
                        <Media.Body>
                            <h3>{item['name']}</h3>
                            <Table responsive>
                                <tbody>
                                <tr>
                                    <td>
                                        <h6>
                                            <FormattedMessage
                                                id={"Team.memberSpecialization"}
                                                defaultMessage={"Specialization"}
                                            />
                                        </h6>
                                    </td>
                                    <td>
                                        <p>{item['specialization']['specialization']}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h6>
                                            <FormattedMessage
                                                id={"Team.memberGraduationYear"}
                                                defaultMessage={"Graduation year"}
                                            />
                                        </h6>
                                    </td>
                                    <td>
                                        <p>{item['graduation_year']}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h6>
                                            <FormattedMessage
                                                id={"Team.memberRating"}
                                                defaultMessage={"Rating"}
                                            />
                                        </h6>
                                    </td>
                                    <td>
                                        <ProgressBar now={item['rating']['average']} min={0} max={5}
                                                     label={item['rating']['average']}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Button variant={"danger"} href={"/comments?id=" + item['id']}
                                                onClick={() => this.saveMedic(item)}>
                                            <FormattedMessage
                                                id={"Button.review"}
                                                defaultMessage={"Add a review"}
                                            />
                                        </Button>
                                    </td>
                                    <td>
                                        {adminButtons}
                                    </td>

                                </tr>
                                </tbody>
                            </Table>
                        </Media.Body>
                    </Media>
                );
            }
        )
    }

    // renderSuccessMessage(){
    //     const message = localStorage.getItem('message');
    //     if (message) {
    //         localStorage.removeItem('message');
    //         return (
    //             <Row className={"justify-content-md-center"}>
    //
    //             </Row>
    //         );
    //     }
    // }

    renderContent() {
        if (localStorage.getItem('jwt-token') &&
            jwt.decode(localStorage.getItem('jwt-token')).role.toLowerCase() === 'admin')
            return (
                <>
                    <Col xs={4} lg={3} className={'add-unit'}>
                        <Button variant={"danger"} className={"float-left"}
                                onClick={() => {
                                    this.props.history.push(
                                        '/addMedic',
                                    )
                                }}>
                            Add a new medic
                        </Button>
                    </Col>
                    <Col xs={12} lg={9}>
                        <Table>
                            <tbody>
                            {this.createMedicMedia()}
                            </tbody>
                        </Table>
                    </Col>
                </>
            );
        else
            return (
                <Col>
                    {this.createMedicMedia()}
                </Col>
            );
    }

    deleteMedic(id) {
        fetch(
            'http://localhost:3001/api/medics/' + id,
            {
                method: 'DELETE'
            })
            .then(response => console.log(response.status));
        const updatedMedics = this.state.medics.filter(item => item.id !== id);
        this.setState({
            medics: updatedMedics
        })
    }

    render() {
        if (this.state.dataLoaded)
            return (
                <div className={'container'}>
                    <Row className={"justify-content-md-center"}>
                        <h2>
                            <FormattedMessage
                                id={"Team.mainHeader"}
                                defaultMessage={"More than doctors"}
                            />
                        </h2>
                    </Row>
                    <Row className={"justify-content-md-center"}>
                        <h5>
                            <FormattedMessage
                                id={"Team.slogan"}
                                defaultMessage={"Highly trained staff who sees you as a friend before a patient"}
                            />
                        </h5>
                    </Row>
                    <Row className={"justify-content-md-center"}>
                        {this.renderContent()}
                    </Row>
                </div>
            );
        else
            return (null);
    }
};
