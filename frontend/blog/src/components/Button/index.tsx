interface ButtonProps {
  title: string;
  to: string;
  handleClick: () => void;
}
const Button: React.FC<ButtonProps> = ({ title, to, handleClick }) => {
  return (
    <>
      <button
        className="block bg-indigo-500 text-slate-300 rounded-md px-3 py-2 my-2 hover:opacity-90"
        onClick={handleClick}
      >
        {title}
      </button>
    </>
  );
};

export default Button;
