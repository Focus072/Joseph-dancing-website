import { NextRequest, NextResponse } from "next/server";
import { uploadToBlob } from "@/lib/blob";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("admin-auth");

    if (!authCookie || authCookie.value !== "authenticated") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Check if Blob Storage is configured
    if (!process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN === "your_vercel_blob_token_here") {
      return NextResponse.json(
        { 
          error: "Blob Storage not configured. Please set up Vercel Blob Storage and add BLOB_READ_WRITE_TOKEN to your .env.local file. For now, you can use YouTube/Vimeo embeds instead." 
        },
        { status: 500 }
      );
    }

    const filename = `${Date.now()}-${file.name}`;
    const url = await uploadToBlob(file, filename);

    return NextResponse.json({ url, filename });
  } catch (error: any) {
    console.error("Upload error:", error);
    const errorMessage = error?.message || "Upload failed";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
