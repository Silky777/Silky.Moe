<section id="about" class="about">
  <div class="container">
    <h2>/* about me */</h2>
    <div class="boxes">
      <div class="box">
        <span class="label">bio.txt</span>
        <p>
          hey! i'm silky. i make things on the internet because it's fun.
          this site is my little home page — a place to collect my projects,
          thoughts, and links to cool stuff.
        </p>
        <p>
          i believe the web should be weird, personal, and expressive.
          corporate minimalism is boring. let's make cool stuff.
        </p>
      </div>
      <div class="box">
        <span class="label">now.txt</span>
        <p class="now">
          ☆ currently building this very website<br />
          ☆ learning new things every day<br />
          ☆ browsing the indie web<br />
          ☆ probably should be sleeping
        </p>
      </div>
      <div class="box">
        <span class="label">likes.txt</span>
        <p class="likes">
          making websites ✦ open source ✦ late night coding ✦
          cool color palettes ✦ monospace fonts ✦ webrings ✦
          the small web ✦ creative coding
        </p>
      </div>
    </div>
  </div>
</section>

<style>
  .about {
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

  .boxes {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .box {
    border: 1px dashed var(--surface-border);
    padding: 1.25rem;
    border-radius: 2px;
    position: relative;
    transition: border-color 0.2s;
  }

  .box:hover {
    border-color: var(--pink);
  }

  .box:first-child {
    grid-column: 1 / -1;
  }

  .label {
    font-family: var(--mono);
    font-size: 0.7rem;
    color: var(--cyan);
    position: absolute;
    top: -0.5rem;
    left: 0.75rem;
    background: var(--bg);
    padding: 0 0.4rem;
  }

  p {
    color: var(--text-secondary);
    line-height: 1.8;
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
  }

  p:last-child {
    margin-bottom: 0;
  }

  .now {
    font-family: var(--mono);
    font-size: 0.85rem;
    line-height: 2;
  }

  .likes {
    color: var(--purple);
    font-size: 0.9rem;
  }

  @media (max-width: 560px) {
    .boxes {
      grid-template-columns: 1fr;
    }
  }
</style>
