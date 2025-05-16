import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
import {
  MdEdit,
  MdOutlineDeleteForever,
  MdOutlineDeleteSweep,
  MdOutlineSettingsBackupRestore,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";
import { FaPen } from "react-icons/fa";

const ViewAuthor = () => {
  const [author, setAuthor] = useState([]);
  const [deletedAuthor, setdeletedAuthor] = useState([]);
  const [filepath, setFilepath] = useState("");
  const [checked, setChecked] = useState([]);
  const [ifAllChecked, setIfAllChecked] = useState(false);

  const fatchAuthor = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_APP_API_HOST
        }/api/admin-panel/author/read-author`
      )
      .then((response) => {
        console.log(response.data);
        setAuthor(response.data.data);
        setFilepath(response.data.filepath);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchDeletedAuthor = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_APP_API_HOST
        }/api/admin-panel/author/deleted-author`
      )
      .then((response) => {
        console.log(response.data);
        setdeletedAuthor(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fatchAuthor();
    fetchDeletedAuthor();
  }, []);

  const notify = (e) => {
    // console.log(e.target.value, e.target.textContent)

    const status = e.target.textContent !== "Enabled";
    axios
      .put(
        `${
          import.meta.env.VITE_APP_API_HOST
        }/api/admin-panel/author/update-author-status/${e.target.value}`,
        { status }
      )
      .then((response) => {
        console.log(response.data);
        // fatchAuthor()
        toast.success("Your Status Updated!", {
          autoClose: 700,
        });

        const index = author.findIndex((cat) => cat._id === e.target.value);
        const newdata = [...author];
        newdata[index].status = status;
        setAuthor(newdata);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteAuthor = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `${
              import.meta.env.VITE_APP_API_HOST
            }/api/admin-panel/author/delete-author/${id}`
          )
          .then((response) => {
            console.log(response.data);
            setAuthor((pre) => pre.filter((auth) => auth._id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            fetchDeletedAuthor();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  const restoreAuthor = (id) => {
    axios
      .put(
        `${
          import.meta.env.VITE_APP_API_HOST
        }/api/admin-panel/author/restore-author/${id}`
      )
      .then(() => {
        fatchAuthor();
        fetchDeletedAuthor();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleParmanentDaleteParentCategory = (id) => {
    axios
      .delete(
        `${
          import.meta.env.VITE_APP_API_HOST
        }/api/admin-panel/author/delete-author/${id}`
      )
      .then((response) => {
        console.log(response.data);
        setAuthor((pre) => pre.filter((auth) => auth._id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        fetchDeletedAuthor();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCheck = (e) => {
    if (e.target.checked) {
      setChecked([...checked, e.target.value]);
    } else {
      setChecked((pre) => pre.filter((item) => item !== e.target.value));
    }
  };

  const handleAllCheck = (e) => {
    setIfAllChecked(e.target.checked);
    if (e.target.checked) {
      setChecked(author.map((item) => item._id));
    } else {
      setChecked([]);
    }
  };

  useEffect(() => {
    setIfAllChecked(author.length === checked.length && author.length !== 0);
  }, [author, checked]);

  const handleMultiDelete = () => {
    if (checked.length === 0) return;
    axios
      .put(
        `${
          import.meta.env.VITE_APP_API_HOST
        }/api/admin-panel/author/multi-delete-author`,
        { ids: checked }
      )
      .then((response) => {
        console.log(response.data);
        setAuthor((pre) => pre.filter((auth) => !checked.includes(auth._id)));
        setChecked([]);
        setIfAllChecked(false);
        fetchDeletedAuthor();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="w-full mt-10 px-10    pb-8 h-[100vh]">
      <Tooltip id="my-tooltip" />
      <ToastContainer position="bottom-right" />
      <div className="flex w-full bg-[#F8F8F9] justify-between items-center ">
        <h4 className="   py-3 text-[25px] rounded-t-lg px-4">View Author</h4>
        <div className=" me-2">
          <Dialog>
            <DialogTrigger>
              <Button
                className="bg-transparent border-none hover:bg-inherit"
                variant="outline"
              >
                {" "}
                <MdOutlineDeleteForever className="text-[30px]  cursor-pointer" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle className="bg-red-100 text-[#EB5757] w-[130px] rounded-[0px_10px_10px_0px] absolute top-2 left-0 text-center py-1 dark:bg-gray-700 dark:text-red-400 border border-red-400">
                  Deleted Items
                </DialogTitle>
                <DialogDescription>
                  {deletedAuthor.length === 0 ? (
                    "No Data Found"
                  ) : (
                    <table class="min-w-full leading-normal mt-6">
                      <thead className="bg-[#0297B2] text-white">
                        <tr className="border-b-[1px]">
                          <th class="px-5 py-3 flex  text-left text-xs font-bold  uppercase tracking-wider">
                            Sno
                            <svg
                              class="w-4 h-4 ms-1"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m8 15 4 4 4-4m0-6-4-4-4 4"
                              />
                            </svg>
                          </th>
                          <th class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider">
                            Profile
                          </th>
                          <th class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider">
                            Author Name
                          </th>

                          <th class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider">
                            Author Email
                          </th>

                          <th class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider">
                            Author Desription
                          </th>

                          <th class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="my-2">
                        {deletedAuthor.map((item, index) => (
                          <tr className=" border-b-[1px] " key={index}>
                            <td class="px-5   bg-white  text-md ">
                              <p>{index + 1}</p>
                            </td>

                            <td class="px-5   bg-white  text-md ">
                              <Avatar>
                                <AvatarImage
                                  src={filepath + item.thumbnail}
                                  alt="@shadcn"
                                />
                                <AvatarFallback></AvatarFallback>
                              </Avatar>
                            </td>

                            <td class="px-5   bg-white  text-md ">
                              <p>{item.name}</p>
                            </td>

                            <td class="px-5    bg-white text-md ">
                              <span class="relative inline-block px-3 py-1  text-green-900 leading-tight">
                                <span>{item.email}</span>
                              </span>
                            </td>

                            <td class="px-5    bg-white text-md ">
                              <span class="relative inline-block px-3 py-1  text-green-900 leading-tight">
                                <span>{item.description}</span>
                              </span>
                            </td>
                            <td class="px-5 flex items-center   bg-white font-semibold ">
                              <span class="bg-[#FBDDDD] text-[#EB5757] p-1  font-medium me-2 px-1 cursor-pointer  rounded dark:bg-red-900 dark:text-red-300">
                                <MdOutlineDeleteSweep
                                  onClick={() => {
                                    handleParmanentDaleteParentCategory(
                                      item._id
                                    );
                                  }}
                                  className="text-[19px]"
                                />
                              </span>

                              <span
                                onClick={() => {
                                  restoreAuthor(item._id);
                                }}
                                class="bg-[#eae7d3] text-[#988349]  font-medium me-2 p-1 cursor-pointer   rounded dark:bg-yellow-900 dark:text-yellow-300"
                              >
                                {" "}
                                <MdOutlineSettingsBackupRestore className="text-[18px]" />{" "}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4"></div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className=" flex justify-between items-center">
        <input
          type="text"
          className="w-1/4 bg-transparent font-serif outline-none py-2 my-2 ps-4 border-[1px] "
          placeholder="Search Category..."
        />
        <Link to={"/dashboard/add-author"}>
          {" "}
          <div className="w-[40px] h-[40px] bg-[#0297B2] text-white cursor-pointer rounded-full me-4 flex justify-center items-center">
            <FaPen />
          </div>{" "}
        </Link>
      </div>
      <div className="w-full rounded-t-lg  border-[1px]">
        <div className="px-4  bg-white pt-3 pb-6 rounded-b-lg overflow-x-auto author  ">
          <table class="min-w-full leading-normal">
            <thead className="bg-[#0297B2] text-white">
              <tr className="border-b-[1px]">
                <th class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider">
                  <div className=" flex items-center gap-2 ">
                    <button
                      onClick={handleMultiDelete}
                      className="px-6 py-2 leading-none text-gray-200  rounded-full focus:outline-none focus:shadow-outline bg-gradient-to-b  bg-[#23acc4]"
                    >
                      DeleteMany
                    </button>
                    <input
                      type="checkbox"
                      name="deleteAll"
                      id="deleteAllCat"
                      onClick={handleAllCheck}
                      checked={ifAllChecked}
                      className="accent-[white]   bg-inherit shadow-2xl cursor-pointer "
                    />
                  </div>
                </th>

                <th class="px-5 py-3r">
                  <div className=" flex text-xs font-bold  uppercase tracking-wide  text-center items-center ">
                    Sno
                    <svg
                      class="w-4 h-4 ms-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m8 15 4 4 4-4m0-6-4-4-4 4"
                      />
                    </svg>
                  </div>
                </th>
                <th class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider">
                  Profile
                </th>
                <th class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider">
                  Author Name
                </th>

                <th class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider">
                  Author Email
                </th>

                <th class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider">
                  Author Desription
                </th>

                <th class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider">
                  Action
                </th>
                <th class="px-5 py-3  ">Mode</th>
              </tr>
            </thead>
            <tbody className="my-2 text-nowrap">
              {author.map((items, index) => (
                <tr className=" border-b-[1px] " key={index}>
                  <td class="px-5   bg-white  text-center ">
                    <input
                      type="checkbox"
                      name="delete"
                      id="delete1"
                      value={items._id}
                      onClick={handleCheck}
                      checked={checked.includes(items._id)}
                      className="accent-[#23acc4]   bg-inherit shadow-2xl cursor-pointer "
                    />
                  </td>

                  <td class="px-5   bg-white  text-md ">
                    <p>{index + 1}</p>
                  </td>

                  <td class="px-5   bg-white  text-md ">
                    <Avatar>
                      <AvatarImage
                        src={items.thumbnail}
                        alt="@shadcn"
                      />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                  </td>

                  <td class="px-5   bg-white  text-md ">
                    <p>{items.name}</p>
                  </td>

                  <td class="px-5    bg-white text-md ">
                    <span class="relative inline-block px-3 py-1  text-green-900 leading-tight">
                      <span>{items.email}</span>
                    </span>
                  </td>

                  <td class="px-5    bg-white text-md ">
                    <span class="relative inline-block px-3 py-1  text-green-900 leading-tight">
                      <marquee
                        behavior="scroll"
                        direction="up"
                        scrollamount="3"
                        class="text-slate-900 overflow-hidden h-[40px] p-4 transition-all duration-500 dark:text-slate-50 text-lg"
                      >
                        {items.description}
                      </marquee>
                    </span>
                  </td>
                  <td class="px-5   bg-white font-semibold ">
                    <div className="flex items-center ">
                      <span class="bg-[#FBDDDD] text-[#EB5757] p-1  font-medium me-2 px-1 cursor-pointer  rounded dark:bg-red-900 dark:text-red-300">
                        <MdOutlineDeleteSweep
                          onClick={() => {
                            handleDeleteAuthor(items._id);
                          }}
                          className="text-[19px]"
                        />
                      </span>

                      <span class="bg-[#D3EADD] text-[#499853]  font-medium me-2 p-1 cursor-pointer   rounded dark:bg-yellow-900 dark:text-yellow-300">
                        {" "}
                        <Link
                          to={`/dashboard/author/update-author/${items._id}`}
                        >
                          {" "}
                          <MdEdit className="text-[18px]" />
                        </Link>{" "}
                      </span>
                    </div>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={notify}
                      data-tooltip-id="my-tooltip"
                      value={items._id}
                      data-tooltip-content={
                        items.status ? "Click to Disabled" : "Click to Enabled"
                      }
                      className={`${
                        items.status
                          ? "bg-green-100 text-green-800 text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400"
                          : "bg-red-100 text-red-800 text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400"
                      }`}
                    >
                      {items.status ? "Enabled" : "Disabled"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewAuthor;
