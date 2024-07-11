import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Employee {
  id: number;
  employee_name: string;
  employee_age: number;
  employee_salary: number;
}

interface Props {
  route: {
    params: {
      employee: Employee;
    };
  };
}

const EmployeeDetailScreen: React.FC<Props> = ({route}) => {
  const employee = route?.params?.employee;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee Details</Text>
      <Text>Name: {employee?.employee_name}</Text>
      <Text>Age: {employee?.employee_age}</Text>
      <Text>Salary: {employee?.employee_salary}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  title: {fontSize: 24, marginBottom: 16},
});

export default EmployeeDetailScreen;
