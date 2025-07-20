export type Gig = {
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

export const gigs: Gig[] = [
  {
    id: '1',
    title: 'Social Media Manager',
    company: 'Innovate Co.',
    location: 'Remote',
    type: 'Freelance',
    description: 'Manage our social media channels and grow our online presence. Experience with scheduling tools and analytics is a must.',
    tags: ['Marketing', 'Social Media', 'Content Creation'],
    image: 'https://placehold.co/600x400.png',
    status: 'Active',
    openings: 1,
    applications: 42,
  },
  {
    id: '2',
    title: 'Frontend Developer Intern',
    company: 'Tech Solutions',
    location: 'New York, NY',
    type: 'Internship',
    description: 'Assist our frontend team in building and maintaining our web applications. Knowledge of React and TypeScript is required.',
    tags: ['React', 'TypeScript', 'Web Development'],
    image: 'https://placehold.co/600x400.png',
    status: 'Active',
    openings: 2,
    applications: 135,
  },
  {
    id: '3',
    title: 'Graphic Designer',
    company: 'Creative Studio',
    location: 'Remote',
    type: 'Part-time',
    description: 'Create compelling visual assets for various marketing campaigns, including social media graphics, ads, and website banners.',
    tags: ['Graphic Design', 'Adobe Suite', 'Branding'],
    image: 'https://placehold.co/600x400.png',
    status: 'Inactive',
    openings: 0,
    applications: 88,
  },
  {
    id: '4',
    title: 'Data Entry Clerk',
    company: 'Data Insights Inc.',
    location: 'Austin, TX',
    type: 'Part-time',
    description: 'Accurately input and manage data in our systems. High attention to detail and proficiency with spreadsheets is essential.',
    tags: ['Data Entry', 'Admin', 'Excel'],
    image: 'https://placehold.co/600x400.png',
    status: 'Inactive',
    openings: 0,
    applications: 50,
  },
  {
    id: '5',
    title: 'UI UX Designer',
    company: 'PixelPerfect Apps',
    location: 'San Francisco, CA',
    type: 'Full Time',
    description: 'Work with our design team on wireframing, prototyping, and user testing for our mobile apps. Experience with Figma is a plus.',
    tags: ['UX/UI', 'Figma', 'Mobile Design'],
    image: 'https://placehold.co/600x400.png',
    status: 'Active',
    openings: 12,
    applications: 135,
  },
  {
    id: '6',
    title: 'Full Stack Dev',
    company: 'Blogosphere',
    location: 'Remote',
    type: 'Full Time',
    description: 'Write engaging and SEO-optimized articles for our tech blog. Topics include software development, AI, and cloud computing.',
    tags: ['Writing', 'SEO', 'Content Marketing'],
    image: 'https://placehold.co/600x400.png',
    status: 'Inactive',
    openings: 8,
    applications: 100
  },
];

export const applications: Application[] = [
    {
        id: 'app1',
        gigId: '2',
        gigTitle: 'Frontend Developer Intern',
        company: 'Tech Solutions',
        dateApplied: '2024-06-15',
        status: 'Interviewing',
    },
    {
        id: 'app2',
        gigId: '3',
        gigTitle: 'Graphic Designer',
        company: 'Creative Studio',
        dateApplied: '2024-06-10',
        status: 'Pending',
    },
     {
        id: 'app3',
        gigId: '6',
        gigTitle: 'Content Writer',
        company: 'Blogosphere',
        dateApplied: '2024-05-28',
        status: 'Rejected',
    }
];

export const applicants: Record<string, Applicant[]> = {
    '1': [
        { id: 'usr1', name: 'Alice Johnson', email: 'alice@example.com', skills: ['Social Media', 'Hootsuite', 'Analytics'], applicationDate: '2024-07-01' },
        { id: 'usr2', name: 'Bob Williams', email: 'bob@example.com', skills: ['Content Creation', 'SEO', 'Community Management'], applicationDate: '2024-07-03' }
    ],
    '5': [
        { id: 'usr3', name: 'Charlie Brown', email: 'charlie@example.com', skills: ['Figma', 'Prototyping', 'User Research'], applicationDate: '2024-06-28' }
    ]
}
