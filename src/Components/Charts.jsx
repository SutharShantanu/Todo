import React from "react";
import {
    PieChart,
    Pie,
    Legend,
    Tooltip,
    Cell,
    ResponsiveContainer,
} from "recharts";

const Charts = ({ data }) => {
    const pieChartStyle = {
        border: "none",
    };

    const legendStyle = {
        fontSize: "12px",
        margin: "auto",
    };

    const tooltipStyle = {
        backdropFilter: "blur(5px) saturate(30%)",
        backgroundColor: "initial",
        color: "gray",
        border: "none",
        borderRadius: "50px",
        padding: "3px 10px",
        fontSize: "12px",
    };

    return (
        <div style={{ width: "100%", height: "89%", boxSizing: "border-box" }}>
            <ResponsiveContainer>
                <PieChart style={pieChartStyle}>
                    <Pie
                        dataKey="value"
                        data={data}
                        cx={190}
                        cy={150}
                        isAnimationActive={true}
                        outerRadius={100}
                        label>
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={
                                    entry.name === "Pending"
                                        ? "#f56565"
                                        : "#38a169"
                                }
                            />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={legendStyle} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Charts;
