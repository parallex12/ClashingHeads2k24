import React, { createContext, useRef, useState } from "react";
import PostActionsBottomSheet from "../PostActionsBottomSheet/PostActionsBottomSheet";

const PostActionsSheetContext = createContext();

export const PostActionsSheetProvider = ({ children, onRefresh }) => {
  const bottomSheetRef = useRef(null); // Ref for the BottomSheet
  const snapPoints = useRef(["25%", "50%"]);
  const [interactionData, setInteractionData] = useState(null);

  const showBottomSheet = (data) => {
    setInteractionData(data);
    bottomSheetRef.current?.present(); // Show BottomSheet
  };

  const closeBottomSheet = () => {
    setInteractionData(null);
    bottomSheetRef.current?.close(); // Close BottomSheet
  };

  return (
    <PostActionsSheetContext.Provider
      value={{ bottomSheetRef, snapPoints, showBottomSheet, closeBottomSheet }}
    >
      {children}
      <PostActionsBottomSheet data={interactionData} onRefresh={onRefresh} />
    </PostActionsSheetContext.Provider>
  );
};

export default PostActionsSheetContext;
