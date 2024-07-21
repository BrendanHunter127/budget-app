import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter();

  const linkClasses = (path: string) =>
    router.pathname === path
      ? 'text-white font-bold'
      : 'text-white';

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Budgeting App</h1>
          <nav className="mt-2 space-x-4">
            <Link href="/" className={linkClasses('/')}>
              Home
            </Link>
            <Link href="/about" className={linkClasses('/about')}>
              About
            </Link>
            <Link href="/contact" className={linkClasses('/contact')}>
              Contact
            </Link>
          </nav>
        </div>
        <div>
          <Link href="/login">
            <span className="bg-gray-800 text-red-500 px-4 py-2 rounded cursor-pointer">Login</span>
          </Link>
        </div>
      </header>
      <main className="p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;
