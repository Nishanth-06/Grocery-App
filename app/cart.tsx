import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const RenderItem = ({ item, router }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.imageView}>
        <Image
          source={require("../assets/images/grocery.jpg")}
          style={styles.productImage}
        />
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "space-between",
          marginVertical: 15,
        }}
      >
        <View>
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.mrpText}>MRP : ₹100</Text>
        </View>
        <TouchableOpacity style={styles.removeButton} activeOpacity={0.6}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Cart = () => {
  const router = useRouter();
  const data = [
    { id: 1, name: "Banana" },
    { id: 2, name: "Apple" },
    { id: 3, name: "Melon" },
    { id: 4, name: "Melon" },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            router.back();
          }}
        >
          <Image
            source={require("../assets/images/back_arrow.png")}
            style={styles.backArrow}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Cart</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RenderItem item={item} router={router} />}
        style={styles.flatlist}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 10,
  },
  productImage: {
    width: (width - 40) / 2,
    height: "100%",
    resizeMode: "contain",
  },
  imageView: {
    height: "100%",
    width: "50%",
  },
  flatlist: {
    marginTop: 40,
    marginBottom: 40,
  },
  itemContainer: {
    backgroundColor: "#ffff",
    marginBottom: 20,
    width: width - 20,
    minHeight: 200,
    maxHeight: 200,
    borderRadius: 10,
    elevation: 10,
    shadowColor: "#fff",
    flexDirection: "row",
  },
  itemText: {
    color: "#000000",
    fontWeight: "500",
  },
  mrpText: {
    fontWeight: "400",
    color: "#000",
    marginTop: 10,
  },
  removeButton: {
    backgroundColor: "#bf2a24",
    width: "50%",
    height: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  removeText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
  heading: {
    fontSize: 20,
    color: "#098516",
    fontWeight: "800",
    paddingLeft: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  backArrow: {
    resizeMode: "contain",
    width: 20,
    height: 20,
    tintColor: "#098516",
  },
});

export default Cart;
