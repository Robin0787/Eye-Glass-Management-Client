import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <section className="w-full max-w-[2000px] mx-auto">{children}</section>
  );
};

export default Container;
