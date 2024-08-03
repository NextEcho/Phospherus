const Button = ({title}: {title: string}) => {
  return (
    <>
      <div className="btn-primary">
        {title}
      </div>
    </>
  );
};

export default Button;
