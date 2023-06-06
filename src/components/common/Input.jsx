import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faUser,
  faSearch,
  faInfo,
  faHome,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";

const Input = ({ placeholder, icon, value, onChange }) => {
  return (
    <div
      className={
        "flex items-center gap-x-2 bg-gray-100 rounded-3xl w-full px-8 py-1"
      }
    >
      <FontAwesomeIcon icon={getIcon(icon)} className={"text-gray-300"} />
      <input
        className={"form-input w-full p-1 bg-gray-100 focus:outline-none "}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const getIcon = (name) => {
  switch (name) {
    case "angle-down":
      return faAngleDown;
    case "angle-up":
      return faAngleUp;
    case "user":
      return faUser;
    case "search":
      return faSearch;
    case "info":
      return faInfo;
    case "home":
      return faHome;
    case "undo":
      return faUndo;
  }
};
export default Input;
