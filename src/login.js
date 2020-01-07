import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Fade  } from 'reactstrap';
import AuthorizationProvider from "./AuthorizationProvider";

const userNameIsRequired = "User name is required";
const passwordIsRequired = "Password is required";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            errors: []
        };
        this.Auth = new AuthorizationProvider();
    }

    login = (event) => {
        event.preventDefault();
        let {errors, userName, password} = this.checkErrors();
        if (errors.password || errors.userName) {
            this.setState({
                errors: errors
            });
        } else {
            this.handleLogin(userName, password);
        }

    };

    checkErrors() {
        let errors = {};
        const userName = this.state.userName;
        if (userName.length === 0) {
            errors.userName = userNameIsRequired;
        }
        const password = this.state.password;
        if (password.length === 0) {
            errors.password = passwordIsRequired
        }
        return {errors, userName, password};
    }

    handleLogin(userName, password) {
        this.Auth.login(userName, password)
            .then(() => {
                alert("succes!")
            })
            .catch(err => {
                alert(err);
            })
    }

    handleChange = ({target : {value, name}}) => {
        this.setState({
            [name]: value
        });
    };


    render() {
        return (
            <div className="container">
                <Form id="loginForm" method="post" onSubmit={this.login}>
                    <FormGroup>
                        <Label for="userName">User name</Label>
                        <Input
                            type="text"
                            name="userName"
                            value={this.state.userName}
                            onChange={this.handleChange}
                            id="userName"
                            placeholder="Enter your user name address."
                        />
                        <FromValidationError field={this.state.errors.userName} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            id="password"
                            placeholder="Enter your password."
                        />
                        <FromValidationError field={this.state.errors.password} />
                    </FormGroup>
                    <Button>login</Button>
                </Form>
            </div>
        );
    }
}

const FromValidationError = props => (
    <Fade tag="p" className="error">
        { props.field }
    </Fade>
);