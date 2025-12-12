'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import myImage from "../../../public/google-icon.png";
import useAuth from '@/hooks/useAuth';

interface Job {
  id: number;
  company: string;
  logo: string;
  title: string;
  tags: string[];
  role: string;
  salary: string;
  postedTime: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

const jobs: Job[] = [
  {
    id: 1,
    company: "Google",
    logo: "/google-icon.png",
    title: "Software Engineering Sourcer",
    tags: ["React", "Wikipedia", "Go"],
    role: "Kubernetes Developer",
    salary: "$123,000 - $500,000",
    postedTime: "2 hours",
    description: "Google is looking for an experienced Software Engineer to join our Kubernetes team. You'll work on scalable infrastructure that powers billions of users worldwide.",
    requirements: ["5+ years of experience with Kubernetes", "Strong Go programming skills", "Experience with React.js", "Cloud infrastructure knowledge"],
    benefits: ["Health insurance", "401k match", "Free meals", "Flexible work"]
  },
  {
    id: 2,
    company: "Meta",
    logo: "/google-icon.png",
    title: "Frontend Engineer - React",
    tags: ["React", "TypeScript", "Next.js"],
    role: "Senior React Developer",
    salary: "$150,000 - $550,000",
    postedTime: "4 hours",
    description: "Join Meta's Frontend team to build products used by billions. We're looking for experienced React engineers passionate about user experience.",
    requirements: ["3+ years React experience", "TypeScript expertise", "State management (Redux)", "Performance optimization"],
    benefits: ["Stock options", "Health + dental", "Learning budget", "Remote-first"]
  },
  {
    id: 3,
    company: "Microsoft",
    logo: "/google-icon.png",
    title: "Cloud Solutions Architect",
    tags: ["Azure", "C#", ".NET"],
    role: "Solutions Architect",
    salary: "$140,000 - $480,000",
    postedTime: "6 hours",
    description: "Design and implement cloud solutions on Azure. Work with enterprise clients to transform their digital infrastructure.",
    requirements: ["Azure certifications", ".NET/C# experience", "5+ years cloud experience", "Architecture design skills"],
    benefits: ["Relocation package", "Stock bonus", "Health coverage", "Tuition reimbursement"]
  },
  {
    id: 4,
    company: "Amazon",
    logo: "/google-icon.png",
    title: "Backend Engineer - AWS",
    tags: ["Python", "AWS", "DynamoDB"],
    role: "Backend Systems Engineer",
    salary: "$130,000 - $520,000",
    postedTime: "1 day",
    description: "Build scalable backend systems powering Amazon's e-commerce platform. Optimize for performance and reliability at massive scale.",
    requirements: ["Python or Java expertise", "AWS services experience", "Distributed systems", "API design experience"],
    benefits: ["Amazon RSU grants", "Day one benefits", "Career development", "Free AWS credits"]
  },
  {
    id: 5,
    company: "Apple",
    logo: "/google-icon.png",
    title: "iOS Developer",
    tags: ["Swift", "iOS", "UIKit"],
    role: "Senior iOS Engineer",
    salary: "$140,000 - $500,000",
    postedTime: "2 days",
    description: "Create world-class iOS applications for billions of Apple device users. Work on cutting-edge features and technologies.",
    requirements: ["5+ years iOS development", "Swift expertise", "App Store experience", "Performance optimization"],
    benefits: ["Apple products discount", "Innovation fund", "Health + wellness", "Relocation assistance"]
  },
  {
    id: 6,
    company: "Netflix",
    logo: "/google-icon.png",
    title: "Data Engineer",
    tags: ["Scala", "Spark", "Kafka"],
    role: "Senior Data Engineer",
    salary: "$145,000 - $540,000",
    postedTime: "3 days",
    description: "Build data pipelines that power Netflix's recommendation engine. Process petabytes of data to delight millions of subscribers.",
    requirements: ["Big Data experience", "Scala/Python", "Distributed computing", "Data warehousing"],
    benefits: ["Unlimited PTO", "Streaming perks", "Stock options", "Wellness programs"]
  },
  {
    id: 7,
    company: "OpenAI",
    logo: "/google-icon.png",
    title: "ML Engineer - LLMs",
    tags: ["Python", "PyTorch", "Transformers"],
    role: "Machine Learning Engineer",
    salary: "$150,000 - $600,000",
    postedTime: "5 hours",
    description: "Work on state-of-the-art large language models. Contribute to cutting-edge AI research and development.",
    requirements: ["ML/DL expertise", "PyTorch experience", "Research background", "Mathematics strong foundation"],
    benefits: ["Equity package", "Research opportunities", "Health + 401k", "Professional development"]
  },
  {
    id: 8,
    company: "Stripe",
    logo: "/google-icon.png",
    title: "Full Stack Engineer",
    tags: ["React", "Node.js", "PostgreSQL"],
    role: "Full Stack Developer",
    salary: "$135,000 - $510,000",
    postedTime: "1 day",
    description: "Build payment infrastructure used by millions. Work across frontend and backend to create seamless payment experiences.",
    requirements: ["Full stack experience", "Node.js expertise", "React proficiency", "Payment systems knowledge"],
    benefits: ["Flexible schedule", "Health insurance", "Commuter benefits", "Career growth"]
  }
];

export default function Home() {
  const router = useRouter();
  const { user, loading: isLoading, signOut } = useAuth();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationJob, setApplicationJob] = useState<Job | null>(null);

