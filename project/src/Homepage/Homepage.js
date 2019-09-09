import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import './Homepage.css';
import {Button, Card, CardDeck, Container, Row} from "react-bootstrap";
import {FormattedMessage} from "react-intl";

export default class Homepage extends React.Component {

    render() {
        const carousel =
            <Carousel>
                <Carousel.Item>
                    <img
                        width={900}
                        height={600}
                        className="mx-auto d-block"
                        src="https://www.tbcxinc.com/wp-content/uploads/2014/03/1502205Fdusk2DDARK2Dphase2D12Dnew2Dsignage.jpg"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        width={900}
                        height={600}
                        className="mx-auto d-block"
                        src="http://loci.ae/wp-content/uploads/2017/03/4.jpg"
                        alt="Second slide"
                    />
                </Carousel.Item>
            </Carousel>;

        const container = <Container className={"content"}>
            <Row className={"justify-content-md-center"}>
                <h1>ReactSpital</h1>
            </Row>
            <Row className={"justify-content-md-center"}>
                <h5>
                    <FormattedMessage
                        id={"Homepage.description"}
                        defaultMessage={"Nationwide services since 2013"}
                    />
                </h5>
            </Row>
            <Row className={"justify-content-md-center"}>
                <CardDeck>
                    <Card style={{width: '18rem'}}>
                        <Card.Img variant="top" src={require("../assets/set2/png/101-ambulance.png")}/>
                        <Card.Body>
                            <Card.Title>
                                <FormattedMessage
                                    id={"Homepage.highlight1Title"}
                                    defaultMessage={"Highlight1"}
                                />
                            </Card.Title>
                            <Card.Text>
                                <FormattedMessage
                                    id={"Homepage.highlight1Text"}
                                    defaultMessage={"Some quick example text to build on the card title and make up the bulk of\n" +
                                    "                                the card's content."}
                                />
                            </Card.Text>
                            <Button variant="danger">
                                <FormattedMessage
                                    id={"Homepage.highlight1Button"}
                                    defaultMessage={"Learn more"}
                                />
                            </Button>
                        </Card.Body>
                    </Card>
                    <Card style={{width: '18rem'}}>
                        <Card.Img variant="top" src={require("../assets/set2/png/101-computer.png")}/>
                        <Card.Body>
                            <Card.Title>
                                <FormattedMessage
                                    id={"Homepage.highlight2Title"}
                                    defaultMessage={"Highlight2"}
                                />
                            </Card.Title>
                            <Card.Text>
                                <FormattedMessage
                                    id={"Homepage.highlight2Text"}
                                    defaultMessage={"Some quick example text to build on the card title and make up the bulk of\n" +
                                    "                                the card's content."}
                                />
                            </Card.Text>
                            <Button variant="danger">
                                <FormattedMessage
                                    id={"Homepage.highlight2Button"}
                                    defaultMessage={"Learn more"}
                                />
                            </Button>
                        </Card.Body>
                    </Card>
                    <Card style={{width: '18rem'}}>
                        <Card.Img variant="top" src={require("../assets/set2/png/101-medical-history-1.png")}/>
                        <Card.Body>
                            <Card.Title>
                                <FormattedMessage
                                    id={"Homepage.highlight3Title"}
                                    defaultMessage={"Highlight3"}
                                />
                            </Card.Title>
                            <Card.Text>
                                <FormattedMessage
                                    id={"Homepage.highlight3Text"}
                                    defaultMessage={"Some quick example text to build on the card title and make up the bulk of\n" +
                                    "                                the card's content."}
                                />
                            </Card.Text>
                            <Button variant="danger">
                                <FormattedMessage
                                    id={"Homepage.highlight3Button"}
                                    defaultMessage={"Learn more"}
                                />
                            </Button>
                        </Card.Body>
                    </Card>
                    <Card style={{width: '18rem'}}>
                        <Card.Img variant="top" src={require("../assets/set2/png/101-smartphone.png")}/>
                        <Card.Body>
                            <Card.Title>
                                <FormattedMessage
                                    id={"Homepage.highlight4Title"}
                                    defaultMessage={"Highlight4"}
                                />
                            </Card.Title>
                            <Card.Text>
                                <FormattedMessage
                                    id={"Homepage.highlight4Text"}
                                    defaultMessage={"Some quick example text to build on the card title and make up the bulk of\n" +
                                    "                                the card's content."}
                                />
                            </Card.Text>
                            <Button variant="danger">
                                <FormattedMessage
                                    id={"Homepage.highlight4Button"}
                                    defaultMessage={"Learn more"}
                                />
                            </Button>
                        </Card.Body>
                    </Card>
                    <div className="w-100 d-none d-xl-block"/>
                </CardDeck>
            </Row>
        </Container>;

        return (
            <div>
                {carousel}
                {container}
            </div>
        )
    }

};
