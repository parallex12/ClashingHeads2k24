import React, { createContext, useRef, useState } from "react";
import FlagReportBottomSheet from "../FlagReportBottomSheet/FlagReportBottomSheet";

const FlagReportSheetContext = createContext();

export const FlagReportSheetProvider = ({ children }) => {
  const bottomSheetRef = useRef(null); // Ref for the BottomSheet
  const snapPoints = useRef(["25%", "50%"]);
  const [interactionData, setInteractionData] = useState(null);

  const showBottomSheet = (data) => {
    setInteractionData(data);
    bottomSheetRef.current?.present(); // Show BottomSheet
  };

  const closeBottomSheet = () => {
    setInteractionData(null)
    bottomSheetRef.current?.close(); // Close BottomSheet
  };

  return (
    <FlagReportSheetContext.Provider
      value={{ bottomSheetRef, snapPoints, showBottomSheet, closeBottomSheet }}
    >
      {children}
      <FlagReportBottomSheet data={interactionData} />
    </FlagReportSheetContext.Provider>
  );
};

export default FlagReportSheetContext;
