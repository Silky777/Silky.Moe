<script>
  const projects = [
    {
      title: "Project One",
      description: "A brief description of your first project. What it does and what tech it uses.",
      tags: ["Svelte", "TypeScript"],
      link: "#",
      repo: "#",
    },
    {
      title: "Project Two",
      description: "A brief description of your second project. Highlight the key features.",
      tags: ["Astro", "CSS"],
      link: "#",
      repo: "#",
    },
    {
      title: "Project Three",
      description: "A brief description of your third project. What problem does it solve?",
      tags: ["Node.js", "API"],
      link: "#",
      repo: "#",
    },
  ];
</script>

<section id="projects" class="projects">
  <div class="container">
    <h2>Projects</h2>
    <div class="grid">
      {#each projects as project}
        <article class="card">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div class="tags">
            {#each project.tags as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
          <div class="links">
            <a href={project.link} target="_blank" rel="noopener noreferrer">Live Demo</a>
            <a href={project.repo} target="_blank" rel="noopener noreferrer">Source</a>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .projects {
    padding: 6rem 2rem;
  }

  .container {
    max-width: 1000px;
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
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .card {
    background: var(--surface);
    border: 1px solid var(--surface-border);
    border-radius: 12px;
    padding: 1.75rem;
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    border-color: var(--accent);
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text);
    margin: 0 0 0.75rem;
  }

  p {
    color: var(--text-muted);
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0 0 1rem;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.25rem;
  }

  .tag {
    background: rgba(109, 40, 217, 0.15);
    color: var(--accent-light);
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .links {
    display: flex;
    gap: 1rem;
  }

  .links a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    transition: color 0.2s;
  }

  .links a:hover {
    color: var(--accent);
  }
</style>
