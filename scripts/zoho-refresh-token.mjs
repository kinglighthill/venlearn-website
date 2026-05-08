import { readFile } from "node:fs/promises";

const envFile = await readFile(".env.local", "utf8").catch(() => "");
const env = Object.fromEntries(
  envFile
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#") && line.includes("="))
    .map((line) => {
      const index = line.indexOf("=");
      return [line.slice(0, index), line.slice(index + 1)];
    }),
);

const grantToken = process.argv[2] || process.env.ZOHO_GRANT_TOKEN || env.ZOHO_GRANT_TOKEN;
const redirectUri = process.argv[3] || process.env.ZOHO_REDIRECT_URI || env.ZOHO_REDIRECT_URI;
const clientId = process.env.ZOHO_CLIENT_ID || env.ZOHO_CLIENT_ID;
const clientSecret = process.env.ZOHO_CLIENT_SECRET || env.ZOHO_CLIENT_SECRET;
const accountsUrl = process.env.ZOHO_ACCOUNTS_URL || env.ZOHO_ACCOUNTS_URL || "https://accounts.zoho.com";

if (!grantToken || !redirectUri || !clientId || !clientSecret) {
  console.error("Usage: node scripts/zoho-refresh-token.mjs <grant-token> <redirect-uri>");
  console.error("Required values: grant token, redirect URI, ZOHO_CLIENT_ID, and ZOHO_CLIENT_SECRET.");
  process.exit(1);
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

const data = await response.json();

if (!response.ok || data.error) {
  console.error("Zoho token exchange failed:");
  console.error(JSON.stringify(data, null, 2));
  process.exit(1);
}

console.log("Add these to .env.local and restart the dev server:");
console.log(`ZOHO_REFRESH_TOKEN=${data.refresh_token || ""}`);
console.log(`ZOHO_CRM_API_DOMAIN=${data.api_domain || "https://www.zohoapis.com"}`);
