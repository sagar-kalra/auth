import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection, Card } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {

    state = {
        loggedIn: null
    };

    componentWillMount() {
       // const firebase = require('firebase');
        firebase.initializeApp({
            apiKey: 'AIzaSyBDKf45XFxBagG7-4LfAGJTNRBJMon3HZU',
            authDomain: 'authentication-403b5.firebaseapp.com',
            databaseURL: 'https://authentication-403b5.firebaseio.com',
            projectId: 'authentication-403b5',
            storageBucket: 'authentication-403b5.appspot.com',
            messagingSenderId: '648444591753'
          });

          firebase.auth().onAuthStateChanged((user) => {
              if(user)
              {
                  this.setState({ loggedIn: true });
              } else {
                  this.setState({ loggedIn: false });
              }
          });
    }

    renderContent() {

        switch(this.state.loggedIn) {

            case true:
                return (<Card>
                            <CardSection>
                                <Button onPress={() => firebase.auth().signOut()} buttonText="Log Out" />
                            </CardSection>
                        </Card>
                );
            case false:
                return <LoginForm />
            default:
                return ( 
                    <Card>
                        <CardSection>
                            <Spinner />
                        </CardSection>
                    </Card>        
            );

        }
        
    }

    render() {
        return(
            <View>
                <Header  headerText='Authentication' />
                
                {this.renderContent()}
                   
            </View>
        );
    }
}



export default App;