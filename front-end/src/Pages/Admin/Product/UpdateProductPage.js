import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; // Import useParams for route params
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductForm = () => {
    const { productId } = useParams(); // Retrieve productId from URL params

    const [formData, setFormData] = useState({
        title: '',
        body_html: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        published_at: new Date().toISOString(),
        vendor: '',
        product_type: '',
        handle: '',
        template_suffix: null,
        published_scope: 'global',
        tags: '',
        status: 'active',
        variants: [
            {
                title: 'Default Title',
                price: 19.99,
                inventory_quantity: 5,
                position: 1,
                grams: 0,
                inventory_policy: 'deny',
                fulfillment_service: 'manual',
                requires_shipping: true,
                taxable: true,
                weight_unit: 'kg',
                weight: 0,
                option1: 'Default Title',
                sku: '',
                compare_at_price: null,
                inventory_item_id: null,
                inventory_management: null,
                barcode: null,
                image_id: null,
                metafields: null,
                presentment_prices: null,
                id: null,
                admin_graphql_api_id: null,
            },
        ],
        options: [
            {
                name: 'Title',
                position: 1,
                values: ['Default Title'],
                id: null,
                admin_graphql_api_id: null,
            },
        ],
        images: [],
        metafields: null,
        variant_gids: null,
        id: null,
        admin_graphql_api_id: null,
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch product data if productId exists
    useEffect(() => {
        if (productId) {
            const fetchProduct = async () => {
                try {
                    const response = await axios.get(`http://localhost:5158/gateway/api/ProxyProduct/${productId}`);
                    if (response.status === 200) {
                        setFormData(response.data);
                    }
                } catch (error) {
                    setShowError(true);
                    setErrorMessage('Failed to fetch product data. Please try again.');
                }
            };
            fetchProduct();
        }
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const fieldNames = name.split('.');
        let updatedData = { ...formData };

        // If the field belongs to variants, we handle it differently
        if (fieldNames[0] === 'variants') {
            const variantIndex = parseInt(fieldNames[1], 10); // Get index of the variant
            const field = fieldNames[2]; // Get field name within the variant object

            updatedData.variants = [...updatedData.variants];
            updatedData.variants[variantIndex] = {
                ...updatedData.variants[variantIndex],
                [field]: value,
            };
        } else {
            updatedData[name] = value;
        }

        setFormData(updatedData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!formData.id) {
                throw new Error('Product ID is required for updating.');
            }

            const response = await axios.put(`http://localhost:5158/gateway/api/ProxyProduct/${formData.id}`, formData);
            if (response.status === 200) {
                setShowSuccess(true);
                setTimeout(() => {
                    window.location.href = '/products';
                }, 2000);
            }
        } catch (error) {
            setShowError(true);
            setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    // Add a new variant
    const addVariant = () => {
        setFormData({
            ...formData,
            variants: [
                ...formData.variants,
                {
                    title: 'New Variant',
                    price: 0,
                    inventory_quantity: 0,
                    position: formData.variants.length + 1,
                    grams: 0,
                    inventory_policy: 'deny',
                    fulfillment_service: 'manual',
                    requires_shipping: true,
                    taxable: true,
                    weight_unit: 'kg',
                    weight: 0,
                    option1: 'New Variant',
                    sku: '',
                    compare_at_price: null,
                    inventory_item_id: null,
                    inventory_management: null,
                    barcode: null,
                    image_id: null,
                    metafields: null,
                    presentment_prices: null,
                    id: null,
                    admin_graphql_api_id: null,
                },
            ],
        });
    };

    // Remove a variant by index
    const removeVariant = (index) => {
        const updatedVariants = formData.variants.filter((_, i) => i !== index);
        setFormData({ ...formData, variants: updatedVariants });
    };

    return (
        <div className="container mt-5" style={{ marginBottom: '11%' }}>
            <h2>Edit Product</h2>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="body_html"
                        value={formData.body_html}
                        onChange={handleChange}
                        rows={4}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Vendor</Form.Label>
                    <Form.Control
                        type="text"
                        name="vendor"
                        value={formData.vendor}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Published Scope</Form.Label>
                    <Form.Control
                        as="select"
                        name="published_scope"
                        value={formData.published_scope}
                        onChange={handleChange}
                        required
                    >
                        <option value="global">Global</option>
                        <option value="web">Web</option>
                        <option value="storefront">Storefront</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                        as="select"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                    </Form.Control>
                </Form.Group>

                {/* Variant Fields */}
                <h4>Variants</h4>
                {formData.variants.map((variant, index) => (
                    <div key={index}>
                        <Form.Group className="mb-3">
                            <Form.Label>Variant Title</Form.Label>
                            <Form.Control
                                type="text"
                                name={`variants.${index}.title`}
                                value={variant.title}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name={`variants.${index}.price`}
                                value={variant.price}
                                onChange={handleChange}
                                step="0.01"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Inventory Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name={`variants.${index}.inventory_quantity`}
                                value={variant.inventory_quantity}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>SKU</Form.Label>
                            <Form.Control
                                type="text"
                                name={`variants.${index}.sku`}
                                value={variant.sku}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {/* Add other variant fields similarly */}
                        {formData.variants.length > 1 && (
                            <Button variant="danger" onClick={() => removeVariant(index)}>Remove Variant</Button>
                        )}
                    </div>
                ))}
                <Button variant="primary" onClick={addVariant}>Add Variant</Button>

                <Button variant="success" type="submit" className="mt-3">
                    Save Changes
                </Button>
            </Form>

            {/* Success/Error Modals */}
            <Modal show={showSuccess} onHide={() => setShowSuccess(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Product saved successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowSuccess(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showError} onHide={() => setShowError(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{errorMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowError(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProductForm;