import { useQuery } from "react-query";
import UserApi from "../ApisManager/UserApi";

const useOtherUserProfile = (userId) => {
  const { getUserProfileById } = new UserApi();
  const query = useQuery(
    ["OtherUserProfile"],
    () => getUserProfileById(userId),
    {
      enabled: !!userId,
      cacheTime: 0, // disables caching, so the data is not stored
      staleTime: 0, // ensures the data is marked as stale immediately after fetching
      refetchOnWindowFocus: true, // refetches if the window is focused
      onSuccess: (data) => {
        console.log("Fetched other user profile successfully");
      },
    }
  );

  return { ...query };
};

export default useOtherUserProfile;
