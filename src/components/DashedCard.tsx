import React, { ReactNode } from "react";

interface DashedCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  active: boolean;
  onClick?: () => void;
  width?: number;
  iconSize?: number;
}

export const DashedCard = ({
  icon,
  title,
  description,
  active,
  width,
  iconSize,
  onClick,
}: DashedCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-[${
        width ?? "300"
      }px] box-border cursor-pointer hover:bg-blue-50 ${
        active && "hover:bg-primary"
      } border border-dashed border-primary px-6 py-3 rounded-md mt-6 flex flex-row items-center space-x-4 ${
        active ? "bg-primary" : ""
      }`}
    >
      <div className={`${iconSize ? `w-[${iconSize}px] h-[${iconSize}px]`: 'w-8 h-8'}`}>{icon}</div>
      <div>
        <h2
          className={`font-semibold text-start text-base mb-2 ${
            active && "text-white"
          }`}
        >
          {title}
        </h2>
        <p
          className={`text-sm text-start ${
            active ? "text-white" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      </div>
    </button>
  );
};
