"use client";

import { useState } from "react";

interface UploadFormProps {
  onUploadSuccess: () => void;
}

export default function UploadForm({ onUploadSuccess }: UploadFormProps) {
  const [uploadType, setUploadType] = useState<"file" | "embed">("file");
  const [file, setFile] = useState<File | null>(null);
  const [embedUrl, setEmbedUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const isYouTubeUrl = (url: string) => {
    return /(youtube\.com|youtu\.be)/.test(url);
  };

  const isVimeoUrl = (url: string) => {
    return /vimeo\.com/.test(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setUploading(true);

    try {
      let mediaUrl = "";
      let mediaType: "video" | "photo" | "embed" = "photo";
      let embedUrlValue = "";

      if (uploadType === "file" && file) {
        // Upload file to Vercel Blob
        const formData = new FormData();
        formData.append("file", file);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json().catch(() => ({}));
          throw new Error(errorData.error || "Upload failed");
        }

        const uploadData = await uploadResponse.json();
        mediaUrl = uploadData.url;

        // Determine type from file
        if (file.type.startsWith("video/")) {
          mediaType = "video";
        } else if (file.type.startsWith("image/")) {
          mediaType = "photo";
        }
      } else if (uploadType === "embed" && embedUrl) {
        if (isYouTubeUrl(embedUrl) || isVimeoUrl(embedUrl)) {
          mediaType = "embed";
          embedUrlValue = embedUrl;
          mediaUrl = embedUrl; // Fallback URL
        } else {
          throw new Error("Please provide a valid YouTube or Vimeo URL");
        }
      } else {
        throw new Error("Please select a file or provide an embed URL");
      }

      // Save media item
      const response = await fetch("/api/media", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: mediaType,
          url: mediaUrl,
          embedUrl: embedUrlValue || undefined,
          title: title || undefined,
          description: description || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save media item");
      }

      // Reset form
      setFile(null);
      setEmbedUrl("");
      setTitle("");
      setDescription("");
      onUploadSuccess();
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Upload Type</label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="file"
              checked={uploadType === "file"}
              onChange={(e) => setUploadType(e.target.value as "file")}
              className="mr-2"
            />
            File Upload
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="embed"
              checked={uploadType === "embed"}
              onChange={(e) => setUploadType(e.target.value as "embed")}
              className="mr-2"
            />
            YouTube/Vimeo Embed
          </label>
        </div>
      </div>

      {uploadType === "file" ? (
        <div>
          <label className="block text-sm font-medium mb-2">
            Select File (Video or Photo)
          </label>
          <input
            type="file"
            accept="video/*,image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium mb-2">
            YouTube or Vimeo URL
          </label>
          <input
            type="url"
            value={embedUrl}
            onChange={(e) => setEmbedUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Title (optional)</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Description (optional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={uploading}
        className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}
