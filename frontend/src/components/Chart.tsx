import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, ComposedChart, ResponsiveContainer } from "recharts"

interface ChartProps {
    data: { month: string; income: number; expense: number, savings: number}[];
}

export default function AnalysisChart({ data }: ChartProps){
    const transformedData = data.map(item => ({
        ...item,
        expense: item.expense*-1
    }));

    return (
        <div className="my-chart">

            <ResponsiveContainer width="100%" height={500}>
                <ComposedChart data={transformedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    <Bar dataKey="savings" barSize={30} fill="#82ca9d" />

                    <Line type={"monotone"} dataKey={"income"} stroke="#8884d8" strokeWidth={2} />
                    <Line type={"monotone"} dataKey={"expense"} stroke="#ff7300" strokeWidth={2} />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}