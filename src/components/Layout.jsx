import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background dark:bg-gray-900 transition-colors">
      <Navbar />

      <main className="flex-grow pt-24 pb-12 w-full max-w-[1920px] mx-auto overflow-hidden">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
