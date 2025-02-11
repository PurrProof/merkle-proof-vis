import LZString from "lz-string";
import { hexlify, toBeArray } from "ethers";

export const getUrlParams = (): {
  signature: string;
  values: string;
} => {
  const searchParams = new URLSearchParams(window.location.search);
  const sig = searchParams.get("sig") ?? "";
  const values = searchParams.get("values") ?? "";
  const lzdata = searchParams.get("lzdata") ?? "";
  const res = { signature: sig ? decodeURIComponent(sig) : "", values: "" };

  try {
    if (lzdata !== "") {
      // we have compressed values in the url, this is priority
      res.values = LZString.decompressFromUint8Array(
        toBeArray(decodeURIComponent(lzdata))
      );
    } else {
      res.values = values ? decodeURIComponent(values) : "";
    }
    return res;
  } catch (error: unknown) {
    console.log("can't decode url parameters");
  }

  // fallback return empty parameters
  return { signature: "", values: "" };
};

export const clearUrl = (): void => {
  const newUrl = window.location.pathname;
  window.history.pushState({}, "", newUrl);
};

export const generateUrl = (
  signature: string,
  values: string,
  format?: string
): string => {
  const baseUrl = `${window.location.origin}${window.location.pathname}`;
  const url = new URL(baseUrl);
  const params: Map<string, string> = new Map();
  // don't lz signature, there is no win in length
  params.set("sig", signature);
  if (format === "plain") {
    params.set("values", values);
  } else {
    params.set("lzdata", hexlify(LZString.compressToUint8Array(values)));
  }
  params.forEach((value: string, key: string) => {
    url.searchParams.set(key, encodeURIComponent(value));
  });
  return url.toString();
};
