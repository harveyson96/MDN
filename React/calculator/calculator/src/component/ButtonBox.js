import "./ButtonBox.css";
// Button box will be the frame for calcultor buttons
const ButtonBox = ({ children }) => {
  return <div className="buttonBox">{children}</div>;
};

export default ButtonBox;
