import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Container, Input, Button, Table, Grid, Icon } from 'semantic-ui-react';

export default class UpdateExperienceCompoment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            company: "",
            position: "",
            responsibilities: "",
            start: new Date(0),
            end: new Date(0)
        }

        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.formatdate = this.formatdate.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.open !== this.props.open || prevProps.Experience !== this.props.Experience) {
            this.setState({
                open: this.props.open,
                Experience: this.props.Experience
            })
        }
    }

    handleChangeStartDate(value) {
        let validation = value.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)
        if (validation) {
            const dateArray = value.split(/\/|\-/);
            const startDate = new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`);
            this.setState({
                start: startDate
            })
        }
    }

    handleChangeEndDate(value) {
        let validation = value.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)
        if (validation) {
            const dateArray = value.split(/\/|\-/);
            const endDate = new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`);
            this.setState({
                end: endDate
            })
        }
    }

    handleUpdate() {
        const id = this.props.Experience.id;
        const company = this.state.company === "" ? this.props.Experience.company : this.state.company;
        const position = this.state.position === "" ? this.props.Experience.position : this.state.position;
        const responsibilities = this.state.responsibilities === "" ? this.props.Experience.responsibilities : this.state.responsibilities;
        const start = this.state.start.getTime() === new Date(0).getTime() ? new Date(this.props.Experience.start) : this.state.start;
        const end = this.state.end.getTime() === new Date(0).getTime() ? new Date(this.props.Experience.end) : this.state.end;

        if (company === "" || position === "" || start.getTime() === new Date(0).getTime() || end.getTime() === new Date(0).getTime() || responsibilities === "") {
            TalentUtil.notification.show("Please fill all the blanks", "error", null, null);
        } else {
            this.props.handleUpdate(id, company, position, responsibilities, start, end)
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

    render() {
        if (this.props.open) {
            return (
                <Container>
                    <Grid style={{ marginBottom: '10px' }}>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <h4>Company:</h4>
                                <Input
                                    placeholder="Company"
                                    fluid
                                    onChange={(e) => this.setState({ company: e.target.value })}
                                    defaultValue={this.props.Experience.company}
                                >
                                </Input>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <h4>Position:</h4>
                                <Input
                                    placeholder="Position"
                                    fluid
                                    onChange={(e) => this.setState({ position: e.target.value })}
                                    defaultValue={this.props.Experience.position}
                                >
                                </Input>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={8}>
                                <h4>Start Date:</h4>
                                <Input
                                    placeholder="Start Date"
                                    fluid
                                    onChange={(e) => this.handleChangeStartDate(e.target.value)}
                                    defaultValue={this.formatdate(this.props.Experience.start)}
                                >
                                </Input>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <h4>End Date:</h4>
                                <Input
                                    placeholder="End Date"
                                    fluid
                                    onChange={(e) => this.handleChangeEndDate(e.target.value)}
                                    defaultValue={this.formatdate(this.props.Experience.end)}
                                >
                                </Input>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={16}>
                                <h4>Responsibilities:</h4>
                                <Input
                                    placeholder="Responsibilities"
                                    fluid
                                    onChange={(e) => this.setState({ responsibilities: e.target.value })}
                                    defaultValue={this.props.Experience.responsibilities}
                                >
                                </Input>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Button
                        color='teal'
                        onClick={() => this.handleUpdate()}
                    >
                        Update
                        </Button>
                    <Button onClick={() => this.props.handleEdit({})} >Cancel</Button>
                </Container>
            );
        } else {
            return (
              <div>
                    <React.Fragment></React.Fragment>
              </div>
            );
        }
    }
}