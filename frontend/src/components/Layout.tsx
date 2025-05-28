import React from 'react';

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<React.Fragment>
			<div className="fixed z-[-1] h-full w-full bg-gray-800" />
			{children}
		</React.Fragment>
	);
}
