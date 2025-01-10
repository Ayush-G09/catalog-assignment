import {
  faCircleXmark,
  faGear,
  faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import PriceChart from "../components/PriceChart";
import { Tab, TimeFrame } from "../types";
import BtcCard from "../components/BtcCard";
import Label from "../components/Label";
import ChartContent from "../components/ChartContent";
import SummaryContent from "../components/SummaryContent";
import StatisticsContent from "../components/StatisticsContent";
import AnalysisContent from "../components/AnalysisContent";
import SettingContent from "../components/SettingContent";

type State = {
  tab: Tab;
  timeFrame: TimeFrame;
};

const tabs = [
  "Summary",
  "Chart",
  "Statistics",
  "Analysis",
  "Settings",
] as Tab[];

function Dashboard() {
  const [state, setState] = useState<State>({
    tab: "Summary",
    timeFrame: "1w",
  });

  const toggleTab = (tab: Tab) => {
    setState((prev) => ({ ...prev, tab: tab }));
  };

  const togggleTimeFrame = (timeFrame: TimeFrame) => {
    setState((prev) => ({ ...prev, timeFrame: timeFrame }));
  };

  return (
    <Container>
      <BtcCard />
      <TabsContainer>
        {tabs.map((tab) => (
          <StyledTab
            $selected={state.tab === tab}
            onClick={() => toggleTab(tab)}
            key={tab}
          >
            <Label size="18px" sx={{ cursor: "pointer" }}>
              {tab}
            </Label>
          </StyledTab>
        ))}
      </TabsContainer>
      <ContentWrapper>
        {state.tab === "Chart" && (
          <ChartContent
            timeFrame={state.timeFrame}
            togggleTimeFrame={togggleTimeFrame}
          />
        )}
        {state.tab === "Summary" && <SummaryContent />}
        {state.tab === "Statistics" && <StatisticsContent />}
        {state.tab === "Analysis" && <AnalysisContent />}
        {state.tab === "Settings" && <SettingContent />}
      </ContentWrapper>
    </Container>
  );
}

const StyledTab = styled.div<{ $selected: boolean }>`
  width: fit-content;
  height: 100%;
  box-sizing: border-box;
  padding: 0rem 1rem;
  margin-bottom: auto;
  cursor: pointer;
  color: ${(p) => (p.$selected ? "#1A243A" : "#6F7177")};
  border-bottom: ${(p) => (p.$selected ? "3px solid #4B40EE" : "none")};
  transition: border-bottom 0.2s ease-in-out;
`;

const TabsContainer = styled.div`
  width: 100%;
  height: 43px;
  box-sizing: border-box;
  padding: 0rem 2rem;
  border-bottom: 1px solid ${(p) => p.theme.border};
  margin-top: 40px;
  display: flex;
  align-items: end;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 1rem 5rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export default Dashboard;
