import "react-quill/dist/quill.bubble.css";
import React from "react";
import { Activity } from "@app/store/slices/activitySlice";
import * as S from "./Explore.styles";
import { BORDER_RADIUS } from "@app/styles/themes/constants";
import ReactQuill from "react-quill";
// import { Select, Option } from "@app/components/common/selects/Select/Select";
// import { BaseButtonsForm } from "@app/components/common/forms/BaseButtonsForm/BaseButtonsForm";
// import { Popover } from "@app/components/common/Popover/Popover";
import { TagDropdown } from "../TagDropdown/TagDropdown";
import styled from "styled-components";

interface ExploreProps {
  key:string | number;
  activity: Activity;
  add: () => void;
}

export const Explore: React.FC<ExploreProps> = ({ key,activity, add }) => {
  const {
    // id,
    activity_title,
    // activity_method,
    // activity_technique,
    activity_difficulty,
    activity_duration,
    activity_objectives,
    // activity_needs,
    // activity_organization,
    // activity_variations,
    activity_description,
    // created_at,
  } = activity;
  //#2B3467

  const cardStyle = {
    borderRadius: BORDER_RADIUS,
    backgroundColor: "var(--background-color)",
    padding: `1.25rem 1rem`,
    marginBottom: "1rem",
    minWidth: "16rem",
    maxWidth: "16rem",
    // border: "solid",
  };

const Card = styled.div`
  border: solid;
  border-radius: 10px;
  transform: scale(0.95);
  background-color: var(--background-color);
`;

return (

  <Card>
    <style>{`
            .ql-editor-Description3 {
              .ql-editor {
                 min-height: 100px;
                 padding-top: 1px;
              }  
            }
          `}</style>
      <S.CardWrapper style={cardStyle} onClick={add} key={key}>
        <S.CollapseCard bordered={false} defaultActiveKey={["1"]}>
          <S.CardContent
            showArrow={false}
            key="1"
            header={
              <S.CardHeader>
                <S.CardTitle>
                  
                  <ReactQuill className="ql-editor-Description3" theme="bubble" value={activity_title} />
                </S.CardTitle>
                
              </S.CardHeader>
            }
          >
            <S.CardDetails>
              <ReactQuill className="ql-editor-Description3" theme="bubble" value={activity_objectives} />
            </S.CardDetails>
            <S.CardDetails>
              <TagDropdown selectedTags={activity_difficulty} />
            </S.CardDetails>
            <S.CardDetails>
              <S.Input value={activity_duration} border />
            </S.CardDetails>
            <S.CardDetails>
              <ReactQuill className="ql-editor-Description3" theme="bubble" value={activity_description} />
            </S.CardDetails>
          </S.CardContent>
        </S.CollapseCard>
      </S.CardWrapper>
 </Card>
 
  );
};
