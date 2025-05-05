import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="min-h-[70vh] flex items-center justify-center">
			<div className="max-w-2xl text-center p-6">
				<h1 className="text-5xl font-bold mb-6">404</h1>
				<h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
				<p className="mb-8">
					The page you're looking for doesn't exist or has been moved.
				</p>
				<Link href="/" className="btn">
					Return to Home
				</Link>
			</div>
		</div>
	);
}