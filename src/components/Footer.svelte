<footer id="contact">
  <div class="container">
    <h2>Get in Touch</h2>
    <p>Feel free to reach out if you'd like to collaborate or just say hello.</p>
    <div class="links">
      <a href="mailto:hello@silky.moe">Email</a>
      <a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>
    </div>
    <p class="copy">&copy; {new Date().getFullYear()} Silky.Moe. All rights reserved.</p>
  </div>
</footer>

<style>
  footer {
    padding: 6rem 2rem 3rem;
    text-align: center;
    border-top: 1px solid var(--surface-border);
  }

  .container {
    max-width: 600px;
    margin: 0 auto;
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 1rem;
  }

  p {
    color: var(--text-muted);
    font-size: 1.05rem;
    line-height: 1.6;
  }

  .links {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 2rem 0;
  }

  .links a {
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    padding: 0.5rem 1.25rem;
    border: 1px solid var(--surface-border);
    border-radius: 8px;
    transition: border-color 0.2s, color 0.2s;
  }

  .links a:hover {
    color: var(--accent);
    border-color: var(--accent);
  }

  .copy {
    margin-top: 3rem;
    font-size: 0.85rem;
    color: var(--text-muted);
  }
</style>
