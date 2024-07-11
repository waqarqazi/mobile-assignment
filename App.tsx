import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './src/screens/MainScreen';
import EmployeeDetailScreen from './src/screens/EmployeeDetailScreen';
import CreateEmployeeScreen from './src/screens/CreateEmployeeScreen';
import UpdateEmployeeScreen from './src/screens/UpdateEmployeeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="EmployeeDetail" component={EmployeeDetailScreen} />
        <Stack.Screen name="CreateEmployee" component={CreateEmployeeScreen} />
        <Stack.Screen name="UpdateEmployee" component={UpdateEmployeeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
