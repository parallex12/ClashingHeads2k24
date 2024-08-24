import { useQuery } from "react-query";
import UserApi from "../ApisManager/UserApi";

const useOtherUserProfile = (userId) => {
  const { getUserProfileById } = new UserApi();
  const query = useQuery(
    ["OtherUserProfile"],
    () => getUserProfileById(userId),
    {
      enabled: !!userId,
      onSuccess: (data) => {
        console.log("Fetched other user profile successfully");
      },
    }
  );

  return { ...query };
};

export default useOtherUserProfile;
