"use client";
import React, { useEffect, useState } from "react";
import {
  MdOutlineLogout,
} from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logoutUser } from "@/features/user/userSlice";
import toast from "react-hot-toast";


interface SidebarItem {
  id: number;
  name: string;
  Icon: React.ElementType;
  link: string;
}

interface Props {
  setLogout: (value: boolean) => void;
  items: SidebarItem[];
}

const BottomTabs = ({ setLogout,items }: Props) => {
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  const [activeTab, setActiveTab] = useState(1);
  const router = useRouter();
  const location = usePathname();

  //useeffect to restore the active tabs
  useEffect(() => {
    if (location === "/profile") {
      setActiveTab(1);
    } else if (location === "/profile/edit-profile") {
      setActiveTab(3);
    } else if (location === "/profile/enrolled-courses") {
      setActiveTab(2);
    } else if (location === "/profile/subscriptions") {
      setActiveTab(4);
    }
  }, [location]);

  return (
    <div className="w-full bg-gray-800 text-gray-300 border-t border-t-purple-800 roundet-xl border-gray-600 flex justify-around items-center sm:hidden py-3 z-50">
      {items.map(({ id, name, Icon, link }) => (
        <div
          key={id}
          onClick={() => {
            setActiveTab(id);
            router.push(link);
          }}
          className={`flex flex-col items-center p-1 justify-center cursor-pointer transition duration-300 ${
            activeTab === id
              ? "bg-purple-500/30"
              : isDarkMode
              ? "text-green-500"
              : "text-blue-500"
          }`}
        >
          <Icon size={id === 1 ? 26 : 22} />
          <span className="text-xs hidden xs:block">{name}</span>
        </div>
      ))}

      {/* for bottom tabs upgrade plan will be handled inside the subscriptions page */}

      {/* Logout */}
      <div
        onClick={() => setLogout(true)}
        className="flex flex-col items-center justify-center cursor-pointer transition duration-300 text-red-400"
      >
        <MdOutlineLogout size={22} />
        <span className="text-xs hidden xs:block">Logout</span>
      </div>
    </div>
  );
};

export default BottomTabs;

export const LogoutPopup = ({
  setLogout,
}: {
  setLogout: (value: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);

  const router = useRouter();
  const handleLogout = async () => {
    dispatch(logoutUser());
    toast.success("Logged out successfully");
    setLogout(false);
    router.push("/");
  };
  return (
    <div className="w-full h-screen fixed  inset-0 backdrop-blur-xl flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mx-4 flex flex-col gap-4 border border-purple-500">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Confirm Logout
        </h2>
        <p className=" text-gray-600 dark:text-gray-400">
          Are you sure you want to logout?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setLogout(false)}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer"
          >
            No
          </button>
          <button
            onClick={() => handleLogout()}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Yes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
