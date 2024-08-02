const Login = () => {
  return (
    <>
      <div className="login-page w-screen h-screen bg-zinc-800 relative bg-login bg-center bg-cover">
        <div
          className="login-wrapper bg-slate-200/95 absolute inset-2/4 
                     -translate-x-2/4 -translate-y-2/4 w-1/4 h-96 
                     font-mono rounded-xl"
        >
          <div className="greeter mt-10 mb-8 text-3xl flex justify-center">
            <span>Login</span>
          </div>
          <div className="login-form flex flex-col flex-1 items-center">
            <input
              type="text"
              placeholder="Account"
              className="w-3/4 h-10 pl-4 mb-8 outline-none focus:outline-offset-2 focus:outline-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-3/4 h-10 pl-4 mb-8 outline-none focus:outline-offset-2 focus:outline-indigo-500"
            />
            <button className="login-btn btn-primary mb-8 w-3/4">Login</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
