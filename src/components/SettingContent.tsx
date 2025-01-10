import { Container } from "./SummaryContent";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Label from "./Label";

function SettingContent() {
  return (
    <Container>
      <FontAwesomeIcon icon={faGear} color="gray" size="5x" />
      <Label size="30px" sx={{ width: "100%", textAlign: "center" }}>
        Hope you like it! 😉
      </Label>
    </Container>
  );
}

export default SettingContent;
