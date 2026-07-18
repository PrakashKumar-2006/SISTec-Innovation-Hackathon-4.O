export const problemStatements = [
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
