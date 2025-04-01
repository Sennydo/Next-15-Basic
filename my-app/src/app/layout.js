import Link from "next/link";
import "./globals.css";
import localFont from 'next/font/local'

const myFont = localFont({src:'../fonts/Poppins-Bold.ttf'});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        <header>
          <nav>Nav 
              <Link className="nav-link" href="/">Home</Link>
              <Link className="nav-link" href="/dashboard">Dashboard</Link>
              <Link className="nav-link" href="/register">Register</Link>
          </nav>
        </header>
        <main>
          {children}
        </main>
        <footer>footer</footer>

      </body>
    </html>
  );
}
