import { orbitSkills } from '@/data/skillsOrbit';

/**
 * The orbiting skill-icon animation behind the hero name.
 * Pure CSS-driven (animation defined in styles.css @keyframes orbitSpin) —
 * this component just renders each icon at its starting angle/orbit radius.
 */
export default function SkillsOrbit() {
  return (
    <div className="skills-orb-container" id="skills-orb-container">
      <div className="orbit-center">
        <i className="fas fa-code"></i>
      </div>

      {orbitSkills.map((skill) => {
        const isLg = skill.size === 'lg';
        const offset = isLg ? 37 : 31;
        return (
          <div
            key={skill.label}
            className={`skill-ball ${skill.cls} ${isLg ? 'lg' : ''}`}
            style={{
              top: '50%',
              left: '50%',
              marginTop: `-${offset}px`,
              marginLeft: `-${offset}px`,
              '--orbit-r': `${skill.orbit}px`,
              '--orbit-start': `${skill.start}deg`,
              animation: `orbitSpin ${Math.abs(skill.dur)}s linear infinite`,
              animationDirection: skill.dir === -1 ? 'reverse' : 'normal',
            }}
          >
            <i className={skill.icon}></i>
            <span>{skill.label}</span>
          </div>
        );
      })}
    </div>
  );
}
