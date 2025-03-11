import React, { useState } from 'react';
import '../styles/UpcomingDrives.css';

const UpcomingDrives = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Job listings data
  const jobs = [
    {
      id: 1,
      company: 'Lusion',
      logo: 'https://imgs.search.brave.com/p6bNVqhkvMewx5JXmq1jXkh-33BLhZdwQEdrUTB0V8w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIyLzAy/L05WSURJQV9sb2dv/LTUwMHgyODEucG5n',
      position: 'Jnr/Mid 3D Motion Designer',
      description: 'Lusion is an award winning creative studio specialising crafting interactive digital storytelling experiences. Our projects range from crafting visuals, website build projects, in-house projects, concept creations and physical experiences in AR.',
      location: 'United Kingdom',
      website: 'lusion.co',
      postedDays: 3,
      isRemote: false
    },
    {
      id: 2,
      company: 'RGX',
      logo: 'rgx-logo.png',
      position: 'UI/Web Designer',
      description: '100% Remote Web UI Designer – Craft Award-Winning Digital ExperiencesRemember the first time a website made you stop and feel something? The kind of experience that pulled you in—not just with visuals, but with emotion, storytelling, a',
      location: null,
      website: 'apply.workable.com/regexsocareers',
      postedDays: 9,
      isRemote: true
    },
    {
      id: 3,
      company: 'Magnetism',
      logo: 'magnetism-logo.png',
      position: 'UX/UI Designer',
      description: 'WANT TO JOIN A CREATIVE AGENCY? Magnetism, a digital-first advertising agency made up of a team of about twenty people, delivers creative concepts, content, services, and innovative campaigns. We work with numerous brands including Nespresso, Richard',
      location: null,
      website: 'magnetism.fr',
      postedDays: 10,
      isRemote: true
    },
    {
      id: 4,
      company: 'Blackpizza®',
      logo: 'blackpizza-logo.png',
      position: 'Directeur·ice Artistique – CDI',
      description: 'QUI SOMMES-NOUS ?Blackpizza® est un studio créatif indépendant fondé en 2011. Nous mêlons audace, maîtrise et joie de faire pour concevoir des expériences visuelles et narratives uniques. À la croisée du branding, du digital, et du print, nous exploro',
      location: 'France',
      website: 'blackpizza.fr',
      postedDays: 15,
      isRemote: false
    },
    {
      id: 5,
      company: 'Starknet Foundation',
      logo: 'starknet-logo.png',
      position: '',
      description: '',
      location: null,
      website: '',
      postedDays: null,
      isRemote: true
    },
    {
      id: 6,
      company: 'EWM.SWISS',
      logo: 'ewm-logo.png',
      position: '',
      description: '',
      location: null,
      website: '',
      postedDays: null,
      isRemote: true
    },
    {
      id: 7,
      company: 'Rho',
      logo: 'rho-logo.png',
      position: '',
      description: '',
      location: null,
      website: '',
      postedDays: null,
      isRemote: false
    },
    {
      id: 8,
      company: 'Rho',
      logo: 'rho-logo-2.png',
      position: '',
      description: '',
      location: null,
      website: '',
      postedDays: null,
      isRemote: false
    }
  ];

  return (
    <div>
        <h1 style={{marginLeft:'5em', color:'black'}}>Upcoming drives</h1>
    
    <div className="upcoming-drives-container">
      {/* Menu Button */}
      <button className="menu-button" onClick={toggleMenu}>
        ☰
      </button>

      {/* Menu Overlay */}
      <div className={`menu-overlay ${isMenuOpen ? 'open' : ''}`}>
        <div className="menu-content">
          <ul>
            <li>
              <a href="#link1">Link 1</a>
            </li>
            <li>
              <a href="#link2">Link 2</a>
            </li>
            <li>
              <a href="#link3">Link 3</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Job Listings */}
      <div className={`job-listings-container ${isMenuOpen ? 'shifted' : ''}`}>
        <div className="jobs-grid">
          {jobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-header">
                <div className="company-logo">
                  <img src={job.logo} alt={`${job.company} logo`} />
                </div>
                <div className="company-name">
                  {job.company}
                  {job.isRemote && <span className="remote-tag">REMOTE</span>}
                </div>
              </div>

              {job.position && (
                <div className="job-position">{job.position}</div>
              )}

              {job.description && (
                <div className="job-description">{job.description}</div>
              )}

              <div className="job-footer">
                {job.location && (
                  <div className="job-detail">
                    <div className="detail-label">Location</div>
                    <div className="detail-value">{job.location}</div>
                  </div>
                )}

                {job.website && (
                  <div className="job-detail">
                    <div className="detail-label">Website</div>
                    <div className="detail-value">{job.website}</div>
                  </div>
                )}

                {job.postedDays && (
                  <div className="job-posted">
                    <div className="days-ago">
                      <span className="clock-icon">○</span>
                      {job.postedDays} days ago
                    </div>
                    <div className="arrow-icon">→</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
</div>
  );
};

export default UpcomingDrives;