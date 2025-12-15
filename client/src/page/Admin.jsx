import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService, setAuthToken } from '../utils/apiConnector';

function Admin() {
  const navigate = useNavigate();
  const [themes, setThemes] = useState([]);
  const [products, setProducts] = useState([]);

  const [themeForm, setThemeForm] = useState({
    name: '',
    imageUrl: '',
    bannerUrl: '',
  });

  const [productForm, setProductForm] = useState({
    name: '',
    fullDescription: '',
    shortDescription: '',
    benefits: '',
    imageUrl: '',
    theme: '',
    isFeatured: false,
    variants: [{ weight: '', price: '' }],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      setMessage('');

      const [themesRes, productsRes] = await Promise.all([
        apiService.getThemes(),
        apiService.getAllProducts(),
      ]);

      setThemes(themesRes.data || []);
      setProducts(productsRes.data || []);
    } catch (err) {
      console.error('Error loading admin data:', err);
      setMessage('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
    loadData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userEmail');
    setAuthToken(null);
    navigate('/admin-login', { replace: true });
  };

  const handleThemeChange = (e) => {
    const { name, value } = e.target;
    setThemeForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateTheme = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage('');
      await apiService.createTheme(themeForm);
      setThemeForm({ name: '', imageUrl: '', bannerUrl: '' });
      await loadData();
      setMessage('Theme created successfully');
    } catch (err) {
      console.error('Error creating theme:', err);
      setMessage(
        err?.response?.data || 'Failed to create theme. Check console for details.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleVariantChange = (index, field, value) => {
    setProductForm((prev) => {
      const variants = [...prev.variants];
      variants[index] = { ...variants[index], [field]: value };
      return { ...prev, variants };
    });
  };

  const addVariant = () => {
    setProductForm((prev) => ({
      ...prev,
      variants: [...prev.variants, { weight: '', price: '' }],
    }));
  };

  const removeVariant = (index) => {
    setProductForm((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage('');

      const formattedVariants = productForm.variants
        .filter((v) => v.weight && v.price !== '')
        .map((v) => ({
          weight: v.weight,
          price: Number(v.price),
        }));

      await apiService.createProduct({
        ...productForm,
        variants: formattedVariants,
      });

      setProductForm({
        name: '',
        fullDescription: '',
        shortDescription: '',
        benefits: '',
        imageUrl: '',
        theme: '',
        isFeatured: false,
        variants: [{ weight: '', price: '' }],
      });

      await loadData();
      setMessage('Product created successfully');
    } catch (err) {
      console.error('Error creating product:', err);
      setMessage(
        err?.response?.data || 'Failed to create product. Check console for details.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-5 md:px-6 max-w-[1200px] mx-auto py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">
            Simple admin panel to manage themes and products.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="self-start rounded bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
        >
          Logout
        </button>
      </div>

      {message && (
        <div className="mb-4 rounded bg-blue-50 px-4 py-2 text-sm text-blue-800">
          {message}
        </div>
      )}

      {loading && (
        <div className="mb-4 text-sm text-gray-600">Processing request...</div>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Theme Form */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
          <h2 className="mb-4 text-lg font-semibold">Create Theme</h2>
          <form onSubmit={handleCreateTheme} className="space-y-3">
            <div>
              <label className="mb-1 block text-sm font-medium">Name *</label>
              <input
                type="text"
                name="name"
                value={themeForm.name}
                onChange={handleThemeChange}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Image URL</label>
              <input
                type="text"
                name="imageUrl"
                value={themeForm.imageUrl}
                onChange={handleThemeChange}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Banner URL (required)
              </label>
              <input
                type="text"
                name="bannerUrl"
                value={themeForm.bannerUrl}
                onChange={handleThemeChange}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-2 rounded bg-[#5e0404] px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
              disabled={loading}
            >
              Save Theme
            </button>
          </form>

          <div className="mt-6">
            <h3 className="mb-2 text-sm font-semibold text-gray-700">Existing Themes</h3>
            <ul className="space-y-1 text-sm text-gray-700 max-h-48 overflow-y-auto">
              {themes.map((t) => (
                <li key={t._id} className="flex items-center justify-between">
                  <span>{t.name}</span>
                </li>
              ))}
              {themes.length === 0 && <li>No themes yet.</li>}
            </ul>
          </div>
        </div>

        {/* Product Form */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
          <h2 className="mb-4 text-lg font-semibold">Create Product</h2>
          <form onSubmit={handleCreateProduct} className="space-y-3">
            <div>
              <label className="mb-1 block text-sm font-medium">Name *</label>
              <input
                type="text"
                name="name"
                value={productForm.name}
                onChange={handleProductChange}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Theme (assign to) *
              </label>
              <select
                name="theme"
                value={productForm.theme}
                onChange={handleProductChange}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                required
              >
                <option value="">Select theme</option>
                {themes.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={productForm.isFeatured}
                onChange={handleProductChange}
                className="h-4 w-4"
              />
              <label htmlFor="isFeatured" className="text-sm">
                Mark as featured
              </label>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Short Description *
              </label>
              <textarea
                name="shortDescription"
                value={productForm.shortDescription}
                onChange={handleProductChange}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                rows={2}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Full Description * (first line will be bold on product page)
              </label>
              <textarea
                name="fullDescription"
                value={productForm.fullDescription}
                onChange={handleProductChange}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Benefits * (you can use new lines for bullet-style formatting)
              </label>
              <textarea
                name="benefits"
                value={productForm.benefits}
                onChange={handleProductChange}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Image URL</label>
              <input
                type="text"
                name="imageUrl"
                value={productForm.imageUrl}
                onChange={handleProductChange}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="block text-sm font-medium">
                  Price Variants * (weight &amp; price)
                </label>
                <button
                  type="button"
                  onClick={addVariant}
                  className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 hover:bg-gray-200"
                >
                  Add Variant
                </button>
              </div>
              <div className="space-y-2">
                {productForm.variants.map((variant, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Weight (e.g. 250g)"
                      value={variant.weight}
                      onChange={(e) =>
                        handleVariantChange(index, 'weight', e.target.value)
                      }
                      className="w-1/2 rounded border border-gray-300 px-3 py-2 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={variant.price}
                      onChange={(e) =>
                        handleVariantChange(index, 'price', e.target.value)
                      }
                      className="w-1/2 rounded border border-gray-300 px-3 py-2 text-sm"
                    />
                    {productForm.variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="text-xs text-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 rounded bg-[#5e0404] px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
              disabled={loading}
            >
              Save Product
            </button>
          </form>
        </div>
      </div>

      {/* Products list */}
      <div className="mt-8 rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
        <h2 className="mb-4 text-lg font-semibold">Existing Products</h2>
        <div className="max-h-80 overflow-y-auto text-sm">
          {products.length === 0 && <div>No products yet.</div>}
          <ul className="space-y-2">
            {products.map((p) => (
              <li
                key={p._id}
                className="flex flex-col rounded border border-gray-100 bg-gray-50 px-3 py-2"
              >
                <div className="flex justify-between">
                  <span className="font-semibold">{p.name}</span>
                  <span className="text-xs text-gray-500">
                    Theme: {p.theme?.name || 'N/A'}
                  </span>
                </div>
                <div className="mt-1 text-xs text-gray-600">
                  Variants:{' '}
                  {Array.isArray(p.variants) && p.variants.length > 0
                    ? p.variants
                        .map((v) => `${v.weight} - ₹${v.price}`)
                        .join(', ')
                    : 'None'}
                </div>
                {p.isFeatured && (
                  <div className="mt-1 text-xs font-semibold text-green-700">
                    Featured
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Admin;


