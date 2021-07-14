import React, { useEffect, useState } from "react";
import { Home, LogOut, PlusCircle } from "react-feather";
import { useRouteMatch, useHistory } from "react-router-dom";
import { SideMenuType } from "../../@types";
import { LOGO_URL, SIDE_MENU } from "../../common/constants";
import { getActiveByRoute } from "../../utils";
import AuthService from "../../services/AuthService";

const SideBar = () => {
  const { path } = useRouteMatch();
  const { replace } = useHistory();
  const [active, setActive] = useState<SideMenuType>(
    getActiveByRoute(path)
  );
  const { push } = useHistory();
  const onClick = (v: SideMenuType) => {
    setActive(v);
    push(SIDE_MENU[v]);
  };
  const onLogout = async () => {
    const res = await AuthService.logout();
    if (res) return replace("/");
  };
  const renderRoute = (isActive: boolean, k: SideMenuType) => {
    let icon = null;
    if (k === "Add") {
      icon = <PlusCircle />;
    } else if (k === "Home") {
      icon = <Home />;
    } else {
      return null;
    }
    return (
      <div
        key={k}
        className="flex items-center cursor-pointer w-full mb-2"
      >
        <button
          onClick={() => onClick(k)}
          className={`rounded-lg bg-blue-50 hover:bg-blue-200 min-h-10 min-w-10 justify-center py-1 px-3 items-center w-full ${
            isActive && "bg-blue-200 shadow-inner"
          }`}
        >
          <div className="flex items-center justify-center">
            {icon}
          </div>
          <p className="text-xs">{k}</p>
        </button>
      </div>
    );
  };
  useEffect(() => {
    if (path === "/") {
      setActive("Home");
    }
  }, [path]);
  return (
    <div className="h-screen bg-white items-center border-r-2 border-gray-200 sticky flex flex-col top-0 justify-between">
      <div className="flex flex-col items-center">
        <div className="mb-4 flex justify-center">
          <img src={LOGO_URL} alt="logo" className="h-16 w-16" />
        </div>

        {Object.keys(SIDE_MENU).map((k) => {
          const key = k as SideMenuType;
          const isActive = key === active;
          return renderRoute(isActive, key);
        })}
      </div>
      <button
        onClick={onLogout}
        className="hover:bg-red-500 hover:text-white bg-red-50 flex items-center py-2 px-2"
      >
        logout
        <LogOut className="ml-2" size={15} />
      </button>
    </div>
  );
};

export default SideBar;
