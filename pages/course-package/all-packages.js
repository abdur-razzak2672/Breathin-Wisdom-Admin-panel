import { Button, Container } from 'react-bootstrap';
import Link from 'next/link';
import { PageHeading } from 'widgets'
import AllPackages from "../../sub-components/course-packages/AllPackages";
const index = () => {
  return (
    <Container fluid className="p-6">
      <div className='d-flex justify-content-between border-bottom pb-4 mb-4'>
        <PageHeading heading="Package List" />
        <Link href="/course-package/add-package"><Button variant="primary">Add Package</Button></Link>
      </div>
      <AllPackages />
    </Container>
  )
}
export default index