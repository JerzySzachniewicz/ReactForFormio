import React, { Component } from 'react';
import {FormEdit} from 'react-formio';
import {Link} from "react-router-dom";
import Button from "reactstrap/es/Button";
import './formio.builder.scss';
import ButtonToolbar from "reactstrap/es/ButtonToolbar";
import AuthorizationProvider from "./AuthorizationProvider";

export default class MyFormBuilder extends Component {

    constructor(props) {
        super(props);
        this.authorizationProvider = new AuthorizationProvider();

    }

    saveForm = (schema) => {
        this.authorizationProvider.fetch("/forms/formSchema",
            {
                method: 'POST',
                body: JSON.stringify(schema
                )})
            .then(res => {
                console.log("Saved!")
            }).catch(console.log)
    };

    render() {
        return <div>
            <div>
                <ButtonToolbar>
                    <Button variant="primary"><Link to="/FormEdit">Back to list</Link></Button>
                    <Button variant="primary" onClick={this.saveForm}>Save form</Button>
                </ButtonToolbar>
            </div>
                <FormEdit form={{display: 'form'}} saveForm={(schema) => this.saveForm(schema)}  saveText={"Save"}/>
            </div>;
    }
}