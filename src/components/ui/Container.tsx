import { type ElementType, type ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

export function Container({ children, as: Tag = "div", className = "" }: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Tag>
  );
}
