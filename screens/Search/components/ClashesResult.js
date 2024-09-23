import { useWindowDimensions } from "react-native";
import { ClashesResultStyles as _styles } from "../../../styles/Search/main";
import { memo } from "react";
import { useChallengesSearch } from "../../../Hooks/useSearch";
import FeedFlatlist from "../../../globalComponents/FeedFlatlist/FeedFlatlist";

const ClashesResult = (props) => {
  let { searchQuery } = props;
  const challengesQuery = useChallengesSearch(searchQuery);

  return <FeedFlatlist query={challengesQuery} customStyles={{ paddingBottom: 10 }} />;
};

export default memo(ClashesResult);
