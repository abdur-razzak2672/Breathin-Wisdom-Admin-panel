import { Col, Row, Form, Card, Button } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import ApiService from '../../utils/ApiServices';
import ApiUrl from '../../utils/ApiUrl';
import { toast } from 'react-toastify';
import Loader from '../Spinner';
import { useRouter } from 'next/router';

const UpdateContent = () => {
  const router = useRouter();
  const contentId = router.query.id;
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [formData, setFormData] = useState({
    courseId: "",
    title: "",
    description: "",
    doccFile: null,
    duration: "",
    streamUrl: "",
  });
  const fileInputRef = useRef(null);

  const getCourses = async () => {
    try {
      const response = await ApiService.getApiService(ApiUrl.GET_ALL_COURSES);
      setCourses(response.results);
    } catch (error) {
      console.error('Failed to fetch courses');
    }
  };


  const getContent = async () => {
    try {
      const response = await ApiService.getApiService(`${ApiUrl.DETAIL_CONTENT}/${contentId}`);
      const content = response.result
      setFormData({
        courseId: content.course.id || "",
        title: content.title || "",
        description: content.description || "",
        duration: content.duration || "",
        streamUrl: content.streamUrl || "",
        doccFile: content?.doccFile || null,
      });
      setPreviewUrl(content?.doccFile || '')
    } catch (error) {
      console.error('Failed to fetch lesson details.');
    }
  };

  useEffect(() => {
    if (contentId) {
      getCourses();
      getContent();
     }
  }, [contentId]);


  const handleInputChange = (e) => {
    const { id, value, files } = e.target;
    if (id === 'doccFile') {
      setFormData({ ...formData, doccFile: files[0] || null });
      if (files[0]) {
        setPreviewUrl(URL.createObjectURL(files[0]));
      }
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };


  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setFormData({ ...formData, courseId: selectedValue });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataInstance = new FormData();
    formDataInstance.append('courseId', formData.courseId);
    formDataInstance.append('title', formData.title);
    formDataInstance.append('description', formData.description);
    formDataInstance.append('duration', formData.duration);
    formDataInstance.append('streamUrl', formData.streamUrl);
    if (formData.doccFile) {
      formDataInstance.append('doccFile', formData.doccFile);
    }
    try {
      await ApiService.putApiService(`${ApiUrl.UPDATE_CONTENT}/${contentId}`, formDataInstance);
      toast.success('Content updated successfully!');
    } catch (error) {
      console.error(error.message || 'Error saving Content.');
      console.error('Error saving Content. Please try again.');
    } finally {
      setLoading(false);
    }
  };
 

  return (
    <Row className="mb-8 d-flex justify-content-center">
      <Col xl={7} lg={7} md={8} sm={12} xs={12}>
        <Card>
          <Card.Body>
            <div className="mb-3">
              <h5 className="mb-1">Update Content</h5>
            </div>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Label className="col-md-4" htmlFor="courseId">Select Course</Form.Label>
                <Col md={12} xs={12}>
                  <select
                    className="form-control"
                    id="courseId"
                    value={formData.courseId}
                    onChange={handleSelectChange}
                    required
                  >
                    <option value="">Select Course</option>
                    {courses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>
              <Row className="mb-3">
                <label htmlFor="title" className="col-sm-12 col-form-label form-label">
                  Content Name
                </label>
                <div className="col-md-12 col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Content Name"
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label htmlFor="doccFile" className="col-sm-12 col-form-label form-label">
                  Upload Document
                </label>
                <div className="col-md-12 col-12">
                  <input
                    type="file"
                    className="form-control"
                    id="doccFile"
                    ref={fileInputRef}
                    onChange={handleInputChange}
                    required={!contentId}
                  />
                  {previewUrl &&
                    <a target='_blank' href={previewUrl} download={previewUrl}>
                    {previewUrl}
                  </a>
                }

                </div>
              </Row>
              <Row className="mb-3">
                <label htmlFor="streamUrl" className="col-sm-12 col-form-label form-label">
                  Stream URL
                </label>
                <div className="col-md-12 col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Stream URL"
                    id="streamUrl"
                    value={formData.streamUrl}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label htmlFor="duration" className="col-sm-12 col-form-label form-label">
                  Duration
                </label>
                <div className="col-md-12 col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Duration"
                    id="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label htmlFor="description" className="col-sm-12 col-form-label form-label">
                  Content Description
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

export default UpdateContent;
