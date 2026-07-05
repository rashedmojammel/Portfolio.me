import Reveal from '@/components/ui/Reveal';
import { GITHUB_USERNAME } from '@/data/siteConfig';

// Server Component — fetched at build/request time with a 1-hour cache
// (Next.js ISR via `next: { revalidate }`), so it's genuinely live without
// hammering GitHub's public API on every visitor.
async function getGithubProfile() {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function GithubActivity() {
  const profile = await getGithubProfile();

  return (
    <section className="github-activity" id="github">
      <div className="section-label">GitHub</div>

      <Reveal className="section-head">
        <p className="section-eyebrow">Live From GitHub</p>
        <h2 className="section-title">Building In <em>Public</em></h2>
        <p className="section-sub">A real-time look at what I&apos;m shipping and contributing</p>
      </Reveal>

      <Reveal className="github-card">
        <div className="github-card-top">
          {profile?.avatar_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.avatar_url} alt={GITHUB_USERNAME} className="github-avatar" />
          )}
          <div className="github-card-info">
            <h3>@{GITHUB_USERNAME}</h3>
            <p>{profile?.bio || 'Software Engineer & CSE student building full-stack, IoT and AI-driven projects.'}</p>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <i className="fab fa-github"></i> View Full Profile
            </a>
          </div>
        </div>

        <div className="github-stats-row">
          <div className="github-stat">
            <span className="github-stat-num">{profile?.public_repos ?? '—'}</span>
            <span className="github-stat-label">Public Repos</span>
          </div>
          <div className="github-stat">
            <span className="github-stat-num">{profile?.followers ?? '—'}</span>
            <span className="github-stat-label">Followers</span>
          </div>
          <div className="github-stat">
            <span className="github-stat-num">{profile?.following ?? '—'}</span>
            <span className="github-stat-label">Following</span>
          </div>
        </div>
      </Reveal>

      <Reveal className="github-charts" delay={100}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* Contribution Graph */}
<img
  className="github-contrib-graph"
  src={`https://ghchart.rshah.org/${GITHUB_USERNAME}`}
  alt="GitHub contribution graph"
  loading="lazy"
/>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="github-contrib-img"
          src={`https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&hide_border=true&background=00000000&ring=c9a84c&fire=c9a84c&currStreakLabel=c9a84c&sideLabels=f2ede4&currStreakNum=f2ede4&sideNums=f2ede4&dates=8a8578`}
          alt="GitHub streak"
          loading="lazy"
        />
      </Reveal>
    </section>
  );
}