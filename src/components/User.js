import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const User = ({ data, setData, search, page, select, setSelect }) => {
  const [editingUser, setEditingUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-slate-500 font-medium">No such User</div>
    );
  }

  const selectAll = (condition) => {
    if (condition) {
      setSelect(data.map((user) => user.id).slice(10 * (page - 1), page * 10));
    } else {
      setSelect([]);
    }
  };

  const selectone = (id) => () => {
    setSelect((prev) => {
      if (prev.includes(id)) {
        return prev.filter((userId) => userId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const toggleEditMode = (user) => {
    setEditMode(!editMode);
    setEditingUser(editMode ? null : user);
  };

  const handleInputChange = (field, value) => {
    setEditingUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const deleteRow = (id) => {
    setData((prevData) => prevData.filter((user) => user.id !== id));
    setSelect((prevSelect) => prevSelect.filter((userId) => userId !== id));
  };

  const saveChanges = () => {
    if (!editMode) return;
    setData((prevData) => {
      const newData = prevData.map((user) =>
        user.id === editingUser.id ? { ...user, ...editingUser } : user
      );
      return [...newData];
    });
    setEditMode(false);
    setEditingUser(null);
  };

  return (
    <div>
      <table className="w-full table-auto">
        <thead className="border rounded-t-2xl">
          <tr>
            <th>
              <input
                type="checkbox"
                onClick={(e) => selectAll(e.target.checked)}
              />
            </th>
            {Object.keys(data[0])
              .filter((header) => header !== "id")
              .map((header) => (
                <th key={header} className="text-slate-500">
                  {header[0].toUpperCase() + header.slice(1)}
                </th>
              ))}
            <th className="text-center py-2 text-slate-500">Action</th>
          </tr>
        </thead>
        <tbody className="border-b rounded-b-full">
          {data?.slice(10 * (page - 1), page * 10).map((record) => (
            <tr
              key={record.id}
              className={`border ${
                select.includes(record.id) ? "bg-blue-100" : ""
              }`}
            >
              <td className="text-center py-1">
                <input
                  type="checkbox"
                  checked={select.includes(record.id)}
                  onChange={selectone(record.id)}
                />
              </td>
              {editMode && editingUser?.id === record.id ? (
                <>
                  <td className="text-center py-1">
                    <input
                      type="text"
                      value={editingUser?.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="text-center p-2 border rounded-md w-32"
                    />
                  </td>
                  <td className="text-center py-1">
                    <input
                      type="text"
                      value={editingUser?.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="text-center p-2 border rounded-md w-32"
                    />
                  </td>
                  <td className="text-center py-1">
                    <input
                      type="text"
                      value={editingUser?.role}
                      onChange={(e) =>
                        handleInputChange("role", e.target.value)
                      }
                      className="text-center p-2 border rounded-md w-32"
                    />
                  </td>
                  <td className="text-center py-3 w-32 ml-5">
                    <div className="flex flex-row">
                      <button
                        onClick={() => {
                          toggleEditMode(record);
                          saveChanges();
                        }}
                        className="text-center px-1 py-1 border-2 rounded-md"
                      >
                        {editMode && editingUser?.id === record.id ? (
                          <TiTick />
                        ) : (
                          <FaEdit />
                        )}
                      </button>
                      <button
                        className="text-center px-1 py-1 rounded-md ml-2 border  text-red-500 "
                        onClick={() => deleteRow(record.id)}
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td className="text-center py-1 w-60">{record.name}</td>
                  <td className="text-center py-1 w-60">{record.email}</td>
                  <td className="text-center py-1 w-60">{record.role}</td>
                  <td className="text-center py-3 w-40 ml-5 ">
                    <div className="flex flex-row">
                      <button
                        onClick={() => {
                          toggleEditMode(record);
                          saveChanges();
                        }}
                        className="text-center px-1 py-1 border-2 rounded-md"
                      >
                        {editMode && editingUser?.id === record.id ? (
                          <TiTick />
                        ) : (
                          <FaEdit />
                        )}
                      </button>
                      <button
                        className="text-center px-1 py-1 rounded-md ml-2 border
                        text-red-500"
                        onClick={() => deleteRow(record.id)}
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
