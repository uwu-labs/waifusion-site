const API_BASE = "https://api.waifusion.sexy/v1/";

export interface WaifusionAPIResponse {
  success: boolean;
  data?: any;
  error?: WaifusionError;
}
interface WaifusionError {
  code: string;
  message?: string;
}

export const makeRequest = async (
  endpoint: string,
  {
    method = "GET",
    body: outboundBody,
    media,
  }: {
    method?: string;
    body?: any;
    media?: boolean;
  }
): Promise<WaifusionAPIResponse> => {
  try {
    const headers: { [key: string]: string } = {
      accept: "application/json",
    };

    if (outboundBody)
      headers["Content-Type"] = media
        ? "multipart/form-data"
        : "application/json";

    const response: WaifusionAPIResponse = await fetch(API_BASE + endpoint, {
      method,
      headers,
      body: media
        ? outboundBody
        : outboundBody && method !== "GET" && method !== "HEAD"
        ? JSON.stringify(outboundBody)
        : null,
    }).then(async (res) =>
      res.status === 204 ? { success: true } : res.json()
    );

    if (!response.success) {
      const { code, message } = response.error as any;

      switch (code) {
        case "rate_limit":
          const timeout = message.expires_at - Date.now();
          setTimeout(
            () => makeRequest(endpoint, { method, body: outboundBody, media }),
            timeout
          );
          break;
        // TODO: properly handle this
        default:
          break;
      }
    }

    return (
      response || { success: false, error: { code: "internal_scoped_error" } }
    );
  } catch (error) {
    console.error(error);

    return { success: false, error: { code: "internal_scoped_error" } };
  }
};
