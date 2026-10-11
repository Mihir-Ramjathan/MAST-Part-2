
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Keyboard,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView
} from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <MainScreen />
    </SafeAreaProvider>
  );
}

function MainScreen() {
  const [DishName, setDishName] = useState('');
  const [Description, setDescription] = useState('');
  const [Course, setCourse] = useState('');
  const [Price, setPrice] = useState('');
  const [Error, setError] = useState('');

  const [MenuItems, setMenuItems] = useState<
    {
      DishName: string;
      Description: string;
      Course: string;
      Price: string;
    }[]
  >([]);

  // Add Menu Item
  function addMenuItem() {
    if (
      isEmpty(DishName) ||
      isEmpty(Description) ||
      isEmpty(Course) ||
      isEmpty(Price)
    ) {
      setError('Please complete all the fields.');
      return;
    }

    const PriceNumber = Number(Price);

    if (
      !Number.isFinite(PriceNumber) ||
      PriceNumber <= 0
    ) {
      setError('Please enter a valid price greater than zero.');
      return;
    }

    const NewItem = {
      DishName: DishName.trim(),
      Description: Description.trim(),
      Course: Course,
      Price: PriceNumber.toFixed(2),
    };

    setMenuItems((currentItems) => [
      ...currentItems,
      NewItem,
    ]);

    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
    setError('');

    Keyboard.dismiss();

    Alert.alert(
      'Menu Item Added',
      NewItem.DishName + ' has been added successfully.'
    );
  }

