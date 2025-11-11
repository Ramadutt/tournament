import React, { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-full w-full">
      <Header />
      <main className="flex-grow overflow-y-auto pb-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;