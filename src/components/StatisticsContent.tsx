import { useEffect, useState } from "react";
import { Card, Container, Row } from "./SummaryContent";
import Label from "./Label";
import Loader from "./Loader";

type State = {
  hash: number;
  volume: number;
  transactions: number;
  dominance: number;
  loading: boolean;
};

function StatisticsContent() {
  const [state, setState] = useState<State>({
    hash: 0,
    volume: 0,
    transactions: 0,
    dominance: 0,
    loading: false,
  });

  useEffect(() => {
    const fetchPriceData = async () => {
      setState((prev) => ({ ...prev, loading: true }));

      setTimeout(() => {
        const hash = Math.floor(Math.random() * (160 - 140 + 1)) + 140;
        const volume = Math.floor(Math.random() * (30 - 20 + 1)) + 20;
        const transactions =
          Math.floor(Math.random() * (450000 - 350000 + 1)) + 350000;
        const dominance = Math.floor(Math.random() * (50 - 40 + 1)) + 40;
        setState((prev) => ({
          ...prev,
          hash,
          volume,
          transactions,
          dominance,
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
            24h Trading Volume
          </Label>
          {!state.loading ? (
            <Label size="35px" weight={600}>
              <span style={{ color: "limegreen" }}>$</span> {state.volume}{" "}
              Billion
            </Label>
          ) : (
            <Loader />
          )}
        </Card>
        <Card>
          <Label size="20px" weight={500} color="gray">
            Transactions Today
          </Label>
          {!state.loading ? (
            <Label size="35px" weight={600}>
              {state.transactions.toLocaleString("en-IN")}
            </Label>
          ) : (
            <Loader />
          )}
        </Card>
      </Row>
      <Row>
        <Card>
          <Label size="20px" weight={500} color="gray">
            Bitcoin Dominance
          </Label>
          {!state.loading ? (
            <Label size="35px" weight={600}>
              {state.dominance}%
            </Label>
          ) : (
            <Loader />
          )}
        </Card>
        <Card>
          <Label size="20px" weight={500} color="gray">
            Network Hashrate
          </Label>
          {!state.loading ? (
            <Label size="35px" weight={600}>
              {state.hash} <span style={{ color: "limegreen" }}>EH/s</span>
            </Label>
          ) : (
            <Loader />
          )}
        </Card>
      </Row>
    </Container>
  );
}

export default StatisticsContent;
