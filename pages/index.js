 

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";
import AuthLayout from "layouts/AuthLayout";
import Loader from "sub-components/Spinner";
import ApiService from "utils/ApiServices";
import ApiUrl from "utils/ApiUrl";
import { toast } from "react-toastify";


const Home = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);


  const handleFormInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await ApiService.postApiService(ApiUrl.ADMIN_LOGIN, formData);
      const userData = response.data
      const userRole = userData?.user?.UserRole?.role

 
      if(userRole !=="user"){
        const userInfo = {
            id: userData?.user?.id,
            userName :userData?.user?.firstName +" "+ userData?.user?.lastName,
            accessToken: userData?.token
          }
          setFormData({
            email: "",
            password: "",
          });
        Cookies.set("userInfo", JSON.stringify(userInfo));  
        if (userInfo) {
          router.push("/")
        }
        toast.success('Admin Login successfully!');

      }else{
        toast.error('Only Admin can login this portal');
      }
    } catch (error) {
      console.error(error.message || 'Error creating content.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        <Card className="smooth-shadow-md">
          <Card.Body className="p-6">
            <div className="mb-4">
              <Link href="/">
                <h1>Admin Login</h1>
              </Link>
              <p className="mb-6">Please enter your Admin information.</p>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Username or email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter address here"
                  value={formData.email}
                  onChange={handleFormInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="**************"
                  value={formData.password}
                  onChange={handleFormInputChange}
                  required
                />
              </Form.Group>
              <div className="d-grid">
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? <Loader loading={loading} /> : "Sign In"}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

Home.Layout = AuthLayout;


export async function getServerSideProps({ req, res }) {
  const userInfo = req.cookies.userInfo;

  if (userInfo) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default Home;

