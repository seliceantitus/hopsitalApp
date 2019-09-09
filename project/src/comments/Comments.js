import React from 'react';
import './Comments.css';
import {Alert, Button, Form, FormCheck, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import {FormattedMessage} from "react-intl";
import * as jwt from "jsonwebtoken";

class Comments extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            userComment: '',
            userRating: '',
            dataLoaded: false,
            accessPermitted: true,
            success: false,
            pageErrors: [],
            formErrors: []
        };

        this.createMessagesTable = this.createMessagesTable.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.submitReview = this.submitReview.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
        this.hideComment = this.hideComment.bind(this);
        this.showComment = this.showComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
    }

    componentWillMount() {
        if (localStorage.getItem('jwt-token')) {
            const decoded = jwt.decode(localStorage.getItem('jwt-token'));
            this.role = decoded['role'];
            const queryStringId = this.props.location.search.split('=')[1];
            if (queryStringId !== undefined) {
                if (!localStorage.getItem('medicId') || queryStringId !== localStorage.getItem('medicId')) {
                    this.setState(state => {
                        const pageErrors = [...state.pageErrors,
                            <FormattedMessage
                                id={"Review.invalidLink"}
                                defaultMessage={"Invalid link entered"}
                            />
                        ];
                        return {
                            pageErrors: pageErrors
                        };
                    });
                } else {
                    const obj = {idMedic: queryStringId};
                    fetch(
                        'http://localhost:8000/api/medics/comments',
                        {
                            method: 'POST',
                            body: JSON.stringify(obj),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(response => response.json())
                        .then(data => {
                            this.setState({
                                comments: data,
                                dataLoaded: true
                            });
                        });
                }
            } else {
                this.setState(state => {
                    const pageErrors = [...state.pageErrors,
                        <FormattedMessage
                            id={"Review.noMedicSelected"}
                            defaultMessage={"No medic was selected for review"}
                        />
                    ];
                    return {
                        pageErrors: pageErrors
                    };
                });
            }
        } else {
            this.setState({
                accessPermitted: false
            });
        }
    }

    componentWillUnmount() {
        localStorage.removeItem('medicId');
        localStorage.removeItem('medicName');
        localStorage.removeItem('message');
    }

    createMessagesTable() {
        if (this.state.comments.length === 0) {
            return (
                <tr>
                    <td>
                        <FormattedMessage
                            id={"Review.noComments"}
                            defaultMessage={"There are no comments yet"}
                        />
                    </td>
                </tr>
            );
        } else {
            return (
                this.state.comments
                    .map((item) => {
                        if (this.role.toLowerCase() !== 'admin' && item.hidden === 1) {
                            return null;
                        }
                        const adminButtons =
                            this.role.toLowerCase() === 'admin' ?
                                <>
                                    <td hidden={item.hidden}>
                                        <Button variant={'outline-danger'} onClick={() => this.hideComment(item.id)}>
                                            Hide
                                        </Button>
                                    </td>
                                    <td hidden={!item.hidden}>
                                        <Button variant={'outline-danger'} onClick={() => this.showComment(item.id)}>
                                            Show
                                        </Button>
                                    </td>
                                    <td>
                                        <Button variant={'danger'} onClick={() => this.deleteComment(item.id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </>
                                :
                                null;
                        return (
                            <tr key={item['id']}>
                                <td>{item['comment']}</td>
                                <td>{item['value']}/5</td>
                                <td>{item['timestamp']}</td>
                                {adminButtons}
                            </tr>
                        );
                    })
            );
        }
    }

    handleMessageChange(text) {
        this.setState({userComment: text.target.value});
    }

    handleRatingChange(radio) {
        this.setState({userRating: radio.target.id});
    }

    getCurrentDate(separator = '') {
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        let hour = newDate.getHours();
        let minute = newDate.getMinutes();
        let second = newDate.getSeconds();

        return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date} ${hour}:${minute}:${second < 10 ? `0${second}` : `${second}`}`
    }

    submitReview() {
        let valid = true;
        if (!this.state.userRating) {
            this.setState(state => {
                const formErrors = [...state.formErrors,
                    <FormattedMessage
                        id={"Review.noRatingSelected"}
                        defaultMessage={"No rating selected"}
                    />
                ];
                return {
                    formErrors: formErrors
                };
            });
            valid = false;
        }
        if (!this.state.userComment) {
            this.setState(state => {
                const formErrors = [...state.formErrors,
                    <FormattedMessage
                        id={"Review.noCommentEntered"}
                        defaultMessage={"No comment entered"}
                    />
                ];
                return {
                    formErrors: formErrors
                };
            });
            valid = false;
        }
        if (valid) {
            const obj = {
                idMedic: localStorage.getItem('medicId'),
                idUser: jwt.decode(localStorage.getItem('jwt-token'))['id'],
                value: this.state.userRating,
                timestamp: this.getCurrentDate('-'),
                comment: this.state.userComment,
                hidden: 0
            };
            fetch(
                'http://localhost:8000/api/medics/addComment',
                {
                    method: 'POST',
                    body: JSON.stringify(obj),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(() => {
                    localStorage.removeItem('medicId');
                    localStorage.removeItem('medicName');
                    // localStorage.setItem('message', 'Success');
                    this.setState({success: true});
                });
        }
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

    hideComment(id) {
        const obj = {
            hidden: 1
        };
        fetch(
            'http://localhost:3001/api/rating_histories/' + id,
            {
                method: 'PATCH',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    comments: this.state.comments.map(item => {
                        if (item.id === data.id) {
                            return data;
                        } else {
                            return item;
                        }
                    })
                })
            });
    }

    showComment(id) {
        const obj = {
            hidden: 0
        };
        fetch(
            'http://localhost:3001/api/rating_histories/' + id,
            {
                method: 'PATCH',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    comments: this.state.comments.map(item => {
                        if (item.id === data.id) {
                            return data;
                        } else {
                            return item;
                        }
                    })
                })
            });
    }

    deleteComment(id) {
        fetch(
            'http://localhost:3001/api/rating_histories/' + id,
            {
                method: 'DELETE'
            })
            .then(response => console.log(response.status));
        const updatedComments = this.state.comments.filter(item => item.id !== id);
        this.setState({
            comments: updatedComments
        })
    }

    render() {
        if (!this.state.accessPermitted) {
            return (
                <div className={'container'}>
                    <Row className={"justify-content-md-center"}>
                        <Alert key={'notAllowed'} variant={'danger'}>
                            <FormattedMessage
                                id={"Review.loginError"}
                                defaultMessage={"Please login in order to view your profile"}
                            />
                        </Alert>
                    </Row>
                </div>
            )
        } else if (this.state.pageErrors.length > 0) {
            return (
                <div className={'container'}>
                    {this.renderErrors(this.state.pageErrors)}
                </div>
            );
        } else if (this.state.success) {
            return (
                <div className={'container'}>
                    <Row className={"justify-content-md-center"}>
                        <Alert key={'successMessage'} variant={'success'}>
                            <FormattedMessage
                                id={"Review.success"}
                                defaultMessage={"Review entered successfully. "}
                            />
                            <Alert.Link href="/team">
                                <FormattedMessage
                                    id={"Review.redirectToTeam"}
                                    default={"Click here to go back to the Team page."}
                                />
                            </Alert.Link>
                        </Alert>
                    </Row>
                </div>
            );
        } else {
            if (this.state.dataLoaded) {
                const medicName = localStorage.getItem('medicName');
                return (
                    <div className={'container'}>
                        <Row className={"justify-content-md-center"}>
                            <h5 className={"reviewHeader"}>
                                <FormattedMessage
                                    id={"Review.header"}
                                    defaultMessage={"Currently reviewing "}
                                />
                                {medicName}
                            </h5>
                        </Row>
                        <Row className={"justify-content-md-center"}>
                            <Col xs={6} md={4}>
                                {this.renderErrors(this.state.formErrors)}
                                <Form>
                                    <FormCheck custom inline
                                               label="1"
                                               type={'radio'}
                                               id={`1`}
                                               name={'radioGroup1'}
                                               onChange={this.handleRatingChange}
                                    />
                                    <FormCheck custom inline
                                               label="2"
                                               type={'radio'}
                                               id={`2`}
                                               name={'radioGroup1'}
                                               onChange={this.handleRatingChange}
                                    />
                                    <FormCheck custom inline
                                               label="3"
                                               type={'radio'}
                                               id={`3`}
                                               name={'radioGroup1'}
                                               onChange={this.handleRatingChange}
                                    />
                                    <FormCheck custom inline
                                               label="4"
                                               type={'radio'}
                                               id={`4`}
                                               name={'radioGroup1'}
                                               onChange={this.handleRatingChange}
                                    />
                                    <FormCheck custom inline
                                               label="5"
                                               type={'radio'}
                                               id={`5`}
                                               name={'radioGroup1'}
                                               onChange={this.handleRatingChange}
                                    />
                                    <textarea onChange={this.handleMessageChange}/>
                                    <Button variant={"danger"} onClick={this.submitReview}
                                            disabled={this.role.toLowerCase() === 'admin'}>
                                        <FormattedMessage
                                            id={"Button.add"}
                                            defaultMessage={"Add review"}
                                        />
                                    </Button>
                                </Form>
                            </Col>
                            <Col xs={12} md={8}>
                                <Table>
                                    <thead>
                                    <tr>
                                        <td colSpan={3}>
                                            <FormattedMessage
                                                id={"Review.comments"}
                                                defaultMessage={"Others said"}
                                            />
                                        </td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.createMessagesTable()}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </div>
                );
            } else {
                return null;
            }
        }
    }
}

export default Comments;
