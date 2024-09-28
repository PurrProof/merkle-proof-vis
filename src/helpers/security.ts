import { isHexString } from "ethers";

export const validateHex = (input: string): boolean => {
  if (!isHexString(input)) {
    throw new Error("Invalid hexadecimal string");
  }
  return true;
};
