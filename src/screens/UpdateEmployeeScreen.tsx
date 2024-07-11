import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import axios from 'axios';

interface Employee {
  id: number;
  employee_name: string;
  employee_age: number;
  employee_salary: number;
}

const UpdateEmployeeScreen: React.FC<{route: any; navigation: any}> = ({
  route,
  navigation,
}) => {
  const {employee}: {employee: Employee} = route.params;
  const [name, setName] = useState<string>(employee.employee_name);
  const [age, setAge] = useState<string>(employee.employee_age.toString());
  const [salary, setSalary] = useState<string>(
    employee.employee_salary.toString(),
  );

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://dummy.restapiexample.com/api/v1/update/${employee.id}`,
        {
          name,
          age,
          salary,
        },
      );
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Employee</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Salary"
        value={salary}
        onChangeText={setSalary}
      />
      <Button title="Update" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  title: {fontSize: 24, marginBottom: 16},
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default UpdateEmployeeScreen;
