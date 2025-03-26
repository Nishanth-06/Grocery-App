import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

const ProductDetails = () => {
  const { product } = useLocalSearchParams();
  const productData = JSON.parse(product);
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backArrowContainer}
        onPress={() => {
          router.back();
        }}
        activeOpacity={0.6}
      >
        <Image
          source={require("../assets/images/back_arrow.png")}
          style={styles.backArrow}
        />
      </TouchableOpacity>

      <View>
        <Image
          source={require("../assets/images/grocery.jpg")}
          style={styles.productImage}
        />
        <View style={styles.bodyContainer}>
          <Text style={styles.text}>{productData?.name}</Text>
          <Text style={styles.mrpText}>MRP : ₹100</Text>
          <Text style={styles.descriptionText}>Description</Text>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.6}
          onPress={() => {
            router.navigate("/cart");
          }}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: "#ffff",
    justifyContent: "space-between",
  },
  productImage: {
    resizeMode: "contain",
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "800",
    color: "#000",
  },
  mrpText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
    marginTop: 10,
  },
  bodyContainer: {
    paddingHorizontal: 10,
  },
  descriptionText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#969e97",
    marginVertical: 10,
  },
  addButton: {
    backgroundColor: "#098516",
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    alignSelf: "center",
  },
  buttonContainer: {
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  backArrow: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    tintColor: "#098516",
  },
  backArrowContainer: {
    position: "absolute",
    left: 10,
    marginTop: 30,
    height: 30,
    width: 30,
    justifyContent: "center",
    zIndex: 10,
  },
});
