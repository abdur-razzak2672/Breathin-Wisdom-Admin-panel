import { Container, Button } from 'react-bootstrap';
import { PageHeading } from 'widgets'
import Link from 'next/link';
import AddCourse from 'sub-components/course-programs/AddCourse';
const index = () => {
  return (
    <Container fluid className="p-6">
      <div className='d-flex justify-content-between border-bottom pb-4 mb-4'>
        <PageHeading heading=" Add Course" />
        <Link href="/course-program/all-courses"><Button variant="primary">All Courses</Button></Link>
      </div>
      <AddCourse />
    </Container>
  )
}

export default index