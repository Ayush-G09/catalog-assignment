import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import styled from "styled-components";
import Label from "./Label";
import Loader from "./Loader";

type State = {
  price: number;
  change: number;
  loading: boolean;
};

function BtcCard() {
  const [state, setState] = useState<State>({
    price: 0,
    change: 0,
    loading: false,
  });

  useEffect(() => {
    const fetchPriceData = async () => {
      setState((prev) => ({ ...prev, loading: true }));

      setTimeout(() => {
        const price = Math.floor(Math.random() * (96000 - 95000 + 1)) + 95000;
        const change = (Math.random() * (2.5 - -2.5) + -2.5).toFixed(2);
        setState((prev) => ({
          ...prev,
          price,
          change: parseFloat(change),
          loading: false,
        }));
      }, Math.random() * 1000 + 1000);
    };

    fetchPriceData();
  }, []);

  return (
    <Container>
      <Flex>
        {!state.loading ? (
          <Label size={"70px"}>{state.price.toLocaleString("en-IN")}</Label>
        ) : (
          <Loader />
        )}
        <Label color="#BDBEBF" size={"24px"} sx={{ marginTop: "15px" }}>
          USD
        </Label>
      </Flex>
      {!state.loading ? (
        <Label color={state.change >= 0 ? "#67BF6B" : "#FF4D4D"} size={"18px"}>
          {state.change >= 0 ? "+" : ""}
          {state.change}% Change
        </Label>
      ) : (
        <BarLoader color="lightblue" />
      )}
    </Container>
  );
}

const Container = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Flex = styled.div`
  display: flex;
`;

export default BtcCard;
