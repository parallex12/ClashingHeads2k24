import { useInfiniteQuery } from "react-query";
import ClashApi from "../ApisManager/ClashApi";
import { useMemo } from "react";

const usePostClashes = (postId) => {
  const { getClashesByPostId } = new ClashApi();
  const query = useInfiniteQuery({
    queryKey: ["postclashes", postId],
    queryFn: ({ pageParam = 0 }) => getClashesByPostId(postId, pageParam),
    retry: 5,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      // Ensure lastPage is defined and has the nextCursor property
      if (lastPage && lastPage.nextCursor !== undefined) {
        return lastPage.nextCursor;
      }
      return null; // Return null if there's no nextCursor, indicating no more pages
    },
    enabled: !!postId,
    staleTime: 30000,
    onSuccess: async (data) => {
      console.log("Fetched post clashes successfully");
    },
  });

  let pages = query?.data?.pages?.flatMap((page) => page.data);

  const clashes = useMemo(() => {
    return pages;
  }, [pages]);

  return { ...query, data: clashes };
};

export default usePostClashes;
