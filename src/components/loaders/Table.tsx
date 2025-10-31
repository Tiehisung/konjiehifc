import { generateNumbers } from "@/lib";

const TableLoader = ({
  rows = 2,
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
    <table className={` w-full ${wrapperClassName}`}>
      <tbody>
        <tr>
          {colsCount.map((_, cIndex) => (
            <th key={cIndex}>
              <div
                className={`m-2 w-[80%] h-4 bg-card rounded animate-pulse ${className}`}
              />
            </th>
          ))}
        </tr>

        {rowsCount.map((_, index) => (
          <tr key={index}>
            {colsCount.map((_, cIndex) => (
              <td key={cIndex}>
                <div
                  className={`m-2 w-[80%] h-4 bg-card rounded animate-pulse ${className}`}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableLoader;
