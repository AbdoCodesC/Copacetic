import React from "react";

export default function Layout({ children }) {
  return (
    <>
      <header>
        <h1 className="text-gradient">Copacetic</h1>
      </header>
      <main>{children}</main>
      <footer>
        <small>created by </small>
        <a href="https://github.com/AbdoCodesC/Copacetic" target="_blank">
          <i className="fa-brands fa-github"></i> @AbdoCodesC
        </a>
      </footer>
    </>
  );
}
