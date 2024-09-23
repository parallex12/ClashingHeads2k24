import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/ChallengeRequests/main";
import { useEffect, useMemo, useRef, useState } from "react";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import { TouchableOpacity } from "react-native";
import { font } from "../../styles/Global/main";
import UpdatedVoiceRecorderBottomSheet from "../../globalComponents/UpdatedVoiceRecorderBottomSheet/UpdatedVoiceRecorderBottomSheet";
import { Instagram } from "react-content-loader/native";
import { uploadMedia } from "../../middleware/firebase";
import ChallengeCard from "../../globalComponents/ChallengeCard/ChallengeCard";
import PostApi from "../../ApisManager/PostApi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FlagReportSheetProvider } from "../../globalComponents/BottomSheet/FlagReportSheetProvider";
import useUserProfile from "../../Hooks/useUserProfile";

const ChallengeRequests = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [activeFilter, setActiveFilter] = useState("Sent");
  let filtersOption = ["Sent", "Recieved"];
  const bottomVoiceSheetRef = useRef();
  const { data: userProfile } = useUserProfile();
  const currentUser = userProfile?.user;
  const queryClient = useQueryClient();
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const { getPostChallengesByUserId, deletePostById, updatePostById } =
    new PostApi();

  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useQuery(
    ["currentUserChallenges", currentUser?._id],
    () => getPostChallengesByUserId(currentUser?._id),
    {
      enabled: !!currentUser?._id,
    }
  );

  const challengeMutation = useMutation({
    mutationFn: async (data) => await updatePostById(currentChallenge, data),
    onSettled: (data) => {
      queryClient.invalidateQueries(["userfeed"]); //  invalidating user feed
      queryClient.resetQueries(["userfeed"]); // Reset query state including cursor
      queryClient.invalidateQueries(["currentUserChallenges"]); //  invalidating ucurrentUserposts
    },
    onError: (error) => {
      console.error("Creation failed:", error);
    },
  });

  const memoizedRequestsRecieved = useMemo(() => {
    return data?.challenges?.filter((e) => {
      const isReceived = e?.opponent?._id === currentUser?._id;
      return isReceived && e;
    });
  }, [activeFilter, currentUser?._id, data]);

  const memoizedRequestsSent = useMemo(() => {
    return data?.challenges?.filter((e) => {
      const isSent = e?.author?._id === currentUser?._id;
      return isSent && e;
    });
  }, [activeFilter, currentUser?._id, data]);

  const FilterItem = ({ data, index, count }) => {
    let conditional_style = {
      backgroundColor: activeFilter == data ? "rgba(219,39,39,0.1)" : "#fff",
      textColor: activeFilter == data ? "#DB2727" : "#111827",
    };
    return (
      <TouchableOpacity
        style={[
          styles.filterItem,
          { backgroundColor: conditional_style?.backgroundColor },
        ]}
        onPress={() => setActiveFilter(data)}
      >
        <Text style={font(12, conditional_style?.textColor, "Medium")}>
          {data + " " + count}
        </Text>
      </TouchableOpacity>
    );
  };

  const memoizedRequests = useMemo(() => {
    return activeFilter == "Sent"
      ? memoizedRequestsSent
      : memoizedRequestsRecieved;
  }, [activeFilter, currentUser?._id, data]);

  const onPostChallenge = async (argData) => {
    if (!argData?.recording) return;
    let { url } = await uploadMedia(argData?.recording, "post_recordings");
    let updatedData = {
      status: "live",
      opponent_audio: url,
    };

    challengeMutation.mutate(updatedData);
    alert("Congrats! Challenge is live now.");
  };

  const onCancelRequest = async (id) => {
    await deletePostById(id);
    refetch();
  };

  return (
    <FlagReportSheetProvider>
      <View style={styles.container}>
        <StandardHeader title="Challenge Requests" backButton />
        <View style={styles.filtersWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filtersOption?.map((item, index) => {
              return (
                <FilterItem
                  key={index}
                  index={index}
                  data={item}
                  count={
                    item == "Sent"
                      ? memoizedRequestsSent?.length
                      : memoizedRequestsRecieved?.length
                  }
                />
              );
            })}
          </ScrollView>
        </View>
        <ScrollView>
          <View style={styles.content}>
            {isLoading ? (
              <Instagram />
            ) : (
              memoizedRequests?.map((item, index) => {
                return (
                  <ChallengeCard
                    onAcceptRequest={() => {
                      alert("Record your opinion to accept the challenge.");
                      setCurrentChallenge(item?._id);
                      bottomVoiceSheetRef.current?.present();
                    }}
                    onPress={() =>
                      props?.navigation?.navigate("ChallengeClash", {
                        ...item,
                      })
                    }
                    onClashesPress={() =>
                      props?.navigation?.navigate("ChallengeClash", {
                        ...item,
                      })
                    }
                    onCancelRequest={() => onCancelRequest(item?._id)}
                    request_type={activeFilter}
                    key={index}
                    data={item}
                  />
                );
              })
            )}
          </View>
        </ScrollView>
        <UpdatedVoiceRecorderBottomSheet
          clashTo={"challenge"}
          postId={currentChallenge}
          bottomVoiceSheetRef={bottomVoiceSheetRef}
          onPostClash={onPostChallenge}
        />
      </View>
    </FlagReportSheetProvider>
  );
};

export default ChallengeRequests;
