﻿import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';
import { Container, Input, Dropdown, Button, Table, Label, Icon, Grid } from 'semantic-ui-react';

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [
                {
                    key: 'Citizen',
                    text: 'Citizen',
                    value: 'Citizen'
                },
                {
                    key: 'Permanent Resident',
                    text: 'Permanent Resident',
                    value: 'Permanent Resident'
                },
                {
                    key: 'Work Visa',
                    text: 'Work Visa',
                    value: 'Work Visa'
                },
                {
                    key: 'Student Visa',
                    text: 'Student Visa',
                    value: 'Student Visa'
                }
            ],
            visaStatus: "",
            visaExpiryDate: new Date(0)

        }
        this.handleChangeVisa = this.handleChangeVisa.bind(this);
        this.formatdate = this.formatdate.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleChangeVisa(e, { value }) {
        this.setState({
            visaStatus: value
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.visaStatus !== this.props.visaStatus && prevProps.visaExpiryDate !== this.props.visaExpiryDate) {
            this.setState({
                visaStatus: this.props.visaStatus,
                visaExpiryDate: this.props.visaExpiryDate
            })
        }
    }

    formatdate(value) {
        let editdate = new Date(value)
        let year = editdate.getFullYear();
        let month = editdate.getMonth() + 1;
        let date = editdate.getDate();
        if (month < 10) { month = "0" + month }
        if (date < 10) { date = "0" + date }
        const finaldate = `${date}/${month}/${year}`;
        return finaldate;
    }

    handleChangeDate(value) {
        let validation = value.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)
        if (validation) {
            const dateArray = value.split(/\/|\-/);
            const visaExpiryDate = new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`);
            this.setState({
                visaExpiryDate: visaExpiryDate
            })
        }
    }

    handleSave(visaStatus, visaExpiryDate) {
        //console.log(visaStatus, visaExpiryDate)
        this.props.saveProfileData({ visaStatus: visaStatus, visaExpiryDate: visaExpiryDate })
    }


    render() {
        let visaStatus = this.state.visaStatus === null ? "" : this.state.visaStatus;
        let visaExpiryDate = this.state.visaExpiryDate === null ? new Date(0) : this.state.visaExpiryDate;
        //console.log(visaStatus, visaExpiryDate)
        if (visaStatus === "" || visaStatus === 'Citizen' || visaStatus === "Permanent Resident") {
            visaExpiryDate = null
            return (
                <React.Fragment>
                    <Container style={{ margin: '20px' }}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={6}>
                                    <h5>Visa type</h5>
                                    <Dropdown
                                        fluid
                                        search
                                        selection
                                        options={this.state.options}
                                        onChange={(e, data) => this.handleChangeVisa(e, data)}
                                        placeholder="Please choose your visa status"
                                        value={visaStatus}
                                    >
                                    </Dropdown>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Button
                                        style={{ marginTop: '32px' }}
                                        color='teal'
                                        onClick={() => this.handleSave(visaStatus, visaExpiryDate)}
                                    >
                                        Save
                                    </Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Container style={{ margin: '20px' }}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={6}>
                                    <h5>Visa type</h5>
                                    <Dropdown
                                        fluid
                                        search
                                        selection
                                        options={this.state.options}
                                        onChange={(e, data) => this.handleChangeVisa(e, data)}
                                        value={visaStatus}
                                    >
                                    </Dropdown>
                                </Grid.Column>
                                <Grid.Column width={6}>
                                    <h5>Visa expiry date</h5>
                                    <Input
                                        style={{ opacity: '1' }}
                                        fluid
                                        defaultValue={this.formatdate(visaExpiryDate)}
                                        onChange={(e) => this.handleChangeDate(e.target.value)}
                                    >
                                    </Input>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Button
                                        style={{ marginTop: '32px' }}
                                        color='teal'
                                        onClick={() => this.handleSave(visaStatus, visaExpiryDate)}
                                    >
                                        Save
                                    </Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </React.Fragment>
            )
        }



    }
}