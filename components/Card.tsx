import React from "react";

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(3, 72, 96, 0.98)",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
        padding: "24px",
        width: "100%",
        margin: '7px 10px'
      }}
    >
      {children}
    </div>
  );
};

export default Card;