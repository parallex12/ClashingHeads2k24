import { useInfiniteQuery } from "react-query";
import { useMemo } from "react";
import MessageApi from "../ApisManager/MessageApi";

const useChatMessages = (chatId) => {
  const { getChatMessages } = new MessageApi();
  const query = useInfiniteQuery({
    queryKey: ["chatmsgs", chatId],
    queryFn: ({ pageParam = 0 }) => getChatMessages(chatId, pageParam),
    retry: 5,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      // Ensure lastPage is defined and has the nextCursor property
      if (lastPage && lastPage.nextCursor !== undefined) {
        return lastPage.nextCursor;
      }
      return null; // Return null if there's no nextCursor, indicating no more pages
    },
    enabled: !!chatId,
    onSuccess: async (data) => {
      console.log("Fetched chat messages successfully");
    },
  });

  let pages = query?.data?.pages?.flatMap((page) => page.data);

  const msgs = useMemo(() => {
    return pages;
  }, [pages]);

  return { ...query, data: msgs };
};

export default useChatMessages;
