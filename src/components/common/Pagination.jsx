import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({ pagesCount, page, setPage }) => {
  const array = Array.from({ length: pagesCount }, (_, i) => 1 + i);
  return (
    <div className={"flex gap-x-4"}>
      <Button
        icon={"angle-left"}
        onClick={() => {
          page > 1 && setPage(page - 1);
        }}
      />
      {array.map((item) => (
        <Button
          key={item}
          text={item}
          isSelected={page === item}
          onClick={() => setPage(item)}
        />
      ))}
      <Button
        icon={"angle-right"}
        onClick={() => {
          page < pagesCount && setPage(page + 1);
        }}
      />
    </div>
  );
};

const Button = ({ text, icon, isSelected, onClick }) => {
  return (
    <div
      className={`w-10 h-10 flex justify-center items-center cursor-pointer rounded-lg transition ease-in ${
        isSelected ? "bg-red-500 text-white " : "bg-gray-100"
      }`}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon icon={getIcon(icon)} />}
      {text && <h3>{text}</h3>}
    </div>
  );
};

const getIcon = (name) => {
  switch (name) {
    case "angle-left":
      return faAngleLeft;
    case "angle-right":
      return faAngleRight;
  }
};

export default Pagination;
