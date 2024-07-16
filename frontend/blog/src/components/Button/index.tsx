interface ButtonProps {
    title: string;
    to: string;
    handleClick: () => void;
}
const Button: React.FC<ButtonProps> = ({ title, to, handleClick }) => {

    return (
        <>
            <div>
                <button className="bg-indigo-500 text-slate-300 rounded-md px-3 py-2 my-2"
                    onClick={handleClick}>
                    {title}
                </button>
            </div>
        </>
    )
};

export default Button;