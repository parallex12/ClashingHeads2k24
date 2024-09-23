import {
  Button,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/Shop/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import { getPercent } from "../../middleware";
import { font } from "../../styles/Global/main";
import { Entypo, AntDesign } from "@expo/vector-icons";
import StandardButton from "../../globalComponents/StandardButton";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  initPaymentSheet,
  presentPaymentSheet,
  StripeProvider,
  useStripe,
} from "@stripe/stripe-react-native";
import StripeApi from "../../ApisManager/StripeApi";

const Shop = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation();
  const { createPaymentIntent } = new StripeApi();
  const stripe = useStripe();

  let amount = parseInt(quantity * 39.95);

  // Function to initialize the Payment Sheet
  const initializePaymentSheet = async () => {
    const { clientSecret } = await createPaymentIntent({ amount });
    const initSheet = await stripe.initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: "Clashing Heads",
      returnURL: "stripe-example://stripe-redirect",
      googlePay:true
    });
    if (initSheet.error) {
      reject(initSheet.error.message);
      return alert(initSheet.error.message);
    }

    const presentSheet = await stripe.presentPaymentSheet({
      clientSecret: clientSecret,
    });

    if (presentSheet.error) {
      return alert(presentSheet.error.message);
    }
    alert("Paid");
    navigation.goBack();
  };

  const onChangeQuantity = (type) => {
    if (type === "+") {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else if (type === "-") {
      setQuantity((prevQuantity) => Math.max(0, prevQuantity - 1));
    }
  };

  const onPay = () => {
    navigation.navigate("Checkout");
  };

  return (
    <StripeProvider
      publishableKey="pk_test_51Jyiv3A35MqmL7JoKn74Emihnpv3885uOTuNdyRcb7GdInyUeYTwdYSkPINrCi9rDGRb0kICvTxBaJNk5VSbYq0S00awq9kMoq"
      merchantIdentifier="com.clubs.clashingheads" // required for Apple Pay
      urlScheme="com.clubs.clashingheads" // required for 3D Secure and bank redirects
    >
      <View style={styles.container}>
        <StandardHeader
          containerStyles={{ height: getPercent(15, height) }}
          backButton
          title="Shop"
          searchIcon={false}
          plainBg="#000000"
        />
        <View style={styles.banner}>
          <Text
            style={font(12, "#FFFFFF", "Regular", 0, null, {
              textAlign: "center",
              width: "90%",
            })}
          >
            Join Demo & get 10% off your first online order. Sign up now. Sale
            excluded. Terms apply
          </Text>
          <Pressable>
            <Entypo name="cross" size={24} color="#fff" />
          </Pressable>
        </View>
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.bannerLogo}>
              <Image
                source={require("../../assets/DeLogo.png")}
                resizeMode="contain"
                style={{ width: "85%", height: "85%" }}
              />
            </View>

            <View style={styles.boardgame_wrapper}>
              <Image
                source={require("../../assets/game.png")}
                resizeMode="contain"
                style={{ width: "90%", height: "90%" }}
              />
            </View>

            <View style={styles.orderInfoWrapper}>
              <Text
                style={font(17, "#000000", "Semibold", 0, null, {
                  width: "60%",
                })}
              >
                DeClassified Board Game Deluxe Edition
              </Text>
              <View style={styles.orderRow}>
                <Text style={font(16, "#DB2727", "Semibold")}>${amount}</Text>
                <View style={styles.quantityWrapper}>
                  <Text style={font(15, "#1F2937", "Medium")}>Quantity:</Text>
                  <TouchableOpacity
                    style={styles.quantityBtn}
                    onPress={() => onChangeQuantity("-")}
                  >
                    <AntDesign name="minus" size={18} color="black" />
                  </TouchableOpacity>
                  <Text style={font(15, "#1F2937", "Medium")}>{quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityBtn}
                    onPress={() => onChangeQuantity("+")}
                  >
                    <AntDesign name="plus" size={18} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <StandardButton
              title={`Proceed to Pay ($${amount})`}
              customStyles={{
                width: "90%",
                height: getPercent(6, height),
                marginTop: getPercent(2, height),
              }}
              onPress={initializePaymentSheet}
            />
          </View>
        </ScrollView>
      </View>
    </StripeProvider>
  );
};

export default Shop;
