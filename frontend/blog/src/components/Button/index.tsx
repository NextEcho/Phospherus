interface ButtonProps {
    title: string;
    handleClick: () => void;
}
const Button: React.FC<ButtonProps> = ({ title, handleClick }) => {
    return (
        <>
            <button className="block btn-primary" onClick={handleClick}>
                {title}
            </button>
        </>
    );
};

export default Button;
