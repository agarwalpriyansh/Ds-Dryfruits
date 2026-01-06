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

  const [themeFiles, setThemeFiles] = useState({
    image: null,
    banner: null,
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

  const [productFile, setProductFile] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);

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

  const handleThemeFileChange = (e) => {
    const { name, files } = e.target;
    setThemeFiles((prev) => ({
      ...prev,
      [name]: files[0] || null,
    }));
  };

  const handleCreateTheme = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage('');
      
      const formData = new FormData();
      formData.append('name', themeForm.name);
      
      // Add image URL if no file is uploaded
      if (!themeFiles.image && themeForm.imageUrl) {
        formData.append('imageUrl', themeForm.imageUrl);
      }
      
      // Add banner URL if no file is uploaded
      if (!themeFiles.banner && themeForm.bannerUrl) {
        formData.append('bannerUrl', themeForm.bannerUrl);
      }
      
      // Add files if uploaded
      if (themeFiles.image) {
        formData.append('image', themeFiles.image);
      }
      if (themeFiles.banner) {
        formData.append('banner', themeFiles.banner);
      }

      await apiService.createTheme(formData);
      setThemeForm({ name: '', imageUrl: '', bannerUrl: '' });
      setThemeFiles({ image: null, banner: null });
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

  const selectedThemeObj = themes.find(t => t._id === productForm.theme);
  const isGiftBoxTheme = selectedThemeObj?.name?.toLowerCase().includes('gift') && selectedThemeObj?.name?.toLowerCase().includes('box');


  const handleProductFileChange = (e) => {
    setProductFile(e.target.files[0] || null);
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

  const handleEditProduct = (product) => {
    setEditingProductId(product._id);
    setProductForm({
      name: product.name || '',
      fullDescription: product.fullDescription || '',
      shortDescription: product.shortDescription || '',
      benefits: product.benefits || '',
      imageUrl: product.imageUrl || '',
      theme: product.theme?._id || product.theme || '',
      isFeatured: product.isFeatured || false,
      variants: product.variants && product.variants.length > 0
        ? product.variants.map((v) => ({ weight: v.weight || '', price: v.price || '' }))
        : [{ weight: '', price: '' }],
    });
    setProductFile(null);
    // Scroll to form
    document.querySelector('.rounded-lg.border.border-gray-200.bg-white.p-4')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
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
    setProductFile(null);
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage('');

      let finalVariants = productForm.variants;
      let finalShortDesc = productForm.shortDescription;
      let finalFullDesc = productForm.fullDescription;
      let finalBenefits = productForm.benefits;

      if (isGiftBoxTheme) {
        finalShortDesc = "Exclusive Gift Box";
        finalFullDesc = "A premium collection perfect for gifting.";
        finalBenefits = "Perfect for all occasions.";
        finalVariants = [{ weight: "Standard", price: 0 }];
      }

      const formattedVariants = finalVariants
        .filter((v) => v.weight && v.price !== '')
        .map((v) => ({
          weight: v.weight,
          price: Number(v.price),
        }));

      const formData = new FormData();
      formData.append('name', productForm.name);
      formData.append('fullDescription', finalFullDesc);
      formData.append('shortDescription', finalShortDesc);
      formData.append('benefits', finalBenefits);
      formData.append('theme', productForm.theme);
      formData.append('isFeatured', productForm.isFeatured);
      formData.append('variants', JSON.stringify(formattedVariants));
      
      // Add image URL if no file is uploaded
      if (!productFile && productForm.imageUrl) {
        formData.append('imageUrl', productForm.imageUrl);
      }
      
      // Add file if uploaded
      if (productFile) {
        formData.append('image', productFile);
      }

      if (editingProductId) {
        // Update existing product
        await apiService.updateProduct(editingProductId, formData);
        setMessage('Product updated successfully');
      } else {
        // Create new product
        await apiService.createProduct(formData);
        setMessage('Product created successfully');
      }

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
      setProductFile(null);
      setEditingProductId(null);

      await loadData();
    } catch (err) {
      console.error('Error saving product:', err);
      setMessage(
        err?.response?.data || 'Failed to save product. Check console for details.'
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
              <label className="mb-1 block text-sm font-medium">Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleThemeFileChange}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
              />
              <p className="mt-1 text-xs text-gray-500">Or provide URL below</p>
              <input
                type="text"
                name="imageUrl"
                value={themeForm.imageUrl}
                onChange={handleThemeChange}
                placeholder="Image URL (optional if file uploaded)"
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Banner (required)
              </label>
              <input
                type="file"
                name="banner"
                accept="image/*"
                onChange={handleThemeFileChange}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
              />
              <p className="mt-1 text-xs text-gray-500">Or provide URL below</p>
              <input
                type="text"
                name="bannerUrl"
                value={themeForm.bannerUrl}
                onChange={handleThemeChange}
                placeholder="Banner URL (required if file not uploaded)"
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
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
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {editingProductId ? 'Edit Product' : 'Create Product'}
            </h2>
            {editingProductId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="rounded bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
            )}
          </div>
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

            {!isGiftBoxTheme && (
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
                required={!isGiftBoxTheme}
              />
            </div>
          )}

          {!isGiftBoxTheme && (
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
                required={!isGiftBoxTheme}
              />
            </div>
          )}

          {!isGiftBoxTheme && (
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
                required={!isGiftBoxTheme}
              />
            </div>
          )}

            <div>
              <label className="mb-1 block text-sm font-medium">Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleProductFileChange}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
              />
              <p className="mt-1 text-xs text-gray-500">Or provide URL below</p>
              <input
                type="text"
                name="imageUrl"
                value={productForm.imageUrl}
                onChange={handleProductChange}
                placeholder="Image URL (optional if file uploaded)"
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              />
            </div>

            {!isGiftBoxTheme && (
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
          )}

            <div className="mt-2 flex gap-2">
              <button
                type="submit"
                className="rounded bg-[#5e0404] px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                disabled={loading}
              >
                {editingProductId ? 'Update Product' : 'Save Product'}
              </button>
              {editingProductId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="rounded bg-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-400"
                  disabled={loading}
                >
                  Cancel
                </button>
              )}
            </div>
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
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{p.name}</span>
                      <button
                        onClick={() => handleEditProduct(p)}
                        className="ml-2 rounded bg-blue-600 px-2 py-1 text-xs font-medium text-white hover:bg-blue-700"
                      >
                        Edit
                      </button>
                    </div>
                    <span className="text-xs text-gray-500">
                      Theme: {p.theme?.name || 'N/A'}
                    </span>
                  </div>
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


