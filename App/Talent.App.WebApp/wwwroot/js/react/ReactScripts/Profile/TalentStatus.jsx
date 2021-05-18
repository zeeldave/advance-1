import React from 'react';
import { SingleInput } from '../Form/SingleInput.jsx';
import { Container, Input, Dropdown, Button, Table, Form, Checkbox } from 'semantic-ui-react';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, { value }) {
        this.setState({ value: value })
    }

    render() {
        return (
            <React.Fragment>
                <div style={{margin: '20px'}} >
                    <Form.Field>
                        Selected value: <b>{this.state.value}</b>
                    </Form.Field>
                    <Form.Field>
                        <Checkbox
                            radio
                            label='Actively looking for a job'
                            name='checkboxRadioGroup'
                            value='Actively looking for a job'
                            checked={this.state.value === 'Actively looking for a job'}
                            onChange={(e, d) => this.handleChange(e, d)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox
                            radio
                            label='Not looking for a job at the moment'
                            name='checkboxRadioGroup'
                            value='Not looking for a job at the moment'
                            checked={this.state.value === 'Not looking for a job at the moment'}
                            onChange={(e, d) => this.handleChange(e, d)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox
                            radio
                            label='Currently employed but open to job offer'
                            name='checkboxRadioGroup'
                            value='Currently employed but open to job offer'
                            checked={this.state.value === 'Currently employed but open to job offer'}
                            onChange={(e, d) => this.handleChange(e, d)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox
                            radio
                            label='Will be available on later date'
                            name='checkboxRadioGroup'
                            value='Will be available on later date'
                            checked={this.state.value === 'Will be available on later date'}
                            onChange={(e, d) => this.handleChange(e, d)}
                        />
                    </Form.Field>
                </div>
            </React.Fragment>
        )
    }
}