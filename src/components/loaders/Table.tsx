import { generateNumbers } from "@/lib";

const TableLoader = ({
  rows = 1,
  cols = 2,
  className,
  wrapperClassName,
}: {
  rows?: number;
  cols?: number;
  className?: string;
  wrapperClassName?: string;
}) => {
  const rowsCount = generateNumbers(1, rows);
  const colsCount = generateNumbers(1, cols);
  return (
    <div className={"flex justify-center items-center grow w-full" + wrapperClassName}>
      <table className={`mx-auto w-full `}>
        <tbody>
          <tr>
            {colsCount.map((_, cIndex) => (
              <th key={cIndex}>
                <div
                  className={`m-2 w-[80%] h-4 bg-popover rounded animate-pulse ${className}`}
                />
              </th>
            ))}
          </tr>

          {rowsCount.map((_, index) => (
            <tr key={index}>
              {colsCount.map((_, cIndex) => (
                <td key={cIndex}>
                  <div
                    className={`m-2 w-[80%] h-4 bg-popover rounded animate-pulse ${className}`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableLoader;
