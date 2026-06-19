import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-gray-600 mb-8">Page not found</p>
      <Link
        href="/"
        className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}