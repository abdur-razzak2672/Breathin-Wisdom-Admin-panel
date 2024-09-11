import { Button, Container } from 'react-bootstrap';
import Link from 'next/link';
import { PageHeading } from 'widgets'
import CategoryList from 'sub-components/program-category/CategoryList';

const index = () => {
  return (
    <Container fluid className="p-6">
      <div className='d-flex justify-content-between border-bottom pb-4 mb-4'>
        <PageHeading heading=" Program Category List" />
        <Link href="/program-category/add-category"><Button variant="primary">Add Category</Button></Link>
      </div>
      <CategoryList />
    </Container>
  )
}
export default index