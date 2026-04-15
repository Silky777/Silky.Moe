<section id="about" class="about">
  <div class="container">
    <h2>About Me</h2>
    <div class="grid">
      <div class="bio">
        <p>
          I'm a passionate developer who loves building creative and functional
          experiences. I work with modern web technologies and am always exploring
          new tools and frameworks.
        </p>
        <p>
          When I'm not coding, you can find me exploring new ideas, learning
          something new, or working on side projects.
        </p>
      </div>
      <div class="skills">
        <h3>Technologies</h3>
        <ul>
          <li>JavaScript / TypeScript</li>
          <li>Svelte / Astro</li>
          <li>HTML / CSS</li>
          <li>Node.js</li>
          <li>Git / GitHub</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<style>
  .about {
    padding: 6rem 2rem;
  }

  .container {
    max-width: 900px;
    margin: 0 auto;
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2.5rem;
    color: var(--text);
    position: relative;
    display: inline-block;
  }

  h2::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 3px;
    background: var(--accent);
    border-radius: 2px;
  }

  .grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 3rem;
    align-items: start;
  }

  .bio p {
    color: var(--text-secondary);
    line-height: 1.8;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    color: var(--text-secondary);
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--surface-border);
    font-size: 0.95rem;
  }

  li:last-child {
    border-bottom: none;
  }

  @media (max-width: 640px) {
    .grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }
</style>
