import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import axios from 'axios';

const CreateEmployeeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [salary, setSalary] = useState<string>('');

  const handleCreate = async () => {
    try {
      await axios.post('https://dummy.restapiexample.com/api/v1/create', {
        name,
        age,
        salary,
      });
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Employee</Text>
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
      <Button title="Create" onPress={handleCreate} />
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

export default CreateEmployeeScreen;
