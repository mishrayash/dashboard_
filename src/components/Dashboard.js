import React, { useEffect, useState } from "react";
import Search from "./Search";
import User from "./User";
import Pagination from "./Pagination";

const Dashboard = () => {
  const [data, setData] = useState([]); // Initialize as an empty array
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const responseData = await response.json();
      setData(responseData);
      setFilteredData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const updatedFilteredData = data.filter((user) =>
      Object.keys(user).some((key) => user[key].includes(search))
    );
    setFilteredData(updatedFilteredData);
  }, [data, search]);

  const deleteSelectedRows = () => {
    setData((prevData) => prevData.filter((user) => !select.includes(user.id)));

    setSelect([]);
  };

  return (
    <div className="mt-6 md:mx-40">
      <div className="text-2xl font-medium text-center text-gray-400">
        Dashboard
      </div>
      <div className="md:mx-[110px] md:pr-3 ">
        <Search
          search={search}
          setSearch={setSearch}
          deleteSelectedRows={deleteSelectedRows}
        />
      </div>
      {data && data.length > 0 ? (
        <div className="mt-6 text-sm mx-2 ">
          <User
            data={filteredData}
            setData={setData}
            search={search}
            page={page}
            select={select}
            setSelect={setSelect}
          />
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <footer className="flex flex-row justify-between md:mx-[110px] mt-2 md:pr-14 md:w-auto">
        <p className="text-slate-400 font-semibold">{`${select.length} member(s) of ${filteredData?.length} selected`}</p>
        <Pagination
          page={page}
          setPage={setPage}
          total={Math.ceil(filteredData?.length / 10)}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
        />
      </footer>
    </div>
  );
};

export default Dashboard;
