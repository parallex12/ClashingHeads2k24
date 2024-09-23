import { useQuery } from "react-query";
import NotificationsApi from "../ApisManager/NotificationsApi";

const useNotifications = () => {
  const { getNotifications } = new NotificationsApi();
  const query = useQuery(["user_notifications"], getNotifications, {
    onSuccess: (data) => {
      console.log("Fetched user notifications successfully");
    },
  });

  return { ...query };
};

export default useNotifications;
