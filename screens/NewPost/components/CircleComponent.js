import React from "react";
import { View, useWindowDimensions } from "react-native";
import ProgressCircle from "./ProgressCircle"; // Path to your ProgressCircle component
import { getPercent } from "../../../middleware";
import { styles as _styles } from "../../../styles/VoiceRecording/main";

const CircleComponent = (props) => {
  let { progress, progressColor, gap, containerStyles, size } = props;
  let { width, height } = useWindowDimensions();

  const _PcircleSize = getPercent((eval(size + 3) || 85) / gap, width);
  let styles = _styles({ width, height });
  const strokeWidth = 10; // Change as needed
  const _customstyles = {
    width: getPercent((size || 82) / gap, width),
    height: getPercent((size || 82) / gap, width),
    borderRadius: getPercent(41 / gap, width), // Adjust according to circle size
  };

  return (
    <View style={[styles.circle, _customstyles, containerStyles]}>
      <ProgressCircle
        progress={progress}
        size={_PcircleSize}
        strokeWidth={strokeWidth}
        progressColor={progressColor}
      />
      {props?.children}
    </View>
  );
};

export default CircleComponent;
