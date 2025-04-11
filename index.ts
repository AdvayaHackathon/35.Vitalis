export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  medicalConditions: string[];
  medications: string[];
  emergencyContact: string;
}

export interface HealthMetrics {
  date: string;
  steps: number;
  calories: number;
  heartRate: number;
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
  bloodSugar?: number;
}

export interface DietPlan {
  condition: string;
  meals: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    snacks: string[];
  };
  restrictions: string[];
  recommendations: string[];
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: string;
}