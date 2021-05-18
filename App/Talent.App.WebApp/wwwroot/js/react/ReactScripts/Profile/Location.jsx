import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Container, Button, Form, Select } from 'semantic-ui-react';

export class Address extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            number: "",
            street: "",
            suburb: "",
            country: "",
            city: "",
            postCode: 0,
            cityOptions: [],
            editMode: false
        };

        this.editMode = this.editMode.bind(this);
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.changeNum = this.changeNum.bind(this);
        this.changeStreet = this.changeStreet.bind(this);
        this.changeSuburb = this.changeSuburb.bind(this);
        this.changePostCode = this.changePostCode.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);

    }

    editMode() {
        this.setState({
            editMode: !this.state.editMode
        });
    }

    handleChangeCountry(e, { value }, data) {
        let obj = []
        data[value].forEach(element => {
            obj.push({ key: element, value: element, text: element })
        });
        this.setState({
            country: value,
            cityOptions: obj
        })
    }

    handleChangeCity(e, { value }) {
        this.setState({
            city: value
        });
    }

    changeNum(e) {
        this.setState({
            number: e.target.value
        })
    }

    changeStreet(e) {
        this.setState({
            street: e.target.value
        })
    }

    changeSuburb(e) {
        this.setState({
            suburb: e.target.value
        })
    }

    changePostCode(e) {
        this.setState({
            postCode: e.target.value
        })
    }

    componentDidUpdate(prevProps) {
        //console.log(this.state.cityOptions)
    }

    render() {
        const data = require('../../../../util/jsonFiles/countries.json');
        let countryList = [];
        for (const [key] of Object.entries(data)) {
            countryList.push({ key: key, value: key, text: key });
        }
        const addressData = this.props.addressData;
        const number = (addressData.number === "" || addressData.number === null || addressData.number === undefined) ? "" : addressData.number;
        const street = (addressData.street === "" || addressData.street === null || addressData.street === undefined) ? "" : addressData.street;
        const suburb = (addressData.suburb === "" || addressData.suburb === null || addressData.suburb === undefined) ? "" : addressData.suburb;
        const postCode = (addressData.postCode === 0 || addressData.postCode === null || addressData.postCode === undefined) ? 0 : addressData.postCode;
        const addressPart = (number === "" || street === ""
            || suburb === "" || postCode === 0) ? "" : `${number}, ${street}, ${suburb}, ${postCode}`;
        const city = addressData.city === "" ? "" : addressData.city;
        const country = addressData.country === "" ? "" : addressData.country;
        if (!this.state.editMode) {
            return (
                <React.Fragment>
                    <Container style={{ margin: '20px' }}>
                        <h4>Address: {addressPart}</h4>
                        <h4>City: {city}</h4>
                        <h4>Country: {country}</h4>
                        <Button onClick={this.editMode} floated='right' color='teal'>Edit</Button>
                    </Container>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Container style={{ margin: '20px' }}>
                        <Form>
                            <Form.Group>
                                <Form.Input label='Number' width={4} defaultValue={this.props.addressData.number} onChange={(e) => this.changeNum(e)} />
                                <Form.Input label='Street' width={8} defaultValue={this.props.addressData.street} onChange={(e) => this.changeStreet(e)} />
                                <Form.Input label='Suburb' width={4} defaultValue={this.props.addressData.suburb} onChange={(e) => this.changeSuburb(e)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Select label='Country' width={6} options={countryList} onChange={(e, d) => this.handleChangeCountry(e, d, data)} defaultValue={this.props.addressData.country} />
                                <Form.Select label='City' width={6} options={this.state.cityOptions} onChange={(e, d) => this.handleChangeCity(e, d)} defaultValue={this.props.addressData.city} />
                                <Form.Input label='Post Code' defaultValue={this.props.addressData.postCode} width={4} onChange={(e) => this.changePostCode(e)} />
                            </Form.Group>
                        </Form>
                        <Button color='teal' onClick={() => {
                            this.props.saveProfileData({
                                address: {
                                    number: this.state.number === "" ? this.props.addressData.number : this.state.number,
                                    street: this.state.street === "" ? this.props.addressData.street : this.state.street,
                                    suburb: this.state.suburb === "" ? this.props.addressData.suburb : this.state.suburb,
                                    postCode: this.state.postCode === 0 ? this.props.addressData.postCode : this.state.postCode,
                                    city: this.state.city === "" ? this.props.addressData.city : this.state.city,
                                    country: this.state.country === "" ? this.props.addressData.country : this.state.country
                                }
                            });
                            this.editMode();
                        }
                        }>Save</Button>
                        <Button onClick={() => this.editMode()}>Cancel</Button>
                    </Container>
                </React.Fragment>
            );

        }

    }

}

export class Nationality extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nationality: "",
            showPlaceholderIfEmptyNation: false
        }

        this.findDefault = this.findDefault.bind(this);
        this.saveNation = this.saveNation.bind(this);
        this.changeNation = this.changeNation.bind(this);
    }

    findDefault() {
        //console.log(this.state.data);
        let result = this.state.data.find(x => x.value === this.props.nationalityData)
        return result.value
    }

    componentDidMount(pre) {
       
    }

    componentDidUpdate(prevProps) {
        if (this.props.nationalityData !== prevProps.nationalityData) {
            this.setState({
                showPlaceholderIfEmptyNation: true
            })
        }
    }

    saveNation() {
        this.props.saveProfileData({
            nationality: this.state.nationality === "" ? this.props.nationalityData : this.state.nationality
        });
    }

    changeNation(e, { value }) {
        this.setState({
            nationality: value
        });
    }

    render() {
        const data = require('../../../../util/jsonFiles/countries.json');
        let countryList = [];
        for (const [key] of Object.entries(data)) {
            countryList.push({ key: key, value: key, text: key });
        };
        //const nationality = (this.props.nationalityData === "" || this.props.nationalityData === null) ? "" : this.props.nationalityData;
        if (!this.state.showPlaceholderIfEmptyNation) {
            return (
                <React.Fragment>
                    <Container style={{ margin: '20px' }}>
                        <Form>
                            <Form.Select
                                options={countryList}
                                //width={6}
                                placeholder="Please select your nationality"
                                onChange={(e, d) => this.changeNation(e, d)}
                            //defaultValue={}
                            >
                            </Form.Select>

                        </Form>
                        <br />
                        <Button
                            color='teal'
                            onClick={() => this.saveNation()}
                            floated='left'
                        >
                            Save
                        </Button>
                    </Container>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Container style={{ margin: '20px' }}>
                        <div>{ }</div>
                        <Form>
                            <Form.Select
                                options={countryList}
                                onChange={(e, d) => this.changeNation(e, d)}
                                defaultValue={this.props.nationalityData}
                            >
                            </Form.Select>
                        </Form>
                        <br />
                        <Button
                            color='teal'
                            onClick={() => this.saveNation()}
                            floated='left'
                        >
                            Save
                        </Button>
                    </Container>
                </React.Fragment>
            );
        }

    }
}