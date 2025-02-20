// src/components/Layout.tsx
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-bg">
      <main className="container mx-auto px-4 max-w-2xl">
        {children}
      </main>
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}