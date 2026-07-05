import Reveal from '@/components/ui/Reveal';
import { VIDEO_CV_YOUTUBE_ID } from '@/data/siteConfig';

export default function VideoCV() {
  return (
    <Reveal className="video-cv-section">
      <div className="video-cv-inner">
        <div className="video-cv-label">
          <span><i className="fas fa-play-circle" style={{ marginRight: 6 }}></i>Video CV</span>
        </div>

        <div className="video-cv-frame">
          <div className="video-cv-ratio">
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_CV_YOUTUBE_ID}`}
              title="Rashedul Alam — Video CV"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="video-cv-caption">
          <p>Watch my Video CV to learn more about my background and goals.</p>
          <a href={`https://www.youtube.com/watch?v=${VIDEO_CV_YOUTUBE_ID}`} target="_blank" rel="noopener noreferrer">
            Watch on YouTube <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </Reveal>
  );
}
