import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from "recharts";

interface CategoryData {
    category: string;
    expense: number;
    income: number;
}

interface Props {
    data: CategoryData[];
}

// Vibrant, well-separated palettes for better visual distinction
// Expanded vibrant palettes (10 colors each) for better category coverage
const COLORS_EXPENSE = [
    "#FF4D4F", // vivid red
    "#FF7A45", // bright orange
    "#FFC53D", // warm yellow
    "#FF85C0", // pink
    "#9254DE", // purple
    "#36CFC9", // teal
    "#FA541C", // deep orange
    "#D4380D", // rust
    "#F759AB", // magenta
    "#FADB14", // bright yellow
];

const COLORS_INCOME = [
    "#52C41A", // vivid green
    "#389E0D", // darker green
    "#13C2C2", // cyan
    "#0891B2", // teal-blue
    "#1890FF", // bright blue
    "#2F54EB", // indigo
    "#722ED1", // violet
    "#00B96B", // mint green
    "#00E5FF", // electric cyan
    "#00C853", // strong green
];

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