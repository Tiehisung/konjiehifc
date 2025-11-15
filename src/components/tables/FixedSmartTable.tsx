"use client";

import React, { Key, useEffect, useState } from "react";
import { FcAddColumn, FcAddRow } from "react-icons/fc";
import { RiDeleteColumn, RiDeleteRow } from "react-icons/ri";
import { Button } from "../buttons/Button";
import { ImportTableProps } from "./PlainTable";
import { CgRemove } from "react-icons/cg";

interface FixedSmartTableProps {
  setExportTable: (tableData: ImportTableProps) => void;
  setToggleTable: (toggle: boolean) => void;
  className: string;
}

export default function FixedSmartTable({
  setExportTable,
  setToggleTable,
  className,
}: FixedSmartTableProps) {
  const [saveTimer, setSaveTimer] = useState(0);
  const existingTable = localStorage.getItem("fixedTable")
    ? JSON.parse(localStorage.getItem("fixedTable") as string)
    : {
        body: [["", "", ""]],
        headers: ["Name", "Age", "Contact"],
      };

  const [TableData, setTableData] = useState(existingTable);
  const isTable = () => {
    return TableData?.headers?.length > 0;
  };

  //Table-----------------------------------------
  const handleDeleteTable = async () => {
    //Empty headers mean no table
    setTableData(() => ({
      body: [["", "", ""]],
      headers: ["Name", "Age", "Contact"],
    }));
  };

  //Column-----------------------------------------
  const handleAddCol = () => {
    setTableData((prev: { headers: string[]; body: string[][] }) => {
      return {
        ...prev,
        headers: [...prev.headers, "col" + (prev.headers.length + 1)],
        body: [...prev.body.map((row) => [...row, ""])],
      };
    });
  };

  const handleRenameCol = (colIndex: Key, newValue: string) => {
    setTableData((prevState: { headers: string[] }) => ({
      ...prevState,
      headers: prevState.headers.map((oldValue, valIndex) => {
        if (valIndex === colIndex) return newValue;
        return oldValue;
      }),
    }));
  };

  //Row----------------------------------------------------
  const handleAddRow = () => {
    setTableData((prev: ImportTableProps) => ({
      ...prev,
      body: [...prev.body, [...prev.headers.map(() => "")]],
    }));
  };

  // OnChangeEvent
  const handleOnChangeBody = (rowIndex: Key, itemIndex: Key, newValue: Key) => {
    setTableData((prev: { body: string[][] }) => ({
      ...prev,
      body: prev.body.map((row, curRowIndex) => {
        if (curRowIndex !== rowIndex) return row;
        return row.map((rData, rdIndex) => {
          if (rdIndex !== itemIndex) return rData;
          return newValue;
        });
      }),
    }));
  };

  //Save table data to rtk and persit to local storage
  useEffect(() => {
    setExportTable(TableData);
    if (TableData)
      localStorage.setItem("fixedTable", JSON.stringify(TableData));
  }, [TableData]);

  const savedMessage = (
    <div
      id="saved-id"
      className={`absolute bottom-1 right-2 bg-green-100 text-xs px-2 text-green-600 transition-all ${
        saveTimer % 10 < 3 ? "block opacity-100" : "hidden opacity-50"
      }`}
    >
      Saved!
    </div>
  );

  //Retrieve table data from local storage on mount
  useEffect(() => {
    const savedTable = localStorage.getItem("fixedTable")
      ? JSON.parse(localStorage.getItem("fixedTable") as string)
      : null;

    if (savedTable) setTableData(savedTable);

    //Save timer for data table
    const interval = setInterval(() => {
      setSaveTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed inset-0 top-[10vh] z-30 bg-[#181818de] p-5 pt-1 overflow-auto  flex flex-col justify-start  items-center ${className}`}
    >
      <div className="flex items-center justify-center gap-4 w-fit p-1 my-2 bg-[#7e7a7a] text-teal-100 px-2 drop-shadow-md ">
        <button
          type="button"
          onClick={handleAddCol}
          title="Add row"
          className={` text-xs gap-2 rounded px-1 shadow hover:bg-gray-700 my-1 ${
            isTable() ? " flex" : "hidden"
          }`}
        >
          <FcAddColumn className="max-sm:hidden" /> Add col
        </button>
        <button
          type="button"
          onClick={handleAddRow}
          title="Add row"
          className={` text-xs gap-2 rounded px-1 shadow hover:bg-gray-700 my-1 ${
            isTable() ? " flex" : "hidden"
          }`}
        >
          <FcAddRow className="max-sm:hidden" /> Add row
        </button>
      

        <Button
          primaryText="Clear table"
          onClick={handleDeleteTable}
          className={`_deleteBtn h-fit flex items-center gap-2 text-xs text-red-300 ${
            isTable() ? " " : "hidden"
          }`}
        >
          <CgRemove />
        </Button>
        {/* Close table */}
        <Button
          className="primary__btn text-center px-1 py-0 font-thin hover:ring ml-auto"
          onClick={() => setToggleTable(false)}
          title="Close table"
          primaryText={"Save and exit"}
        />
      </div>
      <div className="max-w-full w-fit max-h-[80vh] overflow-auto bg-white rounded p-1">
        <div
          className={`w-full max-w-full overflow-auto ${
            isTable() ? "block" : "hidden"
          }`}
        >
          {
            <table className="  text-sm">
              <tbody>
                <tr className="relative bg-slate-100">
                  <th className=" sticky left-0 z-10 bg-slate-50">S/N</th>
                  {TableData?.headers?.map((colName: string, colIndex: Key) => (
                    <th
                      key={colIndex}
                      className="border focus-within:ring sticky top-0 "
                    >
                      <DeleteCol
                        colIndex={colIndex as number}
                        setTableData={setTableData}
                      />
                      <input
                        onChange={(e) =>
                          handleRenameCol(colIndex, e.target.value)
                        }
                        className="w-20 p-2 outline-none"
                        type="text"
                        value={colName}
                      />
                    </th>
                  ))}
                </tr>
                {TableData?.body?.map((rowData: string[], rowIndex: number) => (
                  <tr key={rowIndex}>
                    <td className="shadow bg-gray-50 group text-xs min-w-[40px] p-1 sticky left-0">
                      {rowIndex + 1}
                      <DeleteRow
                        rowToRemoveIndex={rowIndex}
                        setTableData={setTableData}
                      />
                    </td>
                    {rowData.map((colValue, colIndex) => (
                      <td
                        key={colIndex}
                        className="border outline-[1px] focus-within:outline"
                      >
                        <input
                          onChange={(e) =>
                            handleOnChangeBody(
                              rowIndex,
                              colIndex,
                              e.target.value
                            )
                          }
                          className="w-20 p-1 outline-none"
                          type="text"
                          value={colValue}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>

        {saveTimer && savedMessage}
      </div>
    </div>
  );
}

export function DeleteCol({
  colIndex,
  setTableData,
}: {
  colIndex: number;
  setTableData: React.Dispatch<React.SetStateAction<ImportTableProps>>;
}) {
  const handleDeleteCol = () => {
    setTableData((prev) => {
      const body = [];
      for (const row of prev.body) {
        const newRow = row.filter((_, rcIndex: number) => rcIndex !== colIndex);
        body.push(newRow);
      }
      return {
        headers: prev.headers.filter(
          (_: string, hIndex: number) => hIndex !== colIndex
        ),
        body: body,
      };
    });
  };

  return (
    <div className=" divide-x-2 text-lg group flex justify-around">
      <span className="flex text-xs">C {colIndex + 1}</span>
      <button
        type="button"
        onClick={handleDeleteCol}
        title="Delete column"
        className="hidden text-xs remove__btn  group-hover:block transition-transform delay-300 duration-300"
      >
        <RiDeleteColumn />
      </button>
    </div>
  );
}
export function DeleteRow({
  rowToRemoveIndex,
  setTableData,
}: {
  rowToRemoveIndex: number;
  setTableData: React.Dispatch<React.SetStateAction<ImportTableProps>>;
}) {
  const handleDeleteCol = () => {
    setTableData((prev: { body: string[][]; headers: string[] }) => ({
      ...prev,
      body: prev.body.filter(
        (_, rIndex: number) => rIndex !== rowToRemoveIndex
      ),
    }));
  };
  return (
    <div className="divide-y-2 absolute right-[2px] top-0 text-lg hidden group-hover:block transition-transform delay-300 duration-300">
      <button type="button" onClick={handleDeleteCol} title="Delete row">
        <RiDeleteRow
          size={14}
          className="text-red-400 p-[2px] rounded shadow hover:bg-orange-300"
        />
      </button>
    </div>
  );
}
