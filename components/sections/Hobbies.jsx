import Reveal from '@/components/ui/Reveal';
import { renderBold } from '@/components/ui/textFormat';
import { games, movies } from '@/data/hobbies';

export default function Hobbies() {
  return (
    <section className="hobbies" id="hobbies">
      <div className="section-label">Hobbies</div>

      <Reveal className="section-head">
        <p className="section-eyebrow">Beyond Code</p>
        <h2 className="section-title">Things I <em>Love</em></h2>
        <p className="section-sub">What keeps me inspired outside of work</p>
      </Reveal>

      <Reveal className="hobbies-grid">
        <div className="hobby-card hobby-card--wide">
          <div className="hobby-card-top">
            <div className="hobby-icon"><i className="fas fa-gamepad"></i></div>
            <div>
              <h3>Gaming</h3>
              <p className="hobby-sub">How games sharpen my problem-solving skills</p>
            </div>
          </div>
          <p>
            Gaming isn&apos;t just entertainment — it actively sharpens my problem-solving skills.
            Every game I play teaches something different that I bring into my engineering mindset.
          </p>

          <div className="hobby-games-grid">
            {games.map((game) => (
              <div className="game-card" key={game.name}>
                <div className="game-card-header">
                  <div className={`game-icon ${game.iconCls}`}><i className={game.icon}></i></div>
                  <div>
                    <h4>{game.name}</h4>
                    <span className="game-genre">{game.genre}</span>
                  </div>
                </div>
                <p>{renderBold(game.desc)}</p>
                <div className="game-skills">
                  {game.skills.map((s) => <span key={s}>{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hobby-card hobby-card--wide">
          <div className="hobby-card-top">
            <div className="hobby-icon"><i className={movies.icon}></i></div>
            <div>
              <h3>{movies.title}</h3>
              <p className="hobby-sub">{movies.sub}</p>
            </div>
          </div>
          <p>{renderBold(movies.desc)}</p>
          <div className="hobby-game-tags">
            {movies.tags.map((tag) => (
              <span key={tag.label}><i className={tag.icon}></i> {tag.label}</span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