  // Redirect to auth page if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth');
    }
  }, [user, isLoading, router]);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
  };

  const handleApplyClick = (job: Job) => {
    setApplicationJob(job);
    setShowApplicationModal(true);
  };

  const closeJobModal = () => {
    setSelectedJob(null);
  };

  const closeApplicationModal = () => {
    setShowApplicationModal(false);
    setApplicationJob(null);
  };

  const handleLogout = () => {
    signOut();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <p className="text-black text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="flex flex-row h-dvh">
        <div className="profile bg-[#F9FAFB] p-5 h-full justify-between flex flex-col gap-5 flex-1">
          <h1 className="mb-26 mt-10 icon text-black mb-5 text-5xl/2">
            Shadow
          </h1>

          <div className=" flex flex-col gap-5 mt-3 mb-10">
            <h1 className="font-light  text-2xl text-black">
              {user.fullName}
            </h1>
            <div className=" rounded flex gap-5 items-center flex-row  text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-user-circle"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
              </svg>

              <div className="">
                <p className="text-md font-bold">Role</p>
                <span className="text-sm">{user.role || 'Web Developer'}</span>
              </div>
            </div>
            <div className="rounded flex gap-5 items-center flex-row  text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-books"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                <path d="M9 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                <path d="M5 8h4" />
                <path d="M9 16h4" />
                <path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041z" />
                <path d="M14 9l4 -1" />
                <path d="M16 16l3.923 -.98" />
              </svg>
              <div className="">
                <p className="text-md font-bold">Education</p>
                <span className="text-sm">{user.education || 'Not specified'}</span>
              </div>
            </div>
            <div className="rounded flex gap-5 items-center flex-row  text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-tool"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6 -6a6 6 0 0 1 -8 -8l3.5 3.5" />
              </svg>

              <div className="">
                <p className="text-md font-bold">Years of Experience</p>
                <span className="text-sm">{user.experience || 'Not specified'}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <button className="border-1 text-sm font-bold border-black text-black text-center rounded text-bold p-3 hover:bg-black/5">
              Update Resume
            </button>
            <button
              onClick={handleLogout}
              className="bg-[red] text-sm font-bold hover:bg-[red]/40 text-white text-left w-fit rounded text-bold p-3"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="job_board p-5 flex flex-col gap-5 h-full flex-3 overflow-y-auto">
          <div className="search mt-5 mb-10 h-15 w-vdw flex justify-center items-center align-center gap-5">
            <div className="text-black focus:outline-none focus:border-black border-black/60 border-1 w-150 flex  flex-row rounded-xl p-2">
            <input
              type="text"
              placeholder="search"
              className="w-full focus:outline-none text-sm"
            />
            <button className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-search"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                <path d="M21 21l-6 -6" />
              </svg>
            </button>    
            </div>
            
            <button className="text-black rounded-xl border-1 border-black p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-adjustments-horizontal"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M4 6l8 0" />
                <path d="M16 6l4 0" />
                <path d="M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M4 12l2 0" />
                <path d="M10 12l10 0" />
                <path d="M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M4 18l11 0" />
                <path d="M19 18l1 0" />
              </svg>
            </button>
            <button className="text-black rounded-xl border-1 border-black p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-list"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 6l11 0" />
                <path d="M9 12l11 0" />
                <path d="M9 18l11 0" />
                <path d="M5 6l0 .01" />
                <path d="M5 12l0 .01" />
                <path d="M5 18l0 .01" />
              </svg>
            </button>
          </div>
          <div className="cards flex gap-5 flex-col">
            <div className="card_section flex flex-wrap gap-5 justify-start align-center flex-row">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => handleJobClick(job)}
                  className="border-1 border-black rounded text-black p-5 h-60 flex flex-col gap-7 w-110 cursor-pointer hover:shadow-lg hover:border-black transition-all"
                >
                  <span className="font-bold  text-sm/2 text-black/40">
                    Posted • {job.postedTime} Ago{" "}
                  </span>
                  <div className=" justify-between  items-center  flex flex-row gap-8 ">
                    <Image
                      className="w-15 h-15 rounded mb-2 ml-5"
                      alt={job.company}
                      src={myImage}
                    />
                    <div className=" flex font-light gap-1 w-full items-start flex-col text-sm">
                      <p className="font-bold">{job.company}</p>
                      <span className="font-bold">{job.title}</span>
                      <span>{job.tags.join(" • ")}</span>
                      <span>Role • {job.role}</span>
                      <span>{job.salary}</span>

                      <div className="mt-2 flex justify-between w-full flex-row">
                        <button
                          className=" text-black"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-bookmark"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z" />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApplyClick(job);
                          }}
                          className="bg-black font-bold text-white rounded p-2 hover:bg-black/80"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="card_section"></div>
          </div>
        </div>

        {/* Job Description Modal */}
        {selectedJob && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeJobModal}
          >
            <div
              className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-black mb-2">
                    {selectedJob.title}
                  </h2>
                  <p className="text-xl text-black/60">{selectedJob.company}</p>
                </div>
                <button
                  onClick={closeJobModal}
                  className="text-black text-2xl hover:text-black/60"
                >
                  ✕
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-black mb-2">
                  Job Description
                </h3>
                <p className="text-black/70">{selectedJob.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-black mb-3">
                  Requirements
                </h3>
                <ul className="list-disc list-inside text-black/70 space-y-1">
                  {selectedJob.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-black mb-3">Benefits</h3>
                <ul className="list-disc list-inside text-black/70 space-y-1">
                  {selectedJob.benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <p className="text-lg font-bold text-black">
                  Salary: {selectedJob.salary}
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    handleApplyClick(selectedJob);
                    closeJobModal();
                  }}
                  className="flex-1 bg-black text-white font-bold rounded-lg p-3 hover:bg-black/80"
                >
                  Apply Now
                </button>
                <button
                  onClick={closeJobModal}
                  className="flex-1 border-2 border-black text-black font-bold rounded-lg p-3 hover:bg-black/5"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Application Modal */}
        {showApplicationModal && applicationJob && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeApplicationModal}
          >
            <div
              className="bg-white rounded-lg p-8 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-black">
                    Apply to {applicationJob.company}
                  </h2>
                  <p className="text-sm text-black/60 mt-1">
                    {applicationJob.title}
                  </p>
                </div>
                <button
                  onClick={closeApplicationModal}
                  className="text-black text-2xl hover:text-black/60"
                >
                  ✕
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(
                    `Application submitted for ${applicationJob.title}!`
                  );
                  closeApplicationModal();
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border border-black/20 rounded-lg p-3 text-black focus:outline-none focus:border-black"
                    placeholder="Michael D. Anderson"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full border border-black/20 rounded-lg p-3 text-black focus:outline-none focus:border-black"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full border border-black/20 rounded-lg p-3 text-black focus:outline-none focus:border-black"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Cover Letter
                  </label>
                  <textarea
                    rows={4}
                    className="w-full border border-black/20 rounded-lg p-3 text-black focus:outline-none focus:border-black resize-none"
                    placeholder="Tell us why you're interested in this role..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-black text-white font-bold rounded-lg p-3 hover:bg-black/80"
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={closeApplicationModal}
                    className="flex-1 border-2 border-black text-black font-bold rounded-lg p-3 hover:bg-black/5"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
