import { Col, Row, Form, Card, Button } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';
import ApiService from '../../utils/ApiServices';
import ApiUrl from '../../utils/ApiUrl';
import { toast } from 'react-toastify';
import Loader from '../Spinner';


const AddContent = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    courseId: "",
    title: "",
    description: "",
    courseLesson: []
  });
  const [lessonInputs, setLessonInputs] = useState([{
    title: "",
    streamUrl: "",
    doccFile: null,
    duration: "",
  }]);

  const fileInputRefs = useRef([]);

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


  const handleLessonInputChange = (index, e) => {
    const { id, value, files } = e.target;
    const field = id.split('-')[0];
    const updatedInputs = [...lessonInputs];
    updatedInputs[index] = {
      ...updatedInputs[index],
      [field]: field === 'doccFile' ? files[0] || null : value
    };
    setLessonInputs(updatedInputs);
  };


  const handleSelectChange = (e) => {
    setFormData((prevData) => ({ ...prevData, courseId: e.target.value }));
  };


  const handleAddLesson = () => {
    setLessonInputs((prevInputs) => [
      ...prevInputs,
      { title: "", streamUrl: "", doccFile: null, duration: "" }
    ]);
  };


  const handleRemoveLesson = (index) => {
    setLessonInputs((prevInputs) => prevInputs.filter((_, i) => i !== index));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataInstance = new FormData();
      formDataInstance.append('courseId', formData.courseId);
      formDataInstance.append('title', formData.title);
      formDataInstance.append('description', formData.description);
      lessonInputs.forEach((lesson, index) => {
        formDataInstance.append(`courseLesson[${index}][title]`, lesson.title || '');
        formDataInstance.append(`courseLesson[${index}][streamUrl]`, lesson.streamUrl || '');
        formDataInstance.append(`courseLesson[${index}][duration]`, lesson.duration || '');
        if (lesson.doccFile) {
          formDataInstance.append(`courseLesson[${index}][doccFile]`, lesson.doccFile);
        }
      });
      await ApiService.postApiService(ApiUrl.CREAT_CONTENT, formDataInstance);
      toast.success('Content created successfully!');
      setFormData({
        courseId: "",
        title: "",
        description: "",
        courseLesson: [],
      });
      setLessonInputs([{
        title: "",
        streamUrl: "",
        doccFile: null,
        duration: "",
      }]);
    } catch (error) {
      console.error(error.message || 'Error creating content.');
      toast.error('Error creating content. Please try again.');
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
                <h5 className="mb-1">Fill out the form to create Content</h5>
              </div>

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
                <label htmlFor="title" className="col-sm-12 col-form-label form-label">Content Title</label>
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
                <label htmlFor="description" className="col-sm-12 col-form-label form-label">Content Description</label>
                <div className="col-md-12 col-12">
                  <textarea
                    className="form-control"
                    placeholder="Enter Full Description"
                    id="description"
                    value={formData.description}
                    onChange={handleFormInputChange}
                    required
                  />
                </div>
              </Row>

              <Row className="align-items-center">
                <Col md={12} xs={12} className="mt-4">
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <Loader loading={loading} /> : 'Save Content'}
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {lessonInputs.map((lesson, index) => (
          <Col xl={6} lg={6} md={6} sm={12} xs={12} key={index}>
            <Card className='mb-3'>
              <Card.Body>
                <div className="mb-3">
                  <h5 className="mb-1">Add Course Lessons</h5>
                </div>

                <Row className="mb-3">
                  <label htmlFor={`title-${index}`} className="col-sm-12 col-form-label form-label">Lesson Title</label>
                  <div className="col-md-12 col-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Lesson Title"
                      id={`title-${index}`}
                      value={lesson.title}
                      onChange={(e) => handleLessonInputChange(index, e)}
                      required
                    />
                  </div>
                </Row>
                <Row className="mb-3">
                  <label htmlFor={`streamUrl-${index}`} className="col-sm-12 col-form-label form-label">Stream URL</label>
                  <div className="col-md-12 col-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Stream URL"
                      id={`streamUrl-${index}`}
                      value={lesson.streamUrl}
                      onChange={(e) => handleLessonInputChange(index, e)}
                      required
                    />
                  </div>
                </Row>

                <Row>
                  <Col md={6}>
                    <Row className="mb-3">
                      <label htmlFor={`duration-${index}`} className="col-sm-12 col-form-label form-label">Duration</label>
                      <div className="col-md-12 col-12">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Duration"
                          id={`duration-${index}`}
                          value={lesson.duration}
                          onChange={(e) => handleLessonInputChange(index, e)}
                          required
                        />
                      </div>
                    </Row>

                  </Col>

                  <Col md={6}>
                    <Row className="mb-3">
                      <label htmlFor={`doccFile-${index}`} className="col-sm-12 col-form-label form-label">Upload File</label>
                      <div className="col-md-12 col-12">
                        <input
                          type="file"
                          className="form-control"
                          id={`doccFile-${index}`}
                          onChange={(e) => handleLessonInputChange(index, e)}
                        />
                      </div>
                    </Row>
                  </Col>
                </Row>

                <Row className="align-items-center">
                  <Col md={12} xs={12} className="mt-6">
                    <Button variant="danger" onClick={() => handleRemoveLesson(index)}>
                      Remove Lesson
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}

        <Col md={12} xs={12} className="mt-4">
          <Button variant="primary" onClick={handleAddLesson}>
            Add Another Lesson
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddContent;
