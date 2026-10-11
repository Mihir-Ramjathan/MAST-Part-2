
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

  // Display Menu Items
  function renderMenuItems() {
    const arrOutput = [];

    for (let i = 0; i < MenuItems.length; i++) {
      arrOutput.push(
        <View key={i} style={styles.menuCard}>
          <View style={styles.menuCardHeader}>
            <Text style={styles.dishName}>
              {MenuItems[i].DishName}
            </Text>

            <Text style={styles.priceText}>
              R {MenuItems[i].Price}
            </Text>
          </View>

          <View style={styles.courseBadge}>
            <Text style={styles.courseBadgeText}>
              {MenuItems[i].Course}
            </Text>
          </View>

          <Text style={styles.menuDescription}>
            {MenuItems[i].Description}
          </Text>
        </View>
      );
    }

    return arrOutput;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Application Header */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>CM</Text>
          </View>

          <Text style={styles.WelcomeText}>
            Chef's Menu Manager
          </Text>

          <Text style={styles.headerSubtitle}>
            Restaurant Menu Management
          </Text>

          <Text style={styles.headerDescription}>
            Manage your dishes and keep your restaurant
            menu organised.
          </Text>
        </View>

        {/* Menu Item Form */}
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>
            Add a Menu Item
          </Text>

          <Text style={styles.sectionDescription}>
            Enter the details of your new dish below.
          </Text>

          {Error !== '' && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>
                {Error}
              </Text>
            </View>
          )}

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>
              Dish Name
            </Text>

            <TextInput
              style={styles.modernInput}
              placeholder="Enter dish name"
              placeholderTextColor="#94A3B8"
              value={DishName}
              onChangeText={(newText) => {
                setDishName(newText);
                setError('');
              }}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>
              Description
            </Text>

            <TextInput
              style={[
                styles.modernInput,
                styles.descriptionInput,
              ]}
              placeholder="Describe the dish and its ingredients"
              placeholderTextColor="#94A3B8"
              value={Description}
              onChangeText={(newText) => {
                setDescription(newText);
                setError('');
              }}
              multiline={true}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>
              Course
            </Text>

            <Text style={styles.helperText}>
              Select the type of dish.
            </Text>

            <View style={styles.courseContainer}>
              {[
                'Starter',
                'Main Course',
                'Dessert',
              ].map((item) => (
                <TouchableOpacity
                  key={item}
                  activeOpacity={0.8}
                  style={[
                    styles.courseButton,
                    Course === item &&
                      styles.selectedCourse,
                  ]}
                  onPress={() => {
                    setCourse(item);
                    setError('');
                  }}
                >
                  <Text
                    style={[
                      styles.courseButtonText,
                      Course === item &&
                        styles.selectedCourseText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>
              Price (R)
            </Text>

            <TextInput
              style={styles.modernInput}
              placeholder="e.g. 85.00"
              placeholderTextColor="#94A3B8"
              value={Price}
              onChangeText={(newText) => {
                setPrice(newText);
                setError('');
              }}
              keyboardType="decimal-pad"
            />
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.8}
            onPress={addMenuItem}
          >
            <Text style={styles.primaryButtonText}>
              + Add Menu Item
            </Text>
          </TouchableOpacity>
        </View>

        {/* Menu List */}
        <View style={styles.menuSection}>
          <View style={styles.menuSectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Your Menu
              </Text>

              <Text style={styles.sectionDescription}>
                All your added dishes appear here.
              </Text>
            </View>

            <View style={styles.countCircle}>
              <Text style={styles.countText}>
                {MenuItems.length}
              </Text>
            </View>
          </View>

          {MenuItems.length === 0 ? (
            <View style={styles.emptyCard}>
              <View style={styles.emptyIconCircle}>
                <Text style={styles.emptyIcon}>
                  +
                </Text>
              </View>

              <Text style={styles.emptyTitle}>
                No menu items yet
              </Text>

              <Text style={styles.emptyText}>
                Your menu is currently empty. Add your
                first dish using the form above.
              </Text>
            </View>
          ) : (
            renderMenuItems()
          )}
        </View>

        <Text style={styles.footerText}>
          Chef's Menu Manager
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

