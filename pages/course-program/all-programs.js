import { Button, Container } from 'react-bootstrap';
import Link from 'next/link';
import { PageHeading } from 'widgets'
import AllCourses from 'sub-components/course-programs/AllCourses';

const index = () => {
  return (
    <Container fluid className="p-6">
      <div className='d-flex justify-content-between border-bottom pb-4 mb-4'>
        <PageHeading heading="Course List" />
        <Link href="/course-program/add-program"><Button variant="primary">Add Program</Button></Link>
      </div>
      <AllCourses />
    </Container>
  )
}
export default index