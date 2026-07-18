import React, { useState } from 'react';
import { Award, Search, HelpCircle, MapPin, AlertCircle, Sparkles, Layers, ArrowLeft } from 'lucide-react';

const finalistsData = [
  {
    sNo: 1,
    regNo: 'SIH2.0-001',
    leader: 'Damini singh',
    team: 'Cassiopeia',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Agri-Tech',
    psid: 'AG-01',
    problem: 'A user-friendly digital platform empowers rural women to share, collaborate, and document homemade remedies for various medical ailments. Serving as a collective repository of traditional health practices, it promotes community-driven healthcare solutions and empowers rural women as vital contributors to their communities well-being.'
  },
  {
    sNo: 2,
    regNo: 'SIH2.0-002',
    leader: 'Keshav Prajapati',
    team: 'Team Optimizers',
    college: 'Sage University, Bhopal',
    theme: 'Agri-Tech',
    psid: 'AG-02',
    problem: 'User-friendly IoT-enabled Precision Agriculture Platform that facilitates seamless data submission from farmers IoT devices to a cloud platform via API communication and empowers farmers to receive smart results, offering valuable insights for optimizing and enhancing their farming practices.'
  },
  {
    sNo: 3,
    regNo: 'SIH2.0-003',
    leader: 'Amit Patel',
    team: 'Dev TechFarmSolvers',
    college: 'Sage University, Bhopal',
    theme: 'Agri-Tech',
    psid: 'AG-03',
    problem: 'Farmer AI Platform to optimize crop yields based on specific nutritional demands, market trends, and sustainable agricultural methods'
  },
  {
    sNo: 4,
    regNo: 'SIH2.0-004',
    leader: 'Sumit Kumar Ahirwar',
    team: 'Innovators',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Agri-Tech',
    psid: 'AG-01',
    problem: 'A user-friendly digital platform empowers rural women to share, collaborate, and document homemade remedies for various medical ailments. Serving as a collective repository of traditional health practices, it promotes community-driven healthcare solutions and empowers rural women as vital contributors to their communities well-being.'
  },
  {
    sNo: 5,
    regNo: 'SIH2.0-005',
    leader: 'Parikshit Singh',
    team: 'Last Minute Logicians',
    college: 'Sage University, Bhopal',
    theme: 'Agri-Tech',
    psid: 'AG-01',
    problem: 'A user-friendly digital platform empowers rural women to share, collaborate, and document homemade remedies for various medical ailments. Serving as a collective repository of traditional health practices, it promotes community-driven healthcare solutions and empowers rural women as vital contributors to their communities well-being.'
  },
  {
    sNo: 6,
    regNo: 'SIH2.0-006',
    leader: 'Sahil Ghonge',
    team: 'TeamAtharva',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Agri-Tech',
    psid: 'AG-01',
    problem: 'A user-friendly digital platform empowers rural women to share, collaborate, and document homemade remedies for various medical ailments. Serving as a collective repository of traditional health practices, it promotes community-driven healthcare solutions and empowers rural women as vital contributors to their communities well-being.'
  },
  {
    sNo: 7,
    regNo: 'SIH2.0-007',
    leader: 'Sultan Alam',
    team: 'CodeWarrior',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Agri-Tech',
    psid: 'AG-01',
    problem: 'A user-friendly digital platform empowers rural women to share, collaborate, and document homemade remedies for various medical ailments'
  },
  {
    sNo: 8,
    regNo: 'SIH2.0-008',
    leader: 'yash sharma',
    team: 'RuralRemedies',
    college: 'Sage University, Bhopal',
    theme: 'Agri-Tech',
    psid: 'AG-01',
    problem: 'A user-friendly digital platform empowers rural women to share, collaborate, and document homemade remedies for various medical ailments. Serving as a collective repository of traditional health practices, it promotes community-driven healthcare solutions and empowers rural women as vital contributors to their communities well-being.'
  },
  {
    sNo: 9,
    regNo: 'SIH2.0-009',
    leader: 'Rahul Jain',
    team: 'TerraSense',
    college: 'VIT Bhopal University',
    theme: 'Agri-Tech',
    psid: 'AG-03',
    problem: 'Farmer AI Platform to optimize crop yields based on specific nutritional demands, market trends, and sustainable agricultural methods.'
  },
  {
    sNo: 10,
    regNo: 'SIH2.0-010',
    leader: 'Nilesh Nagar',
    team: 'Herbal Hands',
    college: 'Lakshmi Narain College of Technology & Science , Bhopal',
    theme: 'Agri-Tech',
    psid: 'AG-01',
    problem: 'A user-friendly digital platform empowers rural women to share, collaborate, and document homemade remedies for various medical ailments. Serving as a collective repository of traditional health practices, it promotes community-driven healthcare solutions and empowers rural women as vital contributors to their communities well-being.'
  },
  {
    sNo: 11,
    regNo: 'SIH2.0-011',
    leader: 'Shalu Jhaa',
    team: 'Tech Warriors',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Agri-Tech',
    psid: 'AG-04',
    problem: 'Innovative Agri Tech Platform: Empowering Sustainable Farming with IoT Sensors'
  },
  {
    sNo: 12,
    regNo: 'SIH2.0-012',
    leader: 'Ujjawal Shiv',
    team: 'Rural Health Share',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Agri-Tech',
    psid: 'AG-01',
    problem: 'A user-friendly digital platform empowers rural women to share, collaborate, and document homemade remedies for various medical ailments. Serving as a collective repository of traditional health practices, it promotes community-driven healthcare solutions and empowers rural women as vital contributors to their communities well-being.'
  },
  {
    sNo: 13,
    regNo: 'SIH2.0-013',
    leader: 'Aman Jaiswal',
    team: 'Team Oriental',
    college: 'Oriental Institute of Science and Technology,Bhopal',
    theme: 'Agri-Tech',
    psid: 'AG-02',
    problem: 'User-friendly IoT-enabled Precision Agriculture Platform that facilitates seamless data submission from farmers IoT devices to a cloud platform via API communication and empowers farmers to receive smart results, offering valuable insights for optimizing and enhancing their farming practices.'
  },
  {
    sNo: 14,
    regNo: 'SIH2.0-014',
    leader: 'Aditya Kotangle',
    team: 'Crew',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Edu-Tech',
    psid: 'ED-01',
    problem: 'Inclusive technology-driven sysem that aims to enhance education in rural areas, focusing on improving the quality of teaching and learning and designed to teach in local languages, foster agricultural literacy, provides a supportive environment for both teachers and students in rural communities.'
  },
  {
    sNo: 15,
    regNo: 'SIH2.0-015',
    leader: 'Kuldeep Kaware',
    team: 'Connect Shiksha',
    college: 'Bansal Institute of Science and Technology, Bhopal',
    theme: 'Edu-Tech',
    psid: 'ED-01',
    problem: 'Inclusive technology-driven system that aims to enhance education in rural areas, focusing on improving the quality of teaching and learning and designed to teach in local languages, foster agricultural literacy, provides a supportive environment for both teachers and students in rural communities.'
  },
  {
    sNo: 16,
    regNo: 'SIH2.0-016',
    leader: 'vivek nagar',
    team: 'tech coders',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Edu-Tech',
    psid: 'ED-01',
    problem: 'Inclusive technology-driven sysem that aims to enhance education in rural areas, focusing on improving the quality of teaching and learning and designed to teach in local languages, foster agricultural literacy, provides a supportive environment for both teachers and students in rural communities.'
  },
  {
    sNo: 17,
    regNo: 'SIH2.0-017',
    leader: 'Ayush Kumar',
    team: 'GreyTech',
    college: 'Technocrats Institute of Technology, Bhopal',
    theme: 'Edu-Tech',
    psid: 'ED-01',
    problem: 'Inclusive technology-driven system that aims to enhance education in rural areas, focusing on improving the quality of teaching and learning and designed to teach in local languages, foster agricultural literacy, provides a supportive environment for both teachers and students in rural communities.'
  },
  {
    sNo: 18,
    regNo: 'SIH2.0-018',
    leader: 'Kunal Rathore',
    team: 'sigma',
    college: 'Sage University, Bhopal',
    theme: 'Environment & Climate',
    psid: 'EC-01',
    problem: 'predictive Land Purchase Analysis for Government Agencies'
  },
  {
    sNo: 19,
    regNo: 'SIH2.0-019',
    leader: 'Yogesh Kumar Soni',
    team: 'The Matrix Mavericks',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Health-Tech',
    psid: 'HT-04',
    problem: 'Development of University Dispensary Management Software'
  },
  {
    sNo: 20,
    regNo: 'SIH2.0-020',
    leader: 'Harsh Rahangdale',
    team: 'Wellness Worriors',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Health-Tech',
    psid: 'HT-02',
    problem: 'Virtual Hospital platform that leverages technology to offer accessible basic diagnosis, prescription services, and information on pre identified nearby local clinical facility center and addresses the challenges of limited access to doctors and healthcare facilities, catering to both rural and urban populations'
  },
  {
    sNo: 21,
    regNo: 'SIH2.0-021',
    leader: 'Jiya Singh',
    team: 'UNI-DOC',
    college: 'Sage University, Bhopal',
    theme: 'Health-Tech',
    psid: 'HT-04',
    problem: 'Development of University Dispensary Management Software'
  },
  {
    sNo: 22,
    regNo: 'SIH2.0-022',
    leader: 'Dipu Kumar',
    team: 'Error 404',
    college: 'Sage University, Bhopal',
    theme: 'Health-Tech',
    psid: 'HT-05',
    problem: 'Develop an AI-empowered tool for assessing and mitigating student stress, providing personalized recommendations and coping strategies to enhance overall well-being in educational settings.'
  },
  {
    sNo: 23,
    regNo: 'SIH2.0-023',
    leader: 'Pawan Tiwari',
    team: 'Titans',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Health-Tech',
    psid: 'HT-02',
    problem: 'Virtual Hospital platform that leverages technology to offer accessible basic diagnosis, prescription services, and information on pre identified nearby local clinical facility center and addresses the challenges of limited access to doctors and healthcare facilities, catering to both rural and urban populations'
  },
  {
    sNo: 24,
    regNo: 'SIH2.0-024',
    leader: 'Shubham Mahobia',
    team: 'Shark Tech',
    college: 'Sage University, Bhopal',
    theme: 'Health-Tech',
    psid: 'HT-02',
    problem: 'Virtual Hospital platform that leverages technology to offer accessible basic diagnosis, prescription services, and information on pre-identified nearby local clinical facility center and addresses the challenges of limited access to doctors and healthcare facilities, catering to both rural and urban populations.'
  },
  {
    sNo: 25,
    regNo: 'SIH2.0-025',
    leader: 'Bhumi Malviya',
    team: 'Cool Techie',
    college: 'Sage University, Bhopal',
    theme: 'Health-Tech',
    psid: 'HT-02',
    problem: 'Virtual Hospital platform that leverages technology to offer accessible basic diagnosis, prescription services, and information on pre-identified nearby local clinical facility center and addresses the challenges of limited access to doctors and healthcare facilities, catering to both rural and urban populations.'
  },
  {
    sNo: 26,
    regNo: 'SIH2.0-026',
    leader: 'Harsh kamde',
    team: 'Team-Velocity',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Health-Tech',
    psid: 'HT-06',
    problem: 'The current healthcare system has problems with scheduling doctor appointments. Patients struggle to find available slots, while doctors have a hard time managing their schedules and patient records. Admins also find it difficult to oversee everything. We need a new website that can fix these issues by automating scheduling, notifications, and management for everyone involved, making it easier for patients to book appointments, helping doctors manage their schedules, and giving admins better oversight.'
  },
  {
    sNo: 27,
    regNo: 'SIH2.0-027',
    leader: 'Zoya Khan',
    team: 'Diamond',
    college: 'Sage University, Bhopal',
    theme: 'Health-Tech',
    psid: 'HT-02',
    problem: 'Virtual Hospital platform that leverages technology to offer accessible basic diagnosis, prescription services, and information on pre identified nearby local clinical facility center and addresses the challenges of limited access to doctors and healthcare facilities, catering to both rural and urban populations'
  },
  {
    sNo: 28,
    regNo: 'SIH2.0-028',
    leader: 'Urvashi Agrawal',
    team: 'Upstart Coders',
    college: 'Sage University, Bhopal',
    theme: 'Health-Tech',
    psid: 'HT-06',
    problem: 'The current healthcare system has problems with scheduling doctor appointments. Patients struggle to find available slots, while doctors have a hard time managing their schedules and patient records. Admins also find it difficult to oversee everything. We need a new website that can fix these issues by automating scheduling, notifications, and management for everyone involved, making it easier for patients to book appointments, helping doctors manage their schedules, and giving admins better oversight.'
  },
  {
    sNo: 29,
    regNo: 'SIH2.0-029',
    leader: 'Satyam Kumar Gupta',
    team: 'CodeCrafters',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Health-Tech',
    psid: 'HT-02',
    problem: 'Virtual Hospital platform that leverages technology to offer accessible basic diagnosis, prescription services, and information on pre-identified nearby local clinical facility center and addresses the challenges of limited access to doctors and healthcare facilities, catering to both rural and urban populations.'
  },
  {
    sNo: 30,
    regNo: 'SIH2.0-030',
    leader: 'Pritam Kumar',
    team: 'Health Catalyst',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Health-Tech',
    psid: 'HT-02',
    problem: 'Virtual Hospital platform that leverages technology to offer accessible basic diagnosis, prescription services, and information on pre identified nearby local clinical facility center and addresses the challenges of limited access to doctors and healthcare facilities, catering to both rural and urban populations'
  },
  {
    sNo: 31,
    regNo: 'SIH2.0-031',
    leader: 'vishal kumar',
    team: 'ROBOSAPIENS',
    college: 'Lakshmi Narain College of Technology & Science, Bhopal',
    theme: 'Health-Tech',
    psid: 'HT-02',
    problem: 'Virtual Hospital platform that leverages technology to offer accessible basic diagnosis, prescription services, and information on pre identified nearby local clinical facility center and addresses the challenges of limited access to doctors and healthcare facilities, catering to both rural and urban populations'
  },
  {
    sNo: 32,
    regNo: 'SIH2.0-032',
    leader: 'Anmol Rajas',
    team: 'BlitzByte',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Health-Tech',
    psid: 'HT-02',
    problem: 'Virtual Hospital platform that leverages technology to offer accessible basic diagnosis, prescription services, and information on pre-identified nearby local clinical facility center and addresses the challenges of limited access to doctors and healthcare facilities, catering to both rural and urban populations.'
  },
  {
    sNo: 33,
    regNo: 'SIH2.0-033',
    leader: 'Pari Jain',
    team: 'Binary Squad',
    college: 'Sagar institute of Research and Technology Bhopal',
    theme: 'Health-Tech',
    psid: 'HT-04',
    problem: 'Development of University Dispensary Management System'
  },
  {
    sNo: 34,
    regNo: 'SIH2.0-034',
    leader: 'Ankita Gupta',
    team: 'Pioneer',
    college: 'Jagran Lakecity University , Bhopal',
    theme: 'Health-Tech',
    psid: 'HT-06',
    problem: 'The current healthcare system has problems with scheduling doctor appointments. Patients struggle to find available slots, while doctors have a hard time managing their schedules and patient records. Admins also find it difficult to oversee everything. We need a new website that can fix these issues by automating scheduling, notifications, and management for everyone involved, making it easier for patients to book appointments, helping doctors manage their schedules, and giving admins better oversight.'
  },
  {
    sNo: 35,
    regNo: 'SIH2.0-035',
    leader: 'Roshni Maran',
    team: 'Ayurveda',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Health-Tech',
    psid: 'HT-02',
    problem: 'Virtual Hospital platform that leverages technology to offer accessible basic diagnosis, prescription services, and information on pre-identified nearby local clinical facility center and addresses the challenges of limited access to doctors and healthcare facilities, catering to both rural and urban populations.'
  },
  {
    sNo: 36,
    regNo: 'SIH2.0-036',
    leader: 'Harsh Jain',
    team: 'Breaking Prod',
    college: 'Indian Institute of Information Technology Bhopal',
    theme: 'Health-Tech',
    psid: 'HT-05',
    problem: 'Develop an AI-empowered tool for assessing and mitigating student stress, providing personalized recommendations and coping strategies to enhance overall well-being in educational settings.'
  },
  {
    sNo: 37,
    regNo: 'SIH2.0-037',
    leader: 'Siddarth Asati',
    team: 'TechTitans',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Health-Tech',
    psid: 'HT-04',
    problem: 'Development of University Dispensary Management Software'
  },
  {
    sNo: 38,
    regNo: 'SIH2.0-038',
    leader: 'SHREYA SINGH',
    team: 'BINARY BRAIN',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Health-Tech',
    psid: 'HT-06',
    problem: 'The current healthcare system has problems with scheduling doctor appointments. Patients struggle to find available slots, while doctors have a hard time managing their schedules and patient records. Admins also find it difficult to oversee everything. We need a new website that can fix these issues by automating scheduling, notifications, and management for everyone involved, making it easier for patients to book appointments, helping doctors manage their schedules, and giving admins better oversight.'
  },
  {
    sNo: 39,
    regNo: 'SIH2.0-039',
    leader: 'Utkarsh Dubey',
    team: 'Cyber Safety Squad',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Law & Order',
    psid: 'LO-05',
    problem: 'Public awareness about digital frauds and quick Police access mechanism.'
  },
  {
    sNo: 40,
    regNo: 'SIH2.0-040',
    leader: 'Tejaswini Dubey',
    team: 'Dev Fnatic Five',
    college: 'Sage University, Bhopal',
    theme: 'Law & Order',
    psid: 'LO-04',
    problem: 'Create a home automation hardware with real time Integration with firebase and a custom build websites.'
  },
  {
    sNo: 41,
    regNo: 'SIH2.0-041',
    leader: 'Prashant Gour',
    team: 'Digital Threats',
    college: 'Sage University, Bhopal',
    theme: 'Law & Order',
    psid: 'LO-05',
    problem: 'Public awareness about digital frauds and quick Police access mechanism.'
  },
  {
    sNo: 42,
    regNo: 'SIH2.0-042',
    leader: 'Rohit Chaubey',
    team: 'Blind Coders',
    college: 'Sage University, Bhopal',
    theme: 'Law & Order',
    psid: 'LO-04',
    problem: 'Create a home automation hardware with real time Integration with firebase and a custom build websites.'
  },
  {
    sNo: 43,
    regNo: 'SIH2.0-043',
    leader: 'Prateek Khatri',
    team: 'THE WITCHERS',
    college: 'SAGE University Bhopal',
    theme: 'Law & Order',
    psid: 'LO-02',
    problem: 'Integration of Camera Surveillance in toll booths and city with police control room to control vehicle theft'
  },
  {
    sNo: 44,
    regNo: 'SIH2.0-044',
    leader: 'Priyanshu Gour',
    team: 'HelloWorld',
    college: 'Sage University, Bhopal',
    theme: 'Law & Order',
    psid: 'LO-03',
    problem: 'Face Detection from the blur or unclear image using'
  },
  {
    sNo: 45,
    regNo: 'SIH2.0-045',
    leader: 'Harshit Shakya',
    team: 'Team Sensor Squad',
    college: 'Sage University, Bhopal',
    theme: 'Law & Order',
    psid: 'LO-04',
    problem: 'Create A Home Automation Hardware with Real Time Integration with Firebase and A Custom Build Websites with An Emergency SOS Button'
  },
  {
    sNo: 46,
    regNo: 'SIH2.0-046',
    leader: 'Atul Kumar',
    team: 'Code Warriors',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Law & Order',
    psid: 'LO-03',
    problem: 'Face Detection from the blur or unclear image using'
  },
  {
    sNo: 47,
    regNo: 'SIH2.0-047',
    leader: 'Anurag Bisen',
    team: 'Crew-x',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Law & Order',
    psid: 'LO-03',
    problem: 'Face Detection from the blur or unclear image'
  },
  {
    sNo: 48,
    regNo: 'SIH2.0-048',
    leader: 'Ayush Agrawal',
    team: 'TechnoGeeks',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Law & Order',
    psid: 'LO-05',
    problem: 'Public awareness about digital frauds and quick Police access mechanism.'
  },
  {
    sNo: 49,
    regNo: 'SIH2.0-049',
    leader: 'Anand Patel',
    team: 'Bramhastra',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Law & Order',
    psid: 'LO-02',
    problem: 'Integration of Camera Surveillance in toll booths and city with police control room to control vehicle theft.'
  },
  {
    sNo: 50,
    regNo: 'SIH2.0-050',
    leader: 'Aditya',
    team: 'Web Wizard',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Law & Order',
    psid: 'LO-05',
    problem: 'Public awareness about digital frauds and quick Police access mechanism.'
  },
  {
    sNo: 51,
    regNo: 'SIH2.0-051',
    leader: 'Harsh Pawar',
    team: 'Jalageeks',
    college: 'NRI Institute of Information Science and Technology, Bhopal',
    theme: 'Law & Order',
    psid: 'LO-04',
    problem: 'Create a home automation hardware with real time Integration with firebase and a custom build websites.'
  },
  {
    sNo: 52,
    regNo: 'SIH2.0-052',
    leader: 'Mohit Yadav',
    team: 'Team Revenant',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Law & Order',
    psid: 'LO-03',
    problem: 'Face Detection from the blur or unclear image using'
  },
  {
    sNo: 53,
    regNo: 'SIH2.0-053',
    leader: 'Manoj Kushwaha',
    team: 'Innoventure',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Law & Order',
    psid: 'LO-07',
    problem: 'Smart Traffic Assistance with CORS on Mobiles'
  },
  {
    sNo: 54,
    regNo: 'SIH2.0-054',
    leader: 'Yashwant Verma',
    team: 'Street Navigators',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Law & Order',
    psid: 'LO-07',
    problem: 'Smart Traffic Assistance with CORS on Mobiles'
  },
  {
    sNo: 55,
    regNo: 'SIH2.0-055',
    leader: 'SHIVAM MALVIYA',
    team: 'SQUAD',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Law & Order',
    psid: 'LO-05',
    problem: 'Public awareness about digital frauds and quick Police access mechanism.'
  },
  {
    sNo: 56,
    regNo: 'SIH2.0-056',
    leader: 'Jayesh Mahajan',
    team: 'Digital Destroyers',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Law & Order',
    psid: 'LO-03',
    problem: 'Face Detection from the blur or unclear image'
  },
  {
    sNo: 57,
    regNo: 'SIH2.0-057',
    leader: 'Rupesh Rahangdale',
    team: 'DevRTV',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Miscellaneous',
    psid: 'MC-08',
    problem: 'Unified Content Management Solution for Government Websites'
  },
  {
    sNo: 58,
    regNo: 'SIH2.0-058',
    leader: 'Pooja Baghel',
    team: 'Team AAYU',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Miscellaneous',
    psid: 'MC-04',
    problem: 'Design an Amazon Alexa skills which answers to custom questions and send information to firebase and a website.'
  },
  {
    sNo: 59,
    regNo: 'SIH2.0-059',
    leader: 'Ansh singh',
    team: 'Quantum Quoders',
    college: 'Sage University, Bhopal',
    theme: 'Miscellaneous',
    psid: 'MC-01',
    problem: 'Centralized Management Information System (MIS) for the Department of MP Police'
  },
  {
    sNo: 60,
    regNo: 'SIH2.0-060',
    leader: 'Rahul Kumar',
    team: 'RA-5',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Miscellaneous',
    psid: 'MC-04',
    problem: 'Design an Amazon Alexa skills which answers to custom questions and send information to firebase and a website.'
  },
  {
    sNo: 61,
    regNo: 'SIH2.0-061',
    leader: 'Tanya Shekhawat',
    team: 'Cyber Cops',
    college: 'SAGE University, Bhopal',
    theme: 'Miscellaneous',
    psid: 'MC-01',
    problem: 'Centralized Management Information System (MIS) for the Department of MP Police'
  },
  {
    sNo: 62,
    regNo: 'SIH2.0-062',
    leader: 'Rajul Mewade',
    team: 'Code Crunch',
    college: 'Sage University, Bhopal',
    theme: 'Miscellaneous',
    psid: 'MC-03',
    problem: 'Identification of Hate Speech on various social media platform using Machine Learning'
  },
  {
    sNo: 63,
    regNo: 'SIH2.0-063',
    leader: 'RITESH BOBADE',
    team: 'The Decoders',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Miscellaneous',
    psid: 'MC-03',
    problem: 'Identification of Hate Speech on various social media platform using Machine Learning'
  },
  {
    sNo: 64,
    regNo: 'SIH2.0-064',
    leader: 'Sumit Raj',
    team: 'White Hat Coders',
    college: 'Lakshmi Narain College Of Technology & Science, Bhopal',
    theme: 'Miscellaneous',
    psid: 'MC-04',
    problem: 'Design an Amazon Alexa skills which answers to custom questions and send information to firebase and a website.'
  },
  {
    sNo: 65,
    regNo: 'SIH2.0-065',
    leader: 'Piyush Jain',
    team: 'Penta-x',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Miscellaneous',
    psid: 'MC-01',
    problem: 'Centralized Management Information System (MIS) for the Department of MP Police'
  },
  {
    sNo: 66,
    regNo: 'SIH2.0-066',
    leader: 'Aman Yadav',
    team: 'Team Effizen',
    college: 'Sagar Institute of Science and Technology Gandhi Nagar, Bhopal',
    theme: 'Miscellaneous',
    psid: 'MC-01',
    problem: 'Centralized Management Information System (MIS) for the Department of MP Police'
  },
  {
    sNo: 67,
    regNo: 'SIH2.0-067',
    leader: 'Ishan Shivankar',
    team: 'QuadraVision',
    college: 'Vishwakarma Institute of Technology, Pune',
    theme: 'Miscellaneous',
    psid: 'MC-06',
    problem: 'Identity Resolution for Government Services'
  },
  {
    sNo: 68,
    regNo: 'SIH2.0-068',
    leader: 'Ankit Mewada',
    team: 'ByteByteGo',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Security',
    psid: 'LO-04',
    problem: 'Create a home automation hardware with real time Integration with firebase and a custom build websites.'
  },
  {
    sNo: 69,
    regNo: 'SIH2.0-069',
    leader: 'Khushi Rajput',
    team: 'No Cap',
    college: 'SAGE University Bhopal',
    theme: 'Urban Mobility',
    psid: 'UB-02',
    problem: 'Police force engagement for seamless periodic force demand and reserve police force deployment through optimum utilization of geographically distributed police reserves.'
  },
  {
    sNo: 70,
    regNo: 'SIH2.0-070',
    leader: 'Akshat Tambe',
    team: 'Rachiyata',
    college: 'SISTec, Ratibad Bhopal',
    theme: 'Urban Mobility',
    psid: 'UB-02',
    problem: 'Police force engagement for seamless periodic force demand and reserve police force deployment through optimum utilization of geographically distributed police reserves.'
  }
];

