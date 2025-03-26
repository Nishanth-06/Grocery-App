import axios from "axios";
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
// import { useDispatch } from "react-redux";
const { width, height } = Dimensions.get("window");

const RenderItem = ({ item, router }) => {
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
          source={require("../assets/images/grocery.jpg")}
          style={styles.productImage}
        />
      </View>
      <View style={styles.itemFooterView}>
        <View style={styles.textView}>
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.mrpText}>MRP : ₹100</Text>
        </View>
        <TouchableOpacity style={styles.addButton} activeOpacity={0.6}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const ProductList = () => {
  // const dispatch = useDispatch();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const data = [
    { id: 1, name: "Banana" },
    { id: 2, name: "Apple" },
    { id: 3, name: "Melon" },
    { id: 4, name: "Melon" },
  ];
  // const { items, loading } = useSelector(state => state.products);

  useEffect(() => {
    fetchProducts();
    // dispatch(fetchProducts());
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await axios.post(
        "https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/filter/product",
        {
          page: "1",
          pageSize: "10",
          sort: {
            creationDateSortOption: "DESC",
          },
        }
      );
      console.log("response-->", response?.data?.products[3].mrp);
      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  console.log("width-->", width);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Products</Text>
      {/* {loading ? <Text>Loading...</Text> : ( */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RenderItem item={item} router={router} />}
        // horizontal
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        style={styles.flatlist}
        columnWrapperStyle={styles.row}
      />
      {/* ) */}
      {/* } */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 25,
    fontWeight: "800",
    color: "#098516",
    textAlign: "center",
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
});

export default ProductList;
