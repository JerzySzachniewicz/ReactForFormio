import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Login from './login';
import * as serviceWorker from './serviceWorker';
import { Switch, Route, HashRouter, Link} from 'react-router-dom'
import FormsToEdit from "./FormsToEdit";
import MyFormBuilder from "./MyFormBuilder";
import App from "./App";

ReactDOM.render(
    <HashRouter >
        <div>
            <div className="mw-100 header">
                <div className="w-25 p-3 header_cell"><Link to="/">Forms</Link></div>
                <div className="w-25 p-3 header_cell"><Link to="/FormEdit">Form builder</Link></div>
                <div className="w-25 p-3 header_cell"><Link to="/login">Login</Link></div>
            </div>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route exact path="/FormEdit" component={FormsToEdit}/>
                <Route exact path="/FormBuilder" component={MyFormBuilder}/>
                <Route path="/login" component={Login}/>}/>
            </Switch>
        </div>
    </HashRouter >
    , document.getElementById('root')
);


serviceWorker.unregister();
