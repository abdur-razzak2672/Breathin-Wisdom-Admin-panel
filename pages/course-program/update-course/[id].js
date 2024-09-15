import { Container, Button } from 'react-bootstrap';
import { PageHeading } from 'widgets'
import UpdateCourse from 'sub-components/course-programs/UpdateCourse';
import Link from 'next/link';
const index = () => {
    return (
        <Container fluid className="p-6">
            <div className='d-flex justify-content-between border-bottom pb-4 mb-4'>
                <PageHeading heading=" Update Course" />
                <Link href="/course-program/all-courses"><Button variant="primary">All Courses</Button></Link>
            </div>
            <UpdateCourse />
        </Container>
    )
}
export default index