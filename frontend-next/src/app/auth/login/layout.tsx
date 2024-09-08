import React from "react";

const Layout = ({ children }: any) => {
  return (
    <>
      <header className="flex flex-col items-center justify-center">
        <h1>Login</h1>
        {/* <h2>Hello, [user]</h2> */}
      </header>
      {children}
    </>
  );
};

export default Layout;
