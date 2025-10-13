
export function VerticalOutPutTable({
  body = [{ key: "key", value: "value" }],
  style = { keyTd: "", valueTd: "", tr: "" },
}) {
  return (
    <table className={`text-sm ${body?.length > 0 ? "flex" : "hidden"}`}>
      <tbody>
        {body?.map((rowObject, rowIndex) => (
          <tr key={rowIndex} className={`${style.tr} `}>
            <td
              className={`border group text-xs min-w-[40px] p-1 text-right font-semibold  ${style.keyTd}`}
            >
              {rowObject.key}
            </td>
            <td
              className={`border  p-2 pr-3 ${
                rowObject.value
                  ?.split("")
                  ?.every((char) => "-+0987654321".includes(char)) &&
                " text-green-700"
              } ${style.valueTd}`}
            >
              {rowObject.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
