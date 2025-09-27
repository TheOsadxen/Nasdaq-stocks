import React from "react";

export function Footer(): React.ReactElement {
  return (
    <footer className="align-bottom w-full pb-4 text-center text-gray-500 text-sm">
      Developed by{" "}
      <a
        href="https://osamakhalil.vercel.app/"
        className="no-underline font-footer"
        target="_blank"
        rel="noopener noreferrer"
      >
        {" "}
        أسامة خليل
      </a>
    </footer>
  );
}
