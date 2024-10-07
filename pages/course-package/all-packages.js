import { Button, Container } from 'react-bootstrap';
import Link from 'next/link';
import { PageHeading } from 'widgets'
import AllPackages from "../../sub-components/course-packages/AllPackages";
const index = () => {
  return (
    <Container fluid className="p-6">
      <div className='d-flex justify-content-between border-bottom pb-4 mb-4'>
        <PageHeading heading="Bundle Package List" />
        <div className={'d-flex'}>
            <Link href="/course-package/add-package"><Button variant="primary">Add Bundle Package</Button></Link>
            <Link href="/course-package/add-promotion-text"><Button variant="primary" className="ms-2">Add Promotion Description</Button></Link>
        </div>
      </div>
      <AllPackages />
    </Container>
  )
}
export default index