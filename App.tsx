import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector, Provider } from "react-redux";
import Login from "./src/screens/login-screen";
import ProductList from "./src/screens/product-list-screen";
import ProductDetails from "./src/screens/product-details-screen";
import Cart from "./src/screens/cart-screen";
import Barcode from "./src/screens/barcode-screen";
import store from "./src/redux/store";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ProductStack = createNativeStackNavigator();

const ProductStackNavigator = () => (
  <ProductStack.Navigator>
    <ProductStack.Screen
      name="Products"
      component={ProductList}
      options={{ headerShown: false }}
    />
    <ProductStack.Screen
      name="ProductDetails"
      component={ProductDetails}
      options={{ headerShown: false }}
    />
  </ProductStack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === "Products") {
          iconName = "shopping-outline"; // Products icon
        } else if (route.name === "Cart") {
          iconName = "cart-outline"; // Cart icon
        } else if (route.name === "Scan") {
          iconName = "barcode-scan"; // Barcode icon
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#007AFF",
      tabBarInactiveTintColor: "gray",
      tabBarStyle: { backgroundColor: "#fff" },
    })}
  >
    <Tab.Screen
      name="Products"
      component={ProductStackNavigator}
      options={{ headerShown: false }}
    />
    <Tab.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
    <Tab.Screen
      name="Scan"
      component={Barcode}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);
const RootStack = createNativeStackNavigator();
const RootNavigator = () => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <Stack.Screen name="MainStack" component={MainTabs} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
