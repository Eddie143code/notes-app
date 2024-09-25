import React from "react";

const Layout = ({ children }: any) => {
  return (
    <>
      <header className="flex flex-col items-center justify-center">
        <h1>Login</h1>
        {/* <h2>Hello, [user]</h2> */}
      </header>
      <div className="flex flex-col items-center justify-center h-full w-full bg-[64748B]">{children}</div> 
    </>
  );
};

export default Layout;
