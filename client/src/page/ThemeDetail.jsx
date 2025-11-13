import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { apiService } from '../utils/apiConnector';
import { deslugifyThemeName, slugifyThemeName } from '../utils/slugify';

function ThemeDetail() {
  const { themeSlug } = useParams();
  const location = useLocation();

  const [theme, setTheme] = useState(location.state?.theme || null);
  const [themeLoading, setThemeLoading] = useState(!location.state?.theme);
  const [themeError, setThemeError] = useState(null);

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState(null);

  // Pick a banner image for this theme (supports multiple possible keys and fallbacks)
  const bannerUrl = useMemo(() => {
    if (!theme) return null;
    const urlCandidates = [
      theme.bannerUrl,
      theme.bannerURL,
      theme.banner_image,
      theme.banner,
      theme.headerImage,
      theme.imageUrl, // fallback to existing card image if banner not provided
      theme.image,
    ].filter(Boolean);

    if (urlCandidates.length === 0) return null;

    const first = String(urlCandidates[0]).trim();
    if (first.startsWith('http://') || first.startsWith('https://')) return first;
    if (first.startsWith('/')) return first;
    // treat as relative path within public
    return `/${first}`;
  }, [theme]);

  const bannerPlaceholder =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='400'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23272b30'/%3E%3Cstop offset='100%25' stop-color='%231b1f24'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1600' height='400' fill='url(%23g)'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='36' fill='%23ffffff' opacity='0.7'%3ETheme%20Banner%3C/text%3E%3C/svg%3E";

  const pageTitle = useMemo(() => {
    if (theme?.name) return theme.name;
    const fallbackTitle = deslugifyThemeName(themeSlug);
    return fallbackTitle ? fallbackTitle : 'Theme';
  }, [theme?.name, themeSlug]);

  useEffect(() => {
    if (theme) {
      setThemeLoading(false);
      setThemeError(null);
      return;
    }

    let isMounted = true;

    const loadTheme = async () => {
      try {
        setThemeLoading(true);
        const response = await apiService.getThemes();
        const themes = response.data || [];
        const matchedTheme = themes.find(
          (item) => slugifyThemeName(item.name) === themeSlug
        );

        if (!isMounted) return;

        if (matchedTheme) {
          setTheme(matchedTheme);
          setThemeError(null);
        } else {
          setThemeError('Theme not found');
        }
      } catch (error) {
        if (!isMounted) return;
        console.error('Error fetching themes list:', error);
        setThemeError('Failed to load theme details');
      } finally {
        if (isMounted) {
          setThemeLoading(false);
        }
      }
    };

    loadTheme();

    return () => {
      isMounted = false;
    };
  }, [theme, themeSlug]);

  useEffect(() => {
    if (!theme?._id) return;

    let cancelled = false;

    const loadProducts = async () => {
      try {
        setProductsLoading(true);
        const response = await apiService.getProductsByTheme(theme._id);
        if (cancelled) return;
        setProducts(response.data || []);
        setProductsError(null);
      } catch (error) {
        if (cancelled) return;
        console.error('Error fetching products for theme:', error);
        setProductsError('Failed to load products for this theme');
      } finally {
        if (!cancelled) {
          setProductsLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [theme?._id]);

  return (
    <div className="pb-10">
      {/* Banner */}
      <div className="w-full">
        <div className="relative h-52 sm:h-64 md:h-72 lg:h-80 xl:h-96">
          <img
            src={bannerUrl || bannerPlaceholder}
            alt={theme?.name || 'Theme banner'}
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => {
              if (e.currentTarget.src !== bannerPlaceholder) {
                e.currentTarget.src = bannerPlaceholder;
              }
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white capitalize text-center drop-shadow">
              {pageTitle}
            </h1>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 max-w-[1200px] mx-auto mt-8">

      {themeLoading && (
        <div className="text-center text-gray-500">Loading theme details...</div>
      )}

      {themeError && (
        <div className="text-center text-red-500">{themeError}</div>
      )}

      {!themeLoading && !themeError && (
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
            Products in this theme
          </h2>

          {productsLoading && (
            <div className="text-center text-gray-500">
              Loading products for this theme...
            </div>
          )}

          {productsError && (
            <div className="text-center text-red-500">{productsError}</div>
          )}

          {!productsLoading && !productsError && products.length === 0 && (
            <div className="text-center text-gray-500">
              No products available for this theme yet.
            </div>
          )}

          {!productsLoading && !productsError && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <article
                  key={product._id}
                  className="rounded-xl border border-gray-200 bg-white p-6 shadow hover:shadow-md transition-shadow"
                >
                  <div className="h-48 w-full overflow-hidden rounded-lg bg-gray-100 mb-4">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover object-center"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-400">
                        No image
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  {product.shortDescription && (
                    <p className="text-sm text-gray-600 mb-3">
                      {product.shortDescription}
                    </p>
                  )}
                  {product.defaultPrice && (
                    <p className="text-base font-medium text-gray-900">
                      {product.defaultPrice.weight} &bull; ₹{product.defaultPrice.price}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      )}
      </div>
    </div>
  );
}

export default ThemeDetail;

