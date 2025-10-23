import { ScholarshipSession, ScholarshipStats, ScholarshipCriteria, ScholarshipType } from '@/types/scholarship';

// Scholarship Statistics
export const scholarshipStats: ScholarshipStats = {
  totalAmount: 1500000, // 15 lacs
  totalStudents: 200,
  averageAmount: 7500,
  topCategory: "Merit-Based",
  testDate: "March 23rd",
  testLocation: "Girls Campus, Havelian"
};

// Scholarship Types
export const scholarshipTypes: ScholarshipType[] = [
  {
    type: "Merit-Based Scholarship",
    amount: "₨32,000 - ₨83,000",
    criteria: "95%+ marks (internal) or 80%+ entrance test",
    description: "Academic excellence scholarships for outstanding students"
  },
  {
    type: "Orphan Scholarship", 
    amount: "₨32,000 - ₨66,500",
    criteria: "Orphan status verification required",
    description: "Support for orphaned students"
  },
  {
    type: "Special Child Scholarship",
    amount: "₨32,000",
    criteria: "Special needs documentation required",
    description: "Support for students with special needs"
  },
  {
    type: "Kinship Scholarship",
    amount: "₨32,000",
    criteria: "Family relationship verification required",
    description: "Support for family members of existing students"
  },
  {
    type: "Deserving Scholarship",
    amount: "₨66,500",
    criteria: "Financial hardship assessment",
    description: "Need-based financial assistance"
  },
  {
    type: "Pakians Scholarship",
    amount: "Variable",
    criteria: "95%+ in annual examinations",
    description: "Merit-based scholarships for internal students"
  }
];

// Scholarship Criteria
export const scholarshipCriteria: ScholarshipCriteria = {
  meritBased: {
    internalStudents: "Pakians students from class 1st to class 8th who will secure 95% and above marks in their annual examination will be eligible for announced scholarship on announced seats.",
    newStudents: "Students from class Ist to 9th new appearing for entrance test for new admission will be eligible for announced seats if secure 80% and above in entrance test.",
    boardClasses: "For board classes 9th, 10th, 1st & 2nd Year the scholarship will be solely based on board results declared by board and according to scholarship policy of the institution."
  },
  specialCategories: {
    orphan: "Orphan status verification required with proper documentation",
    specialChild: "Special needs documentation and medical certificates required",
    kinship: "Family relationship verification with existing students or staff"
  },
  rules: [
    "The scholarship will be solely based on the Ist time board result/ interview/ entry test results declared by the institution and marks obtained after retotaling will not be entertained.",
    "Students migrated from other institutions in board classes such as SSC-II and HSSC-II, the scholarship will be at discretion of decision of BOG.",
    "No school/college leaving certificate/migration will be issued to the scholarship students during session. If any parents desire, full fee of the session will be paid and then SLC/Migration will be issued to their son/daughter/ward.",
    "Ill discipline activities (Long absentees, absentees in tests/exams, bringing of impermissible items, mobile, electronic devices, snuff, cigarette, misbehave with students, faculty and administrative staff inside or outside the school/college) will lead to termination of scholarship.",
    "Every year scholarship scheme can be revised and there will be no alteration in this scheme on the request of parents and it cant be challenged in any court, students will be drawn from scholarship if they did n't fulfill the criteria announced by the institution every year."
  ]
};

// Sample scholarship data for 2024-25 session
export const scholarshipData2024_25: ScholarshipSession = {
  year: "2024-25",
  totalAmount: 1500000,
  totalStudents: 50,
  students: [
    { id: "1", class: "9th", name: "Aiman Batool", scholarshipType: "Merit base Scholarship", amount: 66500, session: "2024-25" },
    { id: "2", class: "9th", name: "Saira Azam", scholarshipType: "Merit base Scholarship", amount: 66500, session: "2024-25" },
    { id: "3", class: "9th", name: "Fatima Khan", scholarshipType: "Deserving Scholarship", amount: 66500, session: "2024-25" },
    { id: "4", class: "11th", name: "Aqsa Tariq", scholarshipType: "Merit base Scholarship", amount: 83000, session: "2024-25" },
    { id: "5", class: "Nur", name: "Fatiha Hafeez", scholarshipType: "Kinship Scholarship", amount: 32000, session: "2024-25" },
    { id: "6", class: "Nur", name: "Muhammad Ibrahim", scholarshipType: "Kinship Scholarship", amount: 32000, session: "2024-25" },
    { id: "7", class: "KG", name: "Eshmal", scholarshipType: "Orphan Scholarship", amount: 32000, session: "2024-25" },
    { id: "8", class: "KG", name: "Abdul Azeem", scholarshipType: "Merit Based Scholarship", amount: 32000, session: "2024-25" },
    { id: "9", class: "2nd", name: "Abdul Wahab", scholarshipType: "Orphan Scholarship", amount: 47000, session: "2024-25" },
    { id: "10", class: "2nd", name: "Umama Nawaz", scholarshipType: "Merit base Scholarship", amount: 47000, session: "2024-25" },
    { id: "11", class: "2nd", name: "Husnain Mohavia", scholarshipType: "Merit base Scholarship", amount: 47000, session: "2024-25" },
    { id: "12", class: "3rd", name: "Uzair", scholarshipType: "Merit Based Scholarship", amount: 47000, session: "2024-25" },
    { id: "13", class: "3rd", name: "Haniya Qazi", scholarshipType: "Merit Based Scholarship", amount: 47000, session: "2024-25" },
    { id: "14", class: "4th", name: "Harram", scholarshipType: "Merit Based Scholarship", amount: 47000, session: "2024-25" },
    { id: "15", class: "5th", name: "Muqeeb Gulzar", scholarshipType: "Orphan Scholarship", amount: 47000, session: "2024-25" },
    { id: "16", class: "6th", name: "Usman Mohavia", scholarshipType: "Orphan Scholarship", amount: 57000, session: "2024-25" },
    { id: "17", class: "8th", name: "Husnain Mohavia", scholarshipType: "Orphan Scholarship", amount: 57000, session: "2024-25" },
    { id: "18", class: "8th", name: "Aiman Noor", scholarshipType: "Orphan Scholarship", amount: 57000, session: "2024-25" },
    { id: "19", class: "9th B", name: "Husnain Mohavia", scholarshipType: "Orphan Scholarship", amount: 66500, session: "2024-25" },
    { id: "20", class: "9th G", name: "Aiman Noor", scholarshipType: "Orphan Scholarship", amount: 66500, session: "2024-25" }
  ]
};

// All sessions data
export const allScholarshipSessions: ScholarshipSession[] = [
  scholarshipData2024_25,
  // Add more sessions as needed
];
