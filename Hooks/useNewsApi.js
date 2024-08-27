import { useInfiniteQuery } from "react-query";
import { useMemo } from "react";
import NewsApi from "../ApisManager/NewsApi";

const useNewsApi = () => {
  const { getNews } = new NewsApi();
  const query = useInfiniteQuery({
    queryKey: ["appnews"],
    queryFn: ({ pageParam = 1 }) => getNews(pageParam),
    retry: 2,
    staleTime: 60000,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // Determine the next page based on the total number of pages or results
      const totalResults = lastPage?.totalResults; // You might need to handle this based on your API's response
      const pageSize = 4; // Same as the pageSize used in getNews
      const currentPage = allPages.length;
      const nextPage = currentPage + 1;

      // Check if there's more data to fetch
      return (nextPage - 1) * pageSize < totalResults ? nextPage : undefined;
    },
    onSuccess: (data) => {
      console.log("Fetched news successfully:", data);
    },
  });
  let pages = query?.data?.pages?.flatMap((page) => page?.articles);

  const newsData = useMemo(() => {
    return pages;
  }, [pages]);

  return { ...query, newsData };
};

const useNewsSearchApi = (searchQuery) => {
  const { searchNews } = new NewsApi();
  const query = useInfiniteQuery({
    queryKey: ["appSearchnews", searchQuery],
    staleTime: 10000,
    queryFn: ({ pageParam = 1 }) => searchNews(pageParam, searchQuery),
    retry: 2,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // Determine the next page based on the total number of pages or results
      const totalResults = lastPage?.totalResults; // You might need to handle this based on your API's response
      const pageSize = 4; // Same as the pageSize used in getNews
      const currentPage = allPages.length;
      const nextPage = currentPage + 1;

      // Check if there's more data to fetch
      return (nextPage - 1) * pageSize < totalResults ? nextPage : undefined;
    },
    onSuccess: (data) => {
      console.log("Fetched news searched successfully:", data);
    },
  });
  let pages = query?.data?.pages?.flatMap((page) => page?.articles);

  const newsData = useMemo(() => {
    return pages;
  }, [pages]);
  
  return { ...query, newsData };
};

export { useNewsApi, useNewsSearchApi };
