import React from "react";
import stil from "./Button.module.css";

function Button({type, onClick, children, className}) {
  return (
    <button
      className={`${stil.button} ${className}`}
      type={type || "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
