export interface ScholarshipStudent {
  id: string;
  class: string;
  name: string;
  scholarshipType: string;
  amount: number;
  session: string;
}

export interface ScholarshipSession {
  year: string;
  students: ScholarshipStudent[];
  totalAmount: number;
  totalStudents: number;
}

export interface ScholarshipCriteria {
  meritBased: {
    internalStudents: string;
    newStudents: string;
    boardClasses: string;
  };
  specialCategories: {
    orphan: string;
    specialChild: string;
    kinship: string;
  };
  rules: string[];
}

export interface ScholarshipStats {
  totalAmount: number;
  totalStudents: number;
  averageAmount: number;
  topCategory: string;
  testDate: string;
  testLocation: string;
}

export interface ScholarshipType {
  type: string;
  amount: string;
  criteria: string;
  description: string;
}
