import { useEffect, useState } from "react";
import styled from "styled-components";
import PriceChart from "./PriceChart";
import {
  faUpRightAndDownLeftFromCenter,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChartData, TimeFrame } from "../types";
import Label from "./Label";
import axios from "axios";
import { HashLoader } from "react-spinners";

const timeFrames = ["1d", "3d", "1w", "1m", "6m", "1y", "max"] as TimeFrame[];

type BitcoinMarketChartResponse = {
  prices: [number, number][];
  total_volumes: [number, number][];
};

type Props = {
  togggleTimeFrame: (timeFrame: TimeFrame) => void;
  timeFrame: TimeFrame;
};

type State = {
  chartData: ChartData[];
  volumeData: number[];
  loading: boolean;
};

function ChartContent({ togggleTimeFrame, timeFrame }: Props) {
  const [state, setState] = useState<State>({
    chartData: [],
    volumeData: [],
    loading: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const stamp =
        timeFrame === "1d"
          ? "1"
          : timeFrame === "3d"
          ? "3"
          : timeFrame === "1w"
          ? "7"
          : timeFrame === "1m"
          ? "30"
          : timeFrame === "6m"
          ? "180"
          : "365";
      try {
        setState((prev) => ({ ...prev, loading: true }));
        const response = await axios.get<BitcoinMarketChartResponse>(
          `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${stamp}&interval=daily`
        );

        const data = response.data;

        const formattedData: ChartData[] = data.prices.map((price) => ({
          time: price[0],
          price: price[1],
        }));

        const volumes = data.total_volumes.map((volume) => volume[1]);

        setState((prev) => ({
          ...prev,
          volumeData: volumes,
          chartData: formattedData,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, [timeFrame]);

  return (
    <>
      <Container>
        <FullscreenWrapper>
          <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
          <Label size="18px" sx={{ cursor: "pointer" }} color="#6F7177">
            Fullscreen
          </Label>
        </FullscreenWrapper>
        <CompareWrapper>
          <FontAwesomeIcon icon={faCircleXmark} style={{ rotate: "45deg" }} />
          <Label size="18px" sx={{ cursor: "pointer" }} color="#6F7177">
            Compare
          </Label>
        </CompareWrapper>
        <TimeFrameWrapper>
          {timeFrames.map((frame) => (
            <TimeFrameItem
              key={frame}
              isActive={frame === timeFrame}
              onClick={() => togggleTimeFrame(frame)}
            >
              <Label
                size="18px"
                sx={{ cursor: "pointer" }}
                color={timeFrame === frame ? "white" : "#6F7177"}
              >
                {frame}
              </Label>
            </TimeFrameItem>
          ))}
        </TimeFrameWrapper>
      </Container>
      <ChartWrapper>
        {state.loading ? (
          <HashLoader color="lightblue" />
        ) : (
          <PriceChart
            volumeData={state.volumeData}
            chartData={state.chartData}
          />
        )}
      </ChartWrapper>
    </>
  );
}

export default ChartContent;

const Container = styled.div`
  width: 100%;
  padding: 1rem 0rem;
  display: flex;
  align-items: center;
  color: #6f7177;
  gap: 2rem;
  box-sizing: border-box;
`;

const FullscreenWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  box-sizing: border-box;
`;

const CompareWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  box-sizing: border-box;
`;

const TimeFrameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
  box-sizing: border-box;
`;

const TimeFrameItem = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  box-sizing: border-box;
  background-color: ${(props) => (props.isActive ? "#4B40EE" : "transparent")};
  color: ${(props) => (props.isActive ? "white" : "#6F7177")};
  border-radius: 5px;
  padding: 0.2rem 0.7rem;
`;

const ChartWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
