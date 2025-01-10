import { BarLoader } from "react-spinners";
import styled from "styled-components";

function Loader() {
  return (
    <Container>
      <BarLoader color="lightblue" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
`;

export default Loader;
