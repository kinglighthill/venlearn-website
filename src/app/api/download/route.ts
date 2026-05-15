import { NextRequest, NextResponse } from "next/server";
import AWS from "aws-sdk"

const fileNames: Record<string, Record<string, string>> = {
  suite: {
    windows: "venlearn-suite-x86_64.exe",
  },
  server: {
    windows: "venlearn-server-x86_64.exe",
  },
  manager: {
    windows: "venlearn-manager-x86_64.exe",
  },
  editor: {
    windows: "venlearn-editor-x86_64.exe",
  },
  client: {
    windows: "venlearn-x86_64.exe",
  },
};

AWS.config.update({
    accessKeyId: process.env.SPACES_ACCESS_KEY,
    secretAccessKey: process.env.SPACES_SECRET_KEY,
    region: "us-east-1",
})

const s3 = new AWS.S3({
    endpoint: "https://venlearn.fra1.cdn.digitaloceanspaces.com",
})

async function getDownloadUrl(fileName: string, platform: string) {
    const url = `apps/${platform}/${fileName}`

    const params = {
        Bucket: 'venlearn',
        Key: url,
        Expires: 3600,
    }

    const signedUrl = s3.getSignedUrl('getObject', params)
    return signedUrl.replace(
        "venlearn.venlearn.fra1.cdn.digitaloceanspaces.com", 
        "venlearn.fra1.cdn.digitaloceanspaces.com"
    )
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const app = searchParams.get("app");
  const platform = searchParams.get("platform");

  if (!app || !platform) {
    return NextResponse.redirect('/404')
  }

  const downloadUrl = await getDownloadUrl(fileNames[app]?.[platform], platform);

  if (!downloadUrl) {
    return NextResponse.redirect('/404');
  }

  return NextResponse.redirect(downloadUrl, 302);
}