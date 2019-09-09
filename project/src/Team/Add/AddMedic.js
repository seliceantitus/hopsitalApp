import React from "react";
import * as jwt from "jsonwebtoken";
import {Alert, Col, Dropdown, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";

class AddMedic extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            graduationYear: null,
            specialization: null,
            specializations: [],
            specializationLabel: 'Select a specialization',
            graduationYearLabel: 'Select a graduation year',
            logo: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyBjbGFzcz0iaWNvbiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTExLjUgNjUuNmMtMjQ2LjkgMC00NDcgMjAwLjEtNDQ3IDQ0N3MyMDAuMSA0NDcgNDQ3IDQ0NyA0NDctMjAwLjEgNDQ3LTQ0Ny0yMDAuMS00NDctNDQ3LTQ0N3ogbTI2MC4xIDY5MS4yYy0wLjcgOS4yLTguOSAxNi42LTE4LjEgMTYuNi0xMC4zIDAtMTguNS04LjUtMTguNS0xOC41LTEwLTExNC4yLTEwNS4zLTIwMy4zLTIyMS44LTIwMy4zUzMwMSA2NDAuNyAyOTEuNCA3NTQuOWMwIDEwLTguMSAxOC41LTE4LjUgMTguNS05LjIgMC0xNy40LTcuNC0xOC4xLTE2LjYtMC40LTIuNiAwLTQuMSAwLTUuOSA4LjktMTA1IDgwLjYtMTkxLjggMTc3LjgtMjIzLjNDMzkyIDUwMS40IDM2NSA0NTUuOSAzNjUgNDAzLjhjMC04MS43IDY2LjItMTQ3LjggMTQ4LjItMTQ3LjggODEuNyAwIDE0OC4yIDY2LjIgMTQ4LjIgMTQ3LjggMCA1Mi4xLTI3IDk3LjYtNjcuNiAxMjMuOEM2OTEgNTU5IDc2Mi43IDY0NS45IDc3MS42IDc1MC45YzAgMS44IDAuMyAzLjMgMCA1Ljl6IiBmaWxsPSIjODA4MDgwIiAvPjxwYXRoIGQ9Ik01MTMuMiAyOTIuOWMtNjEuNCAwLTExMS4zIDQ5LjUtMTExLjMgMTEwLjlzNDkuOSAxMTAuOSAxMTEuMyAxMTAuOSAxMTEuMy00OS41IDExMS4zLTExMC45LTQ5LjktMTEwLjktMTExLjMtMTEwLjl6IiBmaWxsPSIjODA4MDgwIiAvPjwvc3ZnPg==',
            error: '',
            authorized: true,
            loggedIn: true
        };

        this.addMedic = this.addMedic.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleGraduationYearChange = this.handleGraduationYearChange.bind(this);
        this.handleSpecializationChange = this.handleSpecializationChange.bind(this);
        this.renderSpecializationsDropdown = this.renderSpecializationsDropdown.bind(this);
    }

    componentWillMount() {
        if (localStorage.getItem('jwt-token')) {
            if (jwt.decode(localStorage.getItem('jwt-token')).role.toLowerCase() !== 'admin') {
                this.setState({
                    authorized: false
                })
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
        this.setState({name: e.target.value})
    }

    handleGraduationYearChange(e) {
        this.setState({graduationYear: parseInt(e.target.value)});
    }

    handleSpecializationChange(specializationId, specialization) {
        this.setState({
            specialization: specializationId,
            specializationLabel: specialization
        });
    }

    addMedic() {
        const body = {
            name: this.state.name,
            specialization: this.state.specialization,
            graduation_year: this.state.graduationYear,
            image: this.state.logo
        };
        console.log(body);
        fetch('http://localhost:3001/api/medics',
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
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
            this.state.specializations.map(item => {
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
                                                      onChange={this.handleNameChange}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="grad">
                                        <Form.Control required
                                                      type="number"
                                                      placeholder="Graduation year"
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
                                    <Button variant={'danger'} onClick={this.addMedic}>
                                        Add
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

export default AddMedic;
