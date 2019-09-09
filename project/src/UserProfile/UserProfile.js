import React from "react";
import jwt from 'jsonwebtoken';
import {Alert, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FormattedMessage} from "react-intl";
import Col from "react-bootstrap/Col";

class UserProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            email: '',
            name: '',
            token: '',
            image: '',
            conditions: [],
            userConditions: [],
        };

        this.fileSelectHandler = this.fileSelectHandler.bind(this);
        this.saveChangesHandler = this.saveChangesHandler.bind(this);
        this.addMedicalCondition = this.addMedicalCondition.bind(this);
        this.removeMedicalCondition = this.removeMedicalCondition.bind(this);
        this.createConditionsToSelect = this.createConditionsToSelect.bind(this);
        this.createConditionsHas = this.createConditionsHas.bind(this);
    }

    async componentWillMount() {
        if (localStorage.getItem('jwt-token')) {
            const token = localStorage.getItem('jwt-token');

            fetch('http://localhost:8000/api/condition/' + jwt.decode(token)['id'],
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(json => this.setState({userConditions: json}));

            fetch('http://localhost:8000/api/conditions',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(json => this.setState({conditions: json}));

            this.setState(
                {
                    id: jwt.decode(token)['id'],
                    email: jwt.decode(token)['email'],
                    name: jwt.decode(token)['name'],
                    role: jwt.decode(token)['role'],
                    image: jwt.decode(token)['image'],
                }
            );
        }
    }

    fileSelectHandler(event) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            this.setState({image: reader.result});
        };

        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };

    saveChangesHandler() {
        const obj = {
            image: this.state.image
        };

        fetch('http://localhost:8000/api/users/edit/' + this.state.id,
            {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(data => console.log(data));

        const token = jwt.sign({
                id: this.state.id,
                email: this.state.email,
                name: this.state.name,
                role: this.state.role,
                image: this.state.image
            },
            'wtfAmIDoing'
        );
        localStorage.setItem('jwt-token', token);
    }

    addMedicalCondition(event) {
        const obj = {
            idUser: this.state.id,
            idCondition: event.target.id
        };
        fetch('http://localhost:8000/api/conditions/user/new',
            {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(() => window.location.reload());
    }

    removeMedicalCondition(event) {
        const obj = {
            idUser: this.state.id,
            idCondition: event.target.id
        };
        fetch('http://localhost:8000/api/conditions/user/del',
            {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(() => window.location.reload());
    }

    createConditionsToSelect() {
        let userConditionsIDs = this.state.userConditions.map((item) => item.idCondition);
        return this.state.conditions
            .filter((item) => userConditionsIDs.indexOf(item.id) === -1)
            .map((item) => {
                return (
                    <option id={item['id']} key={item['id']}
                            onClick={this.addMedicalCondition}>{item['condition']}
                    </option>
                );
            });
    }

    createConditionsHas() {
        return this.state.userConditions.map((item) => {
            const disease = item['condition'];
            return (
                <option id={disease['id']} key={disease['id']}
                        onClick={this.removeMedicalCondition}>{disease['condition']}
                </option>
            );
        });
    }


    render() {
        if (!localStorage.getItem('jwt-token')) {
            return (
                <div className={'container'}>
                    <div>
                        <Row className={"justify-content-md-center"}>
                            <Alert key={'error'} variant={'danger'}>
                                <FormattedMessage
                                    id={"Profile.loginError"}
                                    defaultMessage={"Please login in order to view your profile"}
                                />
                            </Alert>
                        </Row>
                    </div>
                </div>
            );
        } else {
            const conditions = jwt.decode(localStorage.getItem('jwt-token')).role.toLowerCase() !== 'admin' ?
                <>
                    <Form>
                        <Form.Group>
                            <Form.Label>
                                <FormattedMessage
                                    id={'Profile.conditionsToSelect'}
                                    defaultMessage={'Select a condition'}
                                />
                            </Form.Label>
                            <Form.Control as="select" multiple>
                                {this.createConditionsToSelect()}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group>
                            <Form.Label>
                                <FormattedMessage
                                    id={'Profile.conditionsSelected'}
                                    defaultMessage={'Your selected conditions'}
                                />
                            </Form.Label>
                            <Form.Control as="select" multiple>
                                {this.createConditionsHas()}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </>
                : null;
            return (
                <div className={'container'}>
                    <Row className={"justify-content-md-center"}>
                        <Col xs={3} md={2}>
                            <img src={this.state.image} alt={'Avatar'} width={128} height={128}
                                 className={'avatar'}
                                 onClick={() => this.fileInput.click()}
                            />
                            <input
                                type={'file'}
                                onChange={this.fileSelectHandler}
                                style={{display: 'none'}}
                                ref={fileInput => this.fileInput = fileInput}
                            />
                        </Col>
                        <Col xs={15} md={10}>
                            <Alert key={'email'} variant={'danger'}>
                                {this.state.email}
                            </Alert>
                            <Alert key={'role'} variant={'danger'}>
                                {this.state.role}
                            </Alert>
                            {conditions}
                            <Button variant={'danger'} onClick={this.saveChangesHandler}>
                                <FormattedMessage
                                    id={"Button.save"}
                                    defaultMessage={"Save"}
                                />
                            </Button>
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}

export default UserProfile;
