<footer id="guestbook">
  <!-- webring -->
  <div class="webring">
    <a href="#" class="ring-link">← prev</a>
    <span class="ring-name">✦ webring ✦</span>
    <a href="#" class="ring-link">next →</a>
  </div>

  <div class="container">
    <div class="links">
      <a href="mailto:hello@silky.moe">✉ email</a>
      <a href="https://github.com/Silky777" target="_blank" rel="noopener noreferrer">⌘ github</a>
    </div>

    <div class="status-bar">
      <span>silky.moe</span>
      <span>·</span>
      <span>made with ♡ and too much coffee</span>
      <span>·</span>
      <span><a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank" rel="noopener noreferrer">AGPLv3.0</a></span>
    </div>

    <p class="visitor">
      you are visitor #<span class="counter">???</span> — thanks for stopping by!
    </p>
  </div>
</footer>

<style>
  footer {
    padding: 3rem 1.5rem 2rem;
    text-align: center;
    font-family: var(--mono);
    font-size: 0.8rem;
  }

  .webring {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: 1rem;
    margin-bottom: 2rem;
    border: 2px dashed var(--surface-border);
    border-radius: 2px;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }

  .ring-link {
    color: var(--cyan);
    text-decoration: none;
    transition: color 0.15s;
  }

  .ring-link:hover {
    color: var(--pink);
    text-decoration: underline wavy;
  }

  .ring-name {
    color: var(--yellow);
  }

  .container {
    max-width: 600px;
    margin: 0 auto;
  }

  .links {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .links a {
    color: var(--text-secondary);
    text-decoration: none;
    padding: 0.4rem 1rem;
    border: 1px dashed var(--surface-border);
    border-radius: 2px;
    transition: border-color 0.2s, color 0.2s;
  }

  .links a:hover {
    color: var(--pink);
    border-color: var(--pink);
  }

  .status-bar {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    color: var(--text-muted);
    padding: 0.75rem 0;
    border-top: 1px solid var(--surface-border);
    border-bottom: 1px solid var(--surface-border);
    margin-bottom: 1.5rem;
  }

  .status-bar a {
    color: var(--text-muted);
    text-decoration: underline;
    transition: color 0.15s;
  }

  .status-bar a:hover {
    color: var(--green);
  }

  .visitor {
    color: var(--text-muted);
    font-size: 0.75rem;
  }

  .counter {
    color: var(--green);
  }
</style>
