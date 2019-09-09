import React from "react";
import jwt from 'jsonwebtoken';
import {Alert, Button, Form, Row} from "react-bootstrap";
import {FormattedMessage} from "react-intl";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            token: '',
            error: ''
        };

        this.login = this.login.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    handleEmail(text) {
        this.setState({email: text.target.value});
    }

    handlePassword(text) {
        this.setState({password: text.target.value});
    }

    login() {
        const obj = {
            email: this.state.email,
            password: this.state.password
        };
        fetch('http://localhost:8000/api/login',
            {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    this.setState({error: 'Invalid credentials!'});
                    return null;
                }
            })
            .then(data => {
                if (data) {
                    const token = jwt.sign({
                            id: data.id,
                            email: data.email,
                            name: data.name,
                            role: data.role.role,
                            image: data.image
                        },
                        'wtfAmIDoing'
                    );
                    localStorage.setItem('role', data.role.role);
                    localStorage.setItem('jwt-token', token);
                    window.location.replace('/');
                }
            });
    };

    getUserEmail() {
        if (localStorage.getItem('jwt-token')) {
            return jwt.decode(localStorage.getItem('jwt-token'))['email'];
        }
        return null;
    };

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
                                {this.state.error}
                            </Alert>
                        </Row>
                        <Row className={"justify-content-md-center"}>
                            <Form>
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
                                <Button variant="danger" type="submit" onClick={this.login} href={'#'}>
                                    <FormattedMessage
                                        id={"Button.login"}
                                        defaultMessage={"Login"}
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

export default Login;
