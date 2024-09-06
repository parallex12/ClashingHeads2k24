import { useInfiniteQuery } from "react-query";
import { useMemo } from "react";
import ChatApi from "../ApisManager/ChatApi";

const useChat = (userId) => {
  const { getCurrentUserChats } = new ChatApi();
  const query = useInfiniteQuery({
    queryKey: ["userchats", userId],
    queryFn: ({ pageParam = 0 }) => getCurrentUserChats(userId, pageParam),
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
    onSuccess: async (data) => {
      console.log("Fetched user chats successfully");
    },
  });

  let pages = query?.data?.pages?.flatMap((page) => page.data);

  const chats = useMemo(() => {
    return pages;
  }, [pages]);

  return { ...query, data: chats };
};

export default useChat;
