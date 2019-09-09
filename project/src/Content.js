import React from 'react';
import {Route, Switch} from "react-router-dom";
import Homepage from './Homepage/Homepage';
import Team from "./Team/Team";
import Contact from "./Contact/Contact";
import Units from "./Units/Units";
import Statistics from "./Units/Statistics";
import Location from "./Units/Location";
import Login from "./Login/Login";
import UserProfile from "./UserProfile/UserProfile";
import Register from "./Register/Register";
import Comments from "./comments/Comments";
import AdminDash from "./AdminDash/AdminDash";
import AddUnits from "./Units/Add/AddUnits";
import EditUnits from "./Units/Edit/EditUnits";
import AddMedic from "./Team/Add/AddMedic";
import EditMedic from "./Team/Edit/EditMedic";

export default class Content extends React.Component {
    render() {
        return (
            <>
                <Switch>
                    <Route exact path={'/'} component={Homepage}/>
                    <Route path={'/team'} component={Team}/>
                    <Route path={'/team/:id'} component={Team}/>
                    <Route path={'/comments'} component={Comments}/>
                    <Route path={'/comments/:id'} component={Comments}/>
                    <Route path={'/units'} component={Units}/>
                    <Route path={'/statistics'} component={Statistics}/>
                    <Route path={'/locations'} component={Location}/>
                    <Route path={'/contact'} component={Contact}/>
                    <Route path={'/login'} component={Login}/>
                    <Route path={'/register'} component={Register}/>
                    <Route path={'/profile'} component={UserProfile}/>
                    <Route path={'/dash'} component={AdminDash}/>
                    <Route path={'/addUnit'} component={AddUnits}/>
                    <Route path={'/editUnit'} component={EditUnits}/>
                    <Route path={'/addMedic'} component={AddMedic}/>
                    <Route path={'/editMedic'} component={EditMedic}/>
                </Switch>
            </>
        );
    }
};
