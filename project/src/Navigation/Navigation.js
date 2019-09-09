import React from 'react';
import {Button, Form, Nav, Navbar} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './Navigation.css';
import {FormattedMessage} from "react-intl";
import * as jwt from "jsonwebtoken";

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            token: '',
            role: ''
        };

        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        const tk = localStorage.getItem('jwt-token');
        if (tk) {
            this.setState({
                token: tk,
                role: jwt.decode(tk).role
            });
        }
    }

    logout() {
        localStorage.removeItem('jwt-token');
        window.location.replace('/');
    };

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>
                    <img src={require("../assets/img/png/hospital-1.png")} width={40} height={40} alt={"logo"}
                         className={"logo"}/>
                    {/*<span className={"logo_text"}>ReactSpital</span>*/}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer exact to={''}>
                            <Nav.Link>
                                <FormattedMessage
                                    id={"Navbar.home"}
                                    defaultMessage={"Home"}
                                />
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={'/team'}>
                            <Nav.Link>
                                <FormattedMessage
                                    id={"Navbar.team"}
                                    defaultMessage={"Our team"}
                                />
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={'/units'}>
                            <Nav.Link>
                                <FormattedMessage
                                    id={"Navbar.units"}
                                    defaultMessage={"Units"}
                                />
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={'/statistics'}>
                            <Nav.Link>
                                <FormattedMessage
                                    id={"Navbar.statistics"}
                                    defaultMessage={"Statistics"}
                                />
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={'/locations'}>
                            <Nav.Link>
                                <FormattedMessage
                                    id={"Navbar.locations"}
                                    defaultMessage={"Locations"}
                                />
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={'/profile'} hidden={!this.state.token}>
                            <Nav.Link>
                                <FormattedMessage
                                    id={"Navbar.profile"}
                                    defaultMessage={"Profile"}
                                />
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={'/dash'} hidden={this.state.role.toLowerCase() !== 'admin'}>
                            <Nav.Link>
                                <FormattedMessage
                                    id={"Navbar.dashboard"}
                                    defaultMessage={"Dashboard"}
                                />
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Form inline>
                        <Button variant="danger" href={'/login'} hidden={this.state.token}>
                            <FormattedMessage
                                id={"Button.login"}
                                defaultMessage={"Login"}
                            />
                        </Button>
                        <Button variant="danger" href={'/register'} hidden={this.state.token}>
                            <FormattedMessage
                                id={"Button.register"}
                                defaultMessage={"Register"}
                            />
                        </Button>
                        <Button variant="danger" hidden={!this.state.token} onClick={this.logout}>
                            <FormattedMessage
                                id={"Button.logout"}
                                defaultMessage={"Logout"}
                            />
                        </Button>
                        <Button variant="outline-danger" onClick={() => {
                            localStorage.setItem('lang', 'ro');
                            window.location.reload();
                        }}>RO</Button>
                        <Button variant="outline-danger" onClick={() => {
                            localStorage.setItem('lang', 'en');
                            window.location.reload();
                        }}>EN</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigation;
