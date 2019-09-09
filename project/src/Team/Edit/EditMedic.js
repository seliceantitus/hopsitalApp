import React from "react";
import * as jwt from "jsonwebtoken";
import {Alert, Col, Dropdown, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";

class EditMedic extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            medic: props.history.location.state.medic,
            name: '',
            graduationYear: 0,
            specialization: 0,
            specializationLabel: props.history.location.state.medic.specialization.specialization,
            specializations: [],
            location: '',
            authorized: true,
            loggedIn: true,
            error: ''
        };

        this.saveChanges = this.saveChanges.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleGraduationYearChange = this.handleGraduationYearChange.bind(this);
        this.handleSpecializationChange = this.handleSpecializationChange.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }

    componentWillMount() {
        if (localStorage.getItem('jwt-token')) {
            if (jwt.decode(localStorage.getItem('jwt-token')).role.toLowerCase() !== 'admin') {
                this.setState({
                    authorized: false
                });
            } else {
                fetch('http://localhost:3001/api/specializations',
                    {
                        method: 'GET'
                    })
                    .then(response => response.json())
                    .then(data => this.setState({specializations: data}));
            }
        } else {
            this.setState({
                loggedIn: false
            })
        }
    }

    handleNameChange(e) {
        let uMedic = this.state.medic;
        uMedic.name = e.target.value;
        this.setState({
            medic: uMedic
        });
    }

    handleGraduationYearChange(e) {
        let uMedic = this.state.medic;
        uMedic.specialization = e.target.value;
        this.setState({
            medic: uMedic
        });
    }

    handleSpecializationChange(specializationId, specialization) {
        let uMedic = this.state.medic;
        uMedic.specialization = specializationId;
        this.setState({
            medic: uMedic,
            specializationLabel: specialization
        });
    }

    saveChanges() {
        const body = {
            name: this.state.medic.name,
            graduation_year: this.state.medic.graduationYear,
            specialization: this.state.medic.specialization
        };
        fetch('http://localhost:3001/api/medics/' + this.state.medic.id,
            {
                method: 'PATCH',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(response => response.json())
            .then(data => {
                if (data.status === 403) {
                    this.setState({error: 'Invalid form input'})
                } else {
                    window.location.replace('/team');
                }
            });
    }

    renderSpecializationsDropdown() {
        return (
            this.state.specializations
                .filter(item => item.id !== this.state.medic.specialization.id)
                .map(item => {
                        return (
                            <Dropdown.Item
                                key={'Spec-' + item.id}
                                onClick={() => this.handleSpecializationChange(item.id, item.specialization)}>{item.specialization}</Dropdown.Item>
                        );
                    }
                )
        );
    }

    renderErrors() {
        if (this.state.error) {
            return (
                <Alert variant={'danger'}>
                    {this.state.error}
                </Alert>
            )
        }
    }

    render() {
        if (!this.state.authorized) {
            return (
                <div className={'container'}>
                    <div>
                        <Row className={"justify-content-md-center"}>
                            <Alert key={'error'} variant={'danger'}>
                                Unauthorized
                            </Alert>
                        </Row>
                    </div>
                </div>
            );
        } else if (!this.state.loggedIn) {
            return (
                <div className={'container'}>
                    <div>
                        <Row className={"justify-content-md-center"}>
                            <Alert key={'error'} variant={'danger'}>
                                Please login
                            </Alert>
                        </Row>
                    </div>
                </div>
            );
        } else if (!this.state.medic) {
            return (
                <div className={'container'}>
                    <div>
                        <Row className={"justify-content-md-center"}>
                            <Alert key={'error'} variant={'danger'}>
                                No unit selected
                            </Alert>
                        </Row>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={'container'}>
                    <Row className={"justify-content-md-center"}>
                        {this.renderErrors()}
                    </Row>
                    <Row className={"justify-content-md-center"}>
                        <Form>
                            <Form.Row>
                                <Col>
                                    <Form.Group controlId="name">
                                        <Form.Control required
                                                      type="text"
                                                      placeholder="Name"
                                                      value={this.state.medic.name}
                                                      onChange={this.handleNameChange}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="grad">
                                        <Form.Control required
                                                      type="number"
                                                      placeholder="Graduation year"
                                                      value={this.state.medic.graduation_year}
                                                      onChange={this.handleGraduationYearChange}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="danger" id="dropdown-basic">
                                            {this.state.specializationLabel}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {this.renderSpecializationsDropdown()}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                            </Form.Row>
                            <hr/>
                            <Form.Row>
                                <Col>
                                    <Button variant={'danger'} onClick={this.saveChanges}>
                                        Save
                                    </Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Row>
                </div>
            );
        }
    }
}

export default EditMedic;
