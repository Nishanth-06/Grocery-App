import { useNavigation } from "@react-navigation/native";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../redux/slices/productSlice";
import AntDesign from "@expo/vector-icons/AntDesign";
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
import { useDispatch, useSelector } from "react-redux";

const { width, height } = Dimensions.get("window");

const RenderItem = ({ item, navigation, dispatch }: any) => {
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
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => dispatch(decreaseQuantity(item.id))}>
            <AntDesign name="minus" size={18} color="black" />
          </TouchableOpacity>
          <Text style={styles.quantityCount}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => dispatch(increaseQuantity(item.id))}>
            <AntDesign name="plus" size={18} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          activeOpacity={0.6}
          onPress={() => {
            dispatch(removeFromCart(item.id));
          }}
        >
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Cart = () => {
  const navigation = useNavigation();
  const { cart } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            navigation.goBack();
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
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RenderItem item={item} navigation={navigation} dispatch={dispatch} />
        )}
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
    fontSize: 13,
    width: "49%",
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
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#098516",
    borderRadius: 8,
    width: "50%",
    height: 30,
  },
  quantityCount: {
    fontSize: 20,
    fontWeight: "700",
  },
});

export default Cart;
