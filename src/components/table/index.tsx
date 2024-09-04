import styles from "./style.module.css";

type Option = [string, string, any, any?];

interface OptionTableProps {
  options: Option[];
}

export function OptionTable({ options }: OptionTableProps) {
  const showDefault = options.some((e) => e.length > 3);
  return (
    <div
      className={
        "-mx-6 mb-4 mt-6 overflow-x-auto overscroll-x-contain px-6 pb-4 " +
        styles.container
      }
    >
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b py-4 text-left dark:border-neutral-700">
            <th className="py-2 font-semibold">参数</th>
            <th className="py-2 pl-6 font-semibold">类型</th>
            <th className="px-6 py-2 font-semibold">描述</th>
            {showDefault && <th className="px-6 py-2 font-semibold">默认值</th>}
          </tr>
        </thead>
        <tbody className="align-baseline text-gray-900 dark:text-gray-100">
          {options.map(([option, type, description, defaultValue]) => (
            <tr
              key={option}
              className="border-b border-gray-100 dark:border-neutral-700/50"
            >
              <td className="whitespace-pre py-2 font-mono text-xs font-semibold leading-6 text-violet-600 dark:text-violet-500">
                {option}
              </td>
              <td className="whitespace-pre py-2 pl-6 font-mono text-xs font-semibold leading-6 text-slate-500 dark:text-slate-400">
                {type}
              </td>
              <td className="py-2 pl-6">{description}</td>
              {showDefault && (
                <td className="py-2 pl-6 font-mono text-xs">
                  {String(defaultValue) || "-"}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
