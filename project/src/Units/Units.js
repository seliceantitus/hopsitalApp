import React from "react";
import {Button, Col, Form, Media, Row, Table} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import './Units.css';
import * as jwt from "jsonwebtoken";

export default class Units extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'units': [],
            'dataLoaded': false,
            'redirect': null
        };

        this.deleteUnit = this.deleteUnit.bind(this);
        this.renderContent = this.renderContent.bind(this);
    }

    componentWillMount() {
        fetch('http://localhost:8000/api/units',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(json => {
                this.setState({units: json});
                this.setState({dataLoaded: true});
            });
    }

    createUnitMedia() {
        return this.state.units
            .map((item) => {
                let adminButtons = null;
                if (localStorage.getItem('jwt-token')) {
                    if (jwt.decode(localStorage.getItem('jwt-token')).role.toLowerCase() === 'admin') {
                        adminButtons =
                            <>
                                <Col>
                                    <Button variant={"outline-danger"} className={"float-left"}
                                            onClick={() => {
                                                this.props.history.push(
                                                    '/editUnit',
                                                    {unit: item}
                                                )
                                            }}>
                                        Edit
                                    </Button>
                                </Col>
                                <Col>
                                    <Button variant={"danger"} className={"float-left"}
                                            onClick={() => this.deleteUnit(item.id)}>
                                        Delete
                                    </Button>
                                </Col>
                            </>
                    }
                }
                return (
                    <Media key={item['id']}>
                        <img src={item['logo']} width={128} height={128}
                             alt={"Unit-".concat(item['name'])} className={"align-self-start mr-3"}
                        />
                        <Media.Body>
                            <h5>{item['name']}</h5>
                            <p className={"descriptor"}>
                                <FormattedMessage
                                    id={"Units.unitAddress"}
                                    defaultMessage={"Address"}
                                />
                            </p>
                            <p>
                                {item['location']}
                            </p>
                            <p className={"descriptor"}>
                                <FormattedMessage
                                    id={"Units.unitType"}
                                    defaultMessage={"Type"}
                                />
                            </p>
                            <p>
                                {item['unit_type']['type']}
                            </p>
                            <Form inline>
                                <Form.Row>
                                    <Col>
                                        <Button variant={"danger"} className={"float-left"}
                                                href={"/team?id=".concat(item.id)}>
                                            <FormattedMessage
                                                id={"Button.details"}
                                                defaultMessage={"Details"}
                                            />
                                        </Button>
                                    </Col>
                                    {adminButtons}
                                </Form.Row>
                            </Form>
                        </Media.Body>
                    </Media>
                );
            });
    }

    deleteUnit(id) {
        fetch(
            'http://localhost:3001/api/medical_units/' + id,
            {
                method: 'DELETE'
            })
            .then(response => console.log(response.status));
        const updatedUnits = this.state.units.filter(item => item.id !== id);
        this.setState({
            units: updatedUnits
        })
    }

    renderContent() {
        if (localStorage.getItem('jwt-token') &&
            jwt.decode(localStorage.getItem('jwt-token')).role.toLowerCase() === 'admin')
            return (
                <>
                    <Col xs={4} lg={3} className={'add-unit'}>
                        <Button variant={"danger"} className={"float-left"}
                                onClick={() => {
                                    this.props.history.push(
                                        '/addUnit',
                                    )
                                }}>
                            Add a new unit
                        </Button>
                    </Col>
                    <Col xs={12} lg={9}>
                        <Table>
                            <tbody>
                            {this.createUnitMedia()}
                            </tbody>
                        </Table>
                    </Col>
                </>
            );
        else
            return (
                <Col>
                    {this.createUnitMedia()}
                </Col>
            );
    }

    render() {
        if (this.state.dataLoaded)
            return (
                <div className={'container'}>
                    <Row className={"justify-content-md-center"}>
                        <h2>
                            <FormattedMessage
                                id={"Units.mainHeader"}
                                defaultMessage={"Where you can find us"}
                            />
                        </h2>
                    </Row>
                    <Row className={"justify-content-md-center"}>
                        <h5>
                            <FormattedMessage
                                id={"Units.slogan"}
                                defaultMessage={"We have more than 100 hospitals and laboratories"}
                            />
                        </h5>
                    </Row>
                    <Row className={"justify-content-md-center"}>
                        {this.renderContent()}
                    </Row>
                    {this.state.redirect}
                </div>
            );
        else
            return null;
    }
};
