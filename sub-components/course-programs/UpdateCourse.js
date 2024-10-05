import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Col, Row, Form, Card, Button } from 'react-bootstrap';
import ApiService from '../../utils/ApiServices';
import ApiUrl from '../../utils/ApiUrl';
import { toast } from 'react-toastify';
import Loader from '../Spinner';
import dynamic from 'next/dynamic';
const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
});

const UpdateCourse = () => {
    const router = useRouter();
    const courseId = router.query.id;
    const [loading, setLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [categories, setCategories] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        shortDescription: '',
        price: '',
        trailorUrl: '',
        totalDuration: '',
        image: '',
        courseCategoryId: '',
        prerequisiteCourseId:"",
        discountPercent: '',
        discountPrice: '',
        courseOverview: "",
        courseDetail: "",
    });

    const getCourseDetails = async () => {
        setLoading(true);
        try {
            const response = await ApiService.getApiService(`${ApiUrl.DETAIL_COURSE}/${courseId}`);
            const course = response.result;
            setFormData({
                title: course.title,
                shortDescription: course.shortDescription,
                price: course.price,
                trailorUrl: course.trailorUrl,
                totalDuration: course.totalDuration,
                image: course.image || '',
                courseCategoryId: course?.courseCategory?.id || '',
                prerequisiteCourseId:course?.prerequisiteCourse?.id || '',
                discountPercent: course.discountPercent || '',
                discountPrice: course.discountPrice || '',
                courseOverview: course.courseOverview || '',
                courseDetail: course.courseDetail || '',
            });
            setImagePreview(course.image || '');
        } catch (error) {
            console.error('Failed to fetch Program details.');
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



  const getProgramsList = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getApiService(ApiUrl.GET_ALL_COURSES);
      setPrograms(response?.results);
    } catch (error) {
      console.error("Error fetching programs:", error.message);
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
        if (courseId) {
            getCourseDetails();
            getCategoriesList();
            getProgramsList()
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
        } else if (id === 'discountPercent') {
            const discountPercent = value;
            const discountPrice = (formData.price * (1 - discountPercent / 100)).toFixed(2);
            setFormData({ ...formData, discountPercent, discountPrice });
        } else {
            setFormData({ ...formData, [id]: value });
        }
    };

    const handleCategoryChange = (e) => {
        const selectedValue = e.target.value;
        setFormData({ ...formData, courseCategoryId: selectedValue });
    };

    const handleProgramChange = (e) => {
        const selectedValue = e.target.value;
        setFormData({ ...formData, prerequisiteCourseId: selectedValue });
      };
    const handleEditorChange = (content, field) => {
        setFormData({ ...formData, [field]: content });
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        const formDataInstance = new FormData();
        formDataInstance.append('title', formData.title);
        formDataInstance.append('shortDescription', formData.shortDescription);
        formDataInstance.append('price', formData.price);
        formDataInstance.append('trailorUrl', formData.trailorUrl);
        formDataInstance.append('totalDuration', formData.totalDuration);
        formDataInstance.append('courseCategoryId', formData.courseCategoryId);
        formDataInstance.append('prerequisiteCourseId', formData.prerequisiteCourseId);
        formDataInstance.append('discountPercent', formData.discountPercent);
        formDataInstance.append('discountPrice', formData.discountPrice);
        formDataInstance.append('courseOverview', formData.courseOverview);
        formDataInstance.append('courseDetail', formData.courseDetail);

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
        <Form onSubmit={handleSubmit}>
            <Row className="mb-8 d-flex justify-content-center">
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                <Card>
                    <Card.Body>
                        <div className="mb-3">
                            <h5 className="mb-1">Update Program</h5>
                        </div>
                        
                            <Row className="mb-3">
                                <Form.Label className="col-md-4" htmlFor="category">Program Category</Form.Label>
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
                            <Form.Label className="col-md-4" htmlFor="ppog">Select Prerequisite Program</Form.Label>
                            <Col md={12} xs={12}>
                            <select className="form-control" id="ppog" 
                              value={formData.prerequisiteCourseId}

                            onChange={handleProgramChange}>
                                <option value="">Select Program</option>
                                {programs.map(pog => (
                                <option key={pog._id} value={pog._id}>
                                    {pog.title}
                                </option>
                                ))}
                            </select>
                            </Col>
                        </Row>

                            <Row className="mb-3">
                                <label htmlFor="title" className="col-sm-12 col-form-label form-label">Program Name</label>
                                <div className="col-md-12 col-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Program Name"
                                        id="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </Row>

                            <Row className="mb-3">
                                <Col md={8}>
                                    <label htmlFor="price" className="col-sm-12 col-form-label form-label">Program Price</label>
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
                                </Col>

                                <Col md={4}>
                                    <label htmlFor="discountPercent" className="col-sm-12 col-form-label form-label">Discount Percent</label>
                                    <div className="col-md-12 col-12">
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter Percent Number"
                                            id="discountPercent"
                                            value={formData.discountPercent}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <label htmlFor="discountPrice" className="col-sm-12 col-form-label form-label">Discount Price</label>
                                <div className="col-md-12 col-12">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="discountPrice"
                                        value={formData.discountPrice}
                                        disabled
                                    />
                                </div>
                            </Row>

                            <Row className="mb-3">
                                <label htmlFor="image" className="col-sm-12 col-form-label form-label">Upload Image</label>
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
                                <label htmlFor="trailorUrl" className="col-sm-12 col-form-label form-label">Trailor URL</label>
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
                                <label htmlFor="totalDuration" className="col-sm-12 col-form-label form-label">Total Duration</label>
                                <div className="col-md-12 col-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Duration"
                                        id="totalDuration"
                                        value={formData.totalDuration}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </Row>

                            <Row className="mb-3">
                                <label htmlFor="shortDescription" className="col-sm-12 col-form-label form-label">
                                    Short Description
                                </label>
                                <div className="col-md-12 col-12">
                                    <textarea
                                        className="form-control"
                                        placeholder="Enter Short Description"
                                        id="shortDescription"
                                        value={formData.shortDescription}
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
                    </Card.Body>
                </Card>
            </Col>

            <Col clas xl={6} lg={6} md={6} sm={12} xs={12}>
          <Card className='mb-3'>
            <Card.Body>
              <Row>
                <label htmlFor="courseOverview" className="col-sm-12 col-form-label form-label">Program Overview</label>
                <div className="col-md-12 col-12">
                  <JoditEditor
                    value={formData?.courseOverview}
                    onBlur={newContent => handleEditorChange(newContent, 'courseOverview')}
                  />
                </div>
              </Row>
            </Card.Body>
          </Card>

          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <Card >
                <Card.Body>
                  <Row className="mb-3">
                    <label htmlFor="courseDetail" className="col-sm-12 col-form-label form-label">Program Detail</label>
                    <div className="col-md-12 col-12">
                      <JoditEditor
                        value={formData?.courseDetail}
                        onBlur={newContent => handleEditorChange(newContent, 'courseDetail')}
                      />
                    </div>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
        </Col>
        </Row>
        </Form>
    );
};

export default UpdateCourse;
