"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UploadForm from "../components/UploadForm";
import MediaItemActions from "../components/MediaItemActions";

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

type ViewMode = "grid" | "list" | "compact";
type SortOption = "newest" | "oldest" | "title" | "type" | "category";

export default function AdminPage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [showArchived, setShowArchived] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [bulkAction, setBulkAction] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/check")
      .then((res) => {
        if (res.ok) {
          setAuthenticated(true);
          fetchMedia();
        } else {
          router.push("/admin/login");
        }
      })
      .catch(() => {
        router.push("/admin/login");
      });
  }, [router]);

  useEffect(() => {
    filterAndSortItems();
  }, [mediaItems, searchQuery, filterType, filterCategory, showArchived, sortBy]);

  const filterAndSortItems = () => {
    let filtered = [...mediaItems];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title?.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query) ||
          item.category?.toLowerCase().includes(query) ||
          item.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Type filter
    if (filterType !== "all") {
      filtered = filtered.filter((item) => item.type === filterType);
    }

    // Category filter
    if (filterCategory !== "all") {
      filtered = filtered.filter((item) => item.category === filterCategory);
    }

    // Archived filter
    if (!showArchived) {
      filtered = filtered.filter((item) => !item.archived);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "title":
          return (a.title || "").localeCompare(b.title || "");
        case "type":
          return a.type.localeCompare(b.type);
        case "category":
          return (a.category || "").localeCompare(b.category || "");
        default:
          return 0;
      }
    });

    setFilteredItems(filtered);
  };

  const fetchMedia = async () => {
    try {
      const response = await fetch("/api/media");
      if (response.ok) {
        const data = await response.json();
        setMediaItems(data);
      }
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    document.cookie = "admin-auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/admin/login");
  };

  const handleBulkAction = async () => {
    if (!bulkAction || selectedItems.size === 0) return;

    try {
      if (bulkAction === "delete") {
        if (!confirm(`Delete ${selectedItems.size} item(s)?`)) return;
        await Promise.all(
          Array.from(selectedItems).map((id) =>
            fetch(`/api/media?id=${id}`, { method: "DELETE" })
          )
        );
      } else if (bulkAction === "archive") {
        await Promise.all(
          Array.from(selectedItems).map((id) =>
            fetch("/api/media", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id, archived: true }),
            })
          )
        );
      } else if (bulkAction === "unarchive") {
        await Promise.all(
          Array.from(selectedItems).map((id) =>
            fetch("/api/media", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id, archived: false }),
            })
          )
        );
      }

      setSelectedItems(new Set());
      setBulkAction("");
      fetchMedia();
    } catch (error) {
      console.error("Bulk action failed:", error);
    }
  };

  const toggleSelectItem = (id: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === filteredItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(filteredItems.map((item) => item.id)));
    }
  };

  const categories = Array.from(
    new Set(mediaItems.map((item) => item.category).filter(Boolean))
  ).sort();

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white/10 border border-white/20 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-400">Complete Media Management</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors border border-gray-700 rounded-lg hover:border-gray-600"
              >
                View Site
              </a>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Items</p>
                <p className="text-2xl font-bold text-white">{mediaItems.length}</p>
              </div>
              <div className="p-3 bg-white/10 border border-white/20 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Videos</p>
                <p className="text-2xl font-bold text-white">
                  {mediaItems.filter((i) => i.type === "video" || i.type === "embed").length}
                </p>
              </div>
              <div className="p-3 bg-white/10 border border-white/20 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Photos</p>
                <p className="text-2xl font-bold text-white">
                  {mediaItems.filter((i) => i.type === "photo").length}
                </p>
              </div>
              <div className="p-3 bg-white/10 border border-white/20 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Archived</p>
                <p className="text-2xl font-bold text-white">
                  {mediaItems.filter((i) => i.archived).length}
                </p>
              </div>
              <div className="p-3 bg-white/10 border border-white/20 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8 shadow-2xl">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-white/10 border border-white/20 rounded-lg mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Upload New Media</h2>
          </div>
          <UploadForm onUploadSuccess={fetchMedia} />
        </div>

        {/* Controls Bar */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search media..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
                />
                <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
              >
                <option value="all">All Types</option>
                <option value="video">Videos</option>
                <option value="embed">Embeds</option>
                <option value="photo">Photos</option>
              </select>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
                <option value="type">Type</option>
                <option value="category">Category</option>
              </select>

              <label className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-750">
                <input
                  type="checkbox"
                  checked={showArchived}
                  onChange={(e) => setShowArchived(e.target.checked)}
                  className="w-4 h-4 text-white bg-gray-700 border-gray-600 rounded focus:ring-white"
                />
                <span className="text-sm text-gray-300">Show Archived</span>
              </label>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2 border border-gray-700 rounded-lg p-1 bg-gray-800">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-white text-black" : "text-gray-400 hover:text-white"}`}
                title="Grid View"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-white text-black" : "text-gray-400 hover:text-white"}`}
                title="List View"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("compact")}
                className={`p-2 rounded ${viewMode === "compact" ? "bg-white text-black" : "text-gray-400 hover:text-white"}`}
                title="Compact View"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedItems.size > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-800 flex items-center gap-4">
              <span className="text-sm text-gray-400">
                {selectedItems.size} item(s) selected
              </span>
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
              >
                <option value="">Bulk Actions</option>
                <option value="archive">Archive</option>
                <option value="unarchive">Unarchive</option>
                <option value="delete">Delete</option>
              </select>
              <button
                onClick={handleBulkAction}
                disabled={!bulkAction}
                className="px-4 py-2 bg-white text-black hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors font-medium"
              >
                Apply
              </button>
              <button
                onClick={() => setSelectedItems(new Set())}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Highlights Videos Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8 shadow-2xl">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-white/10 border border-white/20 rounded-lg mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Highlights Videos</h2>
              <p className="text-sm text-gray-400 mt-1">Manage videos for the /highlights page</p>
            </div>
          </div>

          {(() => {
            const videoItems = mediaItems.filter(item => (item.type === 'video' || item.type === 'embed') && !item.archived);
            const groupedByCategory = videoItems.reduce((acc, item) => {
              const category = item.category || 'Uncategorized';
              if (!acc[category]) acc[category] = [];
              acc[category].push(item);
              return acc;
            }, {} as Record<string, typeof mediaItems>);

            const categories = Object.keys(groupedByCategory).sort((a, b) => {
              if (a === 'Uncategorized') return 1;
              if (b === 'Uncategorized') return -1;
              return a.localeCompare(b);
            });

            if (categories.length === 0) {
              return (
                <div className="text-center py-8">
                  <p className="text-gray-400">No videos found. Upload videos and assign categories.</p>
                </div>
              );
            }

            return (
              <div className="space-y-6">
                {categories.map(category => (
                  <div key={category} className="border border-gray-700 rounded-lg p-4 bg-gray-800/50">
                    <h3 className="font-semibold text-lg text-white mb-3">
                      {category} <span className="text-sm font-normal text-gray-400">({groupedByCategory[category].length} {groupedByCategory[category].length === 1 ? 'video' : 'videos'})</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {groupedByCategory[category].map(item => (
                        <div key={item.id} className="border border-gray-700 rounded-lg p-3 bg-gray-900/50 hover:bg-gray-900 transition-colors">
                          <p className="font-medium text-white text-sm">{item.title || 'Untitled'}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {item.type === 'embed' ? 'Embed' : 'Video'} • {new Date(item.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        {/* Media Library */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div className="flex items-center">
              <div className="p-3 bg-white/10 border border-white/20 rounded-lg mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Media Library</h2>
                <p className="text-sm text-gray-400 mt-1">
                  {filteredItems.length} of {mediaItems.length} items
                </p>
              </div>
            </div>
            <button
              onClick={toggleSelectAll}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
            >
              {selectedItems.size === filteredItems.length ? "Deselect All" : "Select All"}
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <svg className="mx-auto h-16 w-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-4 text-gray-400 text-lg">No media items found</p>
              {searchQuery || filterType !== "all" || filterCategory !== "all" ? (
                <p className="mt-2 text-gray-500 text-sm">Try adjusting your filters</p>
              ) : (
                <p className="mt-2 text-gray-500 text-sm">Upload your first item above!</p>
              )}
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : viewMode === "list"
                  ? "space-y-4"
                  : "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
              }
            >
              {filteredItems.map((item, index) => (
                <MediaItemActions
                  key={item.id}
                  item={item}
                  onUpdate={fetchMedia}
                  totalItems={filteredItems.length}
                  currentIndex={index}
                  viewMode={viewMode}
                  isSelected={selectedItems.has(item.id)}
                  onToggleSelect={() => toggleSelectItem(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
