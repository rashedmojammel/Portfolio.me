// All portfolio project cards + modal content.
// Edit this file to add/remove/update a project — the UI updates automatically.

export const projects = [

  {
    id: 'fable',
    tag: 'Next.js · Node.js · Express · MongoDB · Stripe',
    title: 'Fable — Digital Ebook Sharing Platform',
    cardDesc: 'Production-ready full-stack ebook platform with payments, auth & admin tools.',
    modalTag: 'Full-Stack Web Application',
    description:
      'Architected and developed a production-ready full-stack ebook sharing platform as a solo project using the MERN stack. Designed 18+ REST APIs and 6 MongoDB collections with secure authentication and role-based access control (BetterAuth). Integrated Stripe for payments, Nodemailer for transactional email, and built out bookmarks, user dashboards, and an admin panel. Improved performance using SSR, dynamic rendering, and optimized data-fetching strategies.',
    tech: [
      { icon: 'fab fa-react', label: 'Next.js' },
      { icon: 'fab fa-node-js', label: 'Node.js' },
      { label: 'Express.js', textOnly: true },
      { icon: 'fas fa-database', label: 'MongoDB' },
      { icon: 'fa-brands fa-stripe', label: 'Stripe' },
      { label: 'BetterAuth', textOnly: true },
      { icon: 'fas fa-wind', label: 'Tailwind CSS' },
    ],
     screenshot: '/img/projects/Fable.png',
    liveUrl: 'https://fable-ebook-sharing-platform-client.vercel.app/',
    links: [
      { label: 'GitHub Repository', icon: 'fab fa-github', href: 'https://github.com/rashedmojammel/Fable-Ebook-Sharing-Platform-Client' },
      { label: 'Live Site', icon: 'fa-solid fa-link', href: 'https://fable-ebook-sharing-platform-client.vercel.app/' },
    ],
  },
  {
    id: 'petnest',
    tag: 'Next.js · Node.js · Express · MongoDB',
    title: 'PetNest — Pet Adoption Platform',
    cardDesc: 'Full-stack pet adoption platform with search/filter and adoption workflows.',
    modalTag: 'Full-Stack Web Application',
    description:
      'Developed and deployed a full-stack pet adoption platform using Next.js and the MERN stack. Designed scalable REST APIs and MongoDB schemas to manage pet listings and adoption workflows, including request approval/rejection with cascading logic. Built reusable, responsive UI components with Framer Motion animations, debounced search/filter, and a wishlist feature backed by localStorage — following modern React development practices.',
    tech: [
      { icon: 'fab fa-react', label: 'Next.js' },
      { icon: 'fab fa-node-js', label: 'Node.js' },
      { label: 'Express.js', textOnly: true },
      { icon: 'fas fa-database', label: 'MongoDB' },
      { label: 'BetterAuth', textOnly: true },
      { icon: 'fas fa-wind', label: 'Tailwind CSS' },
    ],
    screenshot: '/img/projects/petadoption.png',
    liveUrl: 'https://pet-adoption-platform-client-w1g8.vercel.app/',
    links: [
      { label: 'GitHub Repository', icon: 'fab fa-github', href: 'https://github.com/rashedmojammel/Pet-Adoption-Platform---Client' },
      { label: 'Live Site', icon: 'fa-solid fa-link', href: 'https://pet-adoption-platform-client-w1g8.vercel.app/' },
    ],
  },
  {
  id: 'roomfinder',
  tag: 'Next.js · TypeScript · Express · MongoDB · Better Auth',
  title: 'RoomFinder — Room & Apartment Rental Marketplace',
  cardDesc: 'Broker-free room rental platform with verified listings, booking flow & admin approval.',
  modalTag: 'Full-Stack Web Application',
  description:
    'Built a three-role (tenant/owner/admin) room rental marketplace connecting tenants directly with room owners. Implemented search & filter, a booking request flow with owner approval/rejection, post-booking star ratings, and in-app notifications. Owners manage listings via drag-and-drop photo upload (imgbb), with every new or edited listing requiring admin approval before going public. Auth is handled with Better Auth (email/password + Google OAuth, JWT-based authorization between the Next.js frontend and Express backend, verified via JWKS with no shared secret). Admins get a full analytics dashboard (Recharts) covering users, listings, and bookings.',
  tech: [
    { icon: 'fab fa-react', label: 'Next.js' },
    { label: 'TypeScript', textOnly: true },
    { icon: 'fab fa-node-js', label: 'Node.js' },
    { label: 'Express.js', textOnly: true },
    { icon: 'fas fa-database', label: 'MongoDB' },
    { label: 'Better Auth', textOnly: true },
    { icon: 'fas fa-wind', label: 'Tailwind CSS' },
  ],
  screenshot: '/img/projects/RoomFinder.png',
  liveUrl: 'https://room-finder-client-two.vercel.app/',
  links: [
    { label: 'GitHub Repository', icon: 'fab fa-github', href: 'https://github.com/rashedmojammel/RoomFinder-Client' },
    { label: 'Live Site', icon: 'fa-solid fa-link', href: 'https://room-finder-client-two.vercel.app/' },
  ],
},{
  id: 'fundspark',
  tag: 'Next.js · TypeScript · Express · MongoDB · Stripe',
  title: 'FundSpark — Credit-Based Crowdfunding Platform',
  cardDesc: 'Crowdfunding platform where supporters back campaigns with credits, creators cash out.',
  modalTag: 'Full-Stack Web Application',
  description:
    'Built a three-role (supporter/creator/admin) crowdfunding platform running on a credit system instead of direct payments. Supporters buy credits via Stripe Checkout (webhook-based, idempotent crediting) and contribute them to campaigns with optimistic UI. Creators launch campaigns with ImgBB cover uploads (admin review required before going live), manage incoming contributions, and request payouts of raised credits. Admins moderate campaigns, manage user roles, resolve reports, and mark withdrawals paid. Auth is handled with Better Auth, backed by MongoDB, with the frontend minting short-lived JWTs for every call to the separate Express API backend. Every fetch (TanStack Query) has a loading skeleton, error state with retry, and empty state, and a notification bell tracks every cross-user state change in real time.',
  tech: [
    { icon: 'fab fa-react', label: 'Next.js' },
    { label: 'TypeScript', textOnly: true },
    { icon: 'fab fa-node-js', label: 'Node.js' },
    { label: 'Express.js', textOnly: true },
    { icon: 'fas fa-database', label: 'MongoDB' },
    { icon: 'fa-brands fa-stripe', label: 'Stripe' },
    { label: 'Better Auth', textOnly: true },
    { icon: 'fas fa-wind', label: 'Tailwind CSS' },
  ],
  screenshot: '/img/projects/FundSpark.png',
  liveUrl: 'https://crowdfund-client-one.vercel.app/',
  links: [
    { label: 'GitHub Repository', icon: 'fab fa-github', href: 'https://github.com/rashedmojammel/crowdfund-client' },
    { label: 'Live Site', icon: 'fa-solid fa-link', href: 'https://crowdfund-client-one.vercel.app/' },
  ],
},
{
  id: 'tripplanner',
  tag: 'Next.js · TypeScript · Express · MongoDB · AI',
  title: 'TripPlanner — AI-Powered Travel Platform',
  cardDesc: 'Trip discovery platform with an AI travel concierge and AI-assisted listing generation.',
  modalTag: 'Full-Stack Web Application',
  description:
    'Built a three-role (traveler/organizer/admin) travel platform for discovering curated trips, featuring two agentic AI tools. The AI Travel Concierge runs a two-step pipeline — a fast LLM extracts structured filters from the user\'s message, the backend queries MongoDB for matching trips, then a larger LLM answers grounded in the real catalog with streaming responses and clickable trip links, never inventing trips. The AI Listing Writer generates trip titles and descriptions from destination, duration, and category, with selectable tone and length and one-click regenerate. Implemented debounced search with URL-persisted filter state, a protected trip management flow, and Better Auth with email/password and Google OAuth. Built with TanStack Query for all data fetching and Recharts for landing-page statistics.',
  tech: [
    { icon: 'fab fa-react', label: 'Next.js' },
    { label: 'TypeScript', textOnly: true },
    { icon: 'fab fa-node-js', label: 'Node.js' },
    { label: 'Express.js', textOnly: true },
    { icon: 'fas fa-database', label: 'MongoDB' },
    { label: 'Better Auth', textOnly: true },
    { icon: 'fas fa-wind', label: 'Tailwind CSS' },
  ],
  screenshot: '/img/projects/TripPlanner.png',
  liveUrl: 'https://trip-planner-client-navy.vercel.app',
  links: [
    { label: 'GitHub Repository', icon: 'fab fa-github', href: 'https://github.com/rashedmojammel/TripPlanner-Server' },
    { label: 'Live Site', icon: 'fa-solid fa-link', href: 'https://trip-planner-client-navy.vercel.app' },
  ],
},

  {
  id: 'foodyy',
  tag: 'ASP.NET Core MVC · C# · EF Core · SQL Server',
  title: 'Foodyy — Online Food Ordering System',
  cardDesc: 'Multi-module food ordering platform built with ASP.NET Core MVC and 3-Tier Architecture.',
  modalTag: 'Web Application',
  description:
    'Developed a multi-module online food ordering system using ASP.NET Core MVC and C#. Implemented a clean 3-Tier Architecture with Repository Pattern and Dependency Injection to improve maintainability and scalability. Designed relational database schemas and implemented core business logic using Entity Framework Core and SQL Server. The system includes user authentication, food browsing, cart management, order processing, and administrative management features.',
  tech: [
    { icon: 'fas fa-hashtag', label: 'C#' },
    { icon: 'fas fa-layer-group', label: 'ASP.NET Core MVC' },
    { icon: 'fas fa-database', label: 'SQL Server' },
    { icon: 'fas fa-server', label: 'Entity Framework Core' },
    { icon: 'fas fa-sitemap', label: '3-Tier Architecture' },
    { icon: 'fas fa-cubes', label: 'Repository Pattern' },
    { icon: 'fab fa-bootstrap', label: 'Bootstrap' },
  ],
  screenshot: '/img/projects/foody.png',
  links: [
    {
      label: 'GitHub Repository',
      icon: 'fab fa-github',
      href: 'https://github.com/rashedmojammel/OnlineFoodOrderingSystem.git',
    },
  ],
},
  {
    id: 'm1',
    tag: 'C#',
    title: 'Inventory Management System',
    cardDesc: 'Full-stack system for stock tracking, product management & order processing.',
    modalTag: 'Web Application',
    description:
      'A full-stack web-based Inventory Management System designed to streamline stock tracking, product management, and order processing. Admins can add, update, and delete products, monitor stock levels in real time, and generate detailed reports for business insights.',
    tech: [
      { icon: 'fas fa-hashtag', label: 'C#' },
      { icon: 'fas fa-database', label: 'MySQL' },
    ],
    youtubeId: 'xPAio-kAbhk',
    thumbQuality: 'hqdefault',
    links: [
      { label: 'GitHub Repository', icon: 'fab fa-github', href: 'https://github.com/rashedmojammel/Inventory-management-system' },
      { label: 'Watch on YouTube', icon: 'fab fa-youtube', href: 'https://www.youtube.com/watch?v=xPAio-kAbhk' },
    ],
  },
  {
    id: 'm2',
    tag: 'C++ · OpenGL',
    title: 'Dhaka City View',
    cardDesc: 'Cinematic visual project capturing the vibrant life and culture of Dhaka.',
    modalTag: 'Visual Project',
    description:
      "A cinematic visual project capturing the vibrant life, architecture, and culture of Dhaka city. Showcasing creative videography and editing skills, highlighting the beauty and energy of Bangladesh's capital from unique and artistic perspectives.",
    tech: [
      { icon: 'fas fa-microchip', label: 'C++' },
      { icon: 'fas fa-cube', label: 'OpenGL' },
    ],
    youtubeId: 'QSno4rXUnew',
    thumbQuality: 'hqdefault',
    links: [
      { label: 'GitHub Repository', icon: 'fab fa-github', href: 'https://github.com/rashedmojammel/Dhaka-city-view-OpenGL' },
      { label: 'Watch on YouTube', icon: 'fab fa-youtube', href: 'https://www.youtube.com/watch?v=QSno4rXUnew' },
    ],
  },
  {
    id: 'm3',
    tag: 'IoT',
    title: 'Smart IoT Plant Care System',
    cardDesc: 'Automated plant monitoring using sensors, microcontrollers and Firebase.',
    modalTag: 'IoT Project',
    description:
      'An intelligent IoT-based plant monitoring system that automatically tracks soil moisture, temperature, humidity, and light levels. Sends real-time alerts and automates watering using sensors and microcontrollers — maintaining healthy plants with minimal manual effort.',
    tech: [
      { icon: 'fas fa-microchip', label: 'Arduino' },
      { icon: 'fas fa-wifi', label: 'IoT Sensors' },
      { icon: 'fas fa-code', label: 'C++' },
    ],
    youtubeId: '7y2ioy4NYc8',
    thumbQuality: 'hqdefault',
    links: [
      { label: 'GitHub Repository', icon: 'fab fa-github', href: 'https://github.com/rashedmojammel/Smart-IoT-Plant-Care-System-for-Automated-Irrigation-and-Monitoring' },
      { label: 'Watch on YouTube', icon: 'fab fa-youtube', href: 'https://www.youtube.com/watch?v=7y2ioy4NYc8' },
    ],
  },
  {
    id: 'm4',
    tag: 'Hardware',
    title: 'Wireless Transmitter',
    cardDesc: 'RF-based wireless data transmitter built on embedded systems and circuit design.',
    modalTag: 'Hardware Project',
    description:
      'A hardware engineering project focused on designing and building a wireless data transmitter. Demonstrates core electronics and communication principles, implementing signal transmission between devices without physical connections using RF modules and embedded systems.',
    tech: [
      { icon: 'fas fa-microchip', label: 'Embedded Systems' },
      { icon: 'fas fa-broadcast-tower', label: 'RF Module' },
      { icon: 'fas fa-drafting-compass', label: 'Circuit Design' },
    ],
    youtubeId: '8eoZIrefc58',
    thumbQuality: 'hqdefault',
    links: [
      { label: 'GitHub Repository', icon: 'fab fa-github', href: 'https://github.com/rashedmojammel/Wireless-transmitter-' },
      { label: 'Watch on YouTube', icon: 'fab fa-youtube', href: 'https://www.youtube.com/watch?v=8eoZIrefc58' },
    ],
  },
  {
    id: 'm5',
    tag: 'HTML · CSS · JS · PHP · MySQL',
    title: 'Hostel Management System',
    cardDesc: 'Complete system for room booking, fee tracking and student management.',
    modalTag: 'Web Application',
    description:
      'A comprehensive web-based Hostel Management System for managing student rooms, bookings, fee payments, and complaints. Features an admin dashboard for room allocation, student registration, payment tracking, and automated reporting — simplifying hostel operations end to end.',
    tech: [
      { icon: 'fab fa-html5', label: 'HTML' },
      { icon: 'fab fa-css3-alt', label: 'CSS' },
      { icon: 'fab fa-js', label: 'JavaScript' },
      { icon: 'fab fa-php', label: 'PHP' },
      { icon: 'fas fa-database', label: 'MySQL' },
    ],
    youtubeId: 'ubyMm3Xg8Ek',
    thumbQuality: 'hqdefault',
    links: [
      { label: 'GitHub Repository', icon: 'fab fa-github', href: 'https://github.com/rashedmojammel/HostelManagementSystem' },
      { label: 'Watch on YouTube', icon: 'fab fa-youtube', href: 'https://www.youtube.com/watch?v=ubyMm3Xg8Ek' },
    ],
  },
  {
    id: 'm6',
    tag: 'HTML · Tailwind CSS · DaisyUI · JavaScript',
    title: 'Payoo — Mobile Wallet Web App',
    cardDesc:
      'A Bangladesh-focused digital wallet web application featuring money transfer, mobile recharge, bill payment, QR transactions, finance tools, and 40+ wallet features.',
    modalTag: 'Fintech Web Application',
    description:
      'Payoo is a feature-rich mobile wallet simulation inspired by Bangladesh fintech apps. The system includes 40+ features such as send money, add money, bill payments, mobile recharge, QR payments, budgeting tools, financial calculators, transport utilities, and transaction history. All data is stored using localStorage, allowing the application to work fully without a backend or database.',
    tech: [
      { icon: 'fab fa-html5', label: 'HTML' },
      { icon: 'fab fa-css3-alt', label: 'Tailwind CSS' },
      { icon: 'fas fa-layer-group', label: 'DaisyUI' },
      { icon: 'fab fa-js', label: 'JavaScript' },
      { icon: 'fas fa-database', label: 'localStorage' },
    ],
    youtubeId: 'wPyphIlahds',
    thumbQuality: '0',
    links: [
      { label: 'GitHub Repository', icon: 'fab fa-github', href: 'https://github.com/rashedmojammel/Payoo' },
      { label: 'Live Link', icon: 'fa-solid fa-link', href: 'https://easypayoo.netlify.app' },
      { label: 'Watch on YouTube', icon: 'fab fa-youtube', href: 'https://youtu.be/wPyphIlahds' },
    ],
  },
];