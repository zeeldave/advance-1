/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import { Container, Input, Dropdown, Button, Table, Label, Icon } from 'semantic-ui-react';
import UpdateSkillButtonGroup from './UpdateSkillButtonGroup.jsx'

export default class Skill extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addMode: false,
            levelOption: [
                {
                    key: 'Beginner',
                    value: 'Beginner',
                    text: 'Beginner'
                },
                {
                    key: 'Intermediate',
                    value: 'Intermediate',
                    text: 'Intermediate'
                },
                {
                    key: 'Expert',
                    value: 'Expert',
                    text: 'Expert'
                }
            ],
            skills: [],
            newSkill: "",
            newSkillLevel: ""
        }

        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    };

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.skillData) !== JSON.stringify(this.props.skillData)) {
            this.setState({
                skills: this.props.skillData
            })
        }
    }

    toggleEdit() {
        this.setState({
            addMode: !this.state.addMode,
            newSkill: "",
            newSkillLevel: ""
        })
    }

    handleUpdate(id, name, level) {
        for (let i = 0; i < this.state.skills.length; i++) {
            if (this.state.skills[i].id === id) {
                this.state.skills[i].name = name;
                this.state.skills[i].level = level;
            }
        }
        this.props.updateProfileData({ skills: this.state.skills });
    }


    handleSave() {
        if (this.state.newSkill === "" || this.state.newSkillLevel === "") {
            TalentUtil.notification.show("Please fill the skill and level", "error", null, null);
        } else {
            var joined = this.state.skills.concat({ name: this.state.newSkill, level: this.state.newSkillLevel });
            //console.log(joined)
            this.setState({
                skills: joined
            }, () => {
                //window.location.reload();
                this.props.updateProfileData({ skills: this.state.skills })
            })
        }
    }

    handleDelete(id) {
        for (let i = 0; i < this.state.skills.length; i++) {
            if (this.state.skills[i].id === id) {
                this.state.skills[i].isDeleted = true
            }
        }

        this.props.updateProfileData({ skills: this.state.skills });
    }


    render() {
        const skillsData = this.props.skillData;
        if (!this.state.addMode) {
            return (
                <React.Fragment>
                    <Container style={{ margin: '20px' }}>
                        <Table fixed>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Skill</Table.HeaderCell>
                                    <Table.HeaderCell>Level</Table.HeaderCell>
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
                                {skillsData.map((s) => {
                                    if (!s.isDeleted) {
                                        return (
                                            <UpdateSkillButtonGroup key={s.id} skill={s} handleUpdate={this.handleUpdate} handleDelete={this.handleDelete} />
                                        )
                                    }

                                })}
                            </Table.Body>
                        </Table>
                    </Container>
                </React.Fragment >
            )
        } else {
            return (
                <React.Fragment>
                    <Container style={{ margin: '20px' }}>
                        <Input
                            style={{ marginRight: '20px' }}
                            placeholder="Add Skill"
                            onChange={(e) => this.setState({ newSkill: e.target.value })}
                        >
                        </Input>
                        <Dropdown
                            placeholder="Skill Level"
                            search
                            selection
                            options={this.state.levelOption}
                            onChange={(e, data) => this.setState({ newSkillLevel: data.value })}
                            style={{ marginRight: '20px' }}
                        />

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
                                    <Table.HeaderCell>Skill</Table.HeaderCell>
                                    <Table.HeaderCell>Level</Table.HeaderCell>
                                    <Table.HeaderCell>
                                        <Button
                                            floated='right'
                                            color='teal'
                                        //onClick={this.toggleEdit}
                                        >
                                            <Icon name='plus' />
                                            Add New
                                        </Button>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body >
                                {skillsData.map((s) => {
                                    if (!s.isDeleted) {
                                        return (
                                            <UpdateSkillButtonGroup key={s.id} skill={s} handleUpdate={this.handleUpdate} handleDelete={this.handleDelete} />
                                        )
                                    }

                                })}
                            </Table.Body>
                        </Table>
                    </Container>
                </React.Fragment>
            )
        }
    }
}