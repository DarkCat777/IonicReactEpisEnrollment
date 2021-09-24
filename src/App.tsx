import {
    IonApp,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage, IonRouterOutlet,
    IonTitle,
    IonToolbar
} from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import React, {Component} from 'react';

// Import Ionic 5 styles
import '@ionic/core/css/ionic.bundle.css';

import axios from 'axios';
import {IonReactRouter} from "@ionic/react-router";
import {Redirect, Route} from "react-router";
import Students from "./pages/Students";
import Enrollment from "./pages/Enrollment";

const App: React.FC = () => {
    return (<IonApp>
        <IonReactRouter>
            <IonRouterOutlet>
                <Route path="/students" component={Students}/>
                <Route exact path="/enrollment/:id" render={(props) => (
                    <Enrollment id={props.match.params.id}/>
                )}/>
                <Redirect exact from="/" to="/students"/>
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>)
}
export default App;
