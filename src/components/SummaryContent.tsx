import { useEffect, useState } from "react";
import { keyframes, styled } from "styled-components";
import Label from "./Label";
import { Mode } from "fs";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Loader from "./Loader";

type State = {
  price: number;
  marketCap: number;
  supply: number;
  inMarket: number;
  change: number;
  loading: boolean;
};

function SummaryContent() {
  const mode = useSelector((state: RootState) => state.mode) as Mode;

  const [state, setState] = useState<State>({
    price: 0,
    marketCap: 0,
    supply: 0,
    inMarket: 0,
    change: 0,
    loading: false,
  });

  useEffect(() => {
    const fetchPriceData = async () => {
      setState((prev) => ({ ...prev, loading: true }));

      setTimeout(() => {
        const price = Math.floor(Math.random() * (96000 - 95000 + 1)) + 95000;
        const change = (Math.random() * (3.5 - -3.5) + -3.5).toFixed(2);
        const marketCap = Math.floor(Math.random() * (950 - 850 + 1)) + 850;
        const supply = 21;
        const inMarket = 18.8;
        setState((prev) => ({
          ...prev,
          price,
          change: parseFloat(change),
          marketCap,
          supply,
          inMarket,
          loading: false,
        }));
      }, Math.random() * 1000 + 1000);
    };

    fetchPriceData();
  }, []);
  return (
    <Container>
      <Row>
        <Card>
          <Label size="20px" weight={500} color="gray">
            Bitcoin Current Price
          </Label>
          {!state.loading ? (
            <Label size="35px" weight={600}>
              <span style={{ color: "limegreen" }}>$</span>{" "}
              {state.price.toLocaleString("en-IN")}
            </Label>
          ) : (
            <Loader />
          )}
        </Card>
        <Card>
          <Label size="20px" weight={500} color="gray">
            Bitcoin Market Cap
          </Label>
          {!state.loading ? (
            <Label size="35px" weight={600}>
              <span style={{ color: "limegreen" }}>$</span> {state.marketCap}{" "}
              Billion
            </Label>
          ) : (
            <Loader />
          )}
        </Card>
      </Row>
      <Row>
        <Card style={{ flexDirection: "row", gap: "2rem" }}>
          <Wrapper>
            <Label size="20px" weight={500} color="gray">
              Bitcoin Supply
            </Label>
            {!state.loading ? (
              <Label size="35px" weight={600}>
                {state.inMarket}M/{state.marketCap}M
              </Label>
            ) : (
              <Loader />
            )}
          </Wrapper>
          <CircleWrapper>
            <Circle $mode={mode}>
              <Percentage $mode={mode}>
                <Label size="15px">{state.loading ? "--" : "89.52%"}</Label>
              </Percentage>
            </Circle>
            <svg
              style={{ position: "absolute", top: 0, left: 0 }}
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="120px"
              height="120px"
            >
              <defs>
                <linearGradient id="GradientColor">
                  <stop offset="0%" stopColor="#DA22FF" />
                  <stop offset="100%" stopColor="#9733EE" />
                </linearGradient>
              </defs>
              <StyledCircle cx="60" cy="60" r="50" strokeLinecap="round" />
            </svg>
          </CircleWrapper>
        </Card>
        <Card>
          <Label size="20px" weight={500} color="gray">
            1 Week Change
          </Label>
          {!state.loading ? (
            <Label
              size="35px"
              weight={600}
              color={state.change > 0 ? "limegreen" : "crimson"}
            >
              {state.change >= 0 ? "+" : ""}
              {state.change}%
            </Label>
          ) : (
            <Loader />
          )}
        </Card>
      </Row>
    </Container>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const Percentage = styled.div<{ $mode: Mode }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  box-shadow: ${(p) =>
    p.$mode === "light"
      ? `inset 4px 4px 6px -1px rgba(0, 0, 0, 0.2),
    -4px -4px 6px -1px rgba(225, 225, 225, 0.7),
    0.5px 0.5px 0px rgba(0, 0, 0, 0.15), 0px 12px 10px -10px rgba(0, 0, 0, 0.05)`
      : `inset 4px 4px 6px -1px rgba(225, 225, 225, 0.2),
    -4px -4px 6px -1px rgba(0, 0, 0, 0.7),
    0.5px 0.5px 0px rgba(225, 225, 225, 0.15), 0px 12px 10px -10px rgba(225, 225, 225, 0.05)`};
`;

const Circle = styled.div<{ $mode: Mode }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  width: 120px;
  border-radius: 50%;
  box-shadow: ${(p) =>
    p.$mode === "light"
      ? `6px 6px 10px -1px rgba(0, 0, 0, 0.15),
    -6px -6px 10px -1px rgba(225, 225, 225, 0.7)`
      : `6px 6px 10px -1px rgba(225, 225, 225, 0.15),
    -6px -6px 10px -1px rgba(0, 0, 0, 0.7)`};
`;

const CircleWrapper = styled.div`
  width: 120px;
  height: 120px;
  position: relative;
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding: 1rem;
  gap: 2rem;
`;

export const Row = styled.div`
  display: flex;
  align-items: start;
  gap: 2rem;
`;

export const Card = styled.div`
  width: fit-content;
  box-sizing: border-box;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  background-color: ${(p) => p.theme.secondary};
`;

const anim = keyframes`
  from {
    stroke-dashoffset: 310;
  }
  to {
    stroke-dashoffset: 32.49;
  }
`;

const StyledCircle = styled.circle`
  fill: none;
  stroke: url(#GradientColor);
  stroke-width: 20px;
  stroke-dasharray: 310;
  animation: ${anim} 2s linear forwards;
  animation-delay: 1.5s;
  stroke-linecap: round;
`;

export default SummaryContent;
