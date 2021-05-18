/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { Container, Input, Dropdown, Button, Table, Label, Icon } from 'semantic-ui-react';
import UpdateLanguageButtonGroup from './UpdateLanguageButtonGroup.jsx';

export default class Language extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            levelOption: [
                {
                    key: 'Basic',
                    value: 'Basic',
                    text: 'Basic'
                },
                {
                    key: 'Conversational',
                    value: 'Conversational',
                    text: 'Conversational'
                },
                {
                    key: 'Fluent',
                    value: 'Fluent',
                    text: 'Fluent'
                },
                {
                    key: 'Native/Bilingual',
                    value: 'Native/Bilingual',
                    text: 'Native/Bilingual'
                }
            ],
            languages: [],
            newLangName: "",
            newLangLevel: "",
            addMode: false
        }

        this.toggleEdit = this.toggleEdit.bind(this);
        this.handelChangeName = this.handelChangeName.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.languageData) !== JSON.stringify(this.props.languageData)) {
            this.setState({
                languages: this.props.languageData
            })
        }
    }

    toggleEdit() {
        this.setState({
            addMode: !this.state.addMode,
            newLangLevel: "",
            newLangName: ""
        })
    }

    handelChangeName(e) {
        this.setState({
            newLangName: e.target.value
        })
    }

    handleSave() {
        if (this.state.newLangLevel === "" || this.state.newLangName === "") {
            TalentUtil.notification.show("Please fill the language and level", "error", null, null);
        } else {
            var joined = this.state.languages.concat({ name: this.state.newLangName, level: this.state.newLangLevel });
            this.setState({
                languages: joined
            }, () => {
                this.props.updateProfileData({ languages: this.state.languages })
                //window.location.reload();
            }) //this.state.languages
        }
    }

    handleUpdate(id, name, level) {
        for (let i = 0; i < this.state.languages.length; i++) {
            if (this.state.languages[i].id === id) {
                this.state.languages[i].name = name;
                this.state.languages[i].level = level;
            }
        }
        this.props.updateProfileData({ languages: this.state.languages });

    }

    handleDelete(id) {
        for (let i = 0; i < this.state.languages.length; i++) {
            if (this.state.languages[i].id === id) {
                this.state.languages[i].isDeleted = true
            }
        }

        this.props.updateProfileData({ languages: this.state.languages });
    }


    render() {
        const languageData = this.props.languageData;

        if (!this.state.addMode) {
            return (
                <React.Fragment>
                    <Container style={{ margin: '20px' }}>
                        <Table fixed>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Language</Table.HeaderCell>
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
                                {languageData.map((language) => {
                                    if (!language.isDeleted) {
                                        return (
                                            <UpdateLanguageButtonGroup key={language.id} language={language} handleUpdate={this.handleUpdate} handleDelete={this.handleDelete} />
                                        )
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
                        <Input
                            style={{ marginRight: '20px' }}
                            placeholder="Add Language"
                            onChange={(e) => this.handelChangeName(e)}
                        >
                        </Input>
                        <Dropdown
                            placeholder="Language Level"
                            search
                            selection
                            options={this.state.levelOption}
                            onChange={(e, data) => this.setState({ newLangLevel: data.value })}
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
                                    <Table.HeaderCell>Language</Table.HeaderCell>
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
                                {languageData.map((language) => {
                                    if (!language.isDeleted) {
                                        return (
                                            <UpdateLanguageButtonGroup key={language.id} language={language} handleUpdate={this.handleUpdate} handleDelete={this.handleDelete} />
                                        )
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