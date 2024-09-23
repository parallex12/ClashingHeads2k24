import React, { createContext, useRef } from "react";
import FlagReportBottomSheet from "../FlagReportBottomSheet/FlagReportBottomSheet";
import { bottom_sheets } from "./Sheets";

const GlobalBottomSheetContext = createContext();

export const GlobalBottomSheetProvider = ({
  children,
  interactionData,
  sheet_key,
}) => {
  const bottomSheetRef = useRef(null); // Ref for the BottomSheet
  const snapPoints = useRef(["25%", "50%"]);
  let activeSheet = bottom_sheets?.filter((e) => e?.key == sheet_key);
  const showBottomSheet = (data) => {
    bottomSheetRef.current?.present(); // Show BottomSheet
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close(); // Close BottomSheet
  };
  console.log(activeSheet)

  return (
    <GlobalBottomSheetContext.Provider
      value={{ bottomSheetRef, snapPoints, showBottomSheet, closeBottomSheet }}
    >
      {children}
      {/* {activeSheet?.length > 0 ? activeSheet[0]?.sheet : null} */}
    </GlobalBottomSheetContext.Provider>
  );
};

export default GlobalBottomSheetContext;
