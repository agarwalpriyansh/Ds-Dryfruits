import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  canonical, 
  ogImage,
  ogType = 'website'
}) => {
  const siteName = 'DS Dryfruits';
  const siteUrl = 'https://dsdryfruits.com';
  const defaultTitle = `${siteName} - Premium Quality Dry Fruits & Nuts`;
  const defaultDescription = 'Shop premium quality dry fruits and nuts. Best prices on almonds, cashews, walnuts, and more. Bulk orders available.';
  
  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || 'dry fruits, nuts, almonds, cashews, walnuts, premium dry fruits, bulk dry fruits';
  const canonicalUrl = canonical || siteUrl;
  const imageUrl = ogImage || `${siteUrl}/og-image.jpg`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default SEO;



