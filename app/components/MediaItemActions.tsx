"use client";

import { useState } from "react";
import Image from "next/image";

interface MediaItem {
  id: string;
  type: "video" | "photo" | "embed";
  url: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  createdAt: string;
  archived?: boolean;
  order?: number;
  category?: string;
  tags?: string[];
  featured?: boolean;
  visible?: boolean;
  customUrl?: string;
  altText?: string;
  metadata?: Record<string, any>;
}

interface MediaItemActionsProps {
  item: MediaItem;
  onUpdate: () => void;
  totalItems: number;
  currentIndex: number;
  viewMode?: "grid" | "list" | "compact";
  isSelected?: boolean;
  onToggleSelect?: () => void;
}

export default function MediaItemActions({
  item,
  onUpdate,
  totalItems,
  currentIndex,
  viewMode = "grid",
  isSelected = false,
  onToggleSelect,
}: MediaItemActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.title || "");
  const [description, setDescription] = useState(item.description || "");
  const [category, setCategory] = useState(item.category || "");
  const [tags, setTags] = useState((item.tags || []).join(", "));
  const [altText, setAltText] = useState(item.altText || "");
  const [customUrl, setCustomUrl] = useState(item.customUrl || "");
  const [featured, setFeatured] = useState(item.featured || false);
  const [visible, setVisible] = useState(item.visible !== false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    setLoading(true);
    setError("");
    try {
      const tagsArray = tags.split(",").map((t) => t.trim()).filter(Boolean);
      
      const response = await fetch("/api/media", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: item.id,
          title: title.trim() || undefined,
          description: description.trim() || undefined,
          category: category.trim() || undefined,
          tags: tagsArray.length > 0 ? tagsArray : undefined,
          altText: altText.trim() || undefined,
          customUrl: customUrl.trim() || undefined,
          featured: featured || undefined,
          visible: visible !== undefined ? visible : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      setIsEditing(false);
      onUpdate();
    } catch (err: any) {
      setError(err.message || "Failed to update item");
    } finally {
      setLoading(false);
    }
  };

  const handleArchive = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/media", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: item.id,
          archived: !item.archived,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to archive item");
      }

      setIsOpen(false);
      onUpdate();
    } catch (err: any) {
      setError(err.message || "Failed to archive item");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this item? This action cannot be undone.")) {
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/media?id=${item.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      setIsOpen(false);
      onUpdate();
    } catch (err: any) {
      setError(err.message || "Failed to delete item");
    } finally {
      setLoading(false);
    }
  };

  const handleMove = async (direction: "up" | "down") => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/media");
      if (!response.ok) throw new Error("Failed to fetch items");
      
      const items: MediaItem[] = await response.json();
      const currentItemIndex = items.findIndex((i) => i.id === item.id);
      
      if (currentItemIndex === -1) throw new Error("Item not found");
      
      const targetIndex = direction === "up" ? currentItemIndex - 1 : currentItemIndex + 1;
      
      if (targetIndex < 0 || targetIndex >= items.length) {
        throw new Error(`Cannot move ${direction === "up" ? "up" : "down"}`);
      }

      const reordered = [...items];
      [reordered[currentItemIndex], reordered[targetIndex]] = [
        reordered[targetIndex],
        reordered[currentItemIndex],
      ];

      const orderedIds = reordered.map((i) => i.id);

      const updateResponse = await fetch("/api/media", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "reorder",
          orderedIds,
        }),
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to reorder items");
      }

      onUpdate();
    } catch (err: any) {
      setError(err.message || "Failed to move item");
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = () => {
    switch (item.type) {
      case "video":
        return "bg-red-600/20 text-red-400 border-red-600/50";
      case "embed":
        return "bg-purple-600/20 text-purple-400 border-purple-600/50";
      case "photo":
        return "bg-blue-600/20 text-blue-400 border-blue-600/50";
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-600/50";
    }
  };

  if (viewMode === "compact") {
    return (
      <div
        className={`relative border rounded-lg p-2 cursor-pointer transition-all ${
          isSelected
            ? "border-white bg-white/10"
            : item.archived
            ? "border-gray-600/50 bg-gray-900/50 opacity-75"
            : "border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800"
        }`}
        onClick={onToggleSelect}
      >
        {isSelected && (
          <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        <div className="aspect-video bg-gray-900 rounded mb-2 overflow-hidden">
          {item.thumbnail ? (
            <Image
              src={item.thumbnail}
              alt={item.title || "Thumbnail"}
              width={200}
              height={112}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
        <p className="text-xs text-white truncate">{item.title || "Untitled"}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          className="mt-1 w-full px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded text-white transition-colors"
        >
          Edit
        </button>
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <>
        <div
          className={`flex items-center gap-4 p-4 border rounded-lg transition-all ${
            isSelected
              ? "border-white bg-white/10"
              : item.archived
              ? "border-gray-600/50 bg-gray-900/50 opacity-75"
              : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
          }`}
        >
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            className="w-5 h-5 text-white bg-gray-800 border-gray-600 rounded focus:ring-white"
          />
          <div className="w-24 h-16 bg-gray-900 rounded overflow-hidden flex-shrink-0">
            {item.thumbnail ? (
              <Image
                src={item.thumbnail}
                alt={item.title || "Thumbnail"}
                width={96}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-1 rounded text-xs font-semibold border ${getTypeColor()}`}>
                {item.type.toUpperCase()}
              </span>
              {item.featured && (
                <span className="px-2 py-1 rounded text-xs font-semibold bg-yellow-600/20 text-yellow-400 border border-yellow-600/50">
                  FEATURED
                </span>
              )}
              {item.archived && (
                <span className="px-2 py-1 rounded text-xs font-semibold bg-yellow-600/20 text-yellow-400 border border-yellow-600/50">
                  ARCHIVED
                </span>
              )}
            </div>
            <h3 className="font-bold text-white mb-1 truncate">
              {item.title || `Untitled ${item.type}`}
            </h3>
            {item.description && (
              <p className="text-sm text-gray-400 truncate">{item.description}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {new Date(item.createdAt).toLocaleDateString()} • {item.category || "No category"}
            </p>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
          >
            Customize
          </button>
        </div>
        {isOpen && renderModal()}
      </>
    );
  }

  // Grid view (default)
  return (
    <>
      <div
        className={`relative border rounded-xl p-6 hover:shadow-xl transition-all ${
          isSelected
            ? "border-white bg-white/10 ring-2 ring-white"
            : item.archived
            ? "border-gray-600/50 bg-gray-900/50 opacity-75"
            : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
        }`}
      >
        {isSelected && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center z-10">
            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded text-xs font-semibold border ${getTypeColor()}`}>
                {item.type.toUpperCase()}
              </span>
              {item.featured && (
                <span className="px-2 py-1 rounded text-xs font-semibold bg-yellow-600/20 text-yellow-400 border border-yellow-600/50">
                  ⭐ FEATURED
                </span>
              )}
              {item.archived && (
                <span className="px-2 py-1 rounded text-xs font-semibold bg-yellow-600/20 text-yellow-400 border border-yellow-600/50">
                  ARCHIVED
                </span>
              )}
            </div>
            <h3 className="font-bold text-lg text-white mb-1">
              {item.title || `Untitled ${item.type}`}
            </h3>
            <p className="text-sm text-gray-400">
              {new Date(item.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {onToggleSelect && (
              <input
                type="checkbox"
                checked={isSelected}
                onChange={onToggleSelect}
                className="w-5 h-5 text-white bg-gray-800 border-gray-600 rounded focus:ring-white"
              />
            )}
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              title="Customize"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
        </div>
        
        {item.description && (
          <p className="text-sm text-gray-400 mb-4 line-clamp-2">
            {item.description}
          </p>
        )}
        
        {item.category && (
          <div className="mb-4">
            <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
              {item.category}
            </span>
          </div>
        )}
        
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {item.tags.map((tag, idx) => (
              <span key={idx} className="px-2 py-1 bg-white/10 text-white border border-white/20 rounded text-xs">
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center text-sm text-white hover:text-gray-300"
          >
            View Media
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
      {isOpen && renderModal()}
    </>
  );

  function renderModal() {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
        onClick={() => {
          if (!loading) {
            setIsOpen(false);
            setIsEditing(false);
            setError("");
          }
        }}
      >
        <div
          className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between z-10">
            <h3 className="text-2xl font-bold text-white">
              Customize Media Item
            </h3>
            <button
              onClick={() => {
                setIsOpen(false);
                setIsEditing(false);
                setError("");
              }}
              className="text-gray-400 hover:text-white transition-colors"
              disabled={loading}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-6">
            {error && (
              <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {!isEditing ? (
              <>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Title</h4>
                  <p className="text-lg text-white">{item.title || "Untitled"}</p>
                </div>

                {item.description && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Description</h4>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                )}

                {item.category && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Category</h4>
                    <p className="text-gray-300">{item.category}</p>
                  </div>
                )}

                {item.tags && item.tags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-white/10 text-white border border-white/20 rounded text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Status</h4>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        item.archived
                          ? "bg-yellow-600/20 text-yellow-400 border border-yellow-600/50"
                          : "bg-green-600/20 text-green-400 border border-green-600/50"
                      }`}
                    >
                      {item.archived ? "Archived" : "Active"}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Position</h4>
                    <span className="text-gray-300">{currentIndex + 1} of {totalItems}</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:border-white text-white"
                    placeholder="Enter title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:border-white text-white"
                    placeholder="Enter description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:border-white text-white"
                      placeholder="e.g., Performances"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:border-white text-white"
                      placeholder="tag1, tag2, tag3"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Alt Text</label>
                    <input
                      type="text"
                      value={altText}
                      onChange={(e) => setAltText(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:border-white text-white"
                      placeholder="Accessibility description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Custom URL</label>
                    <input
                      type="text"
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:border-white text-white"
                      placeholder="custom-slug"
                    />
                  </div>
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
              </>
            )}

            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-800">
              {!isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 font-medium"
                  >
                    Edit Details
                  </button>
                  <button
                    onClick={() => handleMove("up")}
                    disabled={loading || currentIndex === 0}
                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
                  >
                    ↑ Move Up
                  </button>
                  <button
                    onClick={() => handleMove("down")}
                    disabled={loading || currentIndex === totalItems - 1}
                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
                  >
                    ↓ Move Down
                  </button>
                  <button
                    onClick={handleArchive}
                    disabled={loading}
                    className={`px-4 py-2 rounded-lg transition-colors disabled:opacity-50 ${
                      item.archived
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-yellow-600 text-white hover:bg-yellow-700"
                    }`}
                  >
                    {item.archived ? "Unarchive" : "Archive"}
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 font-medium"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setTitle(item.title || "");
                      setDescription(item.description || "");
                      setCategory(item.category || "");
                      setTags((item.tags || []).join(", "));
                      setAltText(item.altText || "");
                      setCustomUrl(item.customUrl || "");
                      setFeatured(item.featured || false);
                      setVisible(item.visible !== false);
                      setError("");
                    }}
                    disabled={loading}
                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
