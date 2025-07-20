
export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Part-time' | 'Freelance' | 'Internship' | 'Contractor' | 'N/A' | 'Full Time';
  description: string;
  tags: string[];
  image: string;
  url?: string; // For external jobs
  status?: 'Active' | 'Inactive';
  openings?: number;
  applications?: number;
  socials?: {
    linkedin?: string;
  };
};

export type Application = {
  id: string;
  gigId: string;
  gigTitle: string;
  company: string;
  dateApplied: string;
  status: 'Pending' | 'Interviewing' | 'Offered' | 'Rejected';
};

export type Applicant = {
    id: string;
    name: string;
    email: string;
    skills: string[];
    applicationDate: string;
}
