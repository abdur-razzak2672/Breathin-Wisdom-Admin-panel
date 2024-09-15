import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Col, Row, Form, Card, Button } from 'react-bootstrap';
import ApiService from '../../utils/ApiServices';
import ApiUrl from '../../utils/ApiUrl';
import { toast } from 'react-toastify';
import Loader from '../Spinner';

const UpdateCourse = () => {
    const router = useRouter();
    const courseId = router.query.id;
    const [loading, setLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        trailorUrl: '',
        totalDuration: '',
        image: '',
        courseCategoryId: '',
    });
    const getCourseDetails = async () => {
        setLoading(true);
        try {
            const response = await ApiService.getApiService(`${ApiUrl.DETAIL_COURSE}/${courseId}`);
            const course = response.result;
            setFormData({
                title: course.title,
                description: course.description,
                price: course.price,
                trailorUrl: course.trailorUrl,
                totalDuration: course.totalDuration,
                image: course.image || '',
                courseCategoryId: course?.courseCategory?.id || '',
            });
            setImagePreview(course.image || '');
        } catch (error) {
            console.error('Failed to fetch course details.');
        } finally {
            setLoading(false);
        }
    };


    const getCategoriesList = async () => {
        try {
            setLoading(true);
            const response = await ApiService.getApiService(ApiUrl.GET_CATEGORY_LIST);
            setCategories(response.results);
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (courseId) {
            getCourseDetails();
            getCategoriesList();
        }
    }, [courseId]);


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


    const handleCategoryChange = (e) => {
        const selectedValue = e.target.value;
        setFormData({ ...formData, courseCategoryId: selectedValue });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        const formDataInstance = new FormData();
        formDataInstance.append('title', formData.title);
        formDataInstance.append('description', formData.description);
        formDataInstance.append('price', formData.price);
        formDataInstance.append('trailorUrl', formData.trailorUrl);
        formDataInstance.append('totalDuration', formData.totalDuration);
        formDataInstance.append('courseCategoryId', formData.courseCategoryId);

        if (typeof formData.image === 'string') {
            formDataInstance.append('image', formData.image);
        } else if (formData.image) {
            formDataInstance.append('image', formData.image);
        }

        try {
            await ApiService.putApiService(`${ApiUrl.UPDATE_COURSE}/${courseId}`, formDataInstance);
            toast.success('Course updated successfully!');
        } catch (error) {
            console.error(error.message || 'Error updating course.');
        } finally {
            setFormLoading(false);
        }
    };

    if (loading) {
        return <Loader loading={loading} />;
    }

    return (
        <Row className="mb-8 d-flex justify-content-center">
            <Col xl={7} lg={7} md={8} sm={12} xs={12}>
                <Card>
                    <Card.Body>
                        <div className="mb-3">
                            <h5 className="mb-1">Update Course</h5>
                        </div>
                        <Form onSubmit={handleSubmit}>

                            <Row className="mb-3">
                                <Form.Label className="col-md-4" htmlFor="category">Course Category</Form.Label>
                                <Col md={12} xs={12}>
                                    <select
                                        className="form-control"
                                        id="category"
                                        value={formData.courseCategoryId}
                                        onChange={handleCategoryChange}
                                        required
                                    >
                                        <option value="">Course Category</option>
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
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </Row>


                            <Row className="mb-3">
                                <label htmlFor="price" className="col-sm-12 col-form-label form-label">
                                    Course Price
                                </label>
                                <div className="col-md-12 col-12">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter Price"
                                        id="price"
                                        value={formData.price}
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
                                            alt="Course"
                                            style={{ width: '100px', marginTop: '10px' }}
                                        />
                                    )}
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
                                        value={formData.trailorUrl}
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
                                        value={formData.totalDuration}
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
                                        value={formData.description}
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

export default UpdateCourse;
