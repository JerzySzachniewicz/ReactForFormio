import React, { Component } from 'react';
import './App.css';
import {Form} from 'react-formio';
import AuthorizationProvider from "./AuthorizationProvider";

export default class App extends Component{

    constructor(props) {
        super(props);
        this.state = {form: {},
        loaded : false};
        this.authorizationProvider = new AuthorizationProvider();
    }

    componentDidMount() {
        this.authorizationProvider.fetch('/forms/formSchema/' + this.props.formId)
            .then((data) => {
                let parsedData = data;
                parsedData['components'] = JSON.parse(data['components'])['components'];
                this.setState({ form: parsedData,
                    loaded : true
                })
            })
            .catch(console.log)
    }

    render() {
        return this.state.loaded ? <Form form={this.state.form} onSubmit={(schema) => this.sendData(schema)}/> : <div>Form is loading</div>
    }

    sendData = (schema) => {
        this.authorizationProvider.fetch('/forms/form/' + this.props.formId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(schema["data"])
        }).then(r => console.log(r))
    };


}