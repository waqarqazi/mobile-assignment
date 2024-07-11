import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import EmployeeListScreen from '../screens/EmployeeListScreen';
import EmployeeDetailScreen from '../screens/EmployeeDetailScreen';

type TabParamList = {
  EmployeeList: undefined;
  EmployeeDetail: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="EmployeeList" component={EmployeeListScreen} />
        <Tab.Screen name="EmployeeDetail" component={EmployeeDetailScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
