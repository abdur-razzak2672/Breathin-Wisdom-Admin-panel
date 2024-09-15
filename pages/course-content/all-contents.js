import { Button, Container } from 'react-bootstrap';
import Link from 'next/link';
import { PageHeading } from 'widgets'
import AllContents from 'sub-components/course-content/AllContents';
const index = () => {
  return (
    <Container fluid className="p-6">
      <div className='d-flex justify-content-between border-bottom pb-4 mb-4'>
        <PageHeading heading="Content List" />
        <Link href="/course-content/add-content"><Button variant="primary">Add Content</Button></Link>
      </div>
      <AllContents />
    </Container>
  )
}
export default index