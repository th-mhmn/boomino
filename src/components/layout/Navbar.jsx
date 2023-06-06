import Input from "@/components/common/Input";
import Avatar from "@/components/common/Avatar";

const Navbar = () => {
  return (
    <div
      className={
        "w-full flex justify-between items-center rounded-md shadow-lg border border-gray-100 p-4"
      }
    >
      <h3>User List</h3>
      <div className={"w-1/4"}>
        <Input placeholder={"Search..."} icon={"search"} />
      </div>
      {/* Fake avatar src for this component: */}
      <Avatar src={"https://reqres.in/img/faces/4-image.jpg"} />
    </div>
  );
};

export default Navbar;
