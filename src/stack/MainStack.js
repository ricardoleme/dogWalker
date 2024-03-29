import React from 'react';
/* 
   O React Navigation Stack fornece uma maneira para seu aplicativo fazer a transição entre telas 
   e gerenciar o histórico de navegação.
*/
import { createStackNavigator } from '@react-navigation/stack'
import Preload from '../screens/Preload'
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'
import DogWalker from '../screens/DogWalker'
import MainTab from '../stack/MainTab'

const Stack = createStackNavigator()

export default () => {
    return (
        <Stack.Navigator
            initialRouteName="Preload"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Preload" component={Preload} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="MainTab" component={MainTab} />
            <Stack.Screen name="DogWalker" component={DogWalker} />
        </Stack.Navigator>
    )
}