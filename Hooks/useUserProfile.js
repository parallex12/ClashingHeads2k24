import { useQuery } from "react-query";
import UserApi from "../ApisManager/UserApi";

const useUserProfile = () => {
  const { getUserProfile } = new UserApi();
  const query = useQuery(["currentUserProfile"], getUserProfile, {
    staleTime: 60000,
    onSuccess: (data) => {
      console.log("Fetched user profile successfully");
    },
  });

  return { ...query };
};

export default useUserProfile;
