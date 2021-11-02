import { DEVELOPMENT } from "@/utils/constants";

export default {
  isDevMode: process.env.NODE_ENV === DEVELOPMENT,
};
