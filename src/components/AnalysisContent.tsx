import { useEffect, useState } from "react";
import { Card, Container, Row } from "./SummaryContent";
import Label from "./Label";
import Loader from "./Loader";

type State = {
  rsi: number;
  ma50: number;
  ma200: number;
  loading: boolean;
};

function AnalysisContent() {
  const [state, setState] = useState<State>({
    rsi: 0,
    ma50: 0,
    ma200: 0,
    loading: false,
  });

  useEffect(() => {
    const fetchPriceData = async () => {
      setState((prev) => ({ ...prev, loading: true }));

      setTimeout(() => {
        const ma50 = Math.floor(Math.random() * (96000 - 75000 + 1)) + 75000;
        const ma200 = Math.floor(Math.random() * (96000 - 65000 + 1)) + 65000;
        const rsi = Math.floor(Math.random() * (70 - 30 + 1)) + 30;
        setState((prev) => ({
          ...prev,
          rsi,
          ma50,
          ma200,
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
            50-Day Moving Average
          </Label>
          {!state.loading ? (
            <Label size="35px" weight={600}>
              <span style={{ color: "limegreen" }}>$</span>{" "}
              {state.ma50.toLocaleString("en-IN")}
            </Label>
          ) : (
            <Loader />
          )}
        </Card>
        <Card>
          <Label size="20px" weight={500} color="gray">
            200-Day Moving Average
          </Label>
          {!state.loading ? (
            <Label size="35px" weight={600}>
              <span style={{ color: "limegreen" }}>$</span>{" "}
              {state.ma200.toLocaleString("en-IN")}
            </Label>
          ) : (
            <Loader />
          )}
        </Card>
      </Row>
      <Row>
        <Card>
          <Label size="20px" weight={500} color="gray">
            RSI
          </Label>
          {!state.loading ? (
            <Label size="35px" weight={600}>
              <span style={{ color: state.rsi > 50 ? "limegreen" : "crimson" }}>
                {state.rsi}
              </span>{" "}
              (Overbought)
            </Label>
          ) : (
            <Loader />
          )}
        </Card>
      </Row>
    </Container>
  );
}

export default AnalysisContent;
