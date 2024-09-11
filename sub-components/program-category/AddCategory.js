import { Col, Row, Form, Card, Button } from 'react-bootstrap';
import { useState, useRef } from 'react';
import ApiService from '../../utils/ApiServices';
import ApiUrl from '../../utils/ApiUrl';
import { toast } from 'react-toastify';
import Loader from '../Spinner';

const AddCategory = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });


  const fileInputRef = useRef(null);
  const handleInputChange = (e) => {
    const { id, value, files } = e.target;
    if (id === 'image') {
      setFormData({ ...formData, image: files[0] || null });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataInstance = new FormData();
    formDataInstance.append('title', formData.title);
    formDataInstance.append('description', formData.description);
    if (formData.image) {
      formDataInstance.append('image', formData.image);
    }
    try {
      await ApiService.postApiService(ApiUrl.CREATE_CATEGORY, formDataInstance);
      toast.success('Category created successfully!');
      setFormData({
        title: "",
        description: "",
        image: null
      })
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error(error.message || 'Error creating category.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row className="mb-8 d-flex justify-content-center">
      <Col xl={6} lg={6} md={8} xs={12}>
        <Card>
          <Card.Body>
            <div className="mb-6">
              <h5 className="mb-1">Fill out the form to create a category</h5>
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
                    ref={fileInputRef}
                    onChange={handleInputChange}
                    required
                  />
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
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <Loader loading={loading} /> : 'Save Changes'}
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

export default AddCategory;
