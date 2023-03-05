import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from '@app/components/common/Dropdown/Dropdown';
import { Tag as ITag } from '../../interfaces';
import { kanbanDifficulty } from 'constants/kanbanTags';
import * as S from './TagDropdown.styles';
import { Tag } from 'components/common/Tag/Tag';
import { PlusCircleFilled } from '@ant-design/icons';

interface TagDropdownProps {
  selectedTags: ITag[];
  setSelectedTags?: (state: ITag[]) => void;
}

export const TagDropdown: React.FC<TagDropdownProps> = ({ selectedTags, setSelectedTags }) => {
  const { t } = useTranslation();

  const kanbanTagData = Object.values(kanbanDifficulty);
  const selectedTagsIds = selectedTags.map((item) => item.id);

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const onTagClick = (tag: ITag) => {
    const isSelected = selectedTagsIds.includes(tag.id);
    const updatedTags = isSelected ? [] : [tag];
    setSelectedTags ? setSelectedTags(updatedTags): undefined;
  };

  return (
    <Dropdown
      trigger={['click']}
      open={dropdownVisible}
      onVisibleChange={setDropdownVisible}
      overlay={
        <S.EditTagPopover>
          {kanbanTagData.map((tag: ITag) => (
            <S.EditTagPopoverLine
              key={tag.id}
              onClick={(e) => {
                onTagClick(tag);
                e.stopPropagation();
              }}                
            >
              <S.PopoverCheckbox checked={selectedTagsIds.includes(tag.id)} />
              <S.TagWrapper backgroundColor={tag.bgColor}>#{tag.title}</S.TagWrapper>
            </S.EditTagPopoverLine>
          ))}
          <S.RemoveTagWrapper onClick={() => setDropdownVisible(false)} >
            <S.RemoveTag />   
          </S.RemoveTagWrapper>
        </S.EditTagPopover>
      }
    >
      {selectedTags && selectedTags.length > 0 ? (
        <S.TagsWrapper>
          {selectedTags.map((tag) => (
            <Tag key={tag.id} {...tag} removeTag={() => onTagClick(tag)} />
          ))}
          <S.TagPlusWrapper>
            <PlusCircleFilled />
          </S.TagPlusWrapper>
        </S.TagsWrapper>
      ) : (
        <S.TagsWrapper>
          <S.AddTag>Select Difficulty </S.AddTag>
        </S.TagsWrapper>
      )}
    </Dropdown>
  );
};
