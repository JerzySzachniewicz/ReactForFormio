import React, { Component } from 'react';
import AuthorizationProvider from "./AuthorizationProvider";
import {Link} from "react-router-dom";

const FormItem = ({name, dateOfEdit}) => <div>{name + " - " + dateOfEdit}</div>;

export default class FormsToEdit extends Component {

    constructor(props) {
        super(props);
        this.authorizationProvider = new AuthorizationProvider();
        this.authorizationProvider.fetch("/form/formsToEdit", {method: 'GET'})
            .then(res => {
                this.setState(res);
        });
    }

    render() {
        return <div>
            <div>
                <Link to={"/FormBuilder"}> Add new form </Link>
            </div>
            {this.state !== null ? this.state.formsList.map((item, i) => <FormItem key={i} name={item.name} dateOfEdit={item.dateOfEdit}/>) : "Data is loading"}
        </div>
    }
}

