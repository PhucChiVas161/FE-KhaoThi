const Image = ({ base64 }) => {
  return <img src={`data:image/jpeg;base64,${base64}`} alt="Hello" />;
};

export default Image;
