import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, Input, Spinner } from '../components/common';
import { auth, db } from '../config';
import { Logo } from '../resources/images';

class LoginForm extends Component {
    state = { 
        email: '', 
        password: '', 
        error: '',
        loading: false,
    };
    
    handleSubmit() {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true });
        
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('LOGIN SUCCESS')
                this.onLoginSuccess()
            })
            .catch(() => {
                console.log('TRYING SIGN UP')
                auth.createUserWithEmailAndPassword(email, password)
                    .then(successMessage => {
                        this.addToUserDatabase().bind(this)
                        this.onLoginSuccess(successMessage).bind(this)
                    })
                    .catch(() => {
                        console.log('LOGIN AND SIGNUP FAILED')
                        this.onLoginFail.bind(this)
                    });
            });
    }

    addToUserDatabase() {
        let postData = {
            email: this.state.email,
            displayName: 'Cheryl', 
            username: 'cherylnqj',
            phoneNumber: '91234567',
            password: this.state.password,
            photoURL: 'https://i.pinimg.com/originals/82/f1/a0/82f1a0775df5b99ebc9373eafd771167.jpg',
            birthDate: '21/10/1999'
        }

        // let uid = auth.currentUser.uid
        // let dbLocation = '/users/' + uid;

        // console.log('add to user is working')

        // db
        //     .ref(dbLocation)
        //     .set({username: 'hello!'})
        //     .then((success) => {
        //         console.log('User Added: ', success) // success callback
        //         Actions.mainPage();
        //     })
        //     .catch((error) => {
        //         console.log('Error Message: ', error) // error callback
        //     })
    }

    onLoginFail() {
        this.setState({ error: 'Authentication Failed.', loading: false})
    }

    onLoginSuccess(message) {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: '',
        });

        this.addToUserDatabase()

        // let uid = auth.currentUser.uid
        // let dbLocation = '/users/' + uid;

        // db
        //     .ref(dbLocation)
        //     .on('value', snapshot => {
        //         if ( snapshot.val() === null ) {
        //             return null;
        //         } else {
        //             console.log(snapshot.val().username)
        //         }
        //     });
        // console.log('LOGIN SUCCESS')
        // console.log(message.user.uid)
        Actions.mainPage()
    }

    renderButton() {
        if(this.state.loading) {
            return <Spinner size="small" />
        } else {
            return (
                <Button onPress={this.handleSubmit.bind(this)}>
                    LOGIN
                </Button>
            )
        }
    }

    render() {
        const { 
            containerStyle,
            titleStyle,
            errorTextStyle,
            imageContainerStyle
        } = styles;
        
        return(
            <View style={containerStyle}> 
                <View>
                    <Text style={titleStyle}>Login</Text>

                    <Input 
                        placeholder="user@gmail.com"
                        label="Email"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    /> 

                    <Input 
                        placeholder="password"
                        label="Password"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        secureTextEntry
                    />

                    <View>{this.renderButton()}</View>

                    {/* <Button onPress={() => this.handleSubmit()}>
                        LOGIN
                    </Button> */}
                </View>
                <View style={imageContainerStyle}>
                    <Image 
                        source={ Logo }
                        style={ styles.imageStyle }
                    />
                </View>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#2D9B83',
        justifyContent: 'space-between'
    },
    titleStyle: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 32,
        color: '#FFFFFF',
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 50,
        marginRight: 50,
        borderColor: '#FF7058',
        backgroundColor: '#F3A462',
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
    },
    imageStyle: {
        height: 200,
        width: 200
    },
    imageContainerStyle: {
        backgroundColor: '#2D9B83',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
};

export default LoginForm;