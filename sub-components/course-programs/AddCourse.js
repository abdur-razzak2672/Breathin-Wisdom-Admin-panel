import { Col, Row, Form, Card, Button } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import ApiService from '../../utils/ApiServices';
import ApiUrl from '../../utils/ApiUrl';
import { toast } from 'react-toastify';
import Loader from '../Spinner';

const AddCourse = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    trailorUrl: "",
    totalDuration: "",
    image: null,
    categoryId: "",
    discountPercent: 0,
    discountPrice: 0,
  });
  const fileInputRef = useRef(null);

  const getCategoriesList = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getApiService(ApiUrl.GET_CATEGORY_LIST);
      setCategories(response?.results);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateDiscountPrice = (price, discountPercent) => {
    if (!price || !discountPercent) return 0;
    return price - (price * discountPercent) / 100;
  };

  const handleInputChange = (e) => {
    const { id, value, files } = e.target;

    if (id === 'image') {
      setFormData({ ...formData, image: files[0] || null });
    } else {
      let updatedFormData = { ...formData, [id]: value };

      // Automatically calculate discountPrice based on price and discountPercent
      if (id === 'price' || id === 'discountPercent') {
        const price = id === 'price' ? parseFloat(value) || 0 : parseFloat(formData.price) || 0;
        const discountPercent = id === 'discountPercent' ? parseFloat(value) || 0 : parseFloat(formData.discountPercent) || 0;
        const discountPrice = calculateDiscountPrice(price, discountPercent);
        updatedFormData.discountPrice = discountPrice;
      }

      setFormData(updatedFormData);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    setFormData({ ...formData, categoryId: selectedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataInstance = new FormData();
    formDataInstance.append('title', formData.title);
    formDataInstance.append('description', formData.description);
    formDataInstance.append('price', formData.price);
    formDataInstance.append('trailorUrl', formData.trailorUrl);
    formDataInstance.append('totalDuration', formData.totalDuration);
    formDataInstance.append('categoryId', formData.categoryId);
    formDataInstance.append('discountPercent', formData.discountPercent);
    formDataInstance.append('discountPrice', formData.discountPrice);

    if (formData.image) {
      formDataInstance.append('image', formData.image);
    }

    try {
      await ApiService.postApiService(ApiUrl.CREATE_COURSE, formDataInstance);
      toast.success('Course created successfully!');
      setFormData({
        title: "",
        description: "",
        price: "",
        trailorUrl: "",
        totalDuration: "",
        image: null,
        categoryId: "",
        discountPercent: 0,
        discountPrice: 0,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error(error.message || 'Error creating course.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategoriesList();
  }, []);

  return (
    <Row className="mb-8 d-flex justify-content-center">
      <Col xl={7} lg={7} md={8} sm={12} xs={12}>
        <Card>
          <Card.Body>
            <div className="mb-3">
              <h5 className="mb-1">Fill out the form to create a Course</h5>
            </div>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Label className="col-md-4" htmlFor="category">Select Category</Form.Label>
                <Col md={12} xs={12}>
                  <select className="form-control" id="category" onChange={handleCategoryChange} required>
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>

              <Row className="mb-3">
                <label htmlFor="title" className="col-sm-12 col-form-label form-label">
                  Course Name
                </label>
                <div className="col-md-12 col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Course Name"
                    id="title"
                    value={formData?.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </Row>

              <Row className="mb-3">
                <Col md={8}>
                  <label htmlFor="price" className="col-sm-12 col-form-label form-label">
                    Course Price
                  </label>
                  <div className="col-md-12 col-12">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Price"
                      id="price"
                      value={formData?.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </Col>

                <Col md={4}>
                  <label htmlFor="discountPercent" className="col-sm-12 col-form-label form-label">
                    Discount Percent
                  </label>
                  <div className="col-md-12 col-12">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Percent Number"
                      id="discountPercent"
                      value={formData?.discountPercent}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </Col>
              </Row>

              <Row className="mb-3">
                <label htmlFor="discountPrice" className="col-sm-12 col-form-label form-label">
                  Discount Price
                </label>
                <div className="col-md-12 col-12">
                  <input
                    type="number"
                    className="form-control"
                    id="discountPrice"
                    value={formData?.discountPrice}
                    disabled
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
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label htmlFor="trailorUrl" className="col-sm-12 col-form-label form-label">
                  Trailor URL
                </label>
                <div className="col-md-12 col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Trailor URL"
                    id="trailorUrl"
                    value={formData?.trailorUrl}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </Row>


              <Row className="mb-3">
                <label htmlFor="totalDuration" className="col-sm-12 col-form-label form-label">
                  Total Duration
                </label>
                <div className="col-md-12 col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Total Duration"
                    id="totalDuration"
                    value={formData?.totalDuration}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </Row>


              <Row className="mb-3">
                <label htmlFor="description" className="col-sm-12 col-form-label form-label">
                  Course Description
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

export default AddCourse;
