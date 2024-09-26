interface ButtonProps {
  title: string;
  handleClick: () => void;
}

const Button = ({ title, handleClick }: ButtonProps) => {
  return (
    <>
      <button className="btn-primary shadow-md" onClick={handleClick}>
        {title}
      </button>
    </>
  );
};

export default Button;
