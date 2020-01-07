import React, { Component } from 'react';
import {FormBuilder} from 'react-formio';
import {Link} from "react-router-dom";
import Button from "reactstrap/es/Button";
import ButtonToolbar from "reactstrap/es/ButtonToolbar";
import AuthorizationProvider from "./AuthorizationProvider";


export default class MyFormBuilder extends Component {

    constructor(props) {
        super(props);
        this.schema = {};
        this.authorizationProvider = new AuthorizationProvider();

    }

    saveForm = () => {
        let schema = this.schema;
        this.authorizationProvider.fetch("/form/saveForm",
            {
                method: 'POST',
                body: JSON.stringify({schema
                })})
            .then(res => {
                console.log("Saved!")
            });
    };

    render() {
        return <div>
            <div>
                <ButtonToolbar>
                    <Button variant="primary"><Link to="/FormEdit">Back to list</Link></Button>
                    <Button variant="primary" onClick={this.saveForm}>Save form</Button>
                </ButtonToolbar>
            </div>
                <FormBuilder form={{display: 'form'}} onChange={(schema) => this.schema = schema} />
            </div>;
    }
}