import LoadingSpinner from "./LoadingSpinner";

export default function PageLoading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-white text-sm">Loading...</p>
      </div>
    </div>
  );
}
