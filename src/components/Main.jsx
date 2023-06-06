import Navbar from "@/components/layout/Navbar";
import Table from "@/components/Table";

const Main = () => {
  return (
    <div
      className={
        "w-3/4 h-full flex flex-col justify-center items-center gap-y-4"
      }
    >
      <Navbar />
      <Table />
    </div>
  );
};

export default Main;
