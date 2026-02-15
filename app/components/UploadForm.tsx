"use client";

import { useState, useEffect } from "react";
import ReactPlayer from "react-player";

interface UploadFormProps {
  onUploadSuccess: () => void;
}

export default function UploadForm({ onUploadSuccess }: UploadFormProps) {
  const [uploadType, setUploadType] = useState<"file" | "embed">("file");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [embedUrl, setEmbedUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [altText, setAltText] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [featured, setFeatured] = useState(false);
  const [visible, setVisible] = useState(true);
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
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      if (selectedFile.type.startsWith("image/")) {
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
      } else if (selectedFile.type.startsWith("video/")) {
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleEmbedUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setEmbedUrl(url);
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setFile(null);
  };

  const handleUploadTypeChange = (type: "file" | "embed") => {
    setUploadType(type);
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setFile(null);
    setEmbedUrl("");
  };

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setUploading(true);

    try {
      let mediaUrl = "";
      let mediaType: "video" | "photo" | "embed" = "photo";
      let embedUrlValue = "";

      if (uploadType === "file" && file) {
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

        if (file.type.startsWith("video/")) {
          mediaType = "video";
        } else if (file.type.startsWith("image/")) {
          mediaType = "photo";
        }
      } else if (uploadType === "embed" && embedUrl) {
        if (isYouTubeUrl(embedUrl) || isVimeoUrl(embedUrl)) {
          mediaType = "embed";
          embedUrlValue = embedUrl;
          mediaUrl = embedUrl;
        } else {
          throw new Error("Please provide a valid YouTube or Vimeo URL");
        }
      } else {
        throw new Error("Please select a file or provide an embed URL");
      }

      const tagsArray = tags.split(",").map((t) => t.trim()).filter(Boolean);

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
          category: category.trim() || undefined,
          tags: tagsArray.length > 0 ? tagsArray : undefined,
          altText: altText.trim() || undefined,
          customUrl: customUrl.trim() || undefined,
          featured: featured || undefined,
          visible: visible !== undefined ? visible : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save media item");
      }

      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
      setFile(null);
      setPreviewUrl(null);
      setEmbedUrl("");
      setTitle("");
      setDescription("");
      setCategory("");
      setTags("");
      setAltText("");
      setCustomUrl("");
      setFeatured(false);
      setVisible(true);
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
        <label className="block text-sm font-medium text-gray-300 mb-3">Upload Type</label>
        <div className="flex gap-4">
          <label className="flex items-center text-gray-300 cursor-pointer">
            <input
              type="radio"
              value="file"
              checked={uploadType === "file"}
              onChange={(e) => handleUploadTypeChange(e.target.value as "file")}
              className="mr-2 w-4 h-4 text-white bg-gray-800 border-gray-600 focus:ring-white"
            />
            File Upload
          </label>
          <label className="flex items-center text-gray-300 cursor-pointer">
            <input
              type="radio"
              value="embed"
              checked={uploadType === "embed"}
              onChange={(e) => handleUploadTypeChange(e.target.value as "embed")}
              className="mr-2 w-4 h-4 text-white bg-gray-800 border-gray-600 focus:ring-white"
            />
            YouTube/Vimeo Embed
          </label>
        </div>
      </div>

      {uploadType === "file" ? (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Select File (Video or Photo)
          </label>
          <input
            type="file"
            accept="video/*,image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-gray-200 file:cursor-pointer cursor-pointer"
            required
          />
          {previewUrl && file && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Preview</label>
              <div className="relative w-full aspect-video bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                {file.type.startsWith("image/") ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                ) : file.type.startsWith("video/") ? (
                  <video
                    src={previewUrl}
                    controls
                    className="w-full h-full"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : null}
              </div>
              <p className="mt-2 text-xs text-gray-400">
                File: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            YouTube or Vimeo URL
          </label>
          <input
            type="url"
            value={embedUrl}
            onChange={handleEmbedUrlChange}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:border-white text-white placeholder-gray-500"
            required
          />
          {embedUrl && (isYouTubeUrl(embedUrl) || isVimeoUrl(embedUrl)) && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Preview</label>
              <div className="relative w-full aspect-video bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                <ReactPlayer
                  url={embedUrl}
                  width="100%"
                  height="100%"
                  controls
                />
              </div>
            </div>
          )}
          {embedUrl && !isYouTubeUrl(embedUrl) && !isVimeoUrl(embedUrl) && (
            <p className="mt-2 text-xs text-red-400">
              Please enter a valid YouTube or Vimeo URL
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Title (optional)</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:border-white text-white placeholder-gray-500"
            placeholder="Enter title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Category (optional)</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Performances, Behind the Scenes"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:border-white text-white placeholder-gray-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Description (optional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500"
          placeholder="Enter description"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tags (comma-separated, optional)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:border-white text-white placeholder-gray-500"
            placeholder="dance, performance, contemporary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Alt Text (optional)
          </label>
          <input
            type="text"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:border-white text-white placeholder-gray-500"
            placeholder="Accessibility description"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Custom URL Slug (optional)
        </label>
        <input
          type="text"
          value={customUrl}
          onChange={(e) => setCustomUrl(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500"
          placeholder="custom-url-slug"
        />
        <p className="mt-1 text-xs text-gray-400">
          Custom URL for this media item
        </p>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-4 h-4 text-white bg-gray-800 border-gray-600 rounded focus:ring-white"
          />
          <span className="text-sm text-gray-300">Featured</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={visible}
            onChange={(e) => setVisible(e.target.checked)}
            className="w-4 h-4 text-white bg-gray-800 border-gray-600 rounded focus:ring-white"
          />
          <span className="text-sm text-gray-300">Visible</span>
        </label>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={uploading}
        className="w-full bg-white text-black py-3 px-6 rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg"
      >
        {uploading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Uploading...
          </span>
        ) : (
          "Upload Media"
        )}
      </button>
    </form>
  );
}
