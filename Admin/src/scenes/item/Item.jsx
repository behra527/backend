import React, { useEffect, useState } from 'react';
import api, { API_BASE_URL } from '../../api';
import axios from 'axios';
import { Modal, Button, Form, Card, Badge, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { formatCurrency } from '../../utils/currency';

function Item() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editCategory, setEditCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/products`),
        axios.get(`${API_BASE_URL}/categories`)
      ]);
      
      setItems(productsRes.data.products || []);
      setCategories(categoriesRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire('Error', 'Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Category add/edit
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const categoryData = {
      name: form.name.value,
      slug: form.name.value.toLowerCase().replace(/\s+/g, '-'),
      description: form.description?.value || '',
      image: form.image.value,
    };

    try {
    if (editCategory) {
        await api.put(`/categories/${editCategory._id}`, categoryData);
      Swal.fire('Updated!', 'Category updated.', 'success');
    } else {
        await api.post('/categories', categoryData);
      Swal.fire('Added!', 'Category added.', 'success');
    }
      fetchData();
    setEditCategory(null);
    setShowCategoryModal(false);
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Failed to save category', 'error');
    }
  };

  // Delete category
  const handleCategoryDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Delete this category?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
    });
    
    if (confirm.isConfirmed) {
      try {
        await api.delete(`/categories/${id}`);
        Swal.fire('Deleted!', 'Category deleted.', 'success');
        if (selectedCategory?._id === id) setSelectedCategory(null);
        fetchData();
      } catch (error) {
        Swal.fire('Error', 'Failed to delete category', 'error');
      }
    }
  };

  // Item add/edit
  const handleItemSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const productData = {
      title: form.name.value,
      slug: form.name.value.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
      price: parseFloat(form.price.value),
      compareAt: form.oldPrice?.value ? parseFloat(form.oldPrice.value) : undefined,
      description: form.description.value,
      stock: parseInt(form.stock?.value || 10),
      images: [
        form.mainImage.value,
        ...(form.gallery.value ? form.gallery.value.split(',').map(url => url.trim()).filter(Boolean) : [])
      ],
      categories: selectedCategory ? [selectedCategory._id] : [],
      featured: form.featured?.checked || false,
    };

    try {
    if (editItem) {
        await api.put(`/products/${editItem._id}`, productData);
        Swal.fire('Updated!', 'Product updated.', 'success');
    } else {
        await api.post('/products', productData);
        Swal.fire('Added!', 'Product added.', 'success');
    }
      fetchData();
    setEditItem(null);
    setShowItemModal(false);
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Failed to save product', 'error');
    }
  };

  // Delete item
  const handleItemDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Delete this product?',
      icon: 'warning',
      showCancelButton: true,
    });
    
    if (confirm.isConfirmed) {
      try {
        await api.delete(`/products/${id}`);
        Swal.fire('Deleted!', 'Product deleted.', 'success');
        fetchData();
      } catch (error) {
        Swal.fire('Error', 'Failed to delete product', 'error');
      }
    }
  };

  const filteredItems = selectedCategory
    ? items.filter(item => 
        item.categories?.some(cat => 
          (typeof cat === 'object' ? cat._id : cat) === selectedCategory._id
        )
      )
    : items;

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <Spinner animation="border" />
        <p className="mt-3">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Categories Section */}
      <div className="d-flex justify-content-between mb-3">
        <h3>🛍️ Manage Categories</h3>
        <Button onClick={() => setShowCategoryModal(true)}>+ Add Category</Button>
      </div>

      <div className="row">
        {categories.map(cat => (
          <div className="col-md-3 mb-3" key={cat._id}>
            <Card
              className={`h-100 shadow-sm ${selectedCategory?._id === cat._id ? 'border-primary border-3' : ''}`}
              onClick={() => setSelectedCategory(cat)}
              style={{ cursor: 'pointer' }}
            >
              <Card.Img variant="top" src={cat.image || 'https://via.placeholder.com/300'} style={{ height: 140, objectFit: 'cover' }} />
              <Card.Body className="d-flex justify-content-between align-items-center">
                <Card.Title className="m-0 fs-6">{cat.name}</Card.Title>
                <div>
                  <Button
                    size="sm"
                    variant="outline-warning"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditCategory(cat);
                      setShowCategoryModal(true);
                    }}
                  >✏️</Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    className="ms-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategoryDelete(cat._id);
                    }}
                  >🗑️</Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Items Section */}
          <div className="d-flex justify-content-between mt-4 mb-2">
        <h4>{selectedCategory ? `Products in "${selectedCategory.name}"` : 'All Products'}</h4>
        <Button onClick={() => setShowItemModal(true)}>+ Add Product</Button>
          </div>

          <div className="row">
        {filteredItems.length > 0 ? filteredItems.map((item) => (
          <div className="col-md-4 mb-4" key={item._id}>
                <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={item.images?.[0] || 'https://via.placeholder.com/300'} style={{ height: 180, objectFit: 'cover' }} />
                  <Card.Body>
                <h5>{item.title}</h5>
                <p className="small text-muted">{item.description?.slice(0, 100)}...</p>
                    <p>
                  {item.compareAt && <del className="text-danger me-2">{formatCurrency(item.compareAt)}</del>}
                  <span className="text-success fw-bold">{formatCurrency(item.price)}</span>
                    </p>
                <p className="small">Stock: {item.stock}</p>
                    <div className="d-flex flex-wrap gap-1 mb-2">
                  {item.images?.slice(0, 3).map((img, i) => (
                        <img key={i} src={img} alt="" style={{ width: 40, height: 40, objectFit: 'cover' }} />
                      ))}
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                      <Button size="sm" variant="warning" onClick={() => {
                    setEditItem(item);
                        setShowItemModal(true);
                      }}>Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => handleItemDelete(item._id)}>Delete</Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
        )) : <p className="text-muted ms-3">No products found.</p>}
          </div>

      {/* Category Modal */}
      <Modal show={showCategoryModal} onHide={() => { setShowCategoryModal(false); setEditCategory(null); }}>
        <Form onSubmit={handleCategorySubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{editCategory ? 'Edit' : 'Add'} Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" defaultValue={editCategory?.name || ''} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" defaultValue={editCategory?.description || ''} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control name="image" defaultValue={editCategory?.image || ''} required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { setShowCategoryModal(false); setEditCategory(null); }}>Cancel</Button>
            <Button type="submit" variant="primary">{editCategory ? 'Update' : 'Add'}</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Item Modal */}
      <Modal show={showItemModal} onHide={() => { setShowItemModal(false); setEditItem(null); }} size="lg">
        <Form onSubmit={handleItemSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{editItem ? 'Edit' : 'Add'} Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" defaultValue={editItem?.title || ''} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" step="0.01" name="price" defaultValue={editItem?.price || ''} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Compare At Price (Old Price)</Form.Label>
              <Form.Control type="number" step="0.01" name="oldPrice" defaultValue={editItem?.compareAt || ''} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" name="stock" defaultValue={editItem?.stock || 10} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Main Image URL</Form.Label>
              <Form.Control name="mainImage" defaultValue={editItem?.images?.[0] || ''} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Additional Image URLs (comma-separated)</Form.Label>
              <Form.Control name="gallery" defaultValue={editItem?.images?.slice(1).join(', ') || ''} placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" defaultValue={editItem?.description || ''} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" name="featured" label="Featured Product" defaultChecked={editItem?.featured || false} />
            </Form.Group>
            {!selectedCategory && (
              <div className="alert alert-warning">
                Please select a category first to assign this product.
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { setShowItemModal(false); setEditItem(null); }}>Cancel</Button>
            <Button type="submit" variant="primary">{editItem ? 'Update' : 'Add'}</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default Item;
