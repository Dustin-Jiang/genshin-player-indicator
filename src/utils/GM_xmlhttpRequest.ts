import { GM_xmlhttpRequest } from "./tampermonkey";

interface XHRDetails<CONTEXT_TYPE> {
  method?: "GET" | "HEAD" | "POST";
  url?: string;
  headers?: { readonly [key: string]: string };
  data?: string;
  binary?: boolean;
  timeout?: number;
  context?: CONTEXT_TYPE;
  responseType?: "arraybuffer" | "blob" | "json";
  overrideMimeType?: string;
  anonymous?: boolean;
  fetch?: boolean;
  username?: string;
  password?: string;

  onload?: Function;
  onloadstart?: Function;
  onprogress?: Function;
  onreadystatechange?: Function;
  ontimeout?: Function;
  onabort?: Function;
  onerror?: Function;
}

export default function GM_xmlhttpRequestPromise<CONTEXT_TYPE>(
  details: XHRDetails<CONTEXT_TYPE>
): Promise<CONTEXT_TYPE> {
  return new Promise((resolve, reject) => {
    details.onload = (data) => {
      resolve(data.response)
    }
    GM_xmlhttpRequest.call(null, details);
  });
}
