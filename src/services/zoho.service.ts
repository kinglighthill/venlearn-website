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
  const accountsUrl = process.env.ZOHO_ACCOUNTS_URL || "https://accounts.zoho.com";

  if (!clientId || !clientSecret) {
    throw new Error("Zoho CRM is not configured. Set ZOHO_CLIENT_ID and ZOHO_CLIENT_SECRET.");
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

export const exchangeZohoGrantTokenForRefreshToken = async (grantToken: string, redirectUri: string) => {
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

  const response = await fetch(`${accountsUrl}/oauth/v2/token`, {
    method: "POST",
    body,
  });

  const data = (await response.json()) as ZohoTokenResponse;

  if (!response.ok || !data.refresh_token) {
    throw new Error(data.error_description || data.error || "Unable to exchange Zoho grant token for refresh token.");
  }

  memoryRefreshToken = data.refresh_token;
  memoryApiDomain = data.api_domain || process.env.ZOHO_CRM_API_DOMAIN || "https://www.zohoapis.com";

  return memoryRefreshToken;
};

const exchangeConfiguredGrantTokenForRefreshToken = async () => {
  const grantToken = process.env.ZOHO_GRANT_TOKEN;

  if (!grantToken) {
    throw new Error(
      "Zoho CRM is not connected. Visit /api/zoho/oauth/start to authorize Zoho, or set ZOHO_REFRESH_TOKEN.",
    );
  }

  return exchangeZohoGrantTokenForRefreshToken(grantToken, getZohoRedirectUri());
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

  return exchangeConfiguredGrantTokenForRefreshToken();
};

const getZohoAccessToken = async () => {
  if (memoryAccessToken && Date.now() < memoryAccessTokenExpiresAt) {
    return {
      accessToken: memoryAccessToken,
      apiDomain: memoryApiDomain || process.env.ZOHO_CRM_API_DOMAIN || "https://www.zohoapis.com",
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

  const response = await fetch(`${accountsUrl}/oauth/v2/token`, {
    method: "POST",
    body,
  });

  const data = (await response.json()) as ZohoTokenResponse;

  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || data.error || "Unable to get Zoho CRM access token.");
  }

  memoryAccessToken = data.access_token;
  memoryApiDomain = data.api_domain || process.env.ZOHO_CRM_API_DOMAIN || "https://www.zohoapis.com";
  memoryAccessTokenExpiresAt = Date.now() + Math.max((data.expires_in || 3600) - 120, 60) * 1000;

  return {
    accessToken: memoryAccessToken,
    apiDomain: memoryApiDomain,
  };
};

export const createZohoDemoLead = async (lead: DemoLead) => {
  const { accessToken, apiDomain } = await getZohoAccessToken();
  const fullName = `${lead.firstName} ${lead.lastName}`.trim();
  const formattedDemoDate = lead.demoDateTime ? new Date(lead.demoDateTime).toLocaleString("en-NG") : "Not selected";

  const response = await fetch(`${apiDomain}/crm/v8/Leads`, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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
    }),
  });

  const data = (await response.json()) as ZohoInsertResponse;
  const firstRecord = data.data?.[0];

  if (!response.ok || firstRecord?.status === "error") {
    throw new Error(firstRecord?.message || "Unable to create Zoho CRM lead.");
  }

  return data;
};
