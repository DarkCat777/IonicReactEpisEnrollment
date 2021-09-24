import {
    IonApp,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonButton
} from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import React, {Component} from 'react';

// Import Ionic 5 styles
import '@ionic/core/css/ionic.bundle.css';

import axios from 'axios';

class Students extends Component {
    API_URL = "http://127.0.0.1:8000/student/"

    state = {
        items: []
    }

    componentDidMount() {
        axios.get(this.API_URL).then(
            (response) => {
                console.log(response.data)
                this.setState({items: response.data})
            },
            (error) => {
                console.log(error)
            }
        )
    }

    render() {
        // @ts-ignore
        return (
            <IonApp>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonTitle>EPIS STUDENTS</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    {this.state.items.map((item: any) => (
                        <IonCard key={item.id}>
                            <img src={item.urlToImage}/>
                            <IonCardHeader>
                                <IonCardTitle>
                                    {item.name}
                                </IonCardTitle>
                                <IonCardSubtitle>
                                    {item.last_name}
                                </IonCardSubtitle>

                            </IonCardHeader>
                            <IonCardContent>
                                <p>CUI: {item.cui}</p>
                                <p>DNI: {item.dni}</p>
                                <IonButton href={"enrollment/" + item.id}> Detail</IonButton>
                            </IonCardContent>
                        </IonCard>

                    ))}
                </IonContent>
            </IonApp>
        );
    }
}

export default Students;
