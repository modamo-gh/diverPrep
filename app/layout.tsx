import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"]
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"]
});

export const metadata: Metadata = {
	title: "Diver Prep",
	description:
		"Compare Helldivers 2 weapons against enemy armor to optimize your loadout"
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.png" type="image/png" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased font-insignia`}
			>
				{children}
			</body>
		</html>
	);
}