export default function SIH2024Finalists({ onViewChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('All');

  // Themes list for filtering
  const themesList = [
    'All',
    'Agri-Tech',
    'Edu-Tech',
    'Environment & Climate',
    'Health-Tech',
    'Law & Order',
    'Miscellaneous',
    'Security',
    'Urban Mobility'
  ];

  // Filter items
  const filteredFinalists = finalistsData.filter((item) => {
    const matchesSearch = 
      item.leader.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.psid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.college.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTheme = 
      selectedTheme === 'All' || 
      item.theme.toLowerCase() === selectedTheme.toLowerCase();

    return matchesSearch && matchesTheme;
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
                Grand Finalists (SIH 2.0 - 2024)
              </h2>
            </div>
            <p className="text-brand-gray text-xs sm:text-sm font-normal">
              List of selected teams for the Grand Finale of SISTec Innovation Hackathon 2.0.
            </p>
          </div>
          <button
            onClick={() => onViewChange && onViewChange('landing', '#home')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-card border border-white/10 hover:border-brand-gold/50 text-xs font-bold text-brand-gold hover:text-white transition-all duration-300 cursor-pointer shadow-md active:scale-95 shrink-0"
          >
            <ArrowLeft size={14} /> Back to Home
          </button>
        </div>

        {/* Filter Toolbar controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Live Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray" size={16} />
            <input
              type="text"
              placeholder="Search by leader, team, college, code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-brand-card/65 border border-white/10 hover:border-white/20 focus:border-brand-gold/50 focus:outline-none focus:ring-1 focus:ring-brand-gold/20 text-xs text-white placeholder-brand-gray/50 transition-all duration-300 font-mono"
            />
          </div>

          {/* Theme type pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-thin scrollbar-thumb-white/10 select-none">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider hidden lg:inline whitespace-nowrap">Filter Theme:</span>
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="px-4 py-2.5 rounded-full bg-brand-card border border-white/10 hover:border-brand-gold/30 text-xs font-bold text-brand-gold focus:outline-none cursor-pointer"
            >
              {themesList.map((theme) => (
                <option key={theme} value={theme} className="bg-brand-darker text-white">
                  {theme}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Desktop View Table (hidden on mobile) */}
        <div className="hidden md:block rounded-[2.5rem] bg-brand-card/15 backdrop-blur-md border border-white/5 overflow-hidden shadow-card-shadow mb-10 text-left">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-white/5 bg-brand-darker/60">
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-20">
                    <span className="text-gold-metallic">S.No</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-36">
                    <span className="text-gold-metallic">Reg No</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-40">
                    <span className="text-gold-metallic">Leader Name</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-44">
                    <span className="text-gold-metallic">Team Name</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-40">
                    <span className="text-gold-metallic">Theme</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-24">
                    <span className="text-gold-metallic">PS Code</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-[420px] max-w-md">
                    <span className="text-gold-metallic">Problem Statement Title</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-64">
                    <span className="text-gold-metallic">Institute Name</span>
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
                        <span className="font-mono text-xs font-bold text-brand-gold bg-brand-gold/10 border border-brand-gold/20 px-2.5 py-1 rounded-lg whitespace-nowrap">
                          {item.regNo}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-xs font-bold text-white leading-snug block">{item.leader}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-xs font-bold text-white/90 leading-snug block">{item.team}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-block px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 text-[9px] font-bold uppercase tracking-wider text-brand-gray/80">
                          {item.theme}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="font-mono text-xs font-bold text-brand-blue">{item.psid}</span>
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
                    {item.regNo}
                  </span>
                  <span className="text-[10px] font-bold text-brand-gray/50">
                    #{item.sNo}
                  </span>
                </div>
                
                <h4 className="text-xs font-bold text-white leading-snug mb-0.5">
                  Leader: {item.leader}
                </h4>
                <p className="text-xs font-bold text-brand-gold mb-1">
                  Team: {item.team}
                </p>
                <p className="text-[10px] text-brand-gray/60 mb-3 font-semibold">
                  {item.college}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-white/5 text-[11px] text-brand-gray mb-3">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-[9px] uppercase font-bold text-white/40">Theme</span>
                    <span className="font-medium text-white/80 text-right truncate max-w-[70%]">{item.theme}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] uppercase font-bold text-white/40">PS Code</span>
                    <span className="font-bold text-brand-blue font-mono">{item.psid}</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-white/5 text-[11px]">
                  <span className="text-[9px] uppercase font-bold text-white/40 block">Problem Statement Title</span>
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
