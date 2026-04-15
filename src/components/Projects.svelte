<script>
  const stuff = [
    {
      title: "this website",
      description: "you're looking at it! built with astro + svelte. source is on github.",
      vibe: "✦",
      color: "pink",
      link: "https://github.com/",
    },
    {
      title: "project two",
      description: "something cool you made. describe it however you want.",
      vibe: "☆",
      color: "cyan",
      link: "#",
    },
    {
      title: "project three",
      description: "another thing. maybe it's weird. that's fine.",
      vibe: "♡",
      color: "yellow",
      link: "#",
    },
    {
      title: "project four",
      description: "you get the idea. add as many as you want.",
      vibe: "◇",
      color: "green",
      link: "#",
    },
  ];
</script>

<section id="stuff" class="stuff">
  <div class="container">
    <h2>/* stuff i made */</h2>
    <div class="grid">
      {#each stuff as item}
        <a href={item.link} class="card {item.color}" target="_blank" rel="noopener noreferrer">
          <span class="vibe">{item.vibe}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </a>
      {/each}
    </div>
  </div>
</section>

<style>
  .stuff {
    padding: 5rem 1.5rem;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
  }

  h2 {
    font-family: var(--mono);
    font-size: 1.3rem;
    color: var(--green);
    margin-bottom: 2rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .card {
    border: 1px dashed var(--surface-border);
    border-radius: 2px;
    padding: 1.5rem;
    text-decoration: none;
    transition: border-color 0.2s, transform 0.15s;
    display: block;
  }

  .card:hover {
    transform: translateY(-3px);
  }

  .card.pink:hover { border-color: var(--pink); }
  .card.cyan:hover { border-color: var(--cyan); }
  .card.yellow:hover { border-color: var(--yellow); }
  .card.green:hover { border-color: var(--green); }

  .vibe {
    font-size: 1.5rem;
    display: block;
    margin-bottom: 0.5rem;
  }

  .card.pink .vibe { color: var(--pink); }
  .card.cyan .vibe { color: var(--cyan); }
  .card.yellow .vibe { color: var(--yellow); }
  .card.green .vibe { color: var(--green); }

  h3 {
    font-family: var(--mono);
    font-size: 1rem;
    color: var(--text);
    margin: 0 0 0.5rem;
  }

  p {
    color: var(--text-muted);
    font-size: 0.9rem;
    line-height: 1.6;
    margin: 0;
  }

  @media (max-width: 560px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
