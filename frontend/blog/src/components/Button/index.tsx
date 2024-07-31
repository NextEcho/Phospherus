interface ButtonProps {
  title: string;
  to: string;
  handleClick: () => void;
}
const Button: React.FC<ButtonProps> = ({ title, to, handleClick }) => {
  return (
    <>
      <button
        className="block btn-primary"
        onClick={handleClick}
      >
        {title}
      </button>
    </>
  );
};

export default Button;
