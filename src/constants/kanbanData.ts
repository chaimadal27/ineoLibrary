import { kanbanDifficulty } from './kanbanTags';
import { kanbanPeople } from './kanbanPeople';

const { high, medium, low } = kanbanDifficulty;



export const kanbanData = 
{
  id: '1',
  workshop_title: '',
  uses: 'Business Creation',
  target_skills: 'Computer Skills',
  duration: 1,
  workshop_method: 'Online',
  workshop_description: 'string',
  lanes: [
    {
      id: '00000000-0000-0000-0000-000000000000',
      session_title: 'string',
      cards: [
        {
         id:'00000000-0000-0000-0000-000000000000',
          activity_title: 'string',
          activity_method: 'Presential',
          activity_technique: 'Business simulation',
          activity_difficulty: [high],
          activity_duration: '4294967295',
          activity_objectives: 'string',
          activity_needs: 'Metaplan cards',
          activity_organization: 'string',
          activity_variations: 'string',
          activity_description:'test',
          created_at: '2023-02-25T01:32:26.497858Z'
        }
      ]
    }
  ],
  created_at: '2023-02-25T01:32:26.486721Z',
  updated_at: '2023-02-25T01:32:26.486751Z',
  deleted_at: 'null'
};