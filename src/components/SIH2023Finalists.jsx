import React, { useState } from 'react';
import { Search, Tag, AlertCircle, Filter, X, Award, MapPin } from 'lucide-react';

const finalistsData = [
  {
    sNo: 1,
    psid: 'SM601',
    leader: 'Aman kumar Kushwaha',
    org: 'MP Police Crime Branch',
    category: 'Software',
    problem: 'Tracking intial and last IP address, and URL of false photographs , videos, documents or audio posted on the social media platforms.Global Photo video search report. Social Media link, local link, Friend Group Circle. Device Identification.',
    college: 'Jai Narain College of Technology (JNCT)'
  },
  {
    sNo: 2,
    psid: 'AG102',
    leader: 'Sudhanshu Yadav',
    org: 'ITSC Ltd',
    category: 'Software/Hardware',
    problem: 'Crop Identification using Machine Learning Model, which will help farmers for better judgement of healthy crop.',
    college: 'Sagar Institute of science technology and Research'
  },
  {
    sNo: 3,
    psid: 'CD801',
    leader: 'Anjali Mishra',
    org: 'MP Police Crime Branch',
    category: 'Software',
    problem: 'Maintaining police station wise data of all thieves,gangsters,vehical thieves, masked/hidden people. Maintaining the data of all criminals along with their previously registered crimes and the actions taken against the crime.',
    college: 'Sagar Institute of science technology and Research'
  },
  {
    sNo: 4,
    psid: 'VT701',
    leader: 'Shad Warsi',
    org: 'MP Police Crime Branch',
    category: 'Software',
    problem: 'Identification of hot-spot vehical theft areas with the help of CCTV / City Survillance Camera. Alert message to be generated as soon the theft vehicle crosses a survillance Camera.',
    college: 'Jai Narain College of Technology(JNCT)'
  },
  {
    sNo: 5,
    psid: 'CD801',
    leader: 'Jagdeep Pandey',
    org: 'MP Police Crime Branch',
    category: 'Software',
    problem: 'Maintaining police station wise data of all thieves,gangsters,vehical thieves, masked/hidden people. Maintaining the data of all criminals along with their previously registered crimes and the actions taken against the crime.',
    college: 'Sagar Institute of Science Technology and Research'
  },
  {
    sNo: 6,
    psid: 'CD801',
    leader: 'Ankit Mewada',
    org: 'MP Police Crime Branch',
    category: 'Software',
    problem: 'Maintaining police station wise data of all thieves,gangsters,vehical thieves, masked/hidden people. Maintaining the data of all criminals along with their previously registered crimes and the actions taken against the crime.',
    college: 'Sagar Institute of Science Technology and Research'
  },
  {
    sNo: 7,
    psid: 'ET401',
    leader: 'Harsh Kamde',
    org: 'DRMZ Tech',
    category: 'Software',
    problem: 'WebAPP like Udemy in which I as instructor can upload courses. The user can buy any course. After they buy through a paymet gateway, they get access to the course and able to watch in an inbuilt video player.. Login functionality needed to be implemented for both instructor and user.',
    college: 'Sagar Institute of Science Technology and Research'
  },
  {
    sNo: 8,
    psid: 'FE503',
    leader: 'Uma Shankar Mishra',
    org: 'MP Police Crime Branch',
    category: 'Software',
    problem: 'Daily duty details. Postings and transfers details.',
    college: 'Sagar Institute of Science Technology and Research'
  },
  {
    sNo: 9,
    psid: 'AG102',
    leader: 'Raja Ahirwar',
    org: 'ITSC LTD',
    category: 'Software/Hardware',
    problem: 'Crop Identification using Machine Learning Model, which will help farmers for better judgement of healthy crop.',
    college: 'Sagar Institute of Science Technology and Research'
  },
  {
    sNo: 10,
    psid: 'FE501',
    leader: 'Hariom Mewada',
    org: 'MP Police Crime Brach',
    category: 'Software',
    problem: 'Availability of all posted officers and Police personnels in police stations, status of work assigned with description and Progress.',
    college: 'Sagar Institute of Science Technology and Research'
  },
  {
    sNo: 11,
    psid: 'SM601',
    leader: 'Deewan Singh Mewada',
    org: 'MP Police Crime Branch',
    category: 'Software',
    problem: 'Tracking intial and last IP address, and URL of false photographs , videos, documents or audio posted on the social media platforms.Global Photo video search report. Social Media link, local link, Friend Group Circle. Device Identification.',
    college: 'Jai Narain Collage of Technology(JNCT)'
  },
  {
    sNo: 12,
    psid: 'HT303',
    leader: 'Bharat Joshi',
    org: 'DRMZ Tech',
    category: 'Software',
    problem: 'A patient management and video conference APP in which doctor and pateint can communicate on live video, the patient unique data should be stored in the database with each prescription.',
    college: 'Sagar Institute of Science Technology and Research'
  },
  {
    sNo: 13,
    psid: 'HT303',
    leader: 'Yogesh Kumar Soni',
    org: 'DRMZ Tech',
    category: 'Software',
    problem: 'A patient management and video conference APP in which doctor and pateint can communicate on live video, the patient unique data should be stored in the database with each prescription.',
    college: 'Sagar Institute of Science Technology and Research'
  },
  {
    sNo: 14,
    psid: 'CD801',
    leader: 'Roshni Maran',
    org: 'MP Police Crime Branch',
    category: 'Software',
    problem: 'Maintaining police station wise data of all thieves,gangsters,vehical thieves, masked/hidden people. Maintaining the data of all criminals along with their previously registered crimes and the actions taken against the crime.',
    college: 'Sagar Institute of Science Technology and Research'
  },
  {
    sNo: 15,
    psid: 'AG102',
    leader: 'Kulsum Jahan',
    org: 'ITSC LTD',
    category: 'Software/Hardware',
    problem: 'Crop Identification using Machine Learning Model, which will help farmers for better judgement of healthy crop.',
    college: 'Sagar Institute of Science Technology and Research'
  },
  {
    sNo: 16,
    psid: 'HT301',
    leader: 'Ankush Mishra',
    org: 'ITSC LTD',
    category: 'Software',
    problem: 'Automatic recognition of Human Disease using radiological data.',
    college: 'Sagar Institute of Science Technology and Research'
  },
  {
    sNo: 17,
    psid: 'FE503',
    leader: 'Priyanshu Janoriya',
    org: 'MP Police Crime Branch',
    category: 'Software',
    problem: 'Daily duty details. Postings and transfers details.',
    college: 'Sagar Institute of Science Technology and Research'
  },
  {
    sNo: 18,
    psid: 'MS202',
    leader: 'Siddharth Rajput',
    org: 'DRMZ Tech',
    category: 'Software',
    problem: 'Generate and send PDF or JPG certificate. The App should include a template in which data can be changed. Also, the user will add the list of emails and name of person in the App. App ned to change the name in each certificate and send individual mail to each person with certificate attached.',
    college: 'Jai Narain Collage of Technology(JNCT)'
  },
  {
    sNo: 19,
    psid: 'HT301',
    leader: 'Gunja Kumari',
    org: 'ITSC LTD',
    category: 'Software',
    problem: 'Automatic recognition of Human Disease using radiological data.',
    college: 'Sagar Institute of Science Technology and Research'
  },
  {
    sNo: 20,
    psid: 'FE501',
    leader: 'Amit patel',
    org: 'MP Police Crime Branch',
    category: 'Software',
    problem: 'Availability of all posted officers and Police personnels in police stations, status of work assigned with description and Progress.',
    college: 'Sage University Bhopal'
  },
  {
    sNo: 21,
    psid: 'ET401',
    leader: 'Kuldeep Kamare',
    org: 'DRMZ Tech',
    category: 'Software',
    problem: 'WebAPP like Udemy in which I as instructor can upload courses. The user can buy any course. After they buy through a paymet gateway, they get access to the course and able to watch in an inbuilt video player.. Login functionality needed to be implemented for both instructor and user.',
    college: 'Bansal Institute of Science and Technology'
  },
  {
    sNo: 22,
    psid: 'SM601',
    leader: 'Pawan Sondhiya',
    org: 'MP police Crime Branch',
    category: 'Software',
    problem: 'Tracking intial and last IP address, and URL of false photographs , videos, documents or audio posted on the social media platforms.Global Photo video search report. Social Media link, local link, Friend Group Circle. Device Identification.',
    college: 'Jai Narain Collage of Technology(JNCT)'
  },
  {
    sNo: 23,
    psid: 'CD801',
    leader: 'Archi Kirar',
    org: 'MP Police Crime Database',
    category: 'Software',
    problem: 'Maintaining police station wise data of all thieves,gangsters,vehical thieves, masked/hidden people. Maintaining the data of all criminals along with their previously registered crimes and the actions taken against the crime.',
    college: 'Sage University Bhopal'
  },
  {
    sNo: 24,
    psid: 'SM601',
    leader: 'Mridul Chaturvedi',
    org: 'MP Police Crime Branch',
    category: 'Software',
    problem: 'Tracking intial and last IP address, and URL of false photographs , videos, documents or audio posted on the social media platforms.Global Photo video search report. Social Media link, local link, Friend Group Circle. Device Identification.',
    college: 'Jai Narain Collage of Technology(JNCT)'
  },
  {
    sNo: 25,
    psid: 'AG102',
    leader: 'Komal Jethwani',
    org: 'ITSC LTD',
    category: 'Software/Hardware',
    problem: 'Crop Identification using Machine Learning Model, which will help farmers for better judgement of healthy crop.',
    college: 'Lakshmi Narain Collage of Technology'
  },
  {
    sNo: 26,
    psid: 'VT701',
    leader: 'Avanish Pathak',
    org: 'MP Police Crime Branch',
    category: 'Software',
    problem: 'Identification of hot-spot vehical theft areas with the help of CCTV / City Survillance Camera. Alert message to be generated as soon the theft vehicle crosses a survillance Camera.',
    college: 'Jai Narain Collage of Technology(JNCT)'
  },
  {
    sNo: 27,
    psid: 'ET401',
    leader: 'Ayush Dewang',
    org: 'DRMZ Tech',
    category: 'Software',
    problem: 'WebAPP like Udemy in which I as instructor can upload courses. The user can buy any course. After they buy through a paymet gateway, they get access to the course and able to watch in an inbuilt video player.. Login functionality needed to be implemented for both instructor and user.',
    college: 'Sagar Institute of Science Technology and Research'
  },
  {
    sNo: 28,
    psid: 'AG102',
    leader: 'Sohil Saudagar',
    org: 'ITSC LTD',
    category: 'Software/Hardware',
    problem: 'Crop Identification using Machine Learning Model, which will help farmers for better judgement of healthy crop.',
    college: 'Technocrats Institute of Technology'
  },
  {
    sNo: 29,
    psid: 'ET401',
    leader: 'Rythan Asthana',
    org: 'DRMZ Tech',
    category: 'Software',
    problem: 'WebAPP like Udemy in which I as instructor can upload courses. The user can buy any course. After they buy through a paymet gateway, they get access to the course and able to watch in an inbuilt video player.. Login functionality needed to be implemented for both instructor and user.',
    college: 'Lakshmi Narain Collage of Technology'
  },
  {
    sNo: 30,
    psid: 'AG102',
    leader: 'Kratin Mourya',
    org: 'ITSC LTD',
    category: 'Software/Hardware',
    problem: 'Crop Identification using Machine Learning Model, which will help farmers for better judgement of healthy crop.',
    college: 'Lakshmi Narain Collage of Technology'
  },
  {
    sNo: 31,
    psid: 'HT303',
    leader: 'Atul Gupta',
    org: 'DRMZ Tech',
    category: 'Software',
    problem: 'A patient management and video conference APP in which doctor and pateint can communicate on live video, the patient unique data should be stored in the database with each prescription.',
    college: 'Technocrats Institute of Technology'
  },
  {
    sNo: 32,
    psid: 'FE503',
    leader: 'Mohit Yadav',
    org: 'MP Police Crime Branch',
    category: 'Software',
    problem: 'Daily duty details. Postings and transfers details.',
    college: 'Sagar Institute of Science Technology and Research'
  },
  {
    sNo: 33,
    psid: 'AG102',
    leader: 'Arpit Singh',
    org: 'ITSC LTD',
    category: 'Software/Hardware',
    problem: 'Crop Identification using Machine Learning Model, which will help farmers for better judgement of healthy crop.',
    college: 'Lakshmi Narain Collage of Technology'
  },
  {
    sNo: 34,
    psid: 'HT301',
    leader: 'Vanshika Jain',
    org: 'ITSC LTD',
    category: 'Software',
    problem: 'Automatic recognition of Human Disease using radiological data.',
    college: 'Lakshmi Narain Collage of Technology'
  },
  {
    sNo: 35,
    psid: 'HT301',
    leader: 'Rupa Singh',
    org: 'ITSC LTD',
    category: 'Software',
    problem: 'Automatic recognition of Human Disease using radiological data.',
    college: 'Technocrafts Institute of Technology'
  }
];

