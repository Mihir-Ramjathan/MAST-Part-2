# React Native Restaurant Menu Management App

## links 
youtube- https://youtu.be/mIY5rZg_kME

## 1. Project Description

This project is a React Native mobile application developed for a restaurant owner to manage menu items digitally. It replaces the use of paper records with a simple application that allows the user to add and view dishes.

This application was developed for **Part 2 of the Restaurant Menu Management POE**.

Each menu item contains the following information:
- Dish Name
- Description
- Course (Starter, Main Course, or Dessert)
- Price

## 2. Features

The application includes the following features:

- Add multiple menu items.
- Enter a dish name and description.
- Select a course for each dish.
- Enter the price of a dish.
- Validate required fields before adding an item.
- Check that the price is a valid number greater than zero.
- Display added menu items in a list.
- Show the price and course for each dish.
- Display a message when the menu is empty.
- Show a confirmation message when a dish is added successfully.
- Clear the form after adding a menu item.
- Use a consistent blue-and-white design.

## 3. Technologies Used

- **React Native** – used to build the mobile application interface.
- **React** – used to manage application state.
- **Expo** – used to run the application during development.
- **TypeScript** – used for the application code.
- **expo-status-bar** – used to manage the status bar.
- **react-native-safe-area-context** – used to manage safe areas on the screen.

## 4. Requirements

To run this project, you need:

- Node.js installed on your computer.
- Visual Studio Code or another suitable code editor.
- An Expo-compatible development environment.
- A web browser for running the web version.

## 5. Installation and Setup

### Step 1: Open the project

Open the project folder in Visual Studio Code.

### Step 2: Install dependencies

Open the terminal and run:

```bash
npm install
```

Install the required Expo packages:

```bash
npx expo install expo-status-bar react-native-safe-area-context
```

### Step 3: Run the application

To run the application in a web browser, use:

```bash
npx expo start --web
```

If you experience caching problems, you can restart Expo with:

```bash
npx expo start --web --clear
```

## 6. How to Use the Application

1. Open the application.
2. Enter the dish name.
3. Enter a description of the dish.
4. Select the course: Starter, Main Course, or Dessert.
5. Enter the price.
6. Press the **Add** button.
7. Check the confirmation message.
8. Confirm that the new dish appears in the menu list.
9. Repeat these steps to add more dishes.

## 7. Current Limitations

This version focuses on adding and displaying menu items.

- Menu items are stored in the application's state while it is running.
- Menu items are not saved permanently, so they may disappear when the application is restarted.
- Editing and deleting menu items are not included in this version.
- Searching, filtering and menu statistics are not included in this initial working version.

## 8. References

App and Flow (n.d.) *react-native-safe-area-context: SafeAreaProvider*. Available at: https://github.com/AppAndFlow/react-native-safe-area-context/blob/main/docs/docs/api/safe-area-provider.mdx (Accessed: 11 October 2026).

Expo (n.d.) *StatusBar*. Available at: https://docs.expo.dev/versions/latest/sdk/status-bar/ (Accessed: 11 October 2026).

React (n.d.) *useState*. Available at: https://react.dev/reference/react/useState (Accessed: 11 October 2026).

React Native (n.d.) *Alert*. Available at: https://reactnative.dev/docs/alert (Accessed: 11 October 2026).

React Native (n.d.) *Keyboard*. Available at: https://reactnative.dev/docs/keyboard (Accessed: 11 October 2026).

React Native (n.d.) *ScrollView*. Available at: https://reactnative.dev/docs/scrollview (Accessed: 11 October 2026).

React Native (n.d.) *StyleSheet*. Available at: https://reactnative.dev/docs/stylesheet (Accessed: 11 October 2026).

React Native (n.d.) *TextInput*. Available at: https://reactnative.dev/docs/textinput (Accessed: 11 October 2026).

React Native (n.d.) *View*. Available at: https://reactnative.dev/docs/view (Accessed: 11 October 2026).

## 9. Acknowledgement

Official React, React Native, Expo and Safe Area Context documentation was used as a reference for the technologies and components used in this project. The application also contains custom functions and logic developed specifically for the restaurant menu management requirements.

Any AI assistance used during development should be disclosed according to the institution's academic integrity guidelines.
