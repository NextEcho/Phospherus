// OverviewCard 概要卡片
const Card = () => {
  return (
    <>
      <div className="card-item w-64 h-80 bg-[#27304D] rounded-lg font-mono text-slate-50 shadow-lg m-4">
        <div className="card-header w-full h-1/6 bg-[#1B1F3A] rounded-t-lg text-center">
          Card Header
        </div>
        <div className="card-body w-full h-5/6">Card Body</div>
      </div>
    </>
  );
};

export default Card;
