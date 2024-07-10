const MenuItem: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="transition duration-300 border border-solid border-slate-800 rounded-xl pl-3 pr-3 hover:bg-indigo-500 cursor-pointer text-sm mr-3 pt-1 pb-1 min-w-20 text-center font-serif">
      {title}
    </div>
  )
};

export default MenuItem;
