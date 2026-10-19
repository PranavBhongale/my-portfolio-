import React from 'react';
import { createRoot } from 'react-dom/client';
import { profile, projects } from './content.js';
import './style.css';

const links = [
  profile.email && { label: 'Email', href: `mailto:${profile.email}` },
  profile.linkedin && { label: 'LinkedIn', href: profile.linkedin },
  profile.github && { label: 'GitHub', href: profile.github },
  profile.resume && { label: 'Résumé', href: profile.resume }
].filter(Boolean);

const steps = [
  ['Understand the workload', 'Define the operations, data types, interfaces and constraints before choosing an architecture.'],
  ['Design and model', 'Split the system into clear modules, and use RTL or SystemC models to explore trade-offs.'],
  ['Verify and measure', 'Use repeatable tests, and report measured results separately from estimates and goals.']
];

function ArrayGraphic() {
  const cells = Array.from({ length: 64 }, (_, i) => (i % 8) + Math.floor(i / 8));
  return (
    <figure className="array" aria-label="Illustration of data moving diagonally through an 8 by 8 systolic array">
      <div className="grid">{cells.map((d, i) => <span key={i} style={{ '--d': d }} />)}</div>
      <figcaption>Illustration: data wavefront in an 8 × 8 systolic array</figcaption>
    </figure>
  );
}

function App() {
  return (
    <>
      <header className="bar">
        <a className="name" href="#top">{profile.name}</a>
        <nav aria-label="Main">
          <a href="#projects">Projects</a>
          <a href="#approach">Approach</a>
          <a href="#about">About</a>
          {links.length > 0 && <a href="#contact">Contact</a>}
        </nav>
      </header>

      <main id="top">
        <section className="hero wrap">
          <div>
            <h1>{profile.name}</h1>
            <p className="role">Electronics engineering student working on RTL design, computer architecture and AI accelerators.</p>
            <p className="lead">I like following a computation from the math down to the datapath, then measuring what the hardware actually does. My current projects cover an INT8 accelerator, a RISC-V CPU and a cache model.</p>
            <div className="actions">
              <a className="btn solid" href="#projects">View projects</a>
              {profile.resume && <a className="btn" href={profile.resume}>Résumé</a>}
            </div>
          </div>
          <ArrayGraphic />
        </section>

        <section className="wrap section" id="projects">
          <h2>Projects</h2>
          <ul className="projects">
            {projects.map(p => (
              <li key={p.title}>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </div>
                <div className="meta">
                  <span className="status">{p.status}</span>
                  <span className="tags">{p.tags.join(', ')}</span>
                  {p.repo && <a href={p.repo} target="_blank" rel="noreferrer">View repository</a>}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="wrap section" id="approach">
          <h2>How I work</h2>
          <ol className="steps">
            {steps.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}
          </ol>
        </section>

        <section className="wrap section about" id="about">
          <h2>About</h2>
          <div>
            <p>I'm studying electronics engineering and learning how processors, memory systems and specialized accelerators are designed. I enjoy connecting the mathematics of computation with practical digital hardware.</p>
            <p><strong>Tools and topics:</strong> SystemVerilog, SystemC, computer architecture, AI accelerators, hardware verification.</p>
          </div>
        </section>

        {links.length > 0 && (
          <section className="wrap section" id="contact">
            <h2>Contact</h2>
            <p className="lead">I'm open to internships, technical discussion and project collaboration.</p>
            <div className="actions">
              {links.map((l, i) => <a key={l.label} className={`btn${i === 0 ? ' solid' : ''}`} href={l.href} target={l.href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer">{l.label}</a>)}
            </div>
          </section>
        )}
      </main>

      <footer className="wrap"><span>© {new Date().getFullYear()} {profile.name}</span><a href="#top">Back to top</a></footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
