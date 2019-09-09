import React from 'react';
import './Footer.css';
import {Col, Row} from "react-bootstrap";
import {FormattedMessage} from "react-intl";

export default class Footer extends React.Component {
    render() {
        return (
            <div className={"footer"}>
                <Row className={"footer-row"}>
                    <Col className={"footer-col"}>
                        <p className={'footer-col-text'}>ReactSpital</p>
                        <p className={'footer-col-text'}>
                            <FormattedMessage
                                id={"Footer.description"}
                                defaultMessage={"Short description goes here"}
                            />
                        </p>
                    </Col>
                    <Col className={"footer-col"}>
                        <FormattedMessage
                            id={"Footer.links"}
                            defaultMessage={"Links"}
                        />
                    </Col>
                    <Col className={"footer-col"}>
                        <FormattedMessage
                            id={"Footer.contact"}
                            defaultMessage={"Contact"}
                        />
                    </Col>
                </Row>
                <Row className={"footer-row"}>
                    <Col>
                        Copyright
                    </Col>
                </Row>
                <Row className={"footer-row"}>
                    <img src={require("./assets/img/footer.png")} alt={""}/>
                </Row>
            </div>
        );
    }
};
