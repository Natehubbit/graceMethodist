import React from "react";
import Layout from "../components/Layout/index";

const NotFound = () => {
  return (
    <Layout>
      <div className="flex justify-center flex-col flex-1 items-center">
        <h1 className="text-5xl mb-4 text-blue-500">404</h1>
        <h1 className="text-2xl font-bold">Page not found</h1>
      </div>
    </Layout>
  );
};

export default NotFound;
