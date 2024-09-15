import { Container, Button } from 'react-bootstrap';
import { PageHeading } from 'widgets'
import UpdateContent from 'sub-components/course-content/UpdateContent';
import Link from 'next/link';
const index = () => {
    return (
        <Container fluid className="p-6">
            <div className='d-flex justify-content-between border-bottom pb-4 mb-4'>
                <PageHeading heading=" Update Course" />
                <Link href="/course-content/all-content"><Button variant="primary">All Content</Button></Link>
            </div>
            <UpdateContent />
        </Container>
    )
}
export default index