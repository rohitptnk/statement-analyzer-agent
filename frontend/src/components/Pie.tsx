import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from "recharts";

interface CategoryData {
    category: string;
    expense: number;
    income: number;
}

interface Props {
    data: CategoryData[];
}

const COLORS_EXPENSE = ["#FF6B6B", "#FF8C00", "#FFD93D", "#FFB6C1", "#FF4500"];
const COLORS_INCOME = ["#4CAF50", "#00C49F", "#0088FE", "#00BFFF", "#32CD32"];

const CategoryPieCharts: React.FC<Props> = ({ data }) => {
    const expenseData = data
        .filter((d) => d.expense < 0)
        .map((d) => ({category: d.category, amount: Math.abs(d.expense)}));
    
    const incomeData = data
        .filter((d) => d.income >0)
        .map((d) => ({ category: d.category, amount: Math.abs(d.income)}));
    
    return (
        <div className="w-full flex flex-wrap justify-center items-center gap-12 px-4">
            {/* Expense Pie */}
            <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-2">Expense Breakdown</h3>
                <div className="w-full max-w-[420px] mx-auto">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={expenseData}
                                dataKey="amount"
                                nameKey="category"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {expenseData.map((_, index: number) => (
                                    <Cell key={`exp-${index}`} fill={COLORS_EXPENSE[index % COLORS_EXPENSE.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Income Pie */}
            <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-2">Income Breakdown</h3>
                <div className="w-full max-w-[420px] mx-auto">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={incomeData}
                                dataKey="amount"
                                nameKey="category"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {incomeData.map((_, index) => (
                                    <Cell key={`inc-${index}`} fill={COLORS_INCOME[index % COLORS_INCOME.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default CategoryPieCharts;