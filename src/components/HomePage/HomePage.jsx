import React, { useState, useEffect } from 'react';
import { Home, Info, Grid3x3, Mail, Bot, Palette, BarChart3, BookOpen, Send, ArrowRight, Github, Twitter, Linkedin, Cpu } from 'lucide-react';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [visible, setVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      ['home', 'about', 'projects', 'contact'].forEach(s => {
        const el = document.getElementById(s);
        if (el) {
          const r = el.getBoundingClientRect();
          const v = r.top < window.innerHeight * 0.75 && r.bottom > 0;
          setVisible(p => ({ ...p, [s]: v }));
          
          if (r.top < window.innerHeight / 2 && r.bottom > window.innerHeight / 2) {
            setActiveSection(s);
          }
        }
      });
    };

    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMove);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  // Projects with links - Replace these URLs with your actual project links
  const projects = [
    { 
      id: 1, 
      title: 'KageAI', 
      desc: 'Advanced artificial intelligence solutions for next-generation applications', 
      Icon: Bot, 
      colorClass: 'Cyan',
      link: '#' // Replace with your actual link
    },
    { 
      id: 2, 
      title: 'KageComics', 
      desc: 'AI-powered comic creation and storytelling platform', 
      Icon: Palette, 
      colorClass: 'Purple',
      link: '#' // Replace with your actual link
    },
    { 
      id: 3, 
      title: 'KageAnalytics', 
      desc: 'Deep learning analytics for business intelligence', 
      Icon: BarChart3, 
      colorClass: 'Green',
      link: '#' // Replace with your actual link
    },
    { 
      id: 4, 
      title: 'KageStudy', 
      desc: 'Interactive learning platform powered by AI', 
      Icon: BookOpen, 
      colorClass: 'Orange',
      link: '#' // Replace with your actual link
    },
    { 
      id: 5, 
      title: 'KageSystem', 
      desc: "The System inspired from Solo Leveling's System for improving lives.", 
      Icon: Cpu, 
      colorClass: 'Blue',
      link: 'https://system.kage.wulabs.org' // Replace with your actual link
    }
  ];

  const aboutItems = [
    { title: 'Innovation First', desc: 'Pushing boundaries with cutting-edge AI research and breakthrough solutions that reshape industries.' },
    { title: 'Human-Centric', desc: 'Creating technology that bridges the gap between human creativity and machine intelligence.' },
    { title: 'Future-Ready', desc: 'Building platforms and tools that empower the next generation of creators and innovators.' },
  ];

  return (
    <div className={styles.container}>
      {/* Cursor Follower */}
      <div 
        className={styles.cursorFollower}
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />

      {/* Header */}
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
        <div className={styles.headerContent}>
          <div className={styles.logoWrapper}>
            <div className={styles.logoGlow}></div>
            <div className={styles.logo}>KAGELABS</div>
          </div>
          
          <nav className={styles.nav}>
            {[
              { id: 'home', icon: Home, label: 'Home' },
              { id: 'about', icon: Info, label: 'About' },
              { id: 'projects', icon: Grid3x3, label: 'Projects' },
              { id: 'contact', icon: Mail, label: 'Contact' },
            ].map(({ id, icon: Icon, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`${styles.navLink} ${activeSection === id ? styles.navLinkActive : ''}`}
              >
                <Icon size={18} />
                <span className={styles.navLinkLabel}>{label}</span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className={styles.hero}>
        <div className={styles.gridBackground}></div>
        
        <div className={`${styles.orb} ${styles.orbCyan}`}></div>
        <div className={`${styles.orb} ${styles.orbPurple}`}></div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeText}>
              Welcome to the Future of Innovation
            </span>
          </div>
          
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleWord}>Building</span>{' '}
            <span className={`${styles.heroTitleWord} ${styles.heroTitleGradient}`} style={{ animationDelay: '0.1s' }}>
              Tomorrow's
            </span>{' '}
            <span className={styles.heroTitleWord} style={{ animationDelay: '0.2s' }}>Tech</span>
          </h1>
          
          <p className={styles.heroSubtitle}>
            Pioneering AI research and breakthrough solutions that transform industries and empower the next generation of innovators
          </p>
          
          <div className={styles.heroCTA}>
            <a href="#projects" className={styles.ctaPrimary}>
              <span style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Explore Projects
                <ArrowRight size={20} />
              </span>
              <div className={styles.ctaPrimaryOverlay}></div>
            </a>
            
            <a href="#contact" className={styles.ctaSecondary}>
              Get in Touch
            </a>
          </div>
          
          <div className={styles.scrollIndicator}>
            <div className={styles.scrollIndicatorInner}>
              <div className={styles.scrollIndicatorDot}></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        className={`${styles.section} ${visible.about ? styles.sectionVisible : ''}`}
      >
        <div className={styles.sectionContent}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>About KageLabs</h2>
            <div className={styles.sectionDivider}></div>
          </div>
          
          <div className={styles.aboutGrid}>
            {aboutItems.map((item, i) => (
              <div key={i} className={styles.aboutCard}>
                <div className={styles.aboutCardGlow}></div>
                <div className={styles.aboutCardContent}>
                  <div className={styles.aboutCardNumber}>{i + 1}</div>
                  <h3 className={styles.aboutCardTitle}>{item.title}</h3>
                  <p className={styles.aboutCardDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        className={`${styles.section} ${visible.projects ? styles.sectionVisible : ''}`}
      >
        <div className={styles.sectionContent}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Projects</h2>
            <div className={styles.sectionDivider}></div>
            <p className={styles.sectionSubtitle}>
              Innovative solutions powered by artificial intelligence
            </p>
          </div>
          
          <div className={styles.projectsGrid}>
            {projects.map((p) => (
              <div key={p.id} className={styles.projectCard}>
                <div className={`${styles.projectCardGlow} ${styles[`projectCardGlow${p.colorClass}`]}`}></div>
                <div className={`${styles.projectCardGlowBlur} ${styles[`projectCardGlow${p.colorClass}`]}`}></div>
                
                <div className={styles.projectCardContent}>
                  <div className={`${styles.projectIcon} ${styles[`projectIcon${p.colorClass}`]}`}>
                    <p.Icon size={40} />
                  </div>
                  
                  <h3 className={styles.projectTitle}>{p.title}</h3>
                  <p className={styles.projectDesc}>{p.desc}</p>
                  
                  {/* Changed from button to link */}
                  <a 
                    href={p.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.projectButton}
                  >
                    Learn More
                    <ArrowRight size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        className={`${styles.section} ${visible.contact ? styles.sectionVisible : ''}`}
      >
        <div className={styles.sectionContent}>
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h2 className={styles.contactTitle}>
                Let's Build
                <span className={styles.contactTitleGradient}>Something Great</span>
              </h2>
              
              <p className={styles.contactSubtitle}>
                Ready to innovate? Get in touch and let's create the future together.
              </p>
              
              <a href="mailto:contact@kagelabs.com" className={styles.contactEmail}>
                <Mail size={24} className={styles.contactEmailIcon} />
                <div>
                  <div className={styles.contactEmailLabel}>Email us at</div>
                  <div className={styles.contactEmailText}>contact@kagelabs.com</div>
                </div>
              </a>
              
              <div className={styles.socialLinks}>
                {[Github, Twitter, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className={styles.socialLink}>
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
            
            <div className={styles.contactForm}>
              <div className={styles.contactFormGlow}></div>
              
              <div className={styles.contactFormContent}>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={styles.formInput}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={styles.formInput}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${styles.formInput} ${styles.formTextarea}`}
                  />
                </div>
                
                <button
                  onClick={(e) => { e.preventDefault(); console.log('Submitted:', formData); }}
                  className={styles.formButton}
                >
                  <span style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Send Message
                    <Send size={20} />
                  </span>
                  <div className={styles.formButtonOverlay}></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>KAGELABS</div>
          
          <nav className={styles.footerNav}>
            {['Home', 'About', 'Projects', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className={styles.footerLink}>
                {item}
              </a>
            ))}
          </nav>
          
          <div className={styles.footerCopyright}>
            © {new Date().getFullYear()} KageLabs. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;