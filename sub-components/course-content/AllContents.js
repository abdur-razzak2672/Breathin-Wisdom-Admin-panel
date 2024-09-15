import { Row, Col, Card, Table, Image } from "react-bootstrap";
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';
import ApiService from '../../utils/ApiServices';
import ApiUrl from '../../utils/ApiUrl';
import Loader from '../Spinner';
import { toast } from "react-toastify";
import Link from "next/link";

const AllContents = () => {
  const [allContent, setAllContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contentId, setContentId] = useState(null);


  const getAllContent = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getApiService(ApiUrl.GET_ALL_CONTENT);
      setAllContent(response);
    } catch (error) {
      console.error("Error fetching Courses:", error.message);
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this Content?");
    if (isConfirmed) {
      try {
        setContentId(id);
         const response = await ApiService.deleteApiService(`${ApiUrl.DELETE_CONTENT}/${id}`);
        if (response?.statusCode === 200) {
          toast.success("Content deleted successfully");
          getAllContent();
        } else {
          console.error("Failed to delete Content:", response.message);
          console.error("Failed to delete Content");
        }
      } catch (error) {
        console.error("Error deleting Content:", error.message);
        console.error("An error occurred while deleting the Content");
      } finally {
        setContentId(null);
      }
    } else {
      console.log("Content deletion canceled");
    }
  };

  useEffect(() => {
    getAllContent();
  }, []);

  return (
    <Row className="mt-6">
      <Col md={12} xs={12}>
        <Card>
          <Card.Header className="bg-white d-flex align-items-center justify-content-between py-4 ">
            <h4 className="mb-0">All Content</h4>
            <h4 className="mb-0">Total Content : {allContent?.totalData ? allContent?.totalData : 0} </h4>
          </Card.Header>
          {loading ? (
            <span className="p-5"> <Loader loading={loading} /></span>
          ) : (
            <>
              <Table responsive className="text-nowrap mb-5">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Content Name</th>                    
                    <th>Course Name</th>
                     <th>Duration</th>
                     <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allContent?.results?.length > 0 ? (
                    allContent?.results?.map((content, index) => {
                      return (
                        <tr key={index}>
                          <th className="align-middle" scope="row">{index + 1}</th>
                          <td className="align-middle">{content?.title}</td>
                          <td className="align-middle">{content?.course?.name}</td>
                           <td className="align-middle">{content?.duration}</td>
                           <td className="align-middle">{content?.description}</td>
                          <td className="align-middle">

                            <div className="d-flex">
                              <Link className="me-2" href={`/course-content/update-content/${content?._id}`}>
                                <PencilSquare
                                  className="text-success"
                                  style={{ cursor: 'pointer' }}
                                />
                              </Link>

                              {contentId === content?._id ? (
                                <Loader loading={true} width="15px" top="0px" borderWidth="3px" />) : (
                                <Trash
                                  className="text-danger mt-1"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => handleDelete(content?._id)}
                                />)}
                            </div>

                          </td>
                        </tr>
                      )
                    })) : (
                    <tr>
                      <td className="text-center" colSpan="10">No Content found.</td>
                    </tr>
                  )
                  }
                </tbody>
              </Table>
            </>

          )}
        </Card>
      </Col>
    </Row>
  );
};

export default AllContents;
