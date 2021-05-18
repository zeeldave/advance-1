/* Self introduction section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Popup, Button, Grid, Icon, Container, Input, Form, TextArea } from 'semantic-ui-react';

export default class SelfIntroduction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Summary: "",
            Description: "",
            editMode: false
        }

        this.changeSum = this.changeSum.bind(this);
        this.changeDes = this.changeDes.bind(this);
        this.editmode = this.editmode.bind(this);
    };

    editmode() {
        this.setState({
            editMode: !this.state.editMode
        })
    }

    changeSum(e) {
        this.setState({
            Summary: e.target.value
        });
    }

    changeDes(e) {
        this.setState({
            Description: e.target.value
        });
    }

    render() {
        const summary = this.props.summary === null || this.props.summary === undefined
            || this.props.summary === "" ? "" : this.props.summary;
        const description = this.props.description === null || this.props.description === undefined ||
            this.props.description === "" ? "" : this.props.description;
        if (this.state.editMode) {
            return (
                <React.Fragment>
                    <Container style={{ margin: '20px' }}>
                        <Form>
                            <Input fluid placeholder='Please provide a short summary about yourself.' onChange={(e) => this.changeSum(e)} defaultValue={this.props.summary} />
                            <h5>Summary must be no more than 150 characters</h5>
                            <TextArea rows={5} placeholder="Please tell us any hobbies, additional expertise, or anything else you'd like to add." onChange={(e) => this.changeDes(e)} defaultValue={this.props.description} />
                            <h5>Description must be between 150 - 600 characters</h5>
                            <Button color='teal' onClick={() => {
                                this.props.updateProfileData({ summary: this.state.Summary === "" ? summary : this.state.Summary, description: this.state.Description === "" ? description : this.state.Description});
                                this.editmode();
                            }}>Save</Button>
                            <Button onClick={this.editmode}>Cancel</Button>
                        </Form>

                    </Container>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Container style={{ margin: '20px' }}>
                        <h4>Summary: </h4>
                        <p>{summary}</p>
                        <br />
                        <h4>Description: </h4>
                        <p>{description}</p>
                        <Button floated='right' color='teal' onClick={this.editmode}>Edit</Button>
                    </Container>
                </React.Fragment>
            );
        }


    }
}