import { Container, Button } from 'react-bootstrap';
import { PageHeading } from 'widgets'
import AddCategory from 'sub-components/program-category/AddCategory';
import Link from 'next/link';
const index = () => {
  return (
    <Container fluid className="p-6">
      <div className='d-flex justify-content-between border-bottom pb-4 mb-4'>
        <PageHeading heading=" Add Category" />
        <Link href="/program-category/category-list"><Button variant="primary">Category List</Button></Link>
      </div>
      <AddCategory />
    </Container>
  )
}

export default index