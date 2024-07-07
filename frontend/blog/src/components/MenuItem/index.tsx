const MenuItem: React.FC<{
    title: string;
    icon: string;
    onClick: () => void;
}> = ({ title, icon, onClick }) => {
    return (
        <div
            className="flex flex-col items-center justify-center p-2 rounded-md cursor-pointer hover:bg-gray-100"
            onClick={onClick}
        >
            <i className={`text-2xl ${icon}`} />
            <span className="text-sm">{title}</span>
        </div>
    );
};

export default MenuItem;
