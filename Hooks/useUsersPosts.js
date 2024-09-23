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
     // Ensure lastPage is defined and has the nextCursor property
     if (lastPage && lastPage.nextCursor !== undefined) {
      return lastPage.nextCursor;
    }
    return null; // Return null if there's no nextCursor, indicating no more pages
    },
    enabled: !!userId,
    staleTime: 10 * 60 * 1000, // Data will stay fresh for 10 minutes
    cacheTime: 10 * 60 * 1000, // Cache data for 10 minutes
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
