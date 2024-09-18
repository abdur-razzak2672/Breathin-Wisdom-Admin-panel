import { Row, Col, Card, Table, Button } from "react-bootstrap";
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';
import ApiService from '../../utils/ApiServices';
import ApiUrl from '../../utils/ApiUrl';
import Loader from '../Spinner';
import { toast } from "react-toastify";
import Link from "next/link";

const AllPackages = () => {
  const [allPackage, setAllPackage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contentId, setContentId] = useState(null);

  // Fetch all packages
  const getAllPackage = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getApiService(ApiUrl.GET_ALL_PACKAGES);
      setAllPackage(response);
    } catch (error) {
      console.error("Error fetching Packages:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle package deletion
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this Content?");
    if (isConfirmed) {
      try {
        setContentId(id);
        const response = await ApiService.deleteApiService(`${ApiUrl.DELETE_CONTENT}/${id}`);
        if (response?.statusCode === 200) {
          toast.success("Content deleted successfully");
          getAllPackage();
        } else {
          console.error("Failed to delete Content:", response.message);
        }
      } catch (error) {
        console.error("Error deleting Content:", error.message);
      } finally {
        setContentId(null);
      }
    }
  };

  // Handle Active/Inactive toggle
  const handleToggleStatus = async (id, isActive) => {
    try {
       const response = await ApiService.patchApiService(ApiUrl.UPDATE_PACKAGE_STATUS(id), { isActive: !isActive }); // or 'inactive'
      if (response?.message) {
        toast.success(response?.message);
        getAllPackage(); // Refresh package list
      } else {
        toast.error("Failed to update package status");
      }
    } catch (error) {
      console.error("Error updating package status:", error.message);
      toast.error("Error updating package status");
    }
  };

  useEffect(() => {
    getAllPackage();
  }, []);

  return (
    <Row className="mt-6">
      <Col md={12} xs={12}>
        <Card>
          <Card.Header className="bg-white d-flex align-items-center justify-content-between py-4 ">
            <h4 className="mb-0">All Packages</h4>
            <h4 className="mb-0">Total Packages: {allPackage?.length || 0}</h4>
          </Card.Header>
          {loading ? (
            <span className="p-5">
              <Loader loading={loading} />
            </span>
          ) : (
            <>
              <Table responsive className="text-nowrap mb-5">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Package Name</th>
                    <th>Subscription Type</th>
                    <th>Courses</th>
                    <th>Total Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allPackage?.length > 0 ? (
                    allPackage?.map((pkg, index) => (
                      <tr key={index}>
                        <th className="align-middle" scope="row">{index + 1}</th>
                        <td className="align-middle">{pkg?.packageName}</td>
                        <td className="align-middle">{pkg?.subscribeType}</td>
                        <td className="align-middle">
                          {pkg?.CourseSubscribes?.length > 0 ? (
                            <ul>
                              {pkg?.CourseSubscribes?.map((course, i) => (
                                <li key={i}>
                                  {course?.courseName} - Price: ${course?.price}
                                  {course?.discountPrice && `, Discount Price: $${course?.discountPrice}`}
                                  {course?.promotionPrice && `, Promotion Price: $${course?.promotionPrice}`}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span>No courses available</span>
                          )}
                        </td>
                        <td className="align-middle">{pkg?.price}</td>
                        <td className="align-middle">
                          <Button
                            variant={pkg?.isActive ? "success" : "danger"}
                            onClick={() => handleToggleStatus(pkg?.id, pkg?.isActive)}
                          >
                            {pkg?.isActive ? 'Active' : 'Inactive'}
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="text-center" colSpan="7">No Packages found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default AllPackages;
