import React, { useState } from 'react';
import { Award, Search, AlertCircle, ArrowLeft } from 'lucide-react';

// Normalized college names to avoid duplicate counting
const finalistsData = [
  { sNo: 1,  psCode: 'EIM-02',          leader: 'Yogesh Saini',          team: '404 Found Us',          college: 'SISTec-R, Ratibad Bhopal',                      theme: 'Enterprise Information Management', problem: 'Establish a unified information exchange platform for Sagar Group to eliminate communication gaps, avoid duplication of effort, and enable effective collaboration across institutions.' },
  { sNo: 2,  psCode: 'HT-02',           leader: 'Shivansh Chourasia',     team: 'Aarambh',               college: 'School Of Information Technology',                theme: 'HealthTech',                        problem: 'Medical Knowledge Chatbot (Doctor Assistant)' },
  { sNo: 3,  psCode: 'HT-02',           leader: 'Priyanka Bhatnagar',     team: 'Aarogya',               college: 'SISTec-E, Ratibad Bhopal',                      theme: 'HealthTech',                        problem: 'Medical Chatbot' },
  { sNo: 4,  psCode: 'MS-01',           leader: 'Harsh Sikarwar',         team: 'Agri-Farm',             college: 'Sharda University, Agra',                        theme: 'Student Innovation',                problem: 'Student Innovation' },
  { sNo: 5,  psCode: 'SIH25027',        leader: 'Om uikey',               team: 'AgriNova',              college: 'SISTec-GN, Bhopal',                              theme: 'AgriTech',                          problem: 'Smart crop Advisory system for small and marginal farmers' },
  { sNo: 6,  psCode: '1555',            leader: 'Prem Kumar Paswan',      team: 'AgriVision',            college: 'SISTec-R, Ratibad Bhopal',                      theme: 'AgriTech',                          problem: 'Virtual Herbal Garden' },
  { sNo: 7,  psCode: 'MS-01',           leader: 'Priyansh Kamlesh',       team: 'AI TITANS',             college: 'SIRT, Bhopal',                                  theme: 'Student Innovation',                problem: 'AI Powered Mobile Platform for Democratizing Sports Talent' },
  { sNo: 8,  psCode: 'HT-02',           leader: 'Kanishk Gour',           team: 'Airocare',              college: 'SISTec-R, Ratibad Bhopal',                      theme: 'HealthTech',                        problem: 'Medical Knowledge Chatbot (Doctor Assistant)' },
  { sNo: 9,  psCode: 'EIM-01',          leader: 'Dev Kumar Panwar',       team: 'AlgoMind X',            college: 'SIRT, Bhopal',                                  theme: 'Enterprise Information Management', problem: 'Develop a centralized system to manage meetings, events, and policy records, improving efficiency, accountability, and knowledge retention.' },
  { sNo: 10, psCode: 'HT-01',           leader: 'Hemant Verma',           team: 'AnuNetra',              college: 'SISTec-E, Ratibad Bhopal',                      theme: 'HealthTech',                        problem: 'USG Report Analysis System using AI/ML' },
  { sNo: 11, psCode: 'EC-01',           leader: 'Keshav Chouhan',         team: 'Aqua Vision',           college: 'SISTec-E, Ratibad Bhopal',                      theme: 'Smart Device',                      problem: 'Smart Device' },
  { sNo: 12, psCode: 'HT-02',           leader: 'Chetan Charpe',          team: 'Arjunaa',               college: 'SISTec-R, Ratibad Bhopal',                      theme: 'HealthTech',                        problem: 'Medical Knowledge Chatbot (Doctor Assistant)' },
  { sNo: 13, psCode: 'EIM-03',          leader: 'Rayush bisen',           team: 'AstraX',                college: 'SIRT, Bhopal',                                  theme: 'Enterprise Information Management', problem: 'EventFlex - The On-Demand Platform for Event Staffing' },
  { sNo: 14, psCode: 'NA',              leader: 'Sarvagya Saxena',        team: 'Brain Hop',             college: 'GLA University',                                theme: 'Student Innovation',                problem: 'Brain Hop (Student Innovation)' },
  { sNo: 15, psCode: 'MS-17',           leader: 'Aryan Rajoriya',         team: 'Bug Busters',           college: 'SISTec-E, Ratibad Bhopal',                      theme: 'EduTech',                           problem: 'Alumni Connect Platform' },
  { sNo: 16, psCode: 'MS-01',           leader: 'Pranay Gumashta',        team: 'Code Cadets',           college: 'G.H. Raisoni College of Engineering, Nagpur',    theme: 'EduTech',                           problem: 'Student Innovation' },
  { sNo: 17, psCode: 'EIM-03',          leader: 'Priyanshu Arya',         team: 'Code Crafters',         college: 'SISTec-R, Ratibad Bhopal',                      theme: 'Enterprise Information Management', problem: 'EventFlex – The On-Demand Platform for Event Staffing' },
  { sNo: 18, psCode: 'EIM-03',          leader: 'Anshika Gadwal',         team: 'Code Theory',           college: 'SISTec-R, Ratibad Bhopal',                      theme: 'Enterprise Information Management', problem: 'EventFlex – The On-Demand Platform for Event Staffing' },
  { sNo: 19, psCode: 'MS-01',           leader: 'Rameshwar Maheshwari',   team: 'CodeBharat',            college: 'SISTec-E, Ratibad Bhopal',                      theme: 'Student Innovation',                problem: 'Transliterations tool for street signs' },
  { sNo: 20, psCode: 'EIM-03',          leader: 'Anurag Ahirwar',         team: 'CodeCrafters',          college: 'SISTec-E, Ratibad Bhopal',                      theme: 'Enterprise Information Management', problem: 'EventFlex – The On-Demand Platform for Event Staffing' },
  { sNo: 21, psCode: 'EIM-03',          leader: 'Vishal Jethwani',        team: 'CodeMates',             college: 'Oriental University, Indore',                   theme: 'Enterprise Information Management', problem: 'EventFlex – The On-Demand Platform for Event Staffing' },
  { sNo: 22, psCode: 'EIM-01',          leader: 'Himansh Dhomne',         team: 'CodeNova',              college: 'SISTec-R, Ratibad Bhopal',                      theme: 'Enterprise Information Management', problem: 'Develop a centralized system to manage meetings, events, and policy records, improving efficiency, accountability, and knowledge retention.' },
  { sNo: 23, psCode: 'MS-01',           leader: 'Aarambh rameniya',       team: 'CodeZilla',             college: 'SISTec-E, Ratibad Bhopal',                      theme: 'AgriTech',                          problem: 'Image Based Breed Recognition for Cattle and Buffaloes of India' },
  { sNo: 24, psCode: 'MS-02',           leader: 'Sameer rajoriya',        team: 'Crocodile',             college: 'Sage University, Bhopal',                        theme: 'AgriTech',                          problem: 'Student Innovation' },
  { sNo: 25, psCode: 'MS-01',           leader: 'Raj kumar Jangde',       team: 'CyberSquad',            college: 'SISTec-R, Ratibad Bhopal',                      theme: 'Student Innovation',                problem: 'Miscellaneous' },
  { sNo: 26, psCode: 'MS-01',           leader: 'Kartik Patel',           team: 'Dev Sync',              college: 'SISTec-R, Ratibad Bhopal',                      theme: 'Student Innovation',                problem: 'Student Innovation' },
  { sNo: 27, psCode: 'MS-01',           leader: 'Rohit',                  team: 'Final Byte',            college: 'Sage University, Bhopal',                        theme: 'Student Innovation',                problem: 'Automating Examination Seating Allocation for Educational Institutions' },
  { sNo: 28, psCode: 'EIM-01',          leader: 'Shourya Rathore',        team: 'Full Stackers',         college: 'SISTec-R, Ratibad Bhopal',                      theme: 'Enterprise Information Management', problem: 'Develop a centralized system to manage meetings, events, and policy records, improving efficiency, accountability, and knowledge retention' },
  { sNo: 29, psCode: 'MS-01',           leader: 'Akshat Jaiswal',         team: 'FYRB Challengers',      college: 'SISTec-R, Ratibad Bhopal',                      theme: 'Student Innovation',                problem: 'Student Innovation' },
  { sNo: 30, psCode: 'HCI-02',          leader: 'Monika Kawre',           team: 'GyaanSetu',             college: 'SISTec-E, Ratibad Bhopal',                      theme: 'Human-Computer Interaction',        problem: 'Custom Alexa Skills with Firebase & Web Integration.' },
  { sNo: 31, psCode: 'EIM-03',          leader: 'Shivam Indore',          team: 'Hackfinity',            college: 'Jagran Lakecity University, Bhopal',             theme: 'Enterprise Information Management', problem: 'EventFlex – The On-Demand Platform for Event Staffing' },
  { sNo: 32, psCode: 'EIM-01',          leader: 'RAVINA PATLE',           team: 'HYPER HACKERS',         college: 'SISTec-R, Ratibad Bhopal',                      theme: 'Enterprise Information Management', problem: 'Management of Events, Meetings and Policy Records' },
  { sNo: 33, psCode: 'ET-01',           leader: 'Tushar Das',             team: 'Innovators',            college: 'SISTec-R, Ratibad Bhopal',                      theme: 'EduTech',                           problem: 'Establish a centralized platform to enhance alumni engagement, ensuring structured opportunities for mentorship, networking, and institutional growth' },
  { sNo: 34, psCode: 'MS-01',           leader: 'Bhumika soni',           team: 'InnovHers',             college: 'SISTec-R, Ratibad Bhopal',                      theme: 'Student Innovation',                problem: 'EnLighten: A Transparent and Centralized College Admission Solution' },
  { sNo: 35, psCode: 'MS-01',           leader: 'Sumit Mewada',           team: 'Karma_Tech',            college: 'SISTec-GN, Bhopal',                              theme: 'EduTech',                           problem: 'Student Innovation' },
  { sNo: 36, psCode: 'MS-01',           leader: 'Suryansh Jain',          team: 'Lopside',               college: 'SISTec-R, Ratibad Bhopal',                      theme: 'Student Innovation',                problem: 'Student Innovation' },
  { sNo: 37, psCode: 'MS-01',           leader: 'Dheeraj Kumar',          team: 'Matrix',                college: 'Amity University, Madhya Pradesh',               theme: 'Urban Development',                 problem: 'Student Innovation' },
  { sNo: 38, psCode: 'HT-02',           leader: 'Krishna patel',          team: 'Medi Nexus',            college: 'SISTec-R, Ratibad Bhopal',                      theme: 'HealthTech',                        problem: 'Medical Knowledge Chatbot (Doctor Assistant)' },
  { sNo: 39, psCode: 'MS-01',           leader: 'Prakhya Khandelwal',     team: 'Nathatva',              college: 'LNCT, Bhopal',                                  theme: 'Smart Device',                      problem: 'AI-powered solar streetlights with self-cleaning and real-time traffic surveillance for smarter, wider monitoring' },
  { sNo: 40, psCode: 'ET-01',           leader: 'Shishul Kumar Chandel',  team: 'Neo Campus',            college: 'SISTec-R, Ratibad Bhopal',                      theme: 'EduTech',                           problem: 'Establish a centralized platform to enhance alumni engagement, ensuring structured opportunities for mentorship, networking, and institutional growth' },
  { sNo: 41, psCode: 'MS-01',           leader: 'Prabhat Kurmi',          team: 'Neo Coder',             college: 'SISTec-R, Ratibad Bhopal',                      theme: 'Student Innovation',                problem: 'Quiz Website' },
  { sNo: 42, psCode: 'MS-02',           leader: 'Samriddhi Chauhan',      team: 'NEURA',                 college: 'Madhav Institute of Technology and Science, Gwalior', theme: 'Student Innovation',           problem: 'Student Innovation' },
  { sNo: 43, psCode: 'UM-01',           leader: 'Akarsh Tiwari',          team: 'NEXUS',                 college: 'SISTec-R, Ratibad Bhopal',                      theme: 'Urban Mobility',                    problem: 'Smart Traffic Management for Urban Areas – Develop a simulation or model using AI and sensors for optimizing traffic flow in congested zones.' },
  { sNo: 44, psCode: 'MS-01',           leader: 'Manish Raj',             team: 'Novonixsoft',           college: 'Sharda University, Agra',                        theme: 'HealthTech',                        problem: 'Student Innovation' },
  { sNo: 45, psCode: 'SD-02',           leader: 'Sunanda gokhe',          team: 'SafeNet Automation',    college: 'SISTec-E, Ratibad Bhopal',                      theme: 'Smart Device',                      problem: 'Create a home automation hardware with real time Integration with firebase and a custom build website' },
  { sNo: 46, psCode: 'ET-01',           leader: 'Ram Bhandarkar',         team: 'SHARPRAD-X',            college: 'SISTec-E, Ratibad Bhopal',                      theme: 'EduTech',                           problem: 'Establish a centralized platform to enhance alumni engagement, ensuring structured opportunities for mentorship, networking, and institutional growth' },
  { sNo: 47, psCode: 'MS-01',           leader: 'Sahil Sahu',             team: 'Shiksha Scan',          college: 'SISTec-E, Ratibad Bhopal',                      theme: 'EduTech',                           problem: 'Automated Attendance System' },
  { sNo: 48, psCode: 'EIM-01',          leader: 'Shiv Raj Singh',         team: 'Shiv Raj Singh',        college: 'SIRT, Bhopal',                                  theme: 'Enterprise Information Management', problem: 'Develop a centralized system to manage meetings, events, and policy records, improving efficiency, accountability, and knowledge retention.' },
  { sNo: 49, psCode: 'Non-CSI',         leader: 'Shivani Singh',          team: 'SkillSync',             college: 'SISTec-R, Ratibad Bhopal',                      theme: 'Student Innovation',                problem: 'AI Powered Smart Attendance and Learning Engagement System' },
  { sNo: 50, psCode: 'MS-01',           leader: 'Kanchan Solanki',        team: 'SmartSolutions',        college: 'SISTec-R, Ratibad Bhopal',                      theme: 'Student Innovation',                problem: 'Student Innovation' },
  { sNo: 51, psCode: 'MS-01',           leader: 'Aastha Rathore',         team: 'Stackmindes',           college: 'SISTec-E, Ratibad Bhopal',                      theme: 'Student Innovation',                problem: 'AI-powered Personalized Study Mentor for Efficient Learning and Focus.' },
  { sNo: 52, psCode: 'HT-02',           leader: 'Tulsiram Pathe',         team: 'Syntex',                college: 'SISTec-R, Ratibad Bhopal',                      theme: 'HealthTech',                        problem: 'Medical Knowledge Chatbot (Doctor Assistant)' },
  { sNo: 53, psCode: 'MS-01',           leader: 'Arman Ansari',           team: 'Team Ignite',           college: 'SIRT, Bhopal',                                  theme: 'Student Innovation',                problem: 'Student Innovation' },
  { sNo: 54, psCode: 'EIM-03',          leader: 'Ayush Daharwal',         team: 'Team Invincible',       college: 'SISTec-R, Ratibad Bhopal',                      theme: 'Enterprise Information Management', problem: 'EventFlex – The On-Demand Platform for Event Staffing' },
  { sNo: 55, psCode: 'HT-02',           leader: 'Denim Hajare',           team: 'Team Raftaar',          college: 'SISTec-E, Ratibad Bhopal',                      theme: 'HealthTech',                        problem: 'Medical Knowledge Chatbot (Doctor Assistant)' },
  { sNo: 56, psCode: 'EIM-01',          leader: 'Anuj Malviya',           team: 'Team Spigen',           college: 'SISTec-R, Ratibad Bhopal',                      theme: 'Enterprise Information Management', problem: 'A Dedicated Meeting and Event Record Keeping Software' },
  { sNo: 57, psCode: 'MS-01',           leader: 'Mohit ahirwar',          team: 'TeamEMO',               college: 'SISTec-GN, Bhopal',                              theme: 'EduTech',                           problem: 'Current study platforms ignore student mental state, leading to stress, burnout, and boredom.' },
  { sNo: 58, psCode: 'MS-01',           leader: 'Tanishq Jain',           team: 'Tech Healers',          college: 'Oriental University, Indore',                   theme: 'Student Innovation',                problem: 'Student Innovation' },
  { sNo: 59, psCode: 'EIM-01',          leader: 'Abhay Dwivedi',          team: 'Tech Stackers',         college: 'Jagran Lakecity University, Bhopal',             theme: 'Enterprise Information Management', problem: 'Develop a centralized system to manage meetings, events, and policy records, improving efficiency, accountability, and knowledge retention.' },
  { sNo: 60, psCode: 'EIM-01',          leader: 'Aman barekar',           team: 'TechYoddha',            college: 'SISTec-R, Ratibad Bhopal',                      theme: 'Enterprise Information Management', problem: 'Enterprise Information Management' },
  { sNo: 61, psCode: 'CSI Member',      leader: 'Saifali Thakur',         team: 'TEJAS',                 college: 'SISTec-R, Ratibad Bhopal',                      theme: 'HealthTech',                        problem: 'Medical Chatbot' },
  { sNo: 62, psCode: 'ET-01',           leader: 'Raj Bisen',              team: 'The Bold Battalion',    college: 'SISTec-R, Ratibad Bhopal',                      theme: 'EduTech',                           problem: 'Establish a centralized platform to enhance alumni engagement, ensuring structured opportunities for mentorship, networking, and institutional growth' },
  { sNo: 63, psCode: 'EIM-03',          leader: 'Anshay Basene',          team: "The Carbon Crystal's",  college: 'SISTec-R, Ratibad Bhopal',                      theme: 'Enterprise Information Management', problem: 'EventFlex – The On-Demand Platform for Event Staffing' },
  { sNo: 64, psCode: 'EIM-01',          leader: 'Anant Kumar Singh',      team: 'The Unifiers',          college: 'SISTec-E, Ratibad Bhopal',                      theme: 'Enterprise Information Management', problem: 'Develop a centralized system to manage meetings, events, and policy records, improving efficiency, accountability, and knowledge retention.' },
  { sNo: 65, psCode: 'MS-01',           leader: 'Yash Tupkar',            team: 'VibeX',                 college: 'SISTec-R, Ratibad Bhopal',                      theme: 'Student Innovation',                problem: 'Student Innovation' },
  { sNo: 66, psCode: 'MS-01',           leader: 'Aman Malviya',           team: 'Vidhyasetu',            college: 'SISTec-R, Ratibad Bhopal',                      theme: 'Student Innovation',                problem: 'Digital Learning Platform for Rural School Student in Nabha' },
  { sNo: 67, psCode: 'UD-01',           leader: 'Shreya Mahajan',         team: 'Vision Hack',           college: 'Jagran Lakecity University, Bhopal',             theme: 'Urban Development',                 problem: 'Develop a technology-driven solution to accurately estimate and standardize district-level tourism data in Madhya Pradesh, addressing current gaps in visitor categories and reporting.' },
  { sNo: 68, psCode: 'ET-02',           leader: 'Ansh Patel',             team: 'VisionX',               college: 'Technocrats Institute of Technology, Bhopal',   theme: 'EduTech',                           problem: 'Friendly Online Exam Practice Portal – An Accessible Web-Based Platform for Competitive Exam Preparation for Visually Impaired Persons' }
];

