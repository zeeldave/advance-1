import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Container, Input, Dropdown, Button, Table, Label, Icon } from 'semantic-ui-react';

export default class UpdateLanguageButtonGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPencil: true,
            name: "",
            level: "",
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
            ]
        }

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeLevel = this.handleChangeLevel.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }

    handleChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleChangeLevel(e, data) {
        this.setState({
            level: data.value
        })
    }

    handleUpdate() {
        const name = this.state.name === "" ? this.props.language.name : this.state.name;
        const level = this.state.level === "" ? this.props.language.level : this.state.level;
        const id = (this.props.language.id);
        this.props.handleUpdate(id, name, level);
        this.setState({
            showPencil: true
        })
    }

    handleDelete() {
        const id = this.props.language.id
        this.props.handleDelete(id);
    }

    render() {
        const name = this.props.language.name === "" ? "" : this.props.language.name;
        const level = this.props.language.level === "" ? "" : this.props.language.level;
        if (this.state.showPencil) {
            return (
                <Table.Row>
                    <Table.Cell>{this.props.language.name}</Table.Cell>
                    <Table.Cell>{this.props.language.level}</Table.Cell>
                    <Table.Cell textAlign='right'>
                        <Icon name='pencil alternate' floated='right' link onClick={() => this.setState({ showPencil: false })} />
                        <Icon name='close' floated='right' link onClick={this.handleDelete} />
                    </Table.Cell>
                </Table.Row>
            )
        } else {
            return (
                <Table.Row>
                    <Table.Cell><Input defaultValue={name} onChange={(e) => this.handleChangeName(e)}></Input></Table.Cell>
                    <Table.Cell style={{ overflow: 'visible' }}>
                        <Dropdown
                            options={this.state.levelOption}
                            search
                            selection
                            defaultValue={level}
                            onChange={(e, data) => this.handleChangeLevel(e, data)}
                        >

                        </Dropdown>
                    </Table.Cell>
                    <Table.Cell>
                        <Button basic color='blue' onClick={() => this.handleUpdate()}>
                            Update
                    </Button>
                        <Button basic color='red' onClick={() => this.setState({ showPencil: true })}>
                            Cancel
                    </Button>
                    </Table.Cell>
                </Table.Row>
            );
        }

    }
}