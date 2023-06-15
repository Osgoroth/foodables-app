"use client";

import { Providers } from "./Providers";
import NavBar from "@/components/NavBar";


// export const metadata = {
//   title: "Foodables",
//   description: "The next(js) recipe app.",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
