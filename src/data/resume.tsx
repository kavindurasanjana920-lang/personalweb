import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, Grid3x3Icon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Laravel } from "@/components/ui/svgs/laravel";
import { Python } from "@/components/ui/svgs/python";
import { Tensorflow } from "@/components/ui/svgs/tensorflow";
import { Pytorch } from "@/components/ui/svgs/pytorch";
import { Scikitlearn } from "@/components/ui/svgs/scikitlearn";
import { Keras } from "@/components/ui/svgs/keras";
import { Huggingface } from "@/components/ui/svgs/huggingface";
import { Openai } from "@/components/ui/svgs/openai";
import { Ragai } from "@/components/ui/svgs/ragai";
import { Agenticai } from "@/components/ui/svgs/agenticai";
import { Azure } from "@/components/ui/svgs/azure";
import { N8n } from "@/components/ui/svgs/n8n";
import { Zapier } from "@/components/ui/svgs/zapier";
import { Git } from "@/components/ui/svgs/git";
import { Flutter } from "@/components/ui/svgs/flutter";
import { Wordpress } from "@/components/ui/svgs/wordpress";
import { Mysql } from "@/components/ui/svgs/mysql";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";

const BLOG_URL = process.env.NEXT_PUBLIC_BLOG_URL || "/blog/";

