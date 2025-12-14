import { Routes, Route } from 'react-router-dom';
import HomePage from './page/Home';
import ThemeDetail from './page/ThemeDetail';
import ProductDetail from './page/ProductDetail';
import Navbar from './component/Navbar';
import Strip from './component/Strip';
import TrustStrip from './component/TrustStrip';
import { AboutUs } from './page/AboutUs';
import Contact from './page/Contact';
import BulkOrder from './page/BulkOrder';
import Privacy from './page/Privacy';
import Returns from './page/Returns';
import Terms from './page/Terms';
import Footer from './component/Footer';
import SEO from './component/SEO';
import ScrollToTop from './component/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      <SEO 
        title="Premium Quality Dry Fruits & Nuts"
        description="Shop premium quality dry fruits and nuts. Best prices on almonds, cashews, walnuts, and more. Bulk orders available."
      />
      <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <div><Strip/></div>
      <div><Navbar/></div>

      {/* Main Content Area */}
      <main className="flex-1   md:pt-[71px]">
        <Routes>
          {/* Route 1: The Home Page */}
          <Route path="/" element={<HomePage />} />

          <Route path="/themes/:themeSlug" element={<ThemeDetail />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bulk" element={<BulkOrder />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </main>
      <TrustStrip />
      <Footer />
      </div>
    </>
  );
}

export default App;