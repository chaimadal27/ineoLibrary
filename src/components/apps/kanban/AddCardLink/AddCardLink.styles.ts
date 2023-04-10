import { BORDER_RADIUS, FONT_SIZE } from '@app/styles/themes/constants';
import styled from 'styled-components';
import { Card as CommonCard } from 'components/common/Card/Card';

export const AddCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.75rem;
  width: 100%;
  border: 1px solid var(--border-color);
  border-radius: ${BORDER_RADIUS};
  cursor: pointer;
  font-size: ${FONT_SIZE.xxl};
  color: var(--border-color);
  .ql-editor {
    min-height: 70px
  }
  .ql-editor-Description {
    .ql-editor {
      min-height: 150px
    }  
  }
`;
export const Card = styled(CommonCard)`
  width: 100%;
  margin-bottom: 1.25rem;
  .ant-card-head-title {
    font-size: 1rem;
  }
  .ant-card-body {
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
    align-items: center;
  }
  .ant-card-body:before {
    display: none;
  }
  .ant-card-body:after {
    display: none;
  }
  &.ant-card-bordered {
    border: 1px solid var(--border-color);
  }
`;