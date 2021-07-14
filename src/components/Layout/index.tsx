import React, { FC } from "react";
import SideBar from "../SideBar/index";

const Layout: FC = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex flex-1">
        <SideBar />
        <div className="flex flex-1">
          <div className=" flex-1">
            <div className="flex p-5 space-x-10">{children}</div>
          </div>
          <div className="space-y-10 relative w-2/12 sticky p-5 top-0 h-screen">
            {/* <Card title="Suggestions today" value="1" />
            <Card
              title="Suggestions this week"
              color="text-yellow-500"
              value="10"
            />
            <Card
              title="Suggestions this month"
              color="text-red-500"
              value="300"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
