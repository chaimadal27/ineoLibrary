interface Tag {
  id: string;
  activity_difficulty: string;
  bgColor: 'error' | 'warning' | 'success';
}

export interface KanbanTags {
  [key: string]: Tag;
}

export const kanbanDifficulty: KanbanTags = {
  high: {
    id: 'HIGH',
    activity_difficulty: 'High',
    bgColor: 'error',
  },
  medium: {
    id: 'INTERMIDIATE',
    activity_difficulty: 'Intermidiate',
    bgColor: 'warning',
  },
  low: {
    id: 'EASY',
    activity_difficulty: 'Easy',
    bgColor: 'success',
  },
};
