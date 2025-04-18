import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
