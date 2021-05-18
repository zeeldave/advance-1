/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Container, Icon, Button } from 'semantic-ui-react';


export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: "",
            imageUrl: "",
            showButton: true
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);

    };

    handleClick(id) {
        document.getElementById(`input${id}`).click();
    }

    componentDidUpdate(prevProps) {
        if (this.props.imageId !== prevProps.imageId) {
            this.setState({
                imageUrl: this.props.imageId
            })
        }
    }


    handleFileUpload(e) {
        debugger;
        let data = new FormData();
        data.append('file', e.target.files[0]);
        this.setState({
            imageUrl: window.URL.createObjectURL(e.target.files[0])
        })
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: this.props.savePhotoUrl,
            headers: {
                'Authorization': 'Bearer ' + cookies
            },
            type: "POST",
            data: data,
            processData: false,
            contentType: false,
            success: function (res) {
              //  console.log(res)
                if (res.success == true) {
                    TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
    }

    render() {
        console.log(this.props);
       const savePhotoUrl = this.props.savePhotoUrl;
       const profilePhotoUrl = this.props.profilePhotoUrl;
        console.log(this.state.imageUrl)
      console.log(savePhotoUrl)
  console.log(profilePhotoUrl)
        if (this.state.imageUrl === "" || this.state.imageUrl === null) {
            return (
                <React.Fragment>
                    <Container style={{ margin: '20px' }}>
                        <input
                            id='input1'
                            style={{ display: "none" }}
                            accept=".jpg,.png,.jpeg"
                            onChange={(e) => this.handleFileUpload(e)}
                            type="file"
                        />
                        <Icon
                            name='camera retro'
                            size='massive'
                            link
                            onClick={() => this.handleClick(1)}
                        >
                        </Icon>
                    </Container>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Container style={{ margin: '20px' }}>
                        <img src={this.state.imageUrl} alt="Image is Loading" style={{ borderRadius: '50%', width: '150px', height: "150px" }} />
                        <br />
                        {this.state.showButton ?
                            <Button
                                onClick={() => this.setState({ showButton: false })}
                                color='teal'
                            >
                                Upload
                            </Button> :
                            ""
                        }
                        <input
                            id='input2'
                            style={{ display: "none" }}
                            accept=".jpg,.png,.jpeg"
                            onChange={(e) => this.handleFileUpload(e)}
                            type="file"
                        />
                    </Container>
                </React.Fragment>
            )
        }



    }
}