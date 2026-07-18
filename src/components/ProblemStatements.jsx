import React, { useState } from 'react';
import { Search, X, Building2, Cpu, Sparkles, AlertCircle, Filter, Tag } from 'lucide-react';

export default function ProblemStatements() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [activeModalItem, setActiveModalItem] = useState(null);

  const problemStatements = [
    {
      sNo: 1,
      org: 'Madhya Pradesh State Tourism Development Corporation Limited, Government of Madhya Pradesh',
      statement: 'Develop a technology-driven solution to accurately estimate and standardize district-level tourism data in Madhya Pradesh, addressing current gaps in visitor categories and reporting.',
      psNumber: 'UD-01',
      category: 'Hardware/Software',
      domain: 'Urban Development',
      detailedDescription: 'Tourism analytics are critical for state planning. This problem requires building an end-to-end data aggregation platform that utilizes mobile check-ins, ticketing data, hotel registries, and local tourist hubs to compile unified district-level visitor flow metrics. It must account for domestic vs. international travelers and generate predictive trends for seasonal booking demands.',
      techStack: 'React, Node.js, Python, PostgreSQL, Data Aggregation APIs'
    },
    {
      sNo: 2,
      org: 'ITSC Technologies Pvt. Ltd. Bhopal',
      statement: 'Building Smart System for AI-driven Conversational Intelligence.',
      psNumber: 'HCI-01',
      category: 'Software',
      domain: 'Human-Computer Interaction',
      detailedDescription: 'Conversational agents often lack contextual awareness and long-term memory. The objective is to build a state-of-the-art smart chat intelligence layer using local LLMs that can handle multi-turn conversations, process uploaded documents on-the-fly, and retain user preferences dynamically across sessions without massive latency.',
      techStack: 'Next.js, FastAPI, LangChain, PyTorch, Llama-3-8B'
    },
    {
      sNo: 3,
      org: 'ITSC Technologies Pvt. Ltd. Bhopal',
      statement: 'USG Report Analysis System using AI/ML',
      psNumber: 'HT-01',
      category: 'Software',
      domain: 'HealthTech',
      detailedDescription: 'Ultrasonography reports contain complex medical terminology that is hard for general practitioners to extract instantly. Develop an OCR and NLP-based pipeline to scan printed or digital USG reports, extract anomalous findings, correlate them with standard medical reference lists, and summarize the key flags in plain language.',
      techStack: 'Python, OpenCV, Tesseract OCR, transformers, Hugging Face'
    },
    {
      sNo: 4,
      org: 'ITSC Technologies Pvt. Ltd. Bhopal',
      statement: 'Medical Knowledge Chatbot (Doctor Assistant)',
      psNumber: 'HT-02',
      category: 'Software',
      domain: 'HealthTech',
      detailedDescription: 'Doctors need rapid access to guidelines, drug-drug interaction databases, and treatment histories. Build a highly secure conversational assistant that integrates Retrieval-Augmented Generation (RAG) over official medical literature to answer clinician queries with precise reference citations, avoiding AI hallucinations.',
      techStack: 'React, FastAPI, Vector Database (ChromaDB), OpenAI API / RAG'
    },
    {
      sNo: 5,
      org: 'Unnat Bharat Abhiyan',
      statement: 'AI-Based Defect Detection in Structures - Develop an AI-based system to analyze images of buildings and identify cracks or defects.',
      psNumber: 'UD-02',
      category: 'Hardware',
      domain: 'Urban Development',
      detailedDescription: 'Manual structural auditing is slow, expensive, and error-prone. This project involves prototyping an automated visual inspection tool using computer vision. The system should parse drone-captured images of high-rises or bridges, classify concrete cracks (structural vs. cosmetic), measure crack width, and log coordinates on a digital twin.',
      techStack: 'Python, PyTorch, YOLOv8, OpenCV, Drone API Integrations'
    },
    {
      sNo: 6,
      org: 'Unnat Bharat Abhiyan',
      statement: 'Remote Sensing for Land Use Analysis - Use GIS and remote sensing to analyze urban expansion and suggest sustainable planning strategies.',
      psNumber: 'UD-03',
      category: 'Software',
      domain: 'Urban Development',
      detailedDescription: 'Unplanned urbanization leads to environmental degradation. Utilize sentinel satellite imagery and GIS libraries to track changes in green cover, water bodies, and concrete footprints over the last decade. Provide automated recommendations on ideal zones for future green belts and sustainable city expansions.',
      techStack: 'Python, QGIS API, Google Earth Engine, Pandas, Scikit-learn'
    },
    {
      sNo: 7,
      org: 'Unnat Bharat Abhiyan',
      statement: 'Flood Risk Mapping using QGIS - Create a flood risk model for a given area using open-source GIS tools.',
      psNumber: 'UD-04',
      category: 'Software',
      domain: 'Urban Development',
      detailedDescription: 'Climate change has amplified unpredictable flooding events. Build a computational model that inputs elevation profiles (DEM files), soil permeability, historical rainfall, and river basin structures to map flood inundation risk zones. The output must be visualized as interactive layered maps.',
      techStack: 'Python, QGIS, Rasterio, Leaflet.js, GeoJSON'
    },
    {
      sNo: 8,
      org: 'Unnat Bharat Abhiyan',
      statement: 'Zero-Waste Construction Site - Propose a plan to minimize waste in construction projects and create a circular economy model.',
      psNumber: 'UD-05',
      category: 'Software',
      domain: 'Urban Development',
      detailedDescription: 'Construction debris is a massive pollutant. Create an IoT and web-based logistics dashboard that tracks construction material inputs and waste yields. It should use AI to suggest waste recycling avenues (e.g. crushing concrete for aggregate) and match sites with local recycling facilities in real time.',
      techStack: 'React, Node.js, Express, MongoDB, Google Maps API'
    },
    {
      sNo: 9,
      org: 'Unnat Bharat Abhiyan',
      statement: 'Self-Sustaining Smart Campus - Design a college campus model with energy-efficient and water-saving technologies.',
      psNumber: 'UD-06',
      category: 'Hardware',
      domain: 'Urban Development',
      detailedDescription: 'Educational campuses consume significant utility budgets. Develop a centralized smart dashboard that monitors water tank levels, solar panel yields, and room electricity consumptions via micro-controller nodes (ESP32). It must execute smart load shedding and flag leaks or anomalies immediately.',
      techStack: 'ESP32, Arduino, LoRaWAN, MQTT Broker, React Dashboard'
    },
    {
      sNo: 10,
      org: 'Department of Agriculture, Government of Madhya Pradesh',
      statement: 'Smart Crop Disease Detection using UAV Imagery and AI/ML classifiers.',
      psNumber: 'AG-01',
      category: 'Software',
      domain: 'Smart Agriculture',
      detailedDescription: 'Fungal and pest infections can ruin crop yields before they are visible from the ground. Build an AI engine that analyzes multispectral UAV images to identify early crop stress zones and suggests specific localized bio-pesticide treatments.',
      techStack: 'Python, TensorFlow, ResNet, OpenCV, Leaflet GIS'
    },
    {
      sNo: 11,
      org: 'Municipal Corporation Bhopal',
      statement: 'IoT-enabled Smart Solid Waste Segregation and Bin Routing optimization.',
      psNumber: 'UD-07',
      category: 'Hardware/Software',
      domain: 'Urban Development',
      detailedDescription: 'Inefficient garbage collection leads to overflowing bins and high fuel expenses. Prototype a smart bin sensor that measures fill levels and triggers optimized route calculations for municipal collection trucks.',
      techStack: 'Node.js, C++ (Arduino), GPS APIs, Google Maps OR-Tools'
    },
    {
      sNo: 12,
      org: 'Directorate of Technical Education, Government of MP',
      statement: 'Gamified AR Platform for vocational skill training and engineering laboratory experiments.',
      psNumber: 'ED-01',
      category: 'Software',
      domain: 'Smart Education',
      detailedDescription: 'Rural institutes lack expensive lab hardware. Build an augmented reality web application that lets students conduct virtual chemistry, physics, and electronics experiments with step-by-step gamified guides.',
      techStack: 'Three.js, WebXR, React, Blender (3D models)'
    },
    {
      sNo: 13,
      org: 'MP Police Department',
      statement: 'Real-time traffic congestion prediction and automated emergency vehicle routing system using traffic camera feeds.',
      psNumber: 'UM-01',
      category: 'Software',
      domain: 'Urban Mobility',
      detailedDescription: 'Traffic jams delay emergency services. Build a computer vision system that monitors traffic density at major intersections, predicts bottlenecks, and dynamically adjusts green light durations to prioritize ambulances.',
      techStack: 'Python, YOLOv5, OpenCV, Apache Kafka, FastAPI'
    },
    {
      sNo: 14,
      org: 'MP State Cooperative Bank',
      statement: 'Web3-based transparent micro-credit lending platform for rural self-help groups (SHGs).',
      psNumber: 'FT-01',
      category: 'Software',
      domain: 'FinTech',
      detailedDescription: 'Self-help groups in rural areas face transparency issues during credit allocations. Build a simplified dApp that logs ledger loans on a blockchain and provides multi-signature approvals for fund releases.',
      techStack: 'Solidity, Hardhat, Ether.js, React, TailwindCSS'
    }
  ];

  // Unique domains for select options
  const uniqueDomains = ['All', ...new Set(problemStatements.map(item => item.domain))];

  // Filtering Logic
  const filteredStatements = problemStatements.filter(item => {
    const matchesSearch = 
      item.org.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.statement.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.psNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.domain.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesDomain = selectedDomain === 'All' || item.domain === selectedDomain;

    return matchesSearch && matchesCategory && matchesDomain;
  });

  return (
    <section className="relative pt-32 pb-24 bg-brand-darker min-h-screen overflow-hidden tech-grid-dense">
      {/* Background ambient glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-pink/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl text-left mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-orange/30 bg-brand-orange/10 text-xs font-bold text-brand-orange tracking-widest uppercase mb-4 animate-pulse">
            <Sparkles size={12} />
            Problem Statements Portal
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display">
            SIH 4.0 <span className="text-gold-metallic">National Challenges</span>
          </h1>
          <p className="text-brand-gray text-sm sm:text-base font-normal mt-4 leading-relaxed max-w-2xl">
            Browse through active problem statements submitted by state corporations, municipal bodies, and corporate partners. Filter, search, and align your team to win.
          </p>
        </div>

        {/* Uniform Filters Dashboard */}
        <div className="p-6 rounded-[2rem] bg-brand-card/30 backdrop-blur-md border border-white/5 shadow-card-shadow mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Search Input Box */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-[10px] font-bold text-brand-gray tracking-wider uppercase pl-1 flex items-center gap-1">
                <Search size={10} /> Search Challenges
              </label>
              <div className="relative h-12 rounded-2xl bg-brand-dark/45 border border-white/5 flex items-center px-4 transition-all focus-within:border-brand-blue/30">
                <Search className="text-brand-gray mr-2.5 shrink-0" size={16} />
                <input
                  type="text"
                  placeholder="PS number, keyword, organization..."
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
                  <option value="Hardware" className="bg-brand-dark text-white">Hardware</option>
                  <option value="Hardware/Software" className="bg-brand-dark text-white">Hardware/Software</option>
                </select>
              </div>
            </div>

            {/* Domain Dropdown Select */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-[10px] font-bold text-brand-gray tracking-wider uppercase pl-1 flex items-center gap-1">
                <Cpu size={10} /> Domain Bucket
              </label>
              <div className="relative h-12 rounded-2xl bg-brand-dark/45 border border-white/5 flex items-center px-4 transition-all focus-within:border-brand-blue/30">
                <Cpu className="text-brand-gray mr-2.5 shrink-0" size={14} />
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="w-full bg-transparent border-none text-xs sm:text-sm text-white focus:outline-none cursor-pointer"
                >
                  {uniqueDomains.map((dom, dIdx) => (
                    <option key={dIdx} value={dom} className="bg-brand-dark text-white">
                      {dom === 'All' ? 'All Domains' : dom}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Clean Organised Table */}
        <div className="rounded-[2rem] bg-brand-card/15 backdrop-blur-md border border-white/5 overflow-hidden shadow-card-shadow">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-white/5 bg-brand-darker/60">
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-20">
                    <span className="text-gold-metallic">S. No.</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-64">
                    <span className="text-gold-metallic">Organization</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider max-w-sm">
                    <span className="text-gold-metallic">Problem Statement</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-32">
                    <span className="text-gold-metallic">PS Number</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-44">
                    <span className="text-gold-metallic">Category</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-48">
                    <span className="text-gold-metallic">Domain Bucket</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-44 text-center">
                    <span className="text-gold-metallic">Problem Description</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredStatements.length > 0 ? (
                  filteredStatements.map((item, idx) => (
                    <tr 
                      key={idx}
                      className="hover:bg-white/[0.02] transition-colors duration-200 group"
                    >
                      {/* S.No */}
                      <td className="px-6 py-5 text-sm font-bold text-white/90 font-mono">
                        {item.sNo}
                      </td>

                      {/* Sponsoring Organization */}
                      <td className="px-6 py-5 text-xs text-brand-gray font-medium leading-relaxed max-w-[240px]">
                        {item.org}
                      </td>

                      {/* Problem Statement */}
                      <td className="px-6 py-5 text-xs text-brand-gray/90 leading-relaxed font-normal max-w-md">
                        {item.statement}
                      </td>

                      {/* PS Number */}
                      <td className="px-6 py-5 text-xs font-bold text-white/90 font-mono">
                        {item.psNumber}
                      </td>

                      {/* Category */}
                      <td className="px-6 py-5 text-xs text-brand-gray font-medium">
                        {item.category}
                      </td>

                      {/* Domain Bucket */}
                      <td className="px-6 py-5 text-xs text-brand-gray font-medium">
                        {item.domain}
                      </td>

                      {/* Action View Details */}
                      <td className="px-6 py-5 text-center">
                        <button
                          onClick={() => setActiveModalItem(item)}
                          className="text-xs font-bold text-brand-gold hover:text-white transition-colors duration-300 bg-transparent border-none cursor-pointer hover:underline"
                        >
                          View Description
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3 text-brand-gray">
                        <AlertCircle size={32} className="text-brand-orange animate-bounce" />
                        <p className="font-mono text-sm">No matching problem statements found.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Modal Overlay */}
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-brand-darker/80 backdrop-blur-md"
              onClick={() => setActiveModalItem(null)}
            ></div>
            
            <div className="relative w-full max-w-2xl rounded-3xl bg-brand-card/95 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.5)] p-6 md:p-8 overflow-hidden relative z-10 text-left animate-fade-in">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange via-brand-pink to-brand-blue"></div>

              <button 
                onClick={() => setActiveModalItem(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-brand-gray hover:text-white transition-all cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex flex-wrap items-center gap-2 mb-6 mt-2">
                <span className="px-3 py-1 rounded-lg bg-brand-dark border border-white/5 font-mono text-xs font-bold text-brand-blue tracking-wide">
                  PS Number: {activeModalItem.psNumber}
                </span>
                <span className="px-3 py-0.5 rounded-full border border-white/10 bg-white/5 text-brand-gray text-[10px] font-bold uppercase">
                  {activeModalItem.category}
                </span>
                <span className="px-3 py-0.5 rounded-full border border-brand-pink/20 bg-brand-pink/10 text-brand-pink text-[10px] font-bold uppercase">
                  {activeModalItem.domain}
                </span>
              </div>

              <div className="space-y-6">
                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-bold tracking-widest text-brand-gray uppercase">Sponsoring Organization</h4>
                  <div className="flex items-center gap-2.5 text-base font-bold text-white">
                    <span>{activeModalItem.org}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold tracking-widest text-brand-gray uppercase">Problem Statement Summary</h4>
                  <p className="text-xs sm:text-sm text-brand-gray leading-relaxed font-normal bg-brand-dark/45 p-4 rounded-2xl border border-white/5">
                    {activeModalItem.statement}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-bold tracking-widest text-brand-gray uppercase">Detailed Scope & Requirements</h4>
                  <p className="text-xs sm:text-sm text-brand-gray leading-relaxed font-normal">
                    {activeModalItem.detailedDescription}
                  </p>
                </div>

                <div className="space-y-1.5 pt-4 border-t border-white/5">
                  <h4 className="text-[10px] font-bold tracking-widest text-brand-gray uppercase">Suggested Technologies</h4>
                  <p className="text-xs font-mono font-bold text-brand-gold tracking-wide">
                    {activeModalItem.techStack}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="px-6 py-2.5 rounded-xl bg-btn-gradient text-sm font-bold text-white shadow-lg active:scale-95 transition-all cursor-pointer border-none"
                >
                  Close Details
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
