import { useEffect, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import { Mode } from "fs";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ChartData } from "../types";
import styled from "styled-components";

type Props = {
  chartData: ChartData[];
  volumeData: number[];
};

const PriceChart = ({ chartData, volumeData }: Props) => {
  const chartRef = useRef<any>(null);
  const [lastPointPosition, setLastPointPosition] = useState<
    [number, number] | null
  >(null);

  const mode = useSelector((state: RootState) => state.mode) as Mode;

  useEffect(() => {
    if (chartRef.current && chartData.length) {
      const chartInstance = chartRef.current.getEchartsInstance();

      const lastPoint = {
        x: new Date(chartData[chartData.length - 1].time).toLocaleDateString(),
        y: chartData[chartData.length - 1].price,
      };

      const pixelPosition = chartInstance.convertToPixel(
        { xAxisIndex: 0, yAxisIndex: 0 },
        [lastPoint.x, lastPoint.y]
      );

      setLastPointPosition(pixelPosition);
    }
  }, [chartData]);

  const option = {
    xAxis: {
      type: "category",
      data: chartData.map((item) => new Date(item.time).toLocaleDateString()),
      axisLine: {
        show: true,
        lineStyle: {
          color: mode === "light" ? "#E6E9F0" : "#000000",
        },
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: mode === "light" ? "#E6E9F0" : "#000000",
        },
      },
    },
    yAxis: [
      {
        type: "value",
        show: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: mode === "light" ? "#E6E9F0" : "#000000",
          },
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      {
        type: "value",
        max: (value: { max: number }) => value.max * 2,
        axisLine: {
          lineStyle: {
            color: mode === "light" ? "#E6E9F0" : "#000000",
          },
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
    ],
    grid: {
      top: "2%",
      bottom: "2%",
      left: "4%",
      right: "4%",
      containLabel: true,
    },
    tooltip: {
      axisPointer: {
        type: "cross",
        label: {
          formatter: function (params: any) {
            if (params.axisDimension === "y") {
              if (params.axisIndex === 0) {
                return parseInt(params.value);
              } else {
                return `${(parseInt(params.value) / 100000000).toFixed(0)}b`;
              }
            }
            return params.value;
          },
          backgroundColor: mode === "light" ? "#1A243A" : "#ffffff",
          padding: [11, 8],
          fontWeight: "bold",
          fontSize: 14,
          lineHeight: 5,
          color: "gray",
        },
      },
      showContent: false,
    },
    series: [
      {
        data: chartData.map((item) => item.price),
        type: "line",
        lineStyle: {
          color: "#4B40EE",
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(45, 96, 255, 0.25)",
              },
              {
                offset: 1,
                color: "rgba(45, 96, 255, 0)",
              },
            ],
          },
        },
        symbol: "none",
      },
      {
        data: volumeData,
        type: "bar",
        yAxisIndex: 1,
        itemStyle: {
          color: "#E8E9EC",
          emphasis: {
            color: "#E8E9EC",
          },
        },
      },
    ],
  };

  return (
    <Container>
      <ReactECharts ref={chartRef} option={option} />
      {lastPointPosition && (
        <Label style={{top: lastPointPosition[1], left: lastPointPosition[0] + 50}}>
          {chartData[chartData.length - 1].price.toFixed(2)}
        </Label>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 90%;
  height: auto;
  position: relative;
`;

const Label = styled.div`
  position: absolute;
  background: #4b40ee;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 10;
  color: white;
`;

export default PriceChart;
