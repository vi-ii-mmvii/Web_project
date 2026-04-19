export interface Group {
  id: number;
  name: string;
  description: string;
  code: string;
  members_count: number;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: 'study' | 'social' | 'work';
  group: number;
}

export interface Invitation {
  id: number;
  group: Group;
  status: 'pending' | 'accepted' | 'declined';
}
