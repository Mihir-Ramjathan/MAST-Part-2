
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

