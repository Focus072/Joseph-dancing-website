import { NextResponse } from "next/server";
import { getMediaItems, saveMediaItem, updateMediaItem, deleteMediaItem, reorderMediaItems, MediaItem } from "@/lib/media";

export async function GET() {
  try {
    const items = await getMediaItems();
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching media:", error);
    return NextResponse.json(
      { error: "Failed to fetch media" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await import("next/headers").then((m) => m.cookies());
    const authCookie = cookieStore.get("admin-auth");

    if (!authCookie || authCookie.value !== "authenticated") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();
    const items = await getMediaItems(true);
    const newItem: MediaItem = {
      id: Date.now().toString(),
      type: data.type,
      url: data.url || "",
      thumbnail: data.thumbnail,
      title: data.title,
      description: data.description,
      embedUrl: data.embedUrl,
      category: data.category,
      tags: data.tags,
      featured: data.featured,
      visible: data.visible !== undefined ? data.visible : true,
      customUrl: data.customUrl,
      altText: data.altText,
      metadata: data.metadata,
      createdAt: new Date().toISOString(),
      order: items.length,
      archived: false,
    };

    await saveMediaItem(newItem);
    return NextResponse.json(newItem);
  } catch (error) {
    console.error("Error saving media:", error);
    return NextResponse.json(
      { error: "Failed to save media" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const cookieStore = await import("next/headers").then((m) => m.cookies());
    const authCookie = cookieStore.get("admin-auth");

    if (!authCookie || authCookie.value !== "authenticated") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();
    
    // Handle reordering
    if (data.action === "reorder" && Array.isArray(data.orderedIds)) {
      await reorderMediaItems(data.orderedIds);
      const items = await getMediaItems();
      return NextResponse.json(items);
    }
    
    // Handle single item update
    if (!data.id) {
      return NextResponse.json(
        { error: "Item ID is required" },
        { status: 400 }
      );
    }

    const updated = await updateMediaItem(data.id, {
      title: data.title,
      description: data.description,
      archived: data.archived,
      order: data.order,
      category: data.category,
      tags: data.tags,
      featured: data.featured,
      visible: data.visible,
      customUrl: data.customUrl,
      altText: data.altText,
      metadata: data.metadata,
    });

    if (!updated) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating media:", error);
    return NextResponse.json(
      { error: "Failed to update media" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const cookieStore = await import("next/headers").then((m) => m.cookies());
    const authCookie = cookieStore.get("admin-auth");

    if (!authCookie || authCookie.value !== "authenticated") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Item ID is required" },
        { status: 400 }
      );
    }

    await deleteMediaItem(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting media:", error);
    return NextResponse.json(
      { error: "Failed to delete media" },
      { status: 500 }
    );
  }
}
