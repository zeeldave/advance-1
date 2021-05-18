/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import { Container, Input, Button, Table, Grid, Icon } from 'semantic-ui-react';
import UpdateExperienceCompoment from './UpdateExperienceCompoment.jsx';

export default class Experience extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addMode: false,
            company: "",
            position: "",
            startDate: new Date(0),
            endDate: new Date(0),
            responsibilities: "",
            experiences: [],
            openUpdateComponent: false,
            updateExp: {}
        }

        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.formatdate = this.formatdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    };

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.experienceData) !== JSON.stringify(this.props.experienceData)) {
            this.setState({
                experiences: this.props.experienceData
            })
        }
    }

    toggleEdit() {
        this.setState({
            addMode: !this.state.addMode,
        })
    }

    handleChangeStartDate(value) {
        let validation = value.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)
        if (validation) {
            const dateArray = value.split(/\/|\-/);
            const startDate = new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`);
            this.setState({
                startDate: startDate
            })
        }
    }

    handleChangeEndDate(value) {
        let validation = value.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)
        if (validation) {
            const dateArray = value.split(/\/|\-/);
            const endDate = new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`);
            this.setState({
                endDate: endDate
            })
        }
    }


    handleSave() {
        if (this.state.company === "" || this.state.position === "" || this.state.startDate.getTime() === new Date(0).getTime() || this.state.endDate.getTime() === new Date(0).getTime() || this.state.responsibilities === "") {
            TalentUtil.notification.show("Please fill all the blanks", "error", null, null);
        } else {
            var joined = this.state.experiences.concat({ company: this.state.company, position: this.state.position, responsibilities: this.state.responsibilities, start: this.state.startDate, end: this.state.endDate });

            this.setState({
                experiences: joined
            }, () => {
                this.toggleEdit();
                this.props.updateProfileData({ experience: this.state.experiences });
                //window.location.reload();
            })
        }
    }

    handleUpdate(id, company, position, responsibilities, start, end) {
        for (let i = 0; i < this.state.experiences.length; i++) {
            if (this.state.experiences[i].id === id) {
                this.state.experiences[i].company = company;
                this.state.experiences[i].position = position;
                this.state.experiences[i].responsibilities = responsibilities;
                this.state.experiences[i].start = start;
                this.state.experiences[i].end = end;
            }
        }
        this.handleEdit();
        this.props.updateProfileData({ experience: this.state.experiences });
    }

    handleEdit(exp) {
        this.setState({
            updateExp: exp,
            openUpdateComponent: !this.state.openUpdateComponent
        })
    }

    formatdate(value) {
        let editdate = new Date(value)
        let year = editdate.getFullYear();
        let month = editdate.getMonth() + 1;
        let date = editdate.getDate();
        if (month === 1) 
        {
            month = "Jan" 
        }else
        if(month === 2) 
        {
            month = "Feb" 
        }else
        if(month === 3) 
        {
            month = "Mar" 
        }else
        if(month === 4) 
        {
            month = "Apr" 
        }else
        if(month === 5) 
        {
            month = "May" 
        }else
        if(month === 6) 
        {
            month = "Jun" 
        }else
        if(month === 7) 
        {
            month = "Jul"
        }else
        if(month === 8) 
        {
            month = "Aug" 
        }else
        if(month === 9) 
        {
            month = "Sep" 
        }else
        if(month === 10) 
        {
            month = "Oct"
        }else
        if(month === 11) 
        {
            month = "Nov"
        }else
        if(month === 12) 
        {
            month = "Dec"
        }
             
        if (date < 10) { date = "0" + date }
        const finaldate = `${date}th${month},${year}`;
        return finaldate;
    }

    handleDelete(id) {
        for (let i = 0; i < this.state.experiences.length; i++) {
            if (this.state.experiences[i].id === id) {
                this.state.experiences[i].isDeleted = true
            }
        }
        this.props.updateProfileData({ experiences: this.state.experiences });
    }


    render() {
        const experienceData = this.props.experienceData;
        if (!this.state.addMode) {
            return (
                <React.Fragment>
                    <Container style={{ margin: '20px' }}>
                        <UpdateExperienceCompoment open={this.state.openUpdateComponent} Experience={this.state.updateExp} handleEdit={this.handleEdit} handleUpdate={this.handleUpdate} />

                        <Table fixed>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Company</Table.HeaderCell>
                                    <Table.HeaderCell>Position</Table.HeaderCell>
                                    <Table.HeaderCell>Responsibilities</Table.HeaderCell>
                                    <Table.HeaderCell>Start</Table.HeaderCell>
                                    <Table.HeaderCell>End</Table.HeaderCell>
                                    <Table.HeaderCell>
                                        <Button
                                            floated='right'
                                            color='teal'
                                            onClick={this.toggleEdit}
                                        >
                                            <Icon name='plus' />
                                            Add New
                                        </Button>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body >
                                {experienceData.map((exp) => {
                                    if (!exp.isDeleted) {
                                        return (
                                            <Table.Row key={exp.id}>
                                                <Table.Cell>{exp.company}</Table.Cell>
                                                <Table.Cell>{exp.position}</Table.Cell>
                                                <Table.Cell>{exp.responsibilities}</Table.Cell>
                                                <Table.Cell>{this.formatdate(exp.start)}</Table.Cell>
                                                <Table.Cell>{this.formatdate(exp.end)}</Table.Cell>
                                                <Table.Cell textAlign='right'>
                                                    <Icon name='pencil alternate' floated='right' link onClick={() => this.handleEdit(exp)} />
                                                    <Icon name='close' floated='right' link onClick={() => this.handleDelete(exp.id)} />
                                                </Table.Cell>
                                            </Table.Row>
                                        );
                                    }

                                })}
                            </Table.Body>
                        </Table>
                    </Container>
                </React.Fragment >
            );
        } else {
            return (
                <React.Fragment>
                    <Container style={{ margin: '20px' }}>
                        <UpdateExperienceCompoment open={this.state.openUpdateComponent} Experience={this.state.updateExp} handleEdit={this.handleEdit} handleUpdate={this.handleUpdate} />
                        <Grid style={{ marginBottom: '10px' }}>
                            <Grid.Row>
                                <Grid.Column width={8}>
                                    <h4>Company:</h4>
                                    <Input
                                        placeholder="Company"
                                        fluid
                                        onChange={(e) => this.setState({ company: e.target.value })}
                                    >
                                    </Input>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <h4>Position:</h4>
                                    <Input
                                        placeholder="Position"
                                        fluid
                                        onChange={(e) => this.setState({ position: e.target.value })}                                    >
                                    </Input>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column width={8}>
                                    <h4>Start Date:</h4>
                                    <Input
                                        placeholder="Start Date"
                                        fluid
                                        onChange={(e) => this.handleChangeStartDate(e.target.value)}                                    >
                                    </Input>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <h4>End Date:</h4>
                                    <Input
                                        placeholder="End Date"
                                        fluid
                                        onChange={(e) => this.handleChangeEndDate(e.target.value)}                                      >
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
                                    >
                                    </Input>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                        <Button
                            color='teal'
                            onClick={this.handleSave}
                        >
                            Add
                        </Button>
                        <Button onClick={this.toggleEdit}>Cancel</Button>
                        <Table fixed>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Company</Table.HeaderCell>
                                    <Table.HeaderCell>Position</Table.HeaderCell>
                                    <Table.HeaderCell>Responsibilities</Table.HeaderCell>
                                    <Table.HeaderCell>Start</Table.HeaderCell>
                                    <Table.HeaderCell>End</Table.HeaderCell>
                                    <Table.HeaderCell>
                                        <Button
                                            floated='right'
                                            color='teal'
                                            onClick={this.toggleEdit}
                                        >
                                            <Icon name='plus' />
                                            Add New
                                        </Button>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body >
                                {experienceData.map((exp) => {
                                    if (!exp.isDeleted) {
                                        return (
                                            <Table.Row key={exp.id}>
                                                <Table.Cell>{exp.company}</Table.Cell>
                                                <Table.Cell>{exp.position}</Table.Cell>
                                                <Table.Cell>{exp.responsibilities}</Table.Cell>
                                                <Table.Cell>{this.formatdate(exp.start)}</Table.Cell>
                                                <Table.Cell>{this.formatdate(exp.end)}</Table.Cell>
                                                <Table.Cell textAlign='right'>
                                                    <Icon name='pencil alternate' floated='right' link onClick={() => this.handleEdit(exp)} />
                                                    <Icon name='close' floated='right' link />
                                                </Table.Cell>
                                            </Table.Row>
                                        );
                                    }

                                })}
                            </Table.Body>
                        </Table>
                    </Container>
                </React.Fragment>
            );
        }
    }
}