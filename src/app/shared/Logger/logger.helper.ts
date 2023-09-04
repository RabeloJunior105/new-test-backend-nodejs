import { Logger as TSLog } from "tslog";

export const Logger = () => {
  return new TSLog({ name: "[ANOTA-AI]" });
};
