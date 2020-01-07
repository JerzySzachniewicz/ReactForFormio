import React, { Component } from 'react';
import './App.css';
import {Form} from 'react-formio';

export default class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            color: "{props.color}",
            lol: {}
        };
    }

    componentDidMount() {
        fetch('http://localhost:8080/test')
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                this.setState({ color: data,
                    lol:{}
                })
            })
            .catch(console.log)
    }

    render() {
        return <Form form={this.state.color["form"]} onSubmit={(schema) => this.sendData(schema)} onChange={(submission) => this.onChange1(submission)} submission={this.state.lol}/>
    }

    sendData = (schema) => {
        fetch('http://localhost:8080/test', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(schema["data"])
        }).then(r => console.log(r))
    };

    onChange1 = (submission) => {
        if (submission.changed !== undefined) {
            this.setState({lol: {data: {email: 'test@test.pl'}}});
            console.log(submission);
        } else {
            console.log('lol');
        }
    }

}