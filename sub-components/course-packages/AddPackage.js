import { Col, Row, Form, Card, Button } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';
import ApiService from '../../utils/ApiServices';
import ApiUrl from '../../utils/ApiUrl';
import { toast } from 'react-toastify';
import Loader from '../Spinner';
import dynamic from "next/dynamic";

const AddContent = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    subscribeType: "", // Changed from courseId to subscribeType
  });
  const [courseInputs, setCourseInputs] = useState([
    {
      courseID: "",
      courseName: "",
      price: "",
      discountPrice: ""
    },
  ]);

const getCourses = async () => {
    try {
      const response = await ApiService.getApiService(ApiUrl.GET_ALL_COURSES);
      setCourses(response.results);
    } catch (error) {
      toast.error('Failed to fetch courses');
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const handleFormInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleCourseInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedInputs = [...courseInputs];
    updatedInputs[index] = {
      ...updatedInputs[index],
      [name]: value,
    };
    setCourseInputs(updatedInputs);
  };

  const handleSelectChange = (index, e) => {
    const selectedCourseId = e.target.value;
    const selectedCourse = courses.find((course) => course._id === selectedCourseId);

    if (selectedCourse) {
      const updatedInputs = [...courseInputs];
      updatedInputs[index] = {
        courseID: selectedCourse._id,
        courseName: selectedCourse.title,
        price: selectedCourse.price,
        // discountPrice: selectedCourse.discountPrice || "",
      };
      setCourseInputs(updatedInputs);
    }
  };

  const handleAddCourse = () => {
    setCourseInputs((prevInputs) => [
      ...prevInputs,
      {
        courseID: "",
        courseName: "",
        price: "",
        discountPrice: "",
      },
    ]);
  };

  const handleRemoveCourse = (index) => {
    setCourseInputs((prevInputs) => prevInputs.filter((_, i) => i !== index));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const formDataInstance = new FormData();
    formDataInstance.append('packageName', formData.title);
    formDataInstance.append('subscribeType', formData.subscribeType);
    formDataInstance.append('description', formData.description || null );

    courseInputs.forEach((course, index) => {
      formDataInstance.append(`courses[${index}][courseID]`, course.courseID || '');
      formDataInstance.append(`courses[${index}][courseName]`, course.courseName || '');
      formDataInstance.append(`courses[${index}][price]`, parseFloat(course.price) || null);
      if (formData.subscribeType === 'promotion') {
        formDataInstance.append(`courses[${index}][promotionPrice]`, parseFloat(course.discountPrice) || null);
      } else if (formData.subscribeType === 'discount') {
        formDataInstance.append(`courses[${index}][discountPrice]`, parseFloat(course.discountPrice) || null);
      }
    });

    // Send the FormData instance
    await ApiService.postApiService(ApiUrl.CREATE_PACKAGE, formDataInstance, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
      },
    });

    toast.success('Bundle offer created successfully!');

    // Reset the form after successful submission
    setFormData({
      subscribeType: "", // Reset your select field
      title: "",
    });

    setCourseInputs([{
      courseID: "",
      courseName: "",
      price: "",
      discountPrice: "",
      // promotionPrice: "", // Added promotionPrice in reset
    }]);
  } catch (error) {
    console.error(error.message || 'Error creating Bundle offer.');
    toast.error('Error creating Bundle offer. Please try again.');
  } finally {
    setLoading(false);
  }
};




  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-8">
        <Col xl={6} lg={6} md={6} sm={12} xs={12}>
          <Card>
            <Card.Body>
              <div className="mb-3">
                <h5 className="mb-1">Fill out the form to create Subscription Package</h5>
              </div>

              <Row className="mb-3">
                <label htmlFor="title" className="col-sm-12 col-form-label form-label">Package Title</label>
                <div className="col-md-12 col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Content Title"
                    id="title"
                    value={formData.title}
                    onChange={handleFormInputChange}
                    required
                  />
                </div>
              </Row>

              <Row className="mb-3">
                <Form.Label className="col-md-4" htmlFor="subscribeType">Select Bundle Type</Form.Label>
                <Col md={12} xs={12}>
                  <select
                    className="form-control"
                    id="subscribeType"
                    value={formData.subscribeType}
                    onChange={handleFormInputChange}
                    required
                  >
                    <option value="">Select Bundle Type</option>
                    <option value="discount">Discount</option>
                    <option value="promotion">Promotion</option>
                  </select>
                </Col>
              </Row>

                  <Row className="mb-3">
                <Form.Label className="col-md-4" htmlFor="subscribeType">Bundle Tag</Form.Label>
                <Col md={12} xs={12}>
                 <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Bundle Tag"
                    id="description"
                    value={formData.description}
                    onChange={handleFormInputChange}
                  />
                </Col>
              </Row>

              <Row className="align-items-center">
                <Col md={12} xs={12} className="mt-4">
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <Loader loading={loading} /> : 'Save Package'}
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {courseInputs.map((course, index) => (
          <Col xl={6} lg={6} md={6} sm={12} xs={12} key={index}>
            <Card className="mb-3">
              <Card.Body>
                <div className="mb-3">
                  <h5 className="mb-1">Add Course</h5>
                </div>

                <Row className="mb-3">
                  <label htmlFor={`courseID-${index}`} className="col-sm-12 col-form-label form-label">Select Course</label>
                  <div className="col-md-12 col-12">
                    <select
                      className="form-control"
                      id={`courseID-${index}`}
                      value={course.courseID}
                      onChange={(e) => handleSelectChange(index, e)}
                      required
                    >
                      <option value="">Select Course</option>
                      {courses.map((course) => (
                        <option key={course._id} value={course._id}>
                          {course.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </Row>

                <Row className="mb-3">
                  <label htmlFor={`price-${index}`} className="col-sm-12 col-form-label form-label">Discount/Promotion Price</label>
                  <div className="col-md-12 col-12">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Price"
                      name="discountPrice" // Name matches the courseInputs field
                      value={course.discountPrice}
                      onChange={(e) => handleCourseInputChange(index, e)}
                      required
                    />
                  </div>
                </Row>

                <Row className="align-items-center">
                  <Col md={12} xs={12} className="mt-6">
                    <Button variant="danger" onClick={() => handleRemoveCourse(index)}>
                      Remove Course
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}

        <Col md={12} xs={12} className="mt-4">
          <Button variant="primary" onClick={handleAddCourse}>
            Add Another Course
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddContent;
