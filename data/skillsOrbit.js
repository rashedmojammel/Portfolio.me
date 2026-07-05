// Icons that orbit the hero "code" logo on the Home section.
// orbit: radius in px · dir: 1 clockwise / -1 counter-clockwise

export const orbitSkills = [
  // inner orbit (r = 155px) — 8 skills
  { icon: 'fab fa-html5', label: 'HTML', cls: 's-html', size: 'lg', orbit: 155, start: 0, dur: 18, dir: 1 },
  { icon: 'fab fa-css3-alt', label: 'CSS', cls: 's-css', size: 'lg', orbit: 155, start: 45, dur: 18, dir: 1 },
  { icon: 'fab fa-js', label: 'JS', cls: 's-js', size: 'lg', orbit: 155, start: 90, dur: 18, dir: 1 },
  { icon: 'fab fa-react', label: 'Next.js', cls: 's-react', size: 'lg', orbit: 155, start: 135, dur: 18, dir: 1 },
  { icon: 'fab fa-python', label: 'Python', cls: 's-python', size: 'lg', orbit: 155, start: 180, dur: 18, dir: 1 },
  { icon: 'fab fa-node-js', label: 'Node.js', cls: 's-node', orbit: 155, start: 225, dur: 18, dir: 1 },
  { icon: 'fab fa-php', label: 'PHP', cls: 's-php', orbit: 155, start: 270, dur: 18, dir: 1 },
  { icon: 'fab fa-java', label: 'Java', cls: 's-java', orbit: 155, start: 315, dur: 18, dir: 1 },

  // outer orbit (r = 230px) — 12 skills
  { icon: 'fas fa-database', label: 'MySQL', cls: 's-mysql', orbit: 230, start: 0, dur: 28, dir: -1 },
  { icon: 'fas fa-fire', label: 'Firebase', cls: 's-firebase', orbit: 230, start: 30, dur: 28, dir: -1 },
  { icon: 'fas fa-microchip', label: 'Arduino', cls: 's-arduino', orbit: 230, start: 60, dur: 28, dir: -1 },
  { icon: 'fab fa-git-alt', label: 'Git', cls: 's-git', orbit: 230, start: 90, dur: 28, dir: -1 },
  { icon: 'fab fa-github', label: 'GitHub', cls: 's-github', orbit: 230, start: 120, dur: 28, dir: -1 },
  { icon: 'fab fa-figma', label: 'Figma', cls: 's-figma', orbit: 230, start: 150, dur: 28, dir: -1 },
  { icon: 'fab fa-bootstrap', label: 'Bootstrap', cls: 's-bootstrap', orbit: 230, start: 180, dur: 28, dir: -1 },
  { icon: 'fas fa-hashtag', label: 'C#', cls: 's-csharp', orbit: 230, start: 210, dur: 28, dir: -1 },
  { icon: 'fas fa-code', label: 'C++', cls: 's-cpp', orbit: 230, start: 240, dur: 28, dir: -1 },
  { icon: 'fas fa-wind', label: 'Tailwind', cls: 's-tailwind', orbit: 230, start: 270, dur: 28, dir: -1 },
  { icon: 'fas fa-layer-group', label: 'DaisyUI', cls: 's-daisy', orbit: 230, start: 300, dur: 28, dir: -1 },
  { icon: 'fas fa-broadcast-tower', label: 'RF', cls: 's-rf', orbit: 230, start: 330, dur: 28, dir: -1 },
];

export const homeImages = [
  '/img/formal photo.png',
  '/img/IMG_0088.JPG',
  '/img/IMG_0280.JPEG',
  '/img/IMG_8971.JPEG',
];

export const typingRoles = ['Software Engineer', 'Full-Stack Developer', 'Problem Solver'];
