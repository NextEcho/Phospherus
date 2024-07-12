const Button: React.FC<{ title: string, to: string }> = ({ title, to }) => {

    return (
        <>
            <div>
                <button className="bg-indigo-500 text-slate-300 rounded-md px-3 py-2 my-2">
                    {title}
                </button>
            </div>
        </>
    )
};

export default Button;