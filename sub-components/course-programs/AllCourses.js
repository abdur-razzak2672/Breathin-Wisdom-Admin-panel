import { Row, Col, Card, Table, Image } from "react-bootstrap";
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';
import ApiService from '../../utils/ApiServices';
import ApiUrl from '../../utils/ApiUrl';
import Loader from '../Spinner';
import { toast } from "react-toastify";
import Link from "next/link";

const AllCourses = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coursesId, setCoursesId] = useState(null);
  const getAllCourses = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getApiService(ApiUrl.GET_ALL_COURSES);
      setAllCourses(response);
    } catch (error) {
      console.error("Error fetching Courses:", error.message);
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this Course?");
    if (isConfirmed) {
      try {
        setCoursesId(id);
        console.log("Deleting course with ID:", id);
        const response = await ApiService.deleteApiService(`${ApiUrl.DELETE_COURSE}/${id}`);
        if (response?.statusCode === 200) {
          toast.success("Course deleted successfully");
          getAllCourses();
        } else {
          console.error("Failed to delete course:", response.message);
          console.error("Failed to delete course");
        }
      } catch (error) {
        console.error("Error deleting course:", error.message);
        console.error("An error occurred while deleting the course");
      } finally {
        setCoursesId(null);
      }
    } else {
      console.log("course deletion canceled");
    }
  };


  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <Row className="mt-6">
      <Col md={12} xs={12}>
        <Card>
          <Card.Header className="bg-white d-flex align-items-center justify-content-between py-4 ">
            <h4 className="mb-0">All Courses</h4>
            <h4 className="mb-0">Total Course : {allCourses?.totalData ? allCourses?.totalData : 0} </h4>
          </Card.Header>
          {loading ? (
            <span className="p-5"> <Loader loading={loading} /></span>
          ) : (
            <>
              <Table responsive className="text-nowrap mb-5">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Course Name</th>
                    <th>Category Name</th>
                    <th>Price</th>
                    {/* <th>Status</th> */}
                    <th>Course Information</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allCourses?.results?.length > 0 ? (
                    allCourses?.results?.map((course, index) => {
                      return (
                        <tr key={index}>
                          <th className="align-middle" scope="row">{index + 1}</th>
                          <td className="align-middle">
                            <div className="d-flex align-items-center">
                              <div>
                                <div className={`icon-shape icon-md border p-4 rounded  bg-white`}>
                                  <Image className="rounded" style={{ width: "50px", height: "50px", objectFit: "cover" }} src={course?.image} alt="" />
                                </div>
                              </div>
                              <div className="ms-3 lh-1">
                                <h5 className=" mb-1">
                                  <Link href="#" className="text-inherit">{course?.title}</Link></h5>
                              </div>
                            </div>
                          </td>
                          <td className="align-middle">{course?.courseCategory?.name}</td>

                          <td className="align-middle">
                            Price : {course?.price}<br />
                            Discount Percent : {course?.discountPercent ? course?.discountPercent + "%" : "NA"}<br />
                            Discount Price : {course?.discountPrice ? course?.discountPrice : "NA"}
                          </td>
                          {/* <td className="align-middle">
                            Payment Status : {course?.paymentStatus === "paid" ? <span className="text-success">Paid</span> : <span className="text-danger">Un-Paid</span>}<br />
                            Subscribed Status : {course?.isSubscribed ? <span className="text-success">Subscribed</span> : <span className="text-danger">Un-Subscribed</span>}

                          </td> */}
                          <td className="align-middle">
                           Number Of Lecture : {course?.courseContents?.length}<br/>
                           Number Of Lession : {course?.courseContents?.length}<br/>
                           Number Of Enrollement : {course?.courseContents?.length}<br/>
                           Total Duration : {course?.totalDuration}

                          </td>
                          <td className="align-middle">{course?.description}</td>
                          <td className="align-middle">

                            <div className="d-flex">
                              <Link className="me-2" href={`/course-program/update-course/${course?._id}`}>
                                <PencilSquare
                                  className="text-success"
                                  style={{ cursor: 'pointer' }}
                                />
                              </Link>

                              {coursesId === course?._id ? (
                                <Loader loading={true} width="15px" top="0px" borderWidth="3px" />) : (
                                <Trash
                                  className="text-danger mt-1"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => handleDelete(course?._id)}
                                />)}
                            </div>

                          </td>
                        </tr>
                      )
                    })) : (
                    <tr>
                      <td className="text-center" colSpan="10">No course found.</td>
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

export default AllCourses;
