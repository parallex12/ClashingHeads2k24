import { useInfiniteQuery } from "react-query";
import PostApi from "../ApisManager/PostApi";

const useUsersPosts = (userId) => {
  const { getUsersPosts } = new PostApi();
  const query = useInfiniteQuery({
    queryKey: ["currentUserposts", userId],
    queryFn: ({ pageParam = 0 }) => getUsersPosts(userId, pageParam),
    retry: 5,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor;
    },
    enabled: !!userId,
    onSuccess: (data) => {
      console.log("Fetched users posts successfully:", data);
    },
  });
  let arr = query?.data?.pages?.flatMap((page) => page.data);
  
  return { ...query, data: arr };
};

export default useUsersPosts;
