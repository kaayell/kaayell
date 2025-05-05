'use client'

import {useState} from 'react';
import Navigation from './Navigation';

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className="bg-gray-500 shadow-sm sticky top-0 z-50">
			<div className="container-custom mx-auto py-4">
				<div className="flex items-center justify-between">
					kaayell

					{/* Desktop */}
					<div className="hidden md:block">
						<Navigation/>
					</div>

					{/* Mobile Button */}
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="p-2 md:hidden"
						aria-label="Toggle menu"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							{isMenuOpen ? (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							) : (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							)}
						</svg>
					</button>
				</div>

				{/* Mobile */}
				{isMenuOpen && (
					<div className="md:hidden mt-4 pb-2">
						<Navigation isMobile setIsMenuOpen={setIsMenuOpen}/>
					</div>
				)}
			</div>
		</header>
	);
}