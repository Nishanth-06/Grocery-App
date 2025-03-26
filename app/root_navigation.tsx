import { Stack } from "expo-router";
import { useSelector } from "react-redux";

const RootNavigation = () => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  console.log("isLoggedIn-->", isLoggedIn);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <Stack.Screen name="login" options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="product_list" options={{ headerShown: false }} />
          <Stack.Screen
            name="product_details"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="cart" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </>
      )}
    </Stack>
  );
};

export default RootNavigation;
