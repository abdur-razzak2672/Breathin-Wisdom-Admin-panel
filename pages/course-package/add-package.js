import { Container, Button } from 'react-bootstrap';
import { PageHeading } from 'widgets'
import Link from 'next/link';
import AddPackage from "../../sub-components/course-packages/AddPackage";
const index = () => {
  return (
    <Container fluid className="p-6">
      <div className='d-flex justify-content-between border-bottom pb-4 mb-4'>
        <PageHeading heading="Add Bundle Package" />
        <Link href="/course-package/all-packages"><Button variant="primary">All Bundle Packages</Button></Link>
      </div>
      <AddPackage />
    </Container>
  )
}

export default index