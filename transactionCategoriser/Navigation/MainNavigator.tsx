import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TransactionDetailsScene from '../transactionOrganiser/scenes/TransactionDetailsScene'
const Stack = createStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="TransactionDetailsScene"
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="TransactionDetailsScene" component={TransactionDetailsScene} />
        </Stack.Navigator>
    );
}

export default MainNavigator