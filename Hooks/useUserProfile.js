import { useQuery } from "react-query";
import UserApi from "../ApisManager/UserApi";

const useUserProfile = () => {
  const { getUserProfile } = new UserApi();
  const query = useQuery(["currentUserProfile"], getUserProfile, {
    staleTime: 10 * 60 * 1000, // Data will stay fresh for 10 minutes
    cacheTime: 10 * 60 * 1000, // Cache data for 10 minutes
    retry: 5,
    onSuccess: (data) => {
      if (query?.isFetching) {
        console.log("Fetching from API...");
      } else if (!query?.isStale) {
        console.log("Data is from the cache.");
      } else {
        console.log("Fetching completed.");
      }
    },
  });

  return { ...query };
};

export default useUserProfile;
