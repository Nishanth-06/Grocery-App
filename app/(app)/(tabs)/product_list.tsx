import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  fetchProducts,
  increaseQuantity,
  addToCart,
} from "../../../redux/slices/productSlice";
import AntDesign from "@expo/vector-icons/AntDesign";
const { width } = Dimensions.get("window");

const RenderItem = (props: any) => {
  const { item, router, dispatch, cart } = props;
  const getCartQuantity = (id: any) =>
    cart.find((item: any) => item.id === id)?.quantity || 0;

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/product_details",
          params: { product: JSON.stringify(item) },
        })
      }
      activeOpacity={0.6}
      style={styles.itemContainer}
    >
      <View style={styles.imageView}>
        <Image
          source={require("../../assets/images/grocery.jpg")}
          style={styles.productImage}
        />
      </View>
      <View style={styles.itemFooterView}>
        <View style={styles.textView}>
          <Text style={styles.itemText}>
            {item.name.length > 20 ? `${item.name.slice(0, 20)}...` : item.name}
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
  const router = useRouter();
  const [productList, setProductList] = useState([]);
  const data = [
    { id: 1, name: "Banana" },
    { id: 2, name: "Apple" },
    { id: 3, name: "Melon" },
    { id: 4, name: "Melon" },
  ];
  const { products, cart, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  console.log("width-->", products);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.text}>Hi User</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => {
            router.navigate("/cart");
          }}
        >
          <Text>Cart</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RenderItem
              item={item}
              router={router}
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
      )}
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
});

export default ProductList;
