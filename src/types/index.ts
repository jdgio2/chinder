
export interface Profile {
  id: string;
  name: string;
  age: number;
  location?: {
    latitude: number;
    longitude: number;
  };
  preferences: Preferences;
}

export interface Preferences {
  worshipStyle: {
    [key: string]: number; // e.g., "Contemporary": 0.8
  };
  denominationWeights: {
    [key: string]: number; // e.g., "Baptist": 0.5
  };
  sizePreference: string; // "Small", "Medium", "Large", "Megachurch"
  emphasisWeights: {
    [key: string]: number; // e.g., "Bible Study": 0.9
  };
  serviceFormality: string; // "Casual", "Formal", "Mixed"
  maxDistance: number; // kilometers or miles
}

export interface Church {
  id: string;
  name: string;
  description: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  denomination: string;
  denominationId: number;
  worshipStyle: string;
  sizeCategory: string;
  emphasis: string[];
  serviceFormality: string;
  websiteUrl?: string;
  sermonUrl?: string;
  serviceTimes: {
    [day: string]: string[];
  };
  pastorIntro?: string;
  images: string[];
  socialMediaLinks?: {
    [platform: string]: string;
  };
  matchPercentage?: number; // Calculated field
  distance?: number; // Calculated field in km/miles
}

export interface Match {
  userId: string;
  churchId: string;
  swipeAction: 'left' | 'right';
  timestamp: string;
}

export interface Visit {
  userId: string;
  churchId: string;
  visitDate: string;
  rating?: number;
  notes?: string;
  didAlignExpectations?: boolean;
}

export type QuestionnaireSection = {
  title: string;
  questions: {
    id: string;
    question: string;
    type: 'single' | 'multiple' | 'slider' | 'text';
    options?: string[];
    min?: number;
    max?: number;
    step?: number;
  }[];
};
