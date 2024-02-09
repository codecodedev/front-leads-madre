import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type FormProps = {
  children: ReactNode;
  className?: string;
  action?: string;
  onSubmit?: () => void;
};

const Form = ({
  children,
  className,
  action = "#",
  onSubmit = () => {},
}: FormProps) => {
  return (
    <form onSubmit={onSubmit} className={twMerge(className)} action={action}>
      {children}
    </form>
  );
};

export default Form;
