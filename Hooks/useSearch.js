import { useQuery } from "react-query";
import UserApi from "../ApisManager/UserApi";
import PostApi from "../ApisManager/PostApi";

const useUserSearch = (searchQuery) => {
  const { searchUsers } = new UserApi();

  const query = useQuery(
    ["searchUsers", searchQuery],
    () => searchUsers(searchQuery),
    {
      onSuccess: (data) => {
        console.log("Fetched searched user successfully");
      },
    }
  );

  return { ...query };
};

const usePostsSearch = (searchQuery) => {
  const { searchPosts } = new PostApi();

  const query = useQuery(
    ["searchPosts", searchQuery],
    () => searchPosts(searchQuery),
    {
      onSuccess: (data) => {
        console.log("Fetched searched posts successfully");
      },
    }
  );

  return { ...query };
};

const useChallengesSearch = (searchQuery) => {
  const { searchChallenges } = new PostApi();

  const query = useQuery(
    ["searchChallenges", searchQuery],
    () => searchChallenges(searchQuery),
    {
      staleTime: 50000,
      onSuccess: (data) => {
        console.log("Fetched searched challenges successfully");
      },
    }
  );

  return { ...query };
};

export { usePostsSearch, useChallengesSearch, useUserSearch };
