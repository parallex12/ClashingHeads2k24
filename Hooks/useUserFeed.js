import { useInfiniteQuery } from "react-query";
import FeedApi from "../ApisManager/FeedApi";
import { useMemo, useState } from "react";

const useUserFeed = () => {
  const { getUserFeed } = new FeedApi();

  const query = useInfiniteQuery({
    queryKey: ["userfeed"],
    queryFn: ({ pageParam = 0 }) => getUserFeed(pageParam),
    retry: 5,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor;
    },
    staleTime: 60000,
    onSuccess: (data) => {
      console.log("Fetched user feed successfully");
    },
  });
  let pages = query?.data?.pages?.flatMap((page) => page.data);

  const feedPages = useMemo(() => {
    return pages;
  }, [pages]);


  return { ...query, data: feedPages };
};

export default useUserFeed;
