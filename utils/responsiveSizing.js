import { scale, verticalScale, moderateScale } from "react-native-size-matters";

export const rs = (size) => {
  return scale(size);
};

export const rvs = (size) => {
  return verticalScale(size);
};

export const rms = (size) => {
  return moderateScale(size, 1);
};
