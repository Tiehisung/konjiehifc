 

export interface ImportTableProps {
  headers: string[];
  body: string[][];
}

export function PlainOutPutTable({
  importTable = {
    headers: [],
    body: [],
  },
}: { importTable: ImportTableProps }) {
  return (
    <div
      className={`max-w-[95vw] md:max-w-[75vw] relative overflow-auto flex-col ${
        importTable?.headers?.length > 0 ? "flex" : "hidden"
      }`}
    >
      <table className="text-sm">
        <tbody>
          <tr className=" bg-slate-100">
            <th className="p-1 py-2 border">#</th>
            {importTable?.headers?.map((colName, colIndex) => (
              <th key={colIndex} className="border p-2">
                {colName}
              </th>
            ))}
          </tr>
          {importTable?.body?.map((rowData, rowIndex) => (
            <tr key={rowIndex} className={``}>
              <td className="border bg-gray-50  group text-xs min-w-[40px] p-1">
                {rowIndex + 1}
              </td>
              {rowData.map((colValue, colIndex) => (
                <td
                  key={colIndex}
                  className={`border  p-2 pr-3 ${
                    colValue
                      .split("")
                      .every((char) => "-+0987654321".includes(char)) &&
                    " text-green-700"
                  }`}
                >
                  {colValue}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