export const DATA = {
  name: "Kavindu Rasanjana",
  initials: "KR",
  url: "https://thekavindu.me",
  location: "Colombo, SL",
  locationLink: "https://www.google.com/maps/place/colombo",
  description:
    "Software Automation Engineer, Building Scalable AI Systems, Open to Collaborateions Passionate about AI, Software Development, and Tech Innovation.",
  summary:
    "I'm currently working as a [Software Automation Engineer](/#work) while actively building and scaling real-world software solutions. I have completed my [Bachelor's degree in Information Technology](/#education) and have delivered [10+ projects for international clients](/projects), including AI-powered FinTech platforms and cross-platform mobile applications. With strong experience in full-stack development, I continuously explore AI and machine learning to solve real-world problems and build [scalable, impactful digital products](/services).",
  avatarUrl: "/kavindu.png",
  skills: [
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "Laravel", icon: Laravel },
    { name: "Python", icon: Python },
    { name: "TensorFlow", icon: Tensorflow },
    { name: "PyTorch", icon: Pytorch },
    { name: "Scikit-learn", icon: Scikitlearn },
    { name: "Keras", icon: Keras },
    { name: "Hugging Face", icon: Huggingface },
    { name: "OpenAI", icon: Openai },
    { name: "Agentic AI", icon: Agenticai },
    { name: "RAG AI", icon: Ragai },
    { name: "Azure", icon: Azure },
    { name: "n8n", icon: N8n },
    { name: "Zapier", icon: Zapier },
    { name: "Git", icon: Git },
    { name: "Flutter", icon: Flutter },
    { name: "WordPress", icon: Wordpress },
    { name: "MySQL", icon: Mysql },
    { name: "Docker", icon: Docker },
    { name: "Kubernetes", icon: Kubernetes },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: BLOG_URL, icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "info@thekavindu.me",
    tel: "+94772003045",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://dub.sh/dillion-github",
        icon: Icons.github,
        navbar: true,
      },

      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/kavindu-rasanjana-78458b2a6",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://dub.sh/dillion-twitter",
        icon: Icons.x,

        navbar: true,
      },
        Menu: {
          name: "Menu",
          url: "#",
          icon: Grid3x3Icon,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Parallax Tec",
      href: "https://parallaxtec.com/",
      badges: [],
      location: "Remote",
      title: "Software Automation Engineer",
      logoUrl: "/group-1.png",
      start: "Feb 2026",
      end: "Present",
      description:
        "Designed and developed AI-driven automation pipelines that embed advanced cognitive capabilities into core software systems to eliminate manual bottlenecks. By prioritizing Artificial Intelligence over traditional logic, I transform complex business processes into self-regulating workflows using various automation tools and cloud infrastructure. This approach bridges the gap between high-level strategy and automated execution, delivering scalable, low-touch technical solutions that drive long-term operational efficiency.",
    },
    {
      company: "Parallax Tec",
      href: "https://parallaxtec.com/",
      badges: [],
      location: "Remote",
      title: "Trainee Software Engineer",
      logoUrl: "/group-1.png",
      start: "Aug 2025",
      end: "Feb 2026",
      description:
        "Contributed to the full SDLC by building responsive user interfaces with React.js and robust backend systems using Laravel and MySQL. I worked hands-on with UI/UX design, built automation workflows using n8n, and developed integrations through the Meta Developer platform. I also integrated various analytics tools to support data-driven decisions and built monitoring systems to track user behaviour and sales pipelines. This end-to-end approach ensured the delivery of high-performance, user-centric applications from initial concept through to deployment.",
    },
    {
      company: "Parallax Tec",
      href: "https://parallaxtec.com/",
      badges: [],
      location: "Remote",
      title: "Intern Software Engineer",
      logoUrl: "/group-1.png",
      start: "Aug 2024",
      end: "Aug 2025",
      description:
        "Developed and maintained high-performance web applications using PHP, Laravel, and WordPress for a diverse range of client-facing and internal projects. I managed database systems with MySQL for web applications, applied rigorous version control workflows, and implemented Google Marketing Platform (GMP) to drive data-informed improvements. This role centered on delivering scalable, maintainable code while ensuring seamless integration across various enterprise-level digital platforms.",
    },
    {
      company: "Fiverr",
      href: "https://www.fiverr.com/",
      badges: [],
      location: "Colomob, SL",
      title: "Web  Developer",
      logoUrl: "/fiverr-logo.png",
      start: "Jan 2024",
      end: "Present",
      description:
        "Delivered end-to-end web solutions for international clients across industries including FinTech, e-commerce, matrimony, and professional services. Successfully managed and delivered 7+ live full-stack projects, handling full client communication, scoping, and execution from start to finish.",
    },
 
  ],
  education: [
    {
      school: "Horizon Campus",
      href: "https://horizoncampus.edu.lk/",
      degree: "Bachelor’s Degree in Information Technology",
      logoUrl: "/horizon-campus-logo.png",
      start: "2022",
      end: "2025",
    },
    {
      school: "University of Moratuwa",
      href: "https://uom.lk/",
      degree: "Bachelor's Degree of Information Technology",
      logoUrl: "/uom-logo.png",
      start: "2022",
      end: "2025",
    },
    {
      school: "MTF Institute of Management",
      href: "https://gtf.pt/en",
      degree: "Professional Diploma of Marketing Manager Business Partner",
      logoUrl: "/mtf-logo.png",
      start: "2024",
      end: "2024",
    },
    {
      school: "MTF Institute of Management",
      href: "https://gtf.pt/en",
      degree: "Diploma of Microsoft Dynamics 365 CRM Business Architect",
      logoUrl: "/mtf-logo.png",
      start: "2024",
      end: "2024",
    },
  ],
  projects: [
    {
      title: "Scoreness",
      href: "https://scoreness.com/",
      dates: "March 2025 - June 2025",
      active: true,
      description:
        "A comprehensive review platform built with React.js and Laravel, featuring automated business listing workflows, verified review submissions, scam reporting, and a side-by-side business comparison tool.",
      technologies: [
        "React.js",
        "TailwindCSS",
        "Figma",
        "Laravel",
        "MySQL",
        "Genie",
        "OAuth",
        "Geolocation API",
      ],
      links: [
        {
          type: "Website",
          href: "https://scoreness.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/Scoreness.svg",
      video:
        "",
    },
    {
      title: "Nextrimo",
      href: "https://nextrimo.com/",
      dates: "May 2025 - Sep 2025",
      active: true,
      description:
        "A matrimony platform with matchmaking search, real-time messaging, profile privacy, and secure online payments — built with Laravel and MySQL.",
      technologies: [
        "HTML",
        "TailwindCSS",
        "JavaScript",
        "Laravel",
        "MySQL",
        "Genie",
        "OAuth",
        "Booststrap",
      ],
      links: [
        {
          type: "Website",
          href: "https://nextrimo.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/Nextrimo.jpg",
      video: "",
    },
    {
      title: "Nextrimo Mobile App",
      href: "https://play.google.com/store/apps/details?id=com.nextrimo.nextrimo_app&hl=en-US&ah=eCRiJMhsVxHFQ0oupM1qyy3_Iis&pli=1",
      dates: "Dec 2025 - Feb 2026",
      active: true,
      description:
        "Built a cross-platform matrimony app using Flutter, integrated with a Laravel REST API and MySQL. Enabled real-time data sync with the web platform and handled full deployment to both Google Play Store and Apple App Store.",
      technologies: [
        "Flutter",
        "Laravel",
        "JavaScript",
        "MySQL",
        "Apple Pay",
        "Genie",
        "Figma",
        "Firebase",
      ],
      links: [
        {
          type: "Mobile App",
          href: "https://play.google.com/store/apps/details?id=com.nextrimo.nextrimo_app&hl=en-US&ah=eCRiJMhsVxHFQ0oupM1qyy3_Iis&pli=1",
          icon: <Icons.globe className="size-3" />,
        },
        // {
        //   type: "Source",
        //   href: "",
        //   icon: <Icons.github className="size-3" />,
        // },
      ],
      image: "/group-48.png",
      video: "",
    },
    {
      title: "CIMA Cleaners",
      href: "https://cimacleaners.com.au/",
      dates: "March 2024 - May 2025",
      active: true,
      description:
        "Developed an automated lead generation and booking system with dynamic pricing and flexible date scheduling. Optimized for mobile-first experience and localized SEO, targeting residential and commercial clients in the Australian market.",
      technologies: [
        "WordPress",
        "Php",
        "MySQL",
        "GTM",
        "Custom CSS",
        "JavaScript",
        "GSC",
        "GA",
      ],
      links: [
        {
          type: "Website",
          href: "https://cimacleaners.com.au/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/cima-cleaners.jpg",
      video:
        "",
    },
  ],
  projectsPageOnly: [
    {
      title: "Orbit Capital",
      href: "https://orbitcapital.live/",
      dates: "Oct 2025 - Jan 2026",
      active: true,
      description:
        "Designed a secure FinTech portal with tiered investment plans and an automated profit calculation engine. Implemented strong user authentication and secure transaction handling to ensure data integrity and platform transparency.",
      technologies: [
        "HTML",
        "Boostrap",
        "Figma",
        "JavaScript",
        "Laravel",
        "MySQL",
        "OAuth"

      ],
      links: [
        {
          type: "Website",
          href: "https://orbitcapital.live/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/group-3-2.jpg",
      video: "",
    },

    {
      title: "ForexRobotic",
      href: "https://www.forexrobotic.com/",
      dates: "Aug 2025 - Dec 2026",
      active: true,
      description:
        "Built a Laravel-based e-commerce platform for AI trading tools with MySQL and JavaScript. Integrated Binance crypto payments and implemented a secure system for instant digital delivery of MT4/MT5 indicators and Expert Advisors.",
      
        technologies: [
        "HTML",
        "Boostrap",
        "Figma",
        "JavaScript",
        "Laravel",
        "MySQL",
        "Binance Pay"

      ],
      links: [
        {
          type: "Website",
          href: "https://www.forexrobotic.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/group-3-3.jpg",
      video: "",
    },

{
      title: "Forex Circles",
      href: "https://forexcircles.com/",
      dates: "Jan 2026 - April 2026",
      active: true,
      description:
        "Built a forex broker listing and review platform with a business dashboard, subscription packages, and broker awards. Enabled broker management, user reviews, and SEO optimization using Laravel and MySQL.",
      technologies: [
        "React.js",
        "TailwindCSS",
        "Figma",
        "Laravel",
        "MySQL",
        "Genie",
        "OAuth",
        "Geolocation API",

      ],
      links: [
        {
          type: "Website",
          href: "https://forexcircles.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/group-3-4-1.jpg",
      video: "",
    },
    {
      title: "Health First",
      href: "https://github.com/kavindurs8/health-first-webapplication",
      dates: "Oct 2025 - Dec 2025",
      active: true,
      description:
        "Developed a web-based doctor appointment booking platform that allows patients to view doctors, schedule appointments, and manage bookings efficiently. Completed as a freelance project focused on improving healthcare accessibility.",
      technologies: [
        "React.js",
        "TailwindCSS",
        "Figma",
        "Laravel",
        "MySQL",
        "Stripe",
        "OAuth"
      ],
      links: [
        {
          type: "Website",
          href: "https://github.com/kavindurs8/health-first-webapplication",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/group-3-6.jpg",
      video:
        "",
    },
    {
      title: "Studify - R&D",
      href: "https://github.com/kavindurs8/studifynew",
      dates: "Dec 2024 - Dec 2025",
      active: true,
      description:
        "R&D an e-learning platform with live classes, course marketplace, and student community. Includes AI-based recommendations, real-time progress tracking, and exam management as a final-year university project.",
      technologies: [
        "React.js",
        "TailwindCSS",
        "Figma",
        "OAuth",
        "Laravel",
        "MySQL",
        "Stripe",     
        "DNNs",
        "AutoML",
        "LLMs",
        "RAG AI"

      ],
      links: [
        {
          type: "Website",
          href: "https://github.com/kavindurs8/studifynew",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/group-3-5.jpg",
      video: "",
    },
    {
      title: "Weather App",
      href: "https://github.com/kavindurs8/E2145285_WeatherApp",
      dates: "May 2024 - June 2024",
      active: true,
      description:
        "Developed a simple Android app that displays real-time weather data using the OpenWeather API based on the user’s location, including temperature, humidity, and address details, completed as a university project.",
      technologies: [
        "Java (Android)",
        "OpenWeather API",
        "GPS",
        "Geocoder",
        "SQLite"
      ],
      links: [
        {
          type: "Mobile App",
          href: "https://github.com/kavindurs8/E2145285_WeatherApp",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/group-48-1.jpg",
      video: "",
    }, 
    {
      title: "TO-Do App",
      href: "https://github.com/kavindurs8/ToDoList-App",
      dates: "May 2024 - June 2024",
      active: true,
      description:
        "Built a simple Android task management app with add, view, and delete features using SQLite for local storage. Completed as a university project.",
      technologies: [
        "Java (Android)",
        "OpenWeather API",
        "GPS",
        "Geocoder",
        "SQLite"
      ],
      links: [
        {
          type: "Mobile App",
          href: "https://github.com/kavindurs8/ToDoList-App",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/group-52-1.jpg",
      video: "",
    }, 
    {
      title: "CourseCrafters",
      href: "https://github.com/kavindurs8/CourseCrafters",
      dates: "Jan 2024 - July 2024",
      active: true,
      description:
        "Led a group project to develop an online course marketplace for creating, managing, and selling courses. Built with PHP, MySQL, HTML, CSS, and JavaScript, featuring course management, secure payments, analytics, and student progress tracking as a 2rd-year university project.",
      technologies: [
        "HTML",
        "Boostrap",
        "Figma",
        "JavaScript",
        "Php",
        "MySQL",
        "PayHere"
      ],
      links: [
        {
          type: "Website",
          href: "https://github.com/kavindurs8/CourseCrafters",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/group-3-7.jpg",
      video: "",
    },     

  ],
  hackathons: [
    {
      title: "School of AI Certified Solutions Architect (Associate)",
      dates: "April 2026",
      location: "Udemy",
      description:
        "Completed hands-on AWS serverless mini projects covering API development, static hosting, event-driven architecture, messaging systems, and cloud monitoring.",
      image: "/udemy-logo.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [
                {
          title: "Certificate",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://www.udemy.com/certificate/UC-814425fe-6122-4915-ab6a-9477deb13ec7/",
        },
      ],
    },    
    {
      title: "Build a Robust RESTful API with PHP 8",
      dates: "Oct 2024",
      location: "Udemy",
      description:
        "Completed a course on building scalable REST APIs using PHP 8 with N-Tier architecture, covering API design, authentication, database integration, and best practices for secure and maintainable backend development.",
      image: "/udemy-logo.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [
                {
          title: "Certificate",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://www.udemy.com/certificate/UC-bec015c7-d893-471d-8be6-80e3ff1227d6/",
        },
      ],
    },    
    {
      title: "Professional Diploma of Marketing Manager Business Partner",
      dates: "Aug 2024",
      location: "MTF Institute of Management",
      description:
        "Completed a course on Marketing Manager Business Partner (MMBP), covering product development, marketing strategy, and business planning with a focus on aligning marketing with business goals.",
      image: "/mtf-logo.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [
                {
          title: "Certificate",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://www.udemy.com/certificate/UC-036000bc-0492-42b1-9459-04ed88582fa0/",
        },
      ],
    },    
    {
      title: "Diploma of Microsoft Dynamics 365 CRM Business Architect",
      dates: "Aug 2024",
      location: "MTF Institute of Management",
      description:
        "Completed a course on process architecture and solution design, focusing on mapping business processes, scope management, requirements alignment, and end-to-end workflow design for effective system implementation.",
      image: "/mtf-logo.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [
                {
          title: "Certificate",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://www.udemy.com/certificate/UC-9557fdd5-4ac3-4aa5-8f64-6dd81b94220d/",
        },
      ],
    },    
    {
      title: "Advanced Wordpress Course for Professionals",
      dates: "Aug 2024",
      location: "Udemy ",
      description:
        "Completed an advanced WordPress course focused on professional website development, including e-commerce, e-learning platforms, forums, and Elementor.",
      image: "/udemy-logo.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [
                {
          title: "Certificate",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://www.udemy.com/certificate/UC-4ee81ce1-0006-4a67-bf94-b7d73d76521b/",
        },
      ],
    },    
    {
      title: "WordPress Web Design & Freelancing MasterClass",
      dates: "Aug 2024",
      location: "Udemy ",
      description:
        "Completed a course on WordPress and Elementor, learning to build responsive websites and start freelancing with SEO and client management basics.",
      image: "/udemy-logo.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [
                {
          title: "Certificate",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://www.udemy.com/certificate/UC-6c8909cf-47a0-4f68-9468-371f08ba38e6/",
        },
      ],
    },
    {
      title: "C# Programming Master Class",
      dates: "Aug 2024",
      location: "Udemy ",
      description:
        "Completed a comprehensive C# course covering .NET, ASP.NET, APIs, OOP concepts, and application development for web, desktop, and game development.",
      image: "/udemy-logo.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [
                {
          title: "Certificate",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://www.udemy.com/certificate/UC-f2c3695f-9322-4650-8e06-de1452394488/",
        },
      ],
    },
    {
      title: "Certificate for OOPs in Java",
      dates: "Aug 2024",
      location: "Great Learning",
      description:
        "Completed a course on Object-Oriented Programming in Java, covering core concepts such as OOP principles and inheritance with assessments.",
      image: "/great-learning-logo.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [
                {
          title: "Certificate",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://www.mygreatlearning.com/certificate/YODQFFTX?referrer_code=GLDQLD-8NLLBI",
        },
      ],
    },
    {
      title: "Certificate for Java Programming",
      dates: "Aug 2024",
      location: "Great Learning",
      description:
        "Completed a Java course covering core concepts like variables, control flow, arrays, and functions, with practical exercises and assessments.",
      image: "/great-learning-logo.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [
                {
          title: "Certificate",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://www.mygreatlearning.com/certificate/IYBURDDF?referrer_code=GLDQLD-8NLLBI",
        },
      ],
    }
,
    
  ],
} as const;