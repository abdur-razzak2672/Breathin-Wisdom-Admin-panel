import { Container, Button } from 'react-bootstrap';
import { PageHeading } from 'widgets'
import Link from 'next/link';
import AddContent from 'sub-components/course-content/AddContent';
const index = () => {
  return (
    <Container fluid className="p-6">
      <div className='d-flex justify-content-between border-bottom pb-4 mb-4'>
        <PageHeading heading=" Add Content" />
        <Link href="/course-content/all-content"><Button variant="primary">All Content</Button></Link>
      </div>
      <AddContent />
    </Container>
  )
}

export default index