export default function SIH2023Finalists({ onViewChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [selectedMobileIdx, setSelectedMobileIdx] = useState(0);

  // Filter items
  const filteredFinalists = finalistsData.filter((item) => {
    const matchesSearch = 
      item.leader.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.psid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.org.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.college.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = 
      selectedCategory === 'All' || 
      item.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="relative min-h-screen bg-brand-darker pt-32 pb-24 px-4 sm:px-6 lg:px-8 text-white select-none">
      {/* Background glow elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 text-left">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Award className="text-brand-gold" size={24} />
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-brand-gray to-brand-gold bg-clip-text text-transparent">
                SIH 1.0 Finalist Teams
              </h2>
            </div>
            <p className="text-brand-gray text-xs sm:text-sm font-normal max-w-xl">
              Archive list of the outstanding finalist teams from the 2023 edition (SIH 1.0). Filter or search to explore.
            </p>
          </div>
          <button
            onClick={() => onViewChange && onViewChange('landing', '#home')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-card border border-white/10 hover:border-brand-gold/50 text-xs font-bold text-brand-gold hover:text-white transition-all duration-300 cursor-pointer shadow-md active:scale-95 shrink-0"
          >
            &larr; Back to Home
          </button>
        </div>

        {/* Filters Dashboard */}
        <div className="p-6 rounded-[2rem] bg-brand-card/45 backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.35)] hover:border-brand-gold/15 transition-all duration-300 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Search Input Box */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-[10px] font-bold text-brand-gray tracking-wider uppercase pl-1 flex items-center gap-1">
                <Search size={10} /> Search Finalists
              </label>
              <div className="relative h-12 rounded-2xl bg-brand-dark/45 border border-white/5 flex items-center px-4 transition-all focus-within:border-brand-blue/30">
                <Search className="text-brand-gray mr-2.5 shrink-0" size={16} />
                <input
                  type="text"
                  placeholder="Leader, college, PSID, organization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent border-none text-xs sm:text-sm text-white placeholder-brand-gray focus:outline-none"
                />
              </div>
            </div>

            {/* Category Select Dropdown */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-[10px] font-bold text-brand-gray tracking-wider uppercase pl-1 flex items-center gap-1">
                <Tag size={10} /> Category Type
              </label>
              <div className="relative h-12 rounded-2xl bg-brand-dark/45 border border-white/5 flex items-center px-4 transition-all focus-within:border-brand-blue/30">
                <Filter className="text-brand-gray mr-2.5 shrink-0" size={14} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-transparent border-none text-xs sm:text-sm text-white focus:outline-none cursor-pointer"
                >
                  <option value="All" className="bg-brand-dark text-white">All Categories</option>
                  <option value="Software" className="bg-brand-dark text-white">Software</option>
                  <option value="Software/Hardware" className="bg-brand-dark text-white">Software/Hardware</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Desktop View Table */}
        <div className="hidden md:block rounded-[2rem] bg-brand-card/15 backdrop-blur-md border border-white/5 overflow-hidden shadow-card-shadow mb-10">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-white/5 bg-brand-darker/60">
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-16">
                    <span className="text-gold-metallic">S.No.</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-24">
                    <span className="text-gold-metallic">PSID</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-56">
                    <span className="text-gold-metallic">Team Leader</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-56">
                    <span className="text-gold-metallic">Organization</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-40">
                    <span className="text-gold-metallic">Category</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-[420px] max-w-md">
                    <span className="text-gold-metallic">Problem Statement</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-64">
                    <span className="text-gold-metallic">College Name</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredFinalists.length > 0 ? (
                  filteredFinalists.map((item, idx) => (
                    <tr 
                      key={idx}
                      className="group border-b border-white/5 bg-brand-card/5 hover:bg-brand-card/25 hover:shadow-[inset_4px_0_0_0_#FFB224] transition-all duration-300"
                    >
                      <td className="px-6 py-5">
                        <span className="font-mono text-xs font-bold text-white/50">{item.sNo}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="font-mono text-xs font-bold text-brand-gold bg-brand-gold/10 border border-brand-gold/20 px-2.5 py-1 rounded-lg">
                          {item.psid}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-xs font-bold text-white leading-snug block">{item.leader}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-xs font-medium text-brand-gray/80">{item.org}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-block px-2 py-0.5 rounded-lg border border-white/10 bg-white/5 text-[9px] font-bold uppercase tracking-wider text-brand-gray/80">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-5 w-[420px] max-w-md">
                        <span className="text-xs text-brand-gray/95 block leading-relaxed whitespace-normal break-words text-justify">
                          {item.problem}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-xs font-semibold text-brand-gray/80 leading-normal block">{item.college}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3 text-brand-gray">
                        <AlertCircle size={32} className="text-brand-orange animate-bounce" />
                        <p className="font-mono text-sm">No matching finalist teams found.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile List View (md:hidden) */}
        <div className="md:hidden flex flex-col gap-4 w-full text-left">
          {filteredFinalists.length > 0 ? (
            filteredFinalists.map((item, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-brand-card/45 backdrop-blur-md border border-white/10 bg-gradient-to-b from-brand-gold/5 to-transparent flex flex-col justify-between relative overflow-hidden shadow-card-shadow text-left"
              >
                {/* Decorative glowing top line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-orange via-brand-gold to-brand-blue"></div>

                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] font-bold text-brand-gold bg-brand-gold/10 border border-brand-gold/20 px-2.5 py-1 rounded-lg">
                    {item.psid}
                  </span>
                  <span className="text-[10px] font-bold text-brand-gray/50">
                    #{item.sNo}
                  </span>
                </div>
                
                <h4 className="text-xs font-bold text-white leading-snug mb-1">
                  {item.leader}
                </h4>
                <p className="text-[10px] text-brand-gray/60 mb-3 font-semibold">
                  {item.college}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-white/5 text-[11px] text-brand-gray mb-3">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-[9px] uppercase font-bold text-white/40">Sponsor</span>
                    <span className="font-medium text-white/80 text-right truncate max-w-[70%]">{item.org}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] uppercase font-bold text-white/40">Category</span>
                    <span className="font-bold text-brand-gold">{item.category}</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-white/5 text-[11px]">
                  <span className="text-[9px] uppercase font-bold text-white/40 block">Problem Statement</span>
                  <p className="text-xs text-brand-gray leading-relaxed font-normal bg-brand-dark/45 p-3 rounded-xl border border-white/5 break-words text-justify">
                    {item.problem}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center w-full">
              <div className="flex flex-col items-center gap-3 text-brand-gray">
                <AlertCircle size={32} className="text-brand-orange animate-bounce" />
                <p className="font-mono text-sm">No matching finalist teams found.</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
