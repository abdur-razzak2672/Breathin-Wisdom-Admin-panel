import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Col, Row, Form, Card, Button } from 'react-bootstrap';
import ApiService from '../../utils/ApiServices';
import ApiUrl from '../../utils/ApiUrl';
import { toast } from 'react-toastify';
import Loader from '../Spinner';

const UpdateCategory = () => {
    const router = useRouter();
    const categoryId = router.query.id;
    const [loading, setLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
    });

    const getCategoryDetails = async () => {
        setLoading(true);
        try {
            const response = await ApiService.getApiService(`${ApiUrl.GET_CATEGORY}/${categoryId}`);
            const category = response.result;
            setFormData({
                title: category.title,
                description: category.description,
                image: category.image || '',
            });
            setImagePreview(category.image || '');
        } catch (error) {
            console.error('Failed to fetch category details.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (categoryId) {
            getCategoryDetails();
        }
    }, [categoryId]);
    const handleInputChange = (e) => {
        const { id, value, files } = e.target;
        if (id === 'image') {
            const file = files[0] || null;
            setFormData({ ...formData, image: file });
            if (file) {
                setImagePreview(URL.createObjectURL(file));
            }
        } else {
            setFormData({ ...formData, [id]: value });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        const formDataInstance = new FormData();
        formDataInstance.append('title', formData.title);
        formDataInstance.append('description', formData.description);
        if (typeof formData.image === 'string') {
            formDataInstance.append('image', formData.image);
        } else if (formData.image) {
            formDataInstance.append('image', formData.image);
        }
        try {
            await ApiService.putApiService(`${ApiUrl.UPDATE_CATEGORY}/${categoryId}`, formDataInstance);
            toast.success('Category updated successfully!');
        } catch (error) {
            console.error(error.message || 'Error updating category.');
        } finally {
            setFormLoading(false);
        }
    };

    if (loading) {
        return <Loader loading={loading} />;
    }
    return (
        <Row className="mb-8 d-flex justify-content-center">
            <Col xl={6} lg={6} md={8} xs={12}>
                <Card>
                    <Card.Body>
                        <div className="mb-6">
                            <h5 className="mb-1">Update Category</h5>
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <label htmlFor="category" className="col-sm-12 col-form-label form-label">
                                    Category Name
                                </label>
                                <div className="col-md-12 col-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Category Name"
                                        id="title"
                                        value={formData?.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label htmlFor="image" className="col-sm-12 col-form-label form-label">
                                    Upload Image
                                </label>
                                <div className="col-md-12 col-12">
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="image"
                                        onChange={handleInputChange}
                                    />
                                    {imagePreview && (
                                        <img
                                            src={imagePreview}
                                            alt="Category"
                                            style={{ width: '100px', marginTop: '10px' }}
                                        />
                                    )}
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label htmlFor="description" className="col-sm-12 col-form-label form-label">
                                    Category Description
                                </label>
                                <div className="col-md-12 col-12">
                                    <textarea
                                        className="form-control"
                                        placeholder="Enter Full Description"
                                        id="description"
                                        value={formData?.description}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </Row>
                            <Row className="align-items-center">
                                <Col md={12} xs={12} className="mt-4">
                                    <Button variant="primary" type="submit" disabled={formLoading}>
                                        {formLoading ? <Loader loading={formLoading} /> : 'Save Changes'}
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default UpdateCategory;
