import fs from "node:fs/promises";
import https from "node:https";
import path from "node:path";
import { getStore } from "@netlify/blobs";

type ZohoTokenResponse = {
  access_token?: string;
  refresh_token?: string;
  api_domain?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
};

type ZohoInsertResponse = {
  data?: Array<{
    code?: string;
    details?: Record<string, unknown>;
    message?: string;
    status?: string;
  }>;
};

type ZohoTokenStore = {
  refreshToken?: string;
  apiDomain?: string;
  updatedAt?: string;
};

export type DemoLead = {
  schoolName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  studentsPopulation: string;
  designation: string;
  demoDateTime: string;
};

let memoryRefreshToken = "";
let memoryAccessToken = "";
let memoryAccessTokenExpiresAt = 0;
let memoryApiDomain = "";

const zohoTokenStorePath = path.join(
  process.cwd(),
  ".venlearn",
  "zoho-oauth.json",
);
const zohoBlobStoreName = "venlearn-oauth";
const zohoBlobStoreKey = "zoho";
const zohoUserAgent = "Venlearn Website/1.0";

const requestZohoJson = async <T>(
  urlString: string,
  options: {
    body?: string;
    headers?: Record<string, string>;
    method?: string;
    timeoutMs?: number;
  } = {},
) => {
  const url = new URL(urlString);
  const body = options.body || "";

  return new Promise<{ data: T; ok: boolean; status: number }>(
    (resolve, reject) => {
      const request = https.request(
        {
          family: 4,
          headers: {
            Accept: "application/json",
            "User-Agent": zohoUserAgent,
            ...options.headers,
            ...(body
              ? { "Content-Length": Buffer.byteLength(body).toString() }
              : {}),
          },
          hostname: url.hostname,
          method: options.method || "GET",
          path: `${url.pathname}${url.search}`,
          port: url.port ? Number(url.port) : undefined,
          protocol: url.protocol,
          timeout: options.timeoutMs || 20000,
        },
        (response) => {
          const chunks: Buffer[] = [];

          response.on("data", (chunk: Buffer) => {
            chunks.push(chunk);
          });

          response.on("end", () => {
            const text = Buffer.concat(chunks).toString("utf8");

            try {
              resolve({
                data: (text ? JSON.parse(text) : {}) as T,
                ok: Boolean(
                  response.statusCode &&
                  response.statusCode >= 200 &&
                  response.statusCode < 300,
                ),
                status: response.statusCode || 0,
              });
            } catch {
              reject(
                new Error(
                  `Zoho returned an unreadable response from ${url.hostname}.`,
                ),
              );
            }
          });
        },
      );

      request.on("timeout", () => {
        request.destroy(
          new Error(`Zoho request to ${url.hostname} timed out.`),
        );
      });

      request.on("error", (error) => {
        reject(
          new Error(
            `Unable to reach Zoho at ${url.hostname}: ${error.message}`,
          ),
        );
      });

      if (body) {
        request.write(body);
      }

      request.end();
    },
  );
};

const postZohoForm = async <T>(url: string, body: URLSearchParams) =>
  requestZohoJson<T>(url, {
    body: body.toString(),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
  });

const postZohoJson = async <T>(
  url: string,
  payload: unknown,
  accessToken: string,
) =>
  requestZohoJson<T>(url, {
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

const shouldUseNetlifyBlobs = () => process.env.NODE_ENV === "production";

const cacheZohoTokenStore = (store: ZohoTokenStore) => {
  if (!store.refreshToken) {
    return null;
  }

  memoryRefreshToken = store.refreshToken;
  memoryApiDomain =
    store.apiDomain ||
    process.env.ZOHO_CRM_API_DOMAIN ||
    "https://www.zohoapis.com";

  return {
    refreshToken: memoryRefreshToken,
    apiDomain: memoryApiDomain,
  };
};

const readZohoTokenFromBlob = async () => {
  try {
    const store = getStore(zohoBlobStoreName);
    const stored = await store.get(zohoBlobStoreKey, {
      consistency: "strong",
      type: "json",
    });

    if (!stored || typeof stored !== "object") {
      return null;
    }

    return cacheZohoTokenStore(stored as ZohoTokenStore);
  } catch (error) {
    console.warn(
      "Unable to read Zoho OAuth token from Netlify Blobs:",
      error instanceof Error ? error.message : error,
    );
    return null;
  }
};

const writeZohoTokenToBlob = async (
  refreshToken: string,
  apiDomain: string,
) => {
  const store = getStore(zohoBlobStoreName);

  await store.setJSON(zohoBlobStoreKey, {
    refreshToken,
    apiDomain,
    updatedAt: new Date().toISOString(),
  } satisfies ZohoTokenStore);
};

const readStoredZohoToken = async () => {
  if (shouldUseNetlifyBlobs()) {
    return readZohoTokenFromBlob();
  }

  try {
    const rawStore = await fs.readFile(zohoTokenStorePath, "utf8");
    const store = JSON.parse(rawStore) as ZohoTokenStore;

    return cacheZohoTokenStore(store);
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return null;
    }

    console.warn(
      "Unable to read stored Zoho OAuth token:",
      error instanceof Error ? error.message : error,
    );
    return null;
  }
};

const writeStoredZohoToken = async (
  refreshToken: string,
  apiDomain: string,
) => {
  memoryRefreshToken = refreshToken;
  memoryApiDomain = apiDomain;

  if (shouldUseNetlifyBlobs()) {
    await writeZohoTokenToBlob(refreshToken, apiDomain);
    return;
  }

  try {
    await fs.mkdir(path.dirname(zohoTokenStorePath), { recursive: true });
    await fs.writeFile(
      zohoTokenStorePath,
      JSON.stringify(
        {
          refreshToken,
          apiDomain,
          updatedAt: new Date().toISOString(),
        } satisfies ZohoTokenStore,
        null,
        2,
      ),
      "utf8",
    );
  } catch (error) {
    console.warn(
      "Unable to persist Zoho OAuth token to disk. Set ZOHO_REFRESH_TOKEN in production for durable Zoho access.",
      error instanceof Error ? error.message : error,
    );
  }
};

export const getZohoRedirectUri = (requestUrl?: string) => {
  if (process.env.ZOHO_REDIRECT_URI) {
    return process.env.ZOHO_REDIRECT_URI;
  }

  if (!requestUrl) {
    throw new Error("Zoho OAuth redirect URI is not configured.");
  }

  return new URL("/api/zoho/oauth/callback", requestUrl).toString();
};

const getZohoConfig = () => {
  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;
  const accountsUrl =
    process.env.ZOHO_ACCOUNTS_URL || "https://accounts.zoho.com";

  if (!clientId || !clientSecret) {
    throw new Error(
      "Zoho CRM is not configured. Set ZOHO_CLIENT_ID and ZOHO_CLIENT_SECRET.",
    );
  }

  return { clientId, clientSecret, accountsUrl };
};

export const getZohoAuthorizationUrl = (requestUrl: string) => {
  const { clientId, accountsUrl } = getZohoConfig();
  const redirectUri = getZohoRedirectUri(requestUrl);
  const url = new URL(`${accountsUrl}/oauth/v2/auth`);

  url.searchParams.set("scope", "ZohoCRM.modules.Leads.CREATE");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("access_type", "offline");
  url.searchParams.set("prompt", "consent");
  url.searchParams.set("redirect_uri", redirectUri);

  return url.toString();
};

export const exchangeZohoGrantTokenForRefreshToken = async (
  grantToken: string,
  redirectUri: string,
) => {
  const { clientId, clientSecret, accountsUrl } = getZohoConfig();

  if (!grantToken || !redirectUri) {
    throw new Error("Zoho grant token and redirect URI are required.");
  }

  const body = new URLSearchParams({
    code: grantToken,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  });

  const response = await postZohoForm<ZohoTokenResponse>(
    `${accountsUrl}/oauth/v2/token`,
    body,
  );
  const data = response.data;

  if (!response.ok || data.error) {
    throw new Error(
      data.error_description ||
        data.error ||
        "Unable to exchange Zoho grant token for refresh token.",
    );
  }

  const apiDomain =
    data.api_domain ||
    process.env.ZOHO_CRM_API_DOMAIN ||
    "https://www.zohoapis.com";

  if (data.refresh_token) {
    await writeStoredZohoToken(data.refresh_token, apiDomain);
    return data.refresh_token;
  }

  const storedToken = await readStoredZohoToken();

  if (storedToken?.refreshToken) {
    return storedToken.refreshToken;
  }

  throw new Error(
    "Zoho did not return a refresh token. Revoke this app in Zoho, then authorize it again.",
  );
};

const exchangeConfiguredGrantTokenForRefreshToken = async () => {
  const grantToken = process.env.ZOHO_GRANT_TOKEN;

  if (!grantToken) {
    throw new Error(
      "Zoho CRM is not connected. Visit /api/zoho/oauth/start to authorize Zoho, or set ZOHO_REFRESH_TOKEN.",
    );
  }

  return exchangeZohoGrantTokenForRefreshToken(
    grantToken,
    getZohoRedirectUri(),
  );
};

const getZohoRefreshToken = async () => {
  if (memoryRefreshToken) {
    return memoryRefreshToken;
  }

  const configuredRefreshToken = process.env.ZOHO_REFRESH_TOKEN;

  if (configuredRefreshToken) {
    memoryRefreshToken = configuredRefreshToken;
    return memoryRefreshToken;
  }

  const storedToken = await readStoredZohoToken();

  if (storedToken?.refreshToken) {
    return storedToken.refreshToken;
  }

  return exchangeConfiguredGrantTokenForRefreshToken();
};

const getZohoAccessToken = async () => {
  if (memoryAccessToken && Date.now() < memoryAccessTokenExpiresAt) {
    return {
      accessToken: memoryAccessToken,
      apiDomain:
        memoryApiDomain ||
        process.env.ZOHO_CRM_API_DOMAIN ||
        "https://www.zohoapis.com",
    };
  }

  const { clientId, clientSecret, accountsUrl } = getZohoConfig();
  const refreshToken = await getZohoRefreshToken();

  const body = new URLSearchParams({
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "refresh_token",
  });

  const response = await postZohoForm<ZohoTokenResponse>(
    `${accountsUrl}/oauth/v2/token`,
    body,
  );
  const data = response.data;

  if (!response.ok || !data.access_token) {
    throw new Error(
      data.error_description ||
        data.error ||
        "Unable to get Zoho CRM access token.",
    );
  }

  memoryAccessToken = data.access_token;
  memoryApiDomain =
    data.api_domain ||
    process.env.ZOHO_CRM_API_DOMAIN ||
    "https://www.zohoapis.com";
  memoryAccessTokenExpiresAt =
    Date.now() + Math.max((data.expires_in || 3600) - 120, 60) * 1000;

  return {
    accessToken: memoryAccessToken,
    apiDomain: memoryApiDomain,
  };
};

export const createZohoDemoLead = async (lead: DemoLead) => {
  const { accessToken, apiDomain } = await getZohoAccessToken();
  const fullName = `${lead.firstName} ${lead.lastName}`.trim();
  const formattedDemoDate = lead.demoDateTime
    ? new Date(lead.demoDateTime).toLocaleString("en-NG")
    : "Not selected";

  const response = await postZohoJson<ZohoInsertResponse>(
    `${apiDomain}/crm/v8/Leads`,
    {
      data: [
        {
          First_Name: lead.firstName,
          Last_Name: lead.lastName,
          Company: lead.schoolName,
          Email: lead.email,
          Phone: lead.phone,
          Designation: lead.designation,
          Lead_Source: "Website Demo Form",
          Description: [
            "Venlearn demo booking request",
            `Name: ${fullName}`,
            `Email: ${lead.email}`,
            `Phone: ${lead.phone}`,
            `Designation: ${lead.designation}`,
            `School name: ${lead.schoolName}`,
            `Students population: ${lead.studentsPopulation}`,
            `Preferred demo date and time: ${formattedDemoDate}`,
          ].join("\n"),
        },
      ],
      trigger: ["workflow"],
    },
    accessToken,
  );

  const data = response.data;
  const firstRecord = data.data?.[0];

  if (!response.ok || firstRecord?.status === "error") {
    throw new Error(firstRecord?.message || "Unable to create Zoho CRM lead.");
  }

  return data;
};
