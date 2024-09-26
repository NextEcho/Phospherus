// OverviewCard 概要卡片

interface CardProps  {
    children: React.ReactNode;
}
const Card = ({children}: CardProps) => {
    return (
        <div className="border bg-slate-700 w-full rounded-md px-6 py-6 font-main">
            {children}
        </div>
    );
};

export default Card;
