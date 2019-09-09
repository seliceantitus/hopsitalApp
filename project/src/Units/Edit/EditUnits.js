import React from "react";
import * as jwt from "jsonwebtoken";
import {Alert, Col, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";

class EditUnits extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            unit: props.history.location.state.unit,
            name: '',
            location: '',
            authorized: true,
            loggedIn: true
        };

        this.saveChanges = this.saveChanges.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }

    componentWillMount() {
        if (localStorage.getItem('jwt-token')) {
            if (jwt.decode(localStorage.getItem('jwt-token')).role.toLowerCase() !== 'admin') {
                this.setState({
                    authorized: false
                })
            }
        } else {
            this.setState({
                loggedIn: false
            })
        }
    }

    handleNameChange(e) {
        let uUnit = this.state.unit;
        uUnit.name = e.target.value;
        this.setState({
            unit: uUnit
        });
    }

    handleLocationChange(e) {
        let uUnit = this.state.unit;
        uUnit.location = e.target.value;
        this.setState({
            unit: uUnit
        });
    }

    saveChanges() {
        const body = {
            name: this.state.unit.name,
            location: this.state.unit.location
        };
        fetch('http://localhost:3001/api/medical_units/' + this.state.unit.id,
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
        } else if (!this.state.unit) {
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
                                    <Form.Control placeholder="Name" value={this.state.unit.name}
                                                  onChange={this.handleNameChange}/>
                                </Col>
                                <Col>
                                    <Form.Control placeholder="Location" value={this.state.unit.location}
                                                  onChange={this.handleLocationChange}/>
                                </Col>
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

export default EditUnits;
