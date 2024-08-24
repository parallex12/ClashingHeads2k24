import { useInfiniteQuery } from "react-query";
import PostApi from "../ApisManager/PostApi";
import { useMemo } from "react";

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
    staleTime: 10000,
    onSuccess: (data) => {
      console.log("Fetched users posts successfully:", data);
    },
  });
  let pages = query?.data?.pages?.flatMap((page) => page.data);

  const feedData = useMemo(() => {
    return pages;
  }, [pages]);


  return { ...query, data: feedData };
};

export default useUsersPosts;
