//wrapper will be the frame of the calculator , allowing us to center the components
import "./Wrapper.css";

const Wrapper = ({ children }) => {
  return <div className="wrapper">{children}</div>;
};

export default Wrapper;
