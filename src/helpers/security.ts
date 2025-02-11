import DOMPurify from "dompurify";
import { isHexString } from "ethers";

export const validateHex = (input: string): boolean => {
  if (!isHexString(input)) {
    throw new Error("Invalid hexadecimal string");
  }
  return true;
};

const checkForXSS = (input: string): boolean => {
  const cleanInput = DOMPurify.sanitize(input);
  return cleanInput === input; // if the input was sanitized, it's unsafe
};

const validateSignature = (signature: string): any[] => {
  signature = signature.trim();
  if (signature === "") {
    throw new Error("Empty signature.");
  } else if (!checkForXSS(signature)) {
    throw new Error("Signature contains potentially malicious content.");
  }

  let parsedSignature;
  try {
    parsedSignature = JSON.parse(signature);
  } catch (e) {
    throw new Error("Signature is not valid JSON.");
  }

  // ensure it's an array
  if (!Array.isArray(parsedSignature)) {
    throw new Error("Signature must be an array.");
  }

  return parsedSignature;
};

const validateValues = (values: string): any[][] => {
  values = values.trim();
  if (values === "") {
    throw new Error("Empty values.");
  } else if (!checkForXSS(values)) {
    throw new Error("Values contain potentially malicious content.");
  }

  let parsedValues;
  try {
    parsedValues = JSON.parse(values);
  } catch (e) {
    throw new Error("Values are not valid JSON.");
  }

  // ensure it's an array of arrays
  if (
    !Array.isArray(parsedValues) ||
    !parsedValues.every((item) => Array.isArray(item))
  ) {
    throw new Error("Values must be an array of arrays.");
  }

  return parsedValues;
};

export { validateSignature, validateValues };
