import { Container, Button } from 'react-bootstrap';
import { PageHeading } from 'widgets'
import Link from 'next/link';
import AddCourse from 'sub-components/course-programs/AddCourse';
const index = () => {
  return (
    <Container fluid className="p-6">
      <div className='d-flex justify-content-between border-bottom pb-4 mb-4'>
        <PageHeading heading=" Add Program" />
        <Link href="/course-program/all-programs"><Button variant="primary">All Programs</Button></Link>
      </div>
      <AddCourse />
    </Container>
  )
}

export default index