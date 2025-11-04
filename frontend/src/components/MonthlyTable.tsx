interface MonthTableProps {
    data: { month: string; income: number; expense: number, savings: number}[];
}

export default function MonthlySummaryTable({ data }: MonthTableProps) {
  if (!data || data.length === 0) return <p>No data available.</p>;

  return (
    <div className="overflow-x-auto mt-6">
  <table className="monthly-table min-w-[500px] border-collapse border-2 border-black mx-auto shadow-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="border-2 border-black px-4 py-2 text-left">
              Month
            </th>
            <th className="border-2 border-black px-4 py-2 text-right">
              Income
            </th>
            <th className="border-2 border-black px-4 py-2 text-right">
              Expense
            </th>
            <th className="border-2 border-black px-4 py-2 text-right">
              Savings
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="border-2 border-black px-4 py-2">{row.month}</td>
              <td className="border-2 border-black px-4 py-2 text-right">
                {row.income.toLocaleString()}
              </td>
              <td className="border-2 border-black px-4 py-2 text-right">
                {row.expense.toLocaleString()}
              </td>
              <td
                className={`border-2 border-black px-4 py-2 text-right font-semibold ${
                  row.savings >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {row.savings.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
