import axios from "axios";
import { HTTP_SERVER_URL } from "./constants";

const postMessages = async (data) =>
  axios
    .post(`${HTTP_SERVER_URL}/api/message`, data)
    .then((res) => res.data)
    .catch((e) => console.log({ e }));

const fetchMessages = async () =>
  axios
    .get(`${HTTP_SERVER_URL}/api/messages`)
    .then((res) => res.data)
    .catch((e) => console.log({ e }));

const deleteMessages = async (messageId) =>
  axios
    .delete(`${HTTP_SERVER_URL}/api/message/${messageId}`)
    .then((res) => res.data)
    .catch((e) => console.log({ e }));

export { postMessages, fetchMessages, deleteMessages };
