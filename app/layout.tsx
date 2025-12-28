import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Danny Yang - Full Stack Engineer & AI Engineer",
  description:
    "Interactive 3D portfolio showcasing AI/ML projects, full-stack development expertise, and innovative solutions.",
  keywords: [
    "AI",
    "Full Stack",
    "Developer",
    "Engineer",
    "AI Engineer",
    "Frontend",
    "Backend",
    "Software Engineer",
    "Portfolio",
    "React",
    "Next.js",
    "Three.js",
  ],
  authors: [{ name: "Danny Yang" }],
  openGraph: {
    title: "AI Portfolio - Full Stack Architect & AI Engineer",
    description:
      "Interactive 3D portfolio showcasing AI/ML projects and full-stack development expertise.",
    type: "website",
  },
  icons: {
    icon: "/logo.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
