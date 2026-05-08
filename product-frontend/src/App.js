import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  getProducts, addProduct, deleteProduct, 
  updateProduct, getByName, getByBrand, getByPriceRange 
} from './api';

function App() {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  
  const [formData, setFormData] = useState({
    code: '', name: '', brand: '', price: ''
  });

  // Load all products from MySQL on startup
  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  // Search by Name Logic
  const handleNameSearch = async () => {
    if(!searchQuery) return loadAll();
    const res = await getByName(searchQuery);
    setProducts(res.data);
  };

  // Search by Brand Logic
  const handleBrandSearch = async () => {
    if(!searchQuery) return loadAll();
    try {
      const res = await getByBrand(searchQuery); // Calls /api1/prod/brand/{brand}
      setProducts(res.data);
    } catch (error) {
      console.error("Brand search failed:", error);
    }
  };

  // Filter by Price Range Logic
  const handlePriceSearch = async () => {
    const res = await getByPriceRange(priceRange.min, priceRange.max);
    setProducts(res.data);
  };

  // CRUD: Handle Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateProduct(formData); // Calls @PutMapping("/update")
        setIsEditing(false);
      } else {
        await addProduct(formData); // Calls @PostMapping("/add")
      }
      setFormData({ code: '', name: '', brand: '', price: '' });
      loadAll();
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  const startEdit = (product) => {
    setFormData(product);
    setIsEditing(true);
  };

  const removeProduct = async (id) => {
    if(window.confirm("Delete this product?")) {
      await deleteProduct(id); // Calls @DeleteMapping("/delete/{id}")
      loadAll();
    }
  };

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Product Inventory System</h1>

      {/* SEARCH & FILTERS SECTION */}
      <div style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
        <h4>Search & Filtering</h4>
        <input 
          placeholder="Enter name or brand..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          style={{ padding: '5px', marginRight: '10px' }}
        />
        <button onClick={handleNameSearch}>Search Name</button>
        <button onClick={handleBrandSearch} style={{ marginLeft: '5px' }}>Search Brand</button>
        
        <div style={{ marginTop: '15px' }}>
          <span>Price Range: </span>
          <input type="number" placeholder="Min" value={priceRange.min} 
                 onChange={(e) => setPriceRange({...priceRange, min: e.target.value})} 
                 style={{ width: '80px', margin: '0 5px' }} />
          to
          <input type="number" placeholder="Max" value={priceRange.max} 
                 onChange={(e) => setPriceRange({...priceRange, max: e.target.value})} 
                 style={{ width: '80px', margin: '0 5px' }} />
          <button onClick={handlePriceSearch}>Filter Price</button>
          <button onClick={loadAll} style={{ marginLeft: '10px', backgroundColor: '#f0f0f0' }}>Reset All</button>
        </div>
      </div>

      {/* FORM SECTION */}
      <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h3>{isEditing ? "Modify Product Details" : "Register New Product"}</h3>
        <form onSubmit={handleSubmit}>
          <input type="number" placeholder="Code" value={formData.code} disabled={isEditing} 
                 onChange={(e) => setFormData({...formData, code: e.target.value})} required 
                 style={{ marginRight: '10px' }} />
          <input type="text" placeholder="Product Name" value={formData.name} 
                 onChange={(e) => setFormData({...formData, name: e.target.value})} required 
                 style={{ marginRight: '10px' }} />
          <input type="text" placeholder="Brand" value={formData.brand} 
                 onChange={(e) => setFormData({...formData, brand: e.target.value})} required 
                 style={{ marginRight: '10px' }} />
          <input type="number" placeholder="Price" value={formData.price} 
                 onChange={(e) => setFormData({...formData, price: e.target.value})} required 
                 style={{ marginRight: '10px' }} />
          
          <button type="submit" style={{ backgroundColor: isEditing ? '#ffa500' : '#4CAF50', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer' }}>
            {isEditing ? "Update Product" : "Save Product"}
          </button>
          
          {isEditing && (
            <button type="button" onClick={() => {setIsEditing(false); setFormData({code:'', name:'', brand:'', price:''})}} 
                    style={{ marginLeft: '10px' }}>Cancel</button>
          )}
        </form>
      </div>

      {/* INVENTORY TABLE */}
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#333', color: 'white' }}>
            <th style={{ padding: '10px' }}>Code</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? products.map(p => (
            <tr key={p.code}>
              <td style={{ padding: '10px' }}>{p.code}</td>
              <td>{p.name}</td>
              <td>{p.brand}</td>
              <td>₹{p.price}</td>
              <td>
                <button onClick={() => startEdit(p)} style={{ marginRight: '5px' }}>Edit</button>
                <button onClick={() => removeProduct(p.code)} style={{ color: 'red' }}>Delete</button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No products found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;