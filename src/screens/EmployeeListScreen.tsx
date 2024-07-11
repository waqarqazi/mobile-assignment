import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import {NavigationProp} from '@react-navigation/native';

interface Employee {
  id: number;
  employee_name: string;
  employee_age: number;
  employee_salary: number;
}

interface Props {
  navigation: NavigationProp<any>;
}

const EmployeeListScreen: React.FC<Props> = ({navigation}) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Setup axios retry
  axiosRetry(axios, {retries: 3, retryDelay: axiosRetry.exponentialDelay});

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://dummy.restapiexample.com/api/v1/employees',
      );
      setEmployees(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredEmployees}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EmployeeDetail', {employee: item})
              }>
              <View style={styles.item}>
                <Text>{item.employee_name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
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
  item: {padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc'},
  loading: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default EmployeeListScreen;
