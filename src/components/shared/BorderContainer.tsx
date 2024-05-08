import { ReactNode } from "react";

const BorderContainer = ({
  children,
  padding = "p-3",
  color = "bg-secondary",
}: {
  children: ReactNode;
  padding: string;
  color?: string;
}) => {
  return (
    <section className={`w-full h-full ${color} ${padding} rounded-xl`}>
      <section className="w-full h-full bg-primaryBg rounded-lg overflow-x-hidden overflow-y-scroll">
        {children}
      </section>
    </section>
  );
};

export default BorderContainer;
