import { useInfiniteQuery, useQuery } from "react-query";
import FeedApi from "../ApisManager/FeedApi";
import { useMemo, useState } from "react";
import PostApi from "../ApisManager/PostApi";

const useUserFeed = () => {
  const { getUserFeed } = new FeedApi();

  const query = useInfiniteQuery({
    queryKey: ["userfeed"],
    queryFn: ({ pageParam = 0 }) => getUserFeed(pageParam),
    retry: 5,
    staleTime: 10 * 60 * 1000, // Cache data for 10 minutes
    cacheTime: 10 * 60 * 1000, // Cache data for 10 minutes
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      // Ensure lastPage is defined and has the nextCursor property
      if (lastPage && lastPage.nextCursor !== undefined) {
        return lastPage.nextCursor;
      }
      return null; // Return null if there's no nextCursor, indicating no more pages
    },
    onSuccess: (data) => {
      console.log("Fetched user feed successfully");
    },
    onError: (err) => {
      console.log("UserFeed Error", err);
    },
  });
  let pages = query?.data?.pages?.flatMap((page) => page?.data);

  const feedPages = useMemo(() => {
    return pages;
  }, [pages]);

  return { ...query, data: feedPages };
};

const useFeedPost = (id, prevData) => {
  const { getPostById, updatePostById } = new PostApi();
  const query = useQuery(["feedpost", id], () => getPostById(id), {
    enabled: !!id,
    onSuccess: async () => {
      let views = [...prevData?.views];
      console.log("Fetched feedpost successfully");
      if (!views?.includes(_id)) {
        views?.push(_id);
        result = await updatePostById(postId, { views });
      }
    },
  });

  return { ...query };
};

export { useUserFeed, useFeedPost };
