'use client';

import {useEffect, useRef} from 'react';
import {gsap} from 'gsap';

interface TypewriterTextProps {
	text: string;
	className?: string;
	delay?: number;
	speed?: number;
	cursor?: boolean;
	onComplete?: () => void;
}

export default function TypewriterText({
																				 text,
																				 className = '',
																				 delay = 0.5,
																				 speed = 0.05,
																				 cursor = true,
																				 onComplete,
																			 }: TypewriterTextProps) {
	const textRef = useRef<HTMLSpanElement>(null);
	const cursorRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (!textRef.current) return;

		const element = textRef.current;
		const chars = text.split('');

		// Clear the element before animation
		element.textContent = '';

		// Create the timeline
		const tl = gsap.timeline({
			delay,
			onComplete: () => {
				if (onComplete) onComplete();
			},
		});

		// Type out each character
		chars.forEach((char, index) => {
			tl.add(() => {
				element.textContent = element.textContent + char;
			}, index * speed);
		});

		// Animate cursor blink after typing is complete
		if (cursor && cursorRef.current) {
			tl.to(
				cursorRef.current,
				{
					opacity: 0,
					duration: 0.5,
					repeat: -1,
					yoyo: true,
					ease: 'power2.inOut',
				},
				`>-0.1`
			);
		}

		return () => {
			tl.kill();
		};
	}, [text, delay, speed, cursor, onComplete]);

	return (
		<div className={`flex ${className}`}>
			<span ref={textRef}></span>
			{cursor && <span ref={cursorRef} className="ml-[2px] font-normal">|</span>}
		</div>
	);
}