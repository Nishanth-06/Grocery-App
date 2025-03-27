import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  fetchProducts,
  increaseQuantity,
  addToCart,
} from "../redux/slices/productSlice";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");

const RenderItem = (props: any) => {
  const { item, navigation, dispatch, cart } = props;
  const getCartQuantity = (id: any) =>
    cart.find((item: any) => item.id === id)?.quantity || 0;

  return (
    <TouchableOpacity
      onPress={() => navigation.push("ProductDetails", { product: item })}
      activeOpacity={0.6}
      style={styles.itemContainer}
    >
      <View style={styles.imageView}>
        <Image
          source={require("../assets/images/grocery.jpg")}
          style={styles.productImage}
        />
      </View>
      <View style={styles.itemFooterView}>
        <View style={styles.textView}>
          <Text style={styles.itemText}>
            {item.name.length > 40 ? `${item.name.slice(0, 40)}...` : item.name}
          </Text>
          <Text style={styles.mrpText}>MRP : ₹100</Text>
        </View>
        {getCartQuantity(item.id) === 0 ? (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => dispatch(addToCart(item))}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => dispatch(decreaseQuantity(item.id))}
            >
              <AntDesign name="minus" size={18} color="black" />
            </TouchableOpacity>
            <Text>{getCartQuantity(item.id)}</Text>
            <TouchableOpacity
              onPress={() => dispatch(increaseQuantity(item.id))}
            >
              <AntDesign name="plus" size={18} color="black" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const ProductList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { products, cart, loading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const userName = user?.user?.givenName ? user?.user?.givenName : "User";
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#098516" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Text style={styles.text}>Hi {userName}</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RenderItem
            item={item}
            navigation={navigation}
            dispatch={dispatch}
            cart={cart}
          />
        )}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        style={styles.flatlist}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 25,
    fontWeight: "800",
    color: "#098516",
  },
  flatlist: {
    marginTop: 40,
    marginBottom: 40,
  },
  row: {
    justifyContent: "space-between",
  },
  itemContainer: {
    backgroundColor: "#ffff",
    marginBottom: 20,
    width: (width - 40) / 2,
    minHeight: 200,
    maxHeight: 200,
    borderRadius: 10,
    elevation: 10,
    shadowColor: "#fff",
  },
  itemText: {
    color: "#000000",
    fontWeight: "500",
    fontSize: 10,
  },
  addButton: {
    backgroundColor: "#098516",
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    alignSelf: "flex-end",
  },
  addButtonText: {
    color: "#fff",
  },
  productImage: {
    width: (width - 40) / 2,
    height: "100%",
    resizeMode: "contain",
  },
  imageView: {
    height: "50%",
  },
  itemFooterView: {
    justifyContent: "space-between",
    height: "50%",
  },
  mrpText: {
    fontWeight: "400",
    color: "#000",
    marginTop: 10,
  },
  textView: {
    paddingHorizontal: 10,
  },
  cartButton: {
    backgroundColor: "#098516",
    height: 30,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderRadius: 5,
    justifyContent: "space-evenly",
    height: 30,
    alignSelf: "flex-end",
    borderColor: "#098516",
    borderWidth: 1,
  },
  quantityBtn: {
    padding: 10,
    fontSize: 10,
    color: "#000",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductList;
