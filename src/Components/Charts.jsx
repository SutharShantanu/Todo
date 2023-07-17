import React from "react";
import { VictoryPie, VictoryLabel } from "victory";
import { useColorModeValue } from "@chakra-ui/react";

const Charts = ({ data }) => {
    const chartData = [
        { x: "Pending", y: data.values[0] },
        { x: "Completed", y: data.values[1] },
    ];

    const labelColor = useColorModeValue("black", "white");
    const labelPosition = data.values.some((value) => value === 0)
        ? "centroid"
        : "endAngle";

    const labelStyle = {
        fill: labelColor,
    };

    return (
        <div>
            <VictoryPie
                data={chartData}
                animate={{
                    duration: 2000,
                }}
                padAngle={2}
                cornerRadius={10}
                innerRadius={2}
                labelPosition={labelPosition}
                radius={120}
                colorScale={["#F56565", "#4299e1"]}
                labelComponent={<VictoryLabel style={labelStyle} />}
            />
        </div>
    );
};

export default Charts;
