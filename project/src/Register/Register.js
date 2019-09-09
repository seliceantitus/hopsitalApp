import React from "react";
import {Alert, Button, Form, Row} from "react-bootstrap";
import {FormattedMessage} from "react-intl";

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            token: '',
            formErrors: [],
            requestError: ''
        };

        this.register = this.register.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }

    handleName(text) {
        this.setState({name: text.target.value});
    }

    handleEmail(text) {
        this.setState({email: text.target.value});
    }

    handlePassword(text) {
        this.setState({password: text.target.value});
    }

    register() {
        let valid = true;
        this.setState({formErrors: []});
        if (!this.state.name) {
            valid = false;
            this.setState(state => {
                const formErrors = [...state.formErrors,
                    <FormattedMessage
                        id={"Register.emptyName"}
                        defaultMessage={"Name cannot be empty"}
                    />
                ];
                return {
                    formErrors: formErrors
                };
            });
        }
        if (!this.state.email) {
            valid = false;
            this.setState(state => {
                const formErrors = [...state.formErrors,
                    <FormattedMessage
                        id={"Register.emptyEmail"}
                        defaultMessage={"Email cannot be empty"}
                    />
                ];
                return {
                    formErrors: formErrors
                };
            });
        }
        if (!this.state.password) {
            valid = false;
            this.setState(state => {
                const formErrors = [...state.formErrors,
                    <FormattedMessage
                        id={"Register.emptyPassword"}
                        defaultMessage={"Password cannot be empty"}
                    />
                ];
                return {
                    formErrors: formErrors
                };
            });
        }
        if (valid) {
            const obj = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            };
            fetch('http://localhost:8000/api/register',
                {
                    method: 'POST',
                    body: JSON.stringify(obj),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (response.status === 201) {
                        window.location.replace('/Login');
                    } else {
                        this.setState({requestError: 'An error occurred'});
                        return null;
                    }
                });
        }
    };

    renderErrors(errorArray) {
        return (
            errorArray.map((error, index) => {
                return (
                    <Row className={"justify-content-md-center"}>
                        <Alert key={'error' + index} variant={'danger'}>
                            {error}
                        </Alert>
                    </Row>
                )
            })
        );
    }

    render() {
        if (localStorage.getItem('jwt-token')) {
            return (
                <div className={'container'}>
                    <div>
                        <Row className={"justify-content-md-center"}>
                            <Alert key={'loggedInAlert'} variant={'success'}>
                                Already logged in as {this.getUserEmail()}
                            </Alert>
                        </Row>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={'container'}>
                    <div hidden={localStorage.getItem('jwt-token')}>
                        <Row className={"justify-content-md-center"}>
                            <Alert key={'errorAlert'} variant={'danger'} hidden={!this.state.error}>
                                {this.state.requestError}
                            </Alert>
                        </Row>
                        {this.renderErrors(this.state.formErrors)}
                        <Row className={"justify-content-md-center"}>
                            <Form>
                                <Form.Group controlId="formBasicName">
                                    <Form.Label><h4>
                                        <FormattedMessage
                                            id={"Form.name"}
                                            defaultMessage={"Name"}
                                        />
                                    </h4></Form.Label>
                                    <Form.Control type="name" placeholder="Enter name" onChange={this.handleName}/>
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label><h4>
                                        <FormattedMessage
                                            id={"Form.email"}
                                            defaultMessage={"Email address"}
                                        />
                                    </h4></Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmail}/>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label><h4>
                                        <FormattedMessage
                                            id={"Form.password"}
                                            defaultMessage={"Password"}
                                        />
                                    </h4></Form.Label>
                                    <Form.Control type="password" placeholder="Password"
                                                  onChange={this.handlePassword}/>
                                </Form.Group>
                                <Button variant="danger" type="submit" onClick={this.register} href={'#'}>
                                    <FormattedMessage
                                        id={"Button.register"}
                                        defaultMessage={"Register"}
                                    />
                                </Button>
                            </Form>
                        </Row>
                    </div>
                </div>
            );
        }
    }
}

export default Register;
