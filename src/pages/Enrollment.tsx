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

type EnrollmentProps = {
    id: string
}

class Enrollment extends Component<EnrollmentProps> {
    API_URL = "http://127.0.0.1:8000/student/enrollment/"

    state = {
        student: {
            name: "",
            last_name: "",
            dni: 0,
            cui: 0
        },
        courses: []
    }

    constructor(props: EnrollmentProps) {
        super(props)
    }

    componentDidMount() {
        axios.get(this.API_URL + this.props.id).then(
            (response) => {
                console.log(response.data)
                if (response.data.courses) {
                    this.setState({student: response.data.student, courses: response.data.courses})
                } else {
                    this.setState({student: response.data.student, courses: []})
                }
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
                <IonButton href={"students"}> List of Students</IonButton>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonTitle>EPIS DETAIL ENROLLMENT</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>
                                {this.state.student.name}
                            </IonCardTitle>
                            <IonCardSubtitle>
                                {this.state.student.last_name}
                            </IonCardSubtitle>

                        </IonCardHeader>
                        <IonCardContent>
                            <p>CUI: {this.state.student.cui}</p>
                            <p>DNI: {this.state.student.dni}</p>
                        </IonCardContent>
                    </IonCard>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>
                                Courses
                            </IonCardTitle>
                        </IonCardHeader>
                        {this.state.courses.map((item: any) => (
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>
                                        {item.course.name}
                                    </IonCardTitle>
                                    <IonCardSubtitle>
                                        <b>Credits:</b> {item.course.credit}
                                    </IonCardSubtitle>
                                    <IonCardSubtitle>
                                        <b>Group:</b> {item.group.name}
                                    </IonCardSubtitle>
                                    <IonCardSubtitle>
                                        <b>Classroom N°:</b> {item.group.classroom_no}
                                    </IonCardSubtitle>

                                </IonCardHeader>
                                <IonCardContent>
                                    <p><b>ClassSchedule</b></p>
                                    {item.class_schedule.map((class_schedule: any) => (
                                        <>
                                            <p><b>Start Time:</b> {class_schedule.start_time}</p>
                                            <p><b>End Time:</b> {class_schedule.end_time}</p>
                                            <p><b>Day:</b> {class_schedule.day_of_week}</p>
                                        </>
                                    ))}
                                </IonCardContent>
                            </IonCard>

                        ))}

                    </IonCard>
                </IonContent>
            </IonApp>
        );
    }
}

export default Enrollment;
