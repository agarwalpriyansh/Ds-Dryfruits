import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { slugifyThemeName } from '../utils/slugify';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { user, isAuthenticated } = useAuth();
  const subtotal = getCartTotal();
  const shipping = subtotal > 499 ? 0 : 50;
  const total = subtotal + shipping;

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 bg-gray-50">
        <div className="bg-white p-8 rounded-full shadow-sm mb-6">
          <ShoppingBag className="w-16 h-16 text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Log In</h2>
        <p className="text-gray-500 mb-8 text-center max-w-sm">
          You need to be logged in to view your cart.
        </p>
        <Link 
          to="/login"
          state={{ from: '/cart' }}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-amber-900 hover:bg-amber-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-900 transition-colors"
        >
          Log In Now
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 bg-gray-50">
        <div className="bg-white p-8 rounded-full shadow-sm mb-6">
          <ShoppingBag className="w-16 h-16 text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-center max-w-sm">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link 
          to="/themes/nuts-dry-fruits" 
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-amber-900 hover:bg-amber-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-900 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 font-serif">Shopping Cart</h1>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          {/* Cart Items */}
          <section className="lg:col-span-8">
            <ul className="bg-white rounded-lg shadow-sm divide-y divide-gray-200 overflow-hidden">
              {cartItems.map((item) => (
                <li key={`${item.id}-${JSON.stringify(item.option)}`} className="p-6 sm:flex">
                  <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>

                  <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          <Link to={`/products/${item.slug}`} className="hover:text-amber-900 transition-colors">
                            {item.name}
                          </Link>
                        </h3>
                        {item.option && (
                          <p className="mt-1 text-sm text-gray-500">
                            Pack: {item.option.weight}
                          </p>
                        )}
                        <p className="mt-1 text-sm font-medium text-amber-900">
                          ₹{item.price.toLocaleString()}
                        </p>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id, item.option)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.option, item.quantity - 1)}
                          className="p-2 text-gray-600 hover:text-amber-900 hover:bg-gray-50 transition-colors border-r border-gray-300"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-4 py-1 text-gray-900 font-medium text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.option, item.quantity + 1)}
                          className="p-2 text-gray-600 hover:text-amber-900 hover:bg-gray-50 transition-colors border-l border-gray-300"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-base font-medium text-gray-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order Summary */}
          <section className="mt-16 lg:mt-0 lg:col-span-4">
            <div className="bg-white rounded-lg shadow-sm p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="text-sm font-medium text-gray-900">₹{subtotal.toLocaleString()}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Shipping Estimate
                    {subtotal > 499 && <span className="ml-1 text-green-600 text-xs">(Free)</span>}
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </p>
                </div>
                
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <p className="text-base font-medium text-gray-900">Order Total</p>
                  <p className="text-base font-bold text-amber-900">₹{total.toLocaleString()}</p>
                </div>
              </div>

              <button
                type="button"
                className="w-full mt-8 bg-amber-900 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-amber-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-900 transition-colors flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <div className="mt-6 text-center text-xs text-gray-500">
                <p>Secure Checkout - SSL Encrypted</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