const themeColors = {
  'HealthTech':                        'text-brand-gold bg-brand-gold/10 border-brand-gold/20',
  'AgriTech':                          'text-brand-gold bg-brand-gold/10 border-brand-gold/20',
  'EduTech':                           'text-brand-gold bg-brand-gold/10 border-brand-gold/20',
  'Enterprise Information Management': 'text-brand-gold bg-brand-gold/10 border-brand-gold/20',
  'Student Innovation':                'text-brand-gold bg-brand-gold/10 border-brand-gold/20',
  'Smart Device':                      'text-brand-gold bg-brand-gold/10 border-brand-gold/20',
  'Urban Mobility':                    'text-brand-gold bg-brand-gold/10 border-brand-gold/20',
  'Urban Development':                 'text-brand-gold bg-brand-gold/10 border-brand-gold/20',
  'Human-Computer Interaction':        'text-brand-gold bg-brand-gold/10 border-brand-gold/20',
};

const getThemeStyle = (theme) => themeColors[theme] || 'text-brand-gold bg-brand-gold/10 border-brand-gold/20';

const ITEMS_PER_PAGE = 15;

export default function SIH2025Finalists({ onViewChange }) {
  const [search, setSearch]           = useState('');
  const [filterTheme, setFilterTheme] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const allThemes = ['All', ...Array.from(new Set(finalistsData.map(d => d.theme))).sort()];
  const uniqueInstitutions = Array.from(new Set(finalistsData.map(d => d.college)));
  const uniquePsCodes      = Array.from(new Set(finalistsData.map(d => d.psCode)));

  const filtered = finalistsData.filter(item => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      item.leader.toLowerCase().includes(q) ||
      item.team.toLowerCase().includes(q) ||
      item.college.toLowerCase().includes(q) ||
      item.psCode.toLowerCase().includes(q) ||
      item.theme.toLowerCase().includes(q) ||
      item.problem.toLowerCase().includes(q);
    const matchesTheme = filterTheme === 'All' || item.theme === filterTheme;
    return matchesSearch && matchesTheme;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleSearch = (e) => { setSearch(e.target.value); setCurrentPage(1); };
  const handleTheme  = (t)  => { setFilterTheme(t); setCurrentPage(1); };

  return (
    <section className="relative min-h-screen bg-brand-darker pt-32 pb-24 px-4 sm:px-6 lg:px-8 text-white select-none">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 text-left">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <Award className="text-[var(--marigold)]" size={24} />
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[var(--clay)] uppercase font-display" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
                Grand Finale Teams — SIH 2025
              </h2>
            </div>
            <p className="text-[var(--ink-soft)] text-xs sm:text-sm font-medium font-sans">
              {finalistsData.length} teams competed at SISTec Innovation Hackathon 3.0 (SIH 2025).
            </p>
          </div>
          <button
            onClick={() => onViewChange && onViewChange('landing', '#home')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--panel)] border border-[var(--marigold)]/30 text-xs font-bold text-[var(--marigold)] hover:text-white transition-all duration-300 cursor-pointer shadow-md active:scale-95 shrink-0"
          >
            <ArrowLeft size={14} /> Back to Home
          </button>
        </div>


        {/* ── Stats Bar ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            {label: 'Total Teams',    value: finalistsData.length,       color: 'text-brand-gold'  },
            {label: 'Themes Covered', value: allThemes.length - 1,       color: 'text-brand-gold'  },
            {label: 'Institutions',   value: uniqueInstitutions.length,  color: 'text-brand-gold'  },
            {label: 'PS Codes',       value: uniquePsCodes.length,       color: 'text-brand-gold'  },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl bg-brand-card/30 border border-white/5 p-4 text-center shadow-md">
              <div className={`text-xl font-extrabold ${s.color}`}>{s.value}</div>
              <div className="text-[10px] text-brand-gray/60 font-medium mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Search ── */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gray/50" size={15} />
            <input
              type="text"
              placeholder="Search by team, leader, college, theme or PS code…"
              value={search}
              onChange={handleSearch}
              className="w-full bg-brand-card/30 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-brand-gray/40 focus:outline-none focus:border-brand-gold/40 transition-all"
            />
          </div>
        </div>

        {/* ── Theme Filter Chips ── */}
        <div className="flex flex-wrap gap-2 mb-8">
          {allThemes.map(theme => (
            <button
              key={theme}
              onClick={() => handleTheme(theme)}
              className={`px-3.5 py-2 rounded-full text-xs font-bold border transition-all duration-200 cursor-pointer ${
                filterTheme === theme
                  ? 'bg-brand-gold text-brand-dark border-brand-gold shadow-md scale-105'
                  : 'bg-brand-card/30 text-brand-gray/70 border-white/10 hover:border-brand-gold/30 hover:text-white'
              }`}
            >
              {theme}
            </button>
          ))}
        </div>

        {/* ── Result Count ── */}
        {(search || filterTheme !== 'All') && (
          <div className="flex items-center gap-2 text-xs text-brand-gray/60 mb-4">
            <AlertCircle size={13} className="text-brand-gold" />
            Showing <span className="text-brand-gold font-bold ml-1 mr-1">{filtered.length}</span> of {finalistsData.length} teams
          </div>
        )}

        {/* ── Desktop Table ── */}
        <div className="hidden md:block rounded-[2rem] bg-brand-card/15 backdrop-blur-md border border-white/5 overflow-hidden shadow-card-shadow mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1050px]">
              <thead>
                <tr className="border-b border-white/5 bg-brand-darker/60">
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-left w-12">
                    <span className="text-gold-metallic">#</span>
                  </th>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-left w-28">
                    <span className="text-gold-metallic">PS Code</span>
                  </th>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-left w-36">
                    <span className="text-gold-metallic">Leader Name</span>
                  </th>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-left w-36">
                    <span className="text-gold-metallic">Team Name</span>
                  </th>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-left w-44">
                    <span className="text-gold-metallic">Theme</span>
                  </th>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-left w-[360px]">
                    <span className="text-gold-metallic">Problem Statement</span>
                  </th>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-left">
                    <span className="text-gold-metallic">Institute</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-14 text-brand-gray/40 text-sm">
                      No teams match your search.
                    </td>
                  </tr>
                ) : (
                  paginated.map((item, idx) => (
                    <tr
                      key={idx}
                      className="group border-b border-white/5 bg-brand-card/5 hover:bg-brand-card/25 hover:shadow-[inset_4px_0_0_0_#FFB224] transition-all duration-300"
                    >
                      <td className="px-5 py-5">
                        <span className="font-mono text-sm font-bold text-white/40">{item.sNo}</span>
                      </td>
                      <td className="px-5 py-5">
                        <span className="font-mono text-xs font-bold text-brand-blue bg-brand-blue/10 border border-brand-blue/20 px-2.5 py-1.5 rounded-lg whitespace-nowrap">
                          {item.psCode}
                        </span>
                      </td>
                      <td className="px-5 py-5">
                        <span className="text-sm font-bold text-white leading-snug block">{item.leader}</span>
                      </td>
                      <td className="px-5 py-5">
                        <span className="text-sm font-bold text-brand-gold/90 leading-snug block">{item.team}</span>
                      </td>
                      <td className="px-5 py-5">
                        <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block">
                          {item.theme}
                        </span>
                      </td>
                      <td className="px-5 py-5 w-[360px] max-w-sm">
                        <span className="text-sm text-brand-gray/90 block leading-relaxed whitespace-normal break-words text-justify">
                          {item.problem}
                        </span>
                      </td>
                      <td className="px-5 py-5">
                        <span className="text-sm font-semibold text-brand-gray/70 leading-normal block">{item.college}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Mobile Cards ── */}
        <div className="md:hidden flex flex-col gap-4 mb-6">
          {paginated.length === 0 ? (
            <div className="text-center py-14 text-brand-gray/40 text-sm">No teams match your search.</div>
          ) : (
            paginated.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-brand-card/45 backdrop-blur-md border border-white/10 flex flex-col gap-3 relative overflow-hidden shadow-card-shadow text-left"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-orange via-brand-gold to-brand-blue"></div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-white/30">#{item.sNo}</span>
                  <span className="font-mono text-xs font-bold text-brand-blue bg-brand-blue/10 border border-brand-blue/20 px-2.5 py-1.5 rounded-lg whitespace-nowrap">
                    {item.psCode}
                  </span>
                </div>
                <div>
                  <p className="text-base font-extrabold text-brand-gold">{item.team}</p>
                  <p className="text-sm text-brand-gray/60 mt-0.5">Leader: {item.leader}</p>
                </div>
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block">
                  {item.theme}
                </span>
                <p className="text-sm text-brand-gray/60 font-semibold">{item.college}</p>
                <div className="pt-3 border-t border-white/5">
                  <span className="text-xs uppercase font-bold text-white/30 block mb-1">Problem Statement</span>
                  <p className="text-sm text-brand-gray leading-relaxed bg-brand-dark/40 p-3 rounded-xl border border-white/5 break-words text-justify">
                    {item.problem}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="mt-6">
            {/* Desktop Pagination */}
            <div className="hidden md:flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl bg-brand-card border border-white/10 text-xs font-bold text-brand-gray hover:text-white hover:border-brand-gold/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pg => (
                <button
                  key={pg}
                  onClick={() => setCurrentPage(pg)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    pg === currentPage
                      ? 'bg-brand-gold text-brand-dark border-brand-gold shadow-md'
                      : 'bg-brand-card/30 text-brand-gray border-white/10 hover:border-brand-gold/30 hover:text-white'
                  }`}
                >
                  {pg}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl bg-brand-card border border-white/10 text-xs font-bold text-brand-gray hover:text-white hover:border-brand-gold/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                Next →
              </button>
            </div>

            {/* Mobile Pagination */}
            <div className="flex md:hidden items-center justify-between w-full max-w-[280px] mx-auto">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl bg-brand-card border border-white/10 text-xs font-bold text-brand-gray hover:text-white hover:border-brand-gold/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                ← Prev
              </button>
              <span className="text-xs font-bold text-brand-gray/80">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl bg-brand-card border border-white/10 text-xs font-bold text-brand-gray hover:text-white hover:border-brand-gold/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        <p className="text-center text-[10px] text-brand-gray/40 mt-4">
          {filtered.length} teams shown
        </p>
      </div>
    </section>
  );
}
