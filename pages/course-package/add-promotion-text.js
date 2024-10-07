import { Container, Button } from 'react-bootstrap';
import { PageHeading } from 'widgets'
import Link from 'next/link';
import AddPromotionText from "../../sub-components/course-packages/AddPromotionText";
const index = () => {
  return (
    <Container fluid className="p-6">
      <div className='d-flex justify-content-between border-bottom pb-4 mb-4'>
        <PageHeading heading="Promotion Description" />
        <Link href="/course-package/all-packages"><Button variant="primary">All Bundle Packages</Button></Link>
      </div>
      <AddPromotionText />
    </Container>
  )
}

export default index