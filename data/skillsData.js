// Skill category cards in the "Earned Skills" section.

export const skillCategories = [
  {
    icon: 'fas fa-laptop-code',
    title: 'Frontend',
    desc: 'Building responsive, interactive and visually polished user interfaces.',
    tags: [
      { icon: 'fab fa-html5', label: 'HTML' },
      { icon: 'fab fa-css3-alt', label: 'CSS' },
      { icon: 'fab fa-js', label: 'JavaScript' },
      { icon: 'fab fa-react', label: 'Next.js' },
      { icon: 'fab fa-bootstrap', label: 'Bootstrap' },
      { label: 'Tailwind', textOnly: true },
    ],
  },
  {
    icon: 'fas fa-server',
    title: 'Backend',
    desc: 'Developing robust server-side logic, REST APIs and database-driven apps.',
    tags: [
      { icon: 'fab fa-node-js', label: 'Node.js' },
      { icon: 'fab fa-php', label: 'PHP' },
      { icon: 'fas fa-fire', label: 'Firebase' },
      { label: 'MongoDB', textOnly: true },
      { icon: 'fas fa-database', label: 'MySQL' },
      { label: '.NET', textOnly: true },
    ],
  },
  {
    icon: 'fas fa-microchip',
    title: 'Languages',
    desc: 'Strong foundation in object-oriented and systems programming via CSE.',
    tags: [
      { icon: 'fas fa-microchip', label: 'C++' },
      { icon: 'fab fa-java', label: 'Java' },
      { icon: 'fas fa-hashtag', label: 'C#' },
    ],
  },
  {
    icon: 'fas fa-tools',
    title: 'Tools',
    desc: 'Industry-standard tools for design, version control and productivity.',
    tags: [
      { icon: 'fab fa-figma', label: 'Figma' },
      { label: 'Notion', textOnly: true },
      { icon: 'fab fa-git-alt', label: 'Git' },
      { icon: 'fab fa-github', label: 'GitHub' },
    ],
  },
];
