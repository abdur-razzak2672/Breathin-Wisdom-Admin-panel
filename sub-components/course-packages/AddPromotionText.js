import { Col, Row, Form, Card, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import ApiService from '../../utils/ApiServices';
import ApiUrl from '../../utils/ApiUrl';
import { toast } from 'react-toastify';
import Loader from '../Spinner';
import dynamic from 'next/dynamic';
const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
});

const AddPromotionText = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
  });

  useEffect(() => {
    // Fetch the existing promotion text when the component mounts
    const fetchPromotionText = async () => {
      setLoading(true);
      try {
        const response = await ApiService.getApiService(ApiUrl.GET_PROMOTION_TEXT);

        if (response.status === 'success' && response.results) {
          setFormData({ description: response.results.text });
        }
      } catch (error) {
        console.error('Error fetching promotion text:', error.message || error);
        toast.error('Failed to load promotion text.');
      } finally {
        setLoading(false);
      }
    };

    fetchPromotionText();
  }, []);

  const handleEditorChange = (content, field) => {
    setFormData({ ...formData, [field]: content });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataInstance = new FormData();
      formDataInstance.append('text', formData.description);

      const response = await ApiService.postApiService(ApiUrl.SAVE_PROMOTION_TEXT, formDataInstance);

      if (response.status === 'success') {
        toast.success('Promotion text saved successfully.');
      } else {
        toast.error(response.message || 'Error saving promotion text.');
      }
    } catch (error) {
      console.error('Error saving promotion text:', error.message || error);
      toast.error(error.message || 'Error saving promotion text.');
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
              <Row className="mb-3">
                <Col md={12} xs={12}>
                  <JoditEditor
                    value={formData?.description}
                    onBlur={(newContent) => handleEditorChange(newContent, 'description')}
                  />
                </Col>
              </Row>

              <Row className="align-items-center">
                <Col md={12} xs={12} className="mt-4">
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <Loader loading={loading} /> : 'Save Text'}
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Form>
  );
};

export default AddPromotionText;

