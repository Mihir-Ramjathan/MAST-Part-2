
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

// Error Handling
function isEmpty(value: string) {
  return value == null || value.trim().length === 0;
}

// Application Styling
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 25,
  },

  header: {
    backgroundColor: '#2563EB',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 32,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 4,
  },

  logoText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  WelcomeText: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  headerSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DBEAFE',
    marginTop: 7,
  },

  headerDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 12,
  },

  formCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 18,
    marginTop: 22,
    padding: 20,
    borderRadius: 18,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 7,
  },

  sectionDescription: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 18,
  },

  inputWrapper: {
    marginBottom: 19,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 8,
  },

  helperText: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 10,
  },

  modernInput: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#0F172A',
    backgroundColor: '#F8FAFC',
  },

  descriptionInput: {
    minHeight: 95,
    paddingTop: 13,
  },

  courseContainer: {
    gap: 9,
  },

  courseButton: {
    paddingVertical: 13,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
  },

  selectedCourse: {
    backgroundColor: '#DBEAFE',
    borderColor: '#2563EB',
    borderWidth: 2,
  },

  courseButtonText: {
    fontSize: 14,
    color: '#334155',
    textAlign: 'center',
  },

  selectedCourseText: {
    color: '#1D4ED8',
    fontWeight: 'bold',
  },

  primaryButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
    elevation: 2,
  },

  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  errorBox: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FECACA',
    padding: 12,
    borderRadius: 10,
    marginBottom: 18,
  },

  errorText: {
    color: '#B91C1C',
    fontSize: 14,
    fontWeight: '600',
  },

  menuSection: {
    marginHorizontal: 18,
    marginTop: 28,
  },

  menuSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },

  countCircle: {
    minWidth: 42,
    height: 42,
    paddingHorizontal: 10,
    borderRadius: 21,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
  },

  countText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  emptyIconCircle: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  emptyIcon: {
    fontSize: 30,
    color: '#2563EB',
    fontWeight: 'bold',
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 21,
  },

  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 17,
    marginBottom: 13,
    borderLeftWidth: 5,
    borderLeftColor: '#2563EB',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },

  menuCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },

  dishName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
  },

  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  courseBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#DBEAFE',
    borderRadius: 7,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  courseBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1D4ED8',
  },

  menuDescription: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 21,
  },

  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 28,
  },
});

/* References
React Native Restaurant Menu Management App
The following sources support the React, React Native and Expo components and APIs used in the application. 
i used these webistes to help me coding, with function of the app and styling
1. App and Flow (n.d.) react-native-safe-area-context: SafeAreaProvider. Available at: https://github.com/AppAndFlow/react-native-safe-area-context/blob/main/docs/docs/api/safe-area-provider.mdx (Accessed: 11 October 2026).
2. Expo (n.d.) StatusBar. Available at: https://docs.expo.dev/versions/latest/sdk/status-bar/ (Accessed: 11 October 2026).
3. React (n.d.) useState. Available at: https://react.dev/reference/react/useState (Accessed: 11 October 2026).
4. React Native (n.d.) Alert. Available at: https://reactnative.dev/docs/alert (Accessed: 11 October 2026).
5. React Native (n.d.) Keyboard. Available at: https://reactnative.dev/docs/keyboard (Accessed: 11 October 2026).
6. React Native (n.d.) ScrollView. Available at: https://reactnative.dev/docs/scrollview (Accessed: 11 October 2026).
7. React Native (n.d.) StyleSheet. Available at: https://reactnative.dev/docs/stylesheet (Accessed: 11 October 2026).
8. React Native (n.d.) TextInput. Available at: https://reactnative.dev/docs/textinput (Accessed: 11 October 2026). 
9. React Native (n.d.) View. Available at: https://reactnative.dev/docs/view (Accessed: 11 October 2026). */