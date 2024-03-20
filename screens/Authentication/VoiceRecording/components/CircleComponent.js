import React from "react";
import { View, useWindowDimensions } from "react-native";
import ProgressCircle from "./ProgressCircle"; // Path to your ProgressCircle component
import { getPercent } from "../../../../middleware";
import { styles as _styles } from "../../../../styles/PersonalInfo copy/main";

const CircleComponent = (props) => {
  let { progress, gap } = props;
  let { width, height } = useWindowDimensions();

  const _PcircleSize = getPercent(85 / gap, width);
  let styles = _styles({ width, height });
  const strokeWidth = 10; // Change as needed
  const _customstyles = {
    width: getPercent(82 / gap, width),
    height: getPercent(82 / gap, width),
    borderRadius: getPercent(41 / gap, width), // Adjust according to circle size
    
  };

  return (
    <View style={[styles.circle, _customstyles]}>
      <ProgressCircle
        progress={progress}
        size={_PcircleSize}
        strokeWidth={strokeWidth}
      />
      {props?.children}
    </View>
  );
};

export default CircleComponent;
