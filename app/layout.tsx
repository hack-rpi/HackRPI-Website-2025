import { Metadata } from "next";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css"; // Make sure to import your CSS

export const metadata: Metadata = {
  title: "HackRPI 2025",
  description:
    "HackRPI is RPI&apos;s annual intercollegiate hackathon hosted by students for students. Get swag and free food as you compete for exciting prizes! With a broad range of workshops and mentors on-site, there’s n’ ex’erience necessary to attend.",
};

const ThemeInitScript = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              const savedTheme = localStorage.getItem('hackrpi-theme');
              if (savedTheme && (savedTheme === 'Retro' || savedTheme === 'Modern')) {
                document.documentElement.setAttribute('data-theme', savedTheme.toLowerCase());
              }
            } catch (e) {}
          })();
        `,
      }}
    />
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ThemeInitScript />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
