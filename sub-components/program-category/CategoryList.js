import { Row, Col, Card, Table } from "react-bootstrap";
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';
import ApiService from '../../utils/ApiServices';
import ApiUrl from '../../utils/ApiUrl';
import Loader from '../Spinner';
import { toast } from "react-toastify";
import Link from "next/link";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingCategoryId, setDeletingCategoryId] = useState(null);
  const getCategoriesList = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getApiService(ApiUrl.GET_CATEGORY_LIST);
      setCategories(response);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this category?");
    if (isConfirmed) {
      try {
        setDeletingCategoryId(id);
        console.log("Deleting category with ID:", id);
        const response = await ApiService.deleteApiService(`${ApiUrl.DELETE_CATEGORY}/${id}`);
        if (response?.statusCode === 200) {
          toast.success("Category deleted successfully");
          getCategoriesList();
        } else {
          console.error("Failed to delete category:", response.message);
          console.error("Failed to delete category");
        }
      } catch (error) {
        console.error("Error deleting category:", error.message);
        console.error("An error occurred while deleting the category");
      } finally {
        setDeletingCategoryId(null);
      }
    } else {
      console.log("Category deletion canceled");
    }
  };
  useEffect(() => {
    getCategoriesList();
  }, []);

  return (
    <Row>
      <Col xs={12}>
        <Card className="category-card">
          <Card.Body>
            <div className="d-flex justify-content-between">
              <Card.Title as="h4">Category List</Card.Title>
              <Card.Title as="h4">Total Category : {categories?.totalData ? categories?.totalData : 0} </Card.Title>
            </div>

            {loading ? (
              <Loader loading={loading} />
            ) : (
              <div className="table-responsive">
                <Table className="table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Category Name</th>
                      <th scope="col">Image</th>
                      <th scope="col" className="description-column">Description</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.results?.length > 0 ? (
                      categories?.results.map((category, index) => (
                        <tr key={category?._id}>
                          <th scope="row">{index + 1}</th>
                          <td
                          >{category?.title}</td>
                          <td>
                            <img
                              src={category?.image}
                              alt=""
                              style={{ width: "50px", height: "50px", objectFit: "cover" }}
                            />
                          </td>
                          <td className="truncate-description">
                            {category?.description}
                          </td>
                          <td>
                            <div className="d-flex">
                              <Link className="me-2" href={`/program-category/update-category/${category?._id}`}>
                                <PencilSquare
                                  className="text-success"
                                  style={{ cursor: 'pointer' }}
                                />
                              </Link>

                              {deletingCategoryId === category?._id ? (
                                <Loader loading={true} width="15px" top="0px" borderWidth="3px" />) : (
                                <Trash
                                  className="text-danger mt-1"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => handleDelete(category?._id)}
                                />)}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="text-center" colSpan="5">No categories found.</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default CategoryList;
