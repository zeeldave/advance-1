/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup, Button, Grid, Icon, Container, Input } from 'semantic-ui-react';


export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            linkedIn: "",
            GitHub: "",
            //editmode for this component
            EditMode: false
        };

        this.editSocialMedia = this.editSocialMedia.bind(this);
        this.changeLinkedIn = this.changeLinkedIn.bind(this);
        this.changeGitHub = this.changeGitHub.bind(this);
        this.openLinkedIn = this.openLinkedIn.bind(this);
        this.openGit = this.openGit.bind(this);
    }

    componentDidMount() {
        $('.ui.button.social-media')
            .popup();
    }

    editSocialMedia() {
        this.setState({
            EditMode: !this.state.EditMode
        });
    }

    changeLinkedIn(e) {
        this.setState({
            linkedIn: e.target.value
        });
    }

    changeGitHub(e) {
        this.setState({
            GitHub: e.target.value
        });
    }

    openLinkedIn() {
        if (this.props.linkedAccounts.linkedIn.indexOf("https://") === 0) {
            window.open(`${this.props.linkedAccounts.linkedIn}`, "_blank")
        } else if(this.props.linkedAccounts.linkedIn !== ""){
            window.open(`https://${this.props.linkedAccounts.linkedIn}`, "_blank")
        } else {
            TalentUtil.notification.show("Invalid LinkedIn Url", "error", null, null)
        }
    }

    openGit () {
        if (this.props.linkedAccounts.github.indexOf("https://") === 0) {
            window.open(`${this.props.linkedAccounts.github}`, "_blank")
        } else if(this.props.linkedAccounts.github !== ""){
            window.open(`https://${this.props.linkedAccounts.github}`, "_blank")
        } else {
            TalentUtil.notification.show("Invalid GitHub Url", "error", null, null)
        }
    }

    render() {
        const l = this.props.linkedAccounts.linkedIn;
        const g = this.props.linkedAccounts.github;
        if (!this.state.EditMode) {
            return (
                <React.Fragment>
                    <Grid.Row>
                        <Grid.Column floated='left'>
                            <Button color='linkedin' style={{ width: '200px' }} onClick={() => this.openLinkedIn()}>
                                <Icon name='linkedin' /> LinkedIn
                            </Button>
                        </Grid.Column>
                        <Grid.Column floated='left'>
                            <Button color='black' style={{ width: '200px' }} onClick={() => this.openGit()}>
                                <Icon name='github' /> github
                            </Button>
                        </Grid.Column>
                        <Grid.Column floated='right' style={{ width: '100px' }}>
                            <Button
                                color='teal'
                                onClick={() => this.editSocialMedia()}
                            >
                                Edit
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </React.Fragment>
            );
        }
        else {
            return (
                <React.Fragment>
                    <Container style={{ margin: '20px' }}>
                        <h5>LinkedIn</h5>
                        <Input fluid placeholder='Enter your LinkedIn Url' onChange={(e) => this.changeLinkedIn(e)} defaultValue={this.props.linkedAccounts.linkedIn}/>
                        <h5>GitHub</h5>
                        <Input fluid placeholder='Enter your GitHub Url' onChange={(e) => this.changeGitHub(e)} defaultValue={this.props.linkedAccounts.github}/>
                        <br />
                        <Button color='teal' onClick={() => {
                            this.props.saveProfileData({
                                linkedAccounts: {
                                    linkedIn: this.state.linkedIn === "" ? l : this.state.linkedIn,
                                    github: this.state.GitHub === "" ? g : this.state.GitHub
                                }
                            }
                            )
                            this.editSocialMedia();
                        }
                        }> Save </Button>
                        <Button onClick={this.editSocialMedia}>Cancel</Button>
                    </Container>
                </React.Fragment>
            );
        }

    }

}