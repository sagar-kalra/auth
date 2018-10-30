import React, { Component } from 'react';
import { TextInput, Text, View } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Spinner } from './common';

class LoginForm extends Component {
    
    state = { email: '',
            password: '',
            error: '',
            loading: false
            };
    
    onButtonPress(){
        const { email, password } = this.state;

        this.setState({ error : '', loading: true }); 

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch((err) => {
                console.log("Caught");
                console.log(err);
                this.setState({error: 'Authentication failed.', loading: false})
            });
        });
        
//        this.setState({ loading : false });
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false
        });
    }

    renderButton() {
        if (this.state.loading){
            return (
                <Spinner size="small" />
            );
        }

        return(
            <Button
            buttonText="Login" 
            onPress={this.onButtonPress.bind(this)}
            />
        );

    }

    render() {
        return(
            <Card>
                <CardSection >
                    <View style={styles.containerStyle}>
                    <Text style = {styles.labelStyle} >
                        Email
                    </Text>
                    <TextInput 
                        placeholder="Enter your mail"
                        autoCorrect={true}
                        value={this.state.email}
                        onChangeText={(email) => this.setState({email})}
                        style={styles.inputStyle}
                    />
                    </View>
                </CardSection>

                <CardSection >
                <View style={styles.containerStyle}>
                    <Text style = {styles.labelStyle} >
                        Password
                    </Text>
                    <TextInput 
                        secureTextEntry={true}
                        placeholder="Enter your password"
                        autoCorrect={false}
                        value={this.state.password}
                        onChangeText={(password) => this.setState({password})}
                        style={styles.inputStyle}
                    />
                    </View>
                </CardSection>   

                <Text style={styles.errorTextStyle } >
                    {this.state.error}
                </Text>

                <CardSection >
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2,
        paddingBottom: 10
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};


export default LoginForm;