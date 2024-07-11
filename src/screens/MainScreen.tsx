import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';
import axios from 'axios';

interface Employee {
  id: number;
  employee_name: string;
  employee_age: number;
  employee_salary: number;
}

const MainScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        'https://dummy.restapiexample.com/api/v1/employees',
      );
      setEmployees(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      console.log('id', id);

      await axios.delete(
        `https://dummy.restapiexample.com/api/v1/delete/${id}`,
      );
      fetchEmployees(); // Refresh the list
    } catch (error) {
      console.log(error);
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.employee_name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Employees"
        value={search}
        onChangeText={setSearch}
      />
      <Button
        title="Create Employee"
        onPress={() => navigation.navigate('CreateEmployee')}
      />
      <FlatList
        data={filteredEmployees}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text>{item.employee_name}</Text>
            <Button
              title="View"
              onPress={() =>
                navigation.navigate('EmployeeDetail', {employee: item})
              }
            />
            <Button
              title="Update"
              onPress={() =>
                navigation.navigate('UpdateEmployee', {employee: item})
              }
            />
            <Button title="Del" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default MainScreen;
