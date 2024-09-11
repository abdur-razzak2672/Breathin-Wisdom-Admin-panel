import { Spinner } from 'react-bootstrap';
const Loader = ({ loading, width ,borderWidth,top,left}) => {
  const customStyle = width 
    ? { width: width, height: width, borderWidth: borderWidth, marginTop:top , marginLeft:left} // Apply custom width if provided
    : {};
  return loading ? (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner 
        animation="border" 
        role="status" 
        style={customStyle}  
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  ) : null;
};

export default Loader;
