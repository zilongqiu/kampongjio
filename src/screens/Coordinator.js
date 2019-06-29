import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Button, NavBar } from '../components/common';
import { Open } from '../resources/icons';
import CoordinatorFullJio from '../components/Coordinator/CoordinatorFullJio';



class Coordinator extends Component {
    render() {
        const store = 'Al Amaan';
        const status = Open;

        const { 
            containerStyle,
            storeStyle,
        } = styles;

        return(
            <View style={containerStyle}>
                <View>
                    <Text style={storeStyle}>{store}</Text>
                    <CoordinatorFullJio />
                </View>
                <View>
                    <Button>CLOSE ORDER</Button>
                <NavBar />
                </View>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#2D9B83',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    storeStyle: {
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
}

export default Coordinator;