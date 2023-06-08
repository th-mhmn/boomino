import { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "@/components/common/Avatar";
import Pagination from "@/components/common/Pagination";
import Loader from "@/components/common/Loader";
import { motion } from "framer-motion";
import Input from "@/components/common/Input";

const Table = () => {
  const URL = "https://reqres.in/api";
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showUser, setShowUser] = useState(null);

  useEffect(() => {
    async function getData() {
      const res = await axios.get(`${URL}/users?page=${page}`);
      res && setData(res.data);
      res && setUsers(res.data.data);
    }
    getData();
  }, [page]);

  return (
    <>
      <AddNew setShowModal={setShowModal} />
      {showModal && <Modal setShowModal={setShowModal} />}
      {showUser && <UserDetails id={showUser} setShowUser={setShowUser} />}
      {data ? (
        <div
          className={
            "w-full flex flex-col gap-y-6 p-4 border border-gray-100 rounded-lg"
          }
        >
          <Header />
          <Body users={users} setShowUser={setShowUser} />
          <Footer
            page={data.page}
            setPage={setPage}
            total={data.total}
            totalPages={data.total_pages}
          />
        </div>
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </>
  );
};

const AddNew = ({ setShowModal }) => {
  return (
    <div className={"flex justify-center items-center"}>
      <div
        className={
          "p-2 text-white bg-blue-500 rounded-xl cursor-pointer transition ease-in hover:scale-105"
        }
        onClick={() => setShowModal(true)}
      >
        Add New +
      </div>
    </div>
  );
};

const Modal = ({ setShowModal }) => {
  const URL = "https://reqres.in/api";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const name = `${firstName} ${lastName}`;
  const [job, setJob] = useState("");

  const handleAdd = () => {
    const sendData = async () => {
      await axios.post(`${URL}/users`, { name, job });
    };
    sendData();
    setShowModal(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={
        "absolute flex justify-center items-center w-full h-full bg-gray-500 bg-opacity-75"
      }
      onClick={(event) =>
        event.target === event.currentTarget && setShowModal(false)
      }
    >
      <div
        className={
          "flex flex-col items-center justify-center gap-y-5 p-12 bg-white rounded-xl"
        }
      >
        <h3>Add New User</h3>
        <Input
          placeholder={"First Name"}
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <Input
          placeholder={"Last Name"}
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <Input
          placeholder={"Job (Title)"}
          value={job}
          onChange={(event) => setJob(event.target.value)}
        />
        <div
          className={
            "p-2 text-white bg-blue-500 rounded-xl cursor-pointer transition ease-in hover:scale-105"
          }
          onClick={handleAdd}
        >
          Add
        </div>
      </div>
    </motion.div>
  );
};

const UserDetails = ({ id, setShowUser }) => {
  const URL = "https://reqres.in/api";
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${URL}/users/${id}`);
      setData(res.data);
    };
    getData();
    data && console.log(data);
  }, [id]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={
        "absolute flex justify-center items-center w-full h-full bg-gray-500 bg-opacity-75"
      }
      onClick={(event) =>
        event.target === event.currentTarget && setShowUser(null)
      }
    >
      {data ? (
        <div className={"p-6 bg-white rounded-xl w-1/3 text-center"}>
          <div className={"grid grid-cols-3 items-center"}>
            <img
              src={data.data.avatar}
              alt={data.data.first_name}
              className={"rounded-full"}
            />
            <div
              className={"col-span-2 justify-self-start flex flex-col gap-y-4"}
            >
              <div>
                <h3>
                  <span className={"text-blue-500"}>First Name: </span>
                  <span className={"text-lg"}>{data.data.first_name}</span>
                </h3>
              </div>
              <div>
                <h3>
                  <span className={"text-blue-500"}>Last Name: </span>
                  <span className={"text-lg"}>{data.data.last_name}</span>
                </h3>
              </div>
              <div>
                <h3>
                  <span className={"text-blue-500"}>Email Address: </span>
                  <span className="text-lg">{data.data.email}</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </motion.div>
  );
};

// Sub-Components:
const Header = () => {
  return (
    <>
      <div className={"grid grid-cols-10 justify-items-center px-2"}>
        <h3 className={"justify-self-start"}>Image</h3>
        <h3 className={"col-span-3"}>Name</h3>
        <h3 className={"col-span-3"}>Email</h3>
        <h3>Title</h3>
        <h3>Amount</h3>
        <h3>Status</h3>
      </div>
    </>
  );
};

const Body = ({ users, setShowUser }) => {
  return (
    <div className={"text-gray-500"}>
      {users &&
        users.map((user) => (
          <User
            key={user.id}
            user={user}
            handleUserClick={() => {
              setShowUser(user.id);
            }}
          />
        ))}
    </div>
  );
};

const User = ({ user, handleUserClick }) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={
        "px-2 grid grid-cols-10 justify-items-center items-center py-3 border-b-2 border-gray-100 cursor-pointer hover:bg-gray-50 transition ease-in rounded-md"
      }
      onClick={handleUserClick}
    >
      <Avatar
        src={user.avatar}
        alt={user.first_name}
        className={"justify-self-start"}
      />
      <h3 className={"col-span-3"}>
        {user.first_name} {user.last_name}
      </h3>
      <h3 className={"col-span-3"}>{user.email}</h3>
      <h3>CEO</h3>
      <h3>$20</h3>
      <div>
        <div className={"text-white bg-green-500 rounded-xl p-2"}>Online</div>
      </div>
    </motion.div>
  );
};

const Footer = ({ page, setPage, total, totalPages }) => {
  return (
    <div className={"flex justify-between"}>
      <div>
        <h3 className={"text-gray-500"}>
          Showing {page * 6 - 5} to {page * 6} of {total} entries.
        </h3>
      </div>
      <div>
        <Pagination pagesCount={totalPages} page={page} setPage={setPage} />
      </div>
    </div>
  );
};
export default Table;
