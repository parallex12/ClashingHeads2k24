import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { StandardInputStyles } from "../styles/Global/main";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { politicsCategory } from "../middleware";

const DropDown = ({ options, onDropDownChange }) => {
  let { width, height } = useWindowDimensions();
  let styles = StandardInputStyles({ width, height });

  let activeRadioStyle = {
    backgroundColor: "#fff",
    borderColor: "#222",
    borderWidth: 3,
  };

  return (
    <View style={styles.dropDownContainer}>
      <ScrollView style={{ flex: 1 }}>
        {options?.map((item, index) => {
          let isActive = value == item?.title;
          return (
            <TouchableOpacity
              style={styles.dropDownItem}
              key={index}
              onPress={() => onDropDownChange(item)}
            >
              <View
                style={[styles.radioCircle, isActive ? activeRadioStyle : {}]}
              ></View>
              <Text style={styles.dropDownItemText}>{item?.title}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const StandardInput = (props) => {
  let {
    containerStyles,
    inputStyles,
    data,
    onChangeText,
    onRemoveField,
    value,
    customIcon,
    titleTextStyle,
  } = props;
  let { width, height } = useWindowDimensions();
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [dropDownshow, setDropDownShow] = useState(false);
  let styles = StandardInputStyles({ width, height });
  let navigation = useNavigation();

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDateOfBirth(currentDate);
    onChangeText(currentDate);
  };

  const onDropDownChange = (info) => {
    setDropDownShow(false);
    onChangeText(info?.title);
  };

  return (
    <View style={[styles.container, containerStyles]}>
      {data?.title && (
        <Text style={[styles.titleText, titleTextStyle]}>{data?.title}</Text>
      )}
      <View style={[styles.inputWrapper, inputStyles]}>
        {data?.type == "text" ? (
          <TextInput
            placeholder={data?.placeholder}
            editable={data?.type == "text"}
            placeholderTextColor="#6B7280"
            style={styles.input}
            {...props}
          />
        ) : data?.type == "date" ? (
          <TouchableOpacity
            style={styles.input}
            onPress={() => onRemoveField(data?.key)}
          >
            {!value ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={dateOfBirth}
                mode={"date"}
                onChange={onDateChange}
              />
            ) : (
              <Text style={styles.inputText}>
                {new Date(value).toDateString()}
              </Text>
            )}
          </TouchableOpacity>
        ) : data?.type == "picker" ? (
          <TouchableOpacity
            style={styles.input}
            onPress={() => setDropDownShow(true)}
          >
            {dropDownshow && (
              <DropDown
                onDropDownChange={onDropDownChange}
                options={politicsCategory}
              />
            )}
            <Text style={styles.inputText}>{value || data?.placeholder}</Text>
          </TouchableOpacity>
        ) : null}
        {data?.icon ? data?.icon : customIcon}
      </View>
    </View>
  );
};

export default StandardInput;
