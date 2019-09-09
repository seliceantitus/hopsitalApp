import React from "react";
import * as jwt from "jsonwebtoken";
import {Alert, Button, Row} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import './AdminDash.css';

class AdminDash extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            dataLoaded: false,
            accessPermitted: true,
            pageErrors: [],
        };

        this.createUsersTable = this.createUsersTable.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    }

    componentWillMount() {
        if (localStorage.getItem('jwt-token')) {
            const decoded = jwt.decode(localStorage.getItem('jwt-token'));
            this.role = decoded.role;
            if (this.role.toLowerCase() === 'admin') {
                fetch(
                    'http://localhost:3001/api/users',
                    {
                        method: 'GET',
                    })
                    .then(response => response.json())
                    .then(data => {
                        const users = data.filter(item => item.id !== decoded.id);
                        this.setState({
                            users: users,
                            dataLoaded: true
                        });
                    });
            } else {
                this.setState({
                    accessPermitted: false
                });
            }
        }
    }

    createUsersTable() {
        return (
            this.state.users
                .map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>
                                <Button variant={'danger'} onClick={() => this.deleteAccount(item.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    );
                })
        );
    }

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

    deleteAccount(id) {
        fetch(
            'http://localhost:3001/api/users/' + id,
            {
                method: 'DELETE'
            })
            .then(response => console.log(response.status));
        const updatedUsers = this.state.users.filter(item => item.id !== id);
        this.setState({
            users: updatedUsers
        })
    }

    render() {
        if (!this.state.accessPermitted) {
            return (
                <div className={'container'}>
                    <Row className={"justify-content-md-center"}>
                        <Alert key={'notAllowed'} variant={'danger'}>
                            Unauthorized
                        </Alert>
                    </Row>
                </div>
            )
        } else {
            if (this.state.dataLoaded) {
                return (
                    <div className={'container'}>
                        <Row className={"justify-content-md-center"}>
                            <Table>
                                <tbody>{this.createUsersTable()}</tbody>
                            </Table>
                        </Row>
                    </div>
                );
            } else {
                return null;
            }
        }
    }
}


export default AdminDash;