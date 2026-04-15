<section class="hero">
  <div class="content">
    <p class="greeting">Hi, I'm</p>
    <h1>Silky</h1>
    <p class="tagline">Developer & Creator</p>
    <p class="description">
      I build things for the web and beyond. Welcome to my corner of the internet.
    </p>
    <div class="cta">
      <a href="#projects" class="btn primary">View Projects</a>
      <a href="#contact" class="btn secondary">Get in Touch</a>
    </div>
  </div>
</section>

<style>
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6rem 2rem 4rem;
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at 30% 40%,
      rgba(109, 40, 217, 0.12) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 70% 60%,
      rgba(59, 130, 246, 0.08) 0%,
      transparent 50%
    );
    animation: drift 20s ease-in-out infinite alternate;
  }

  @keyframes drift {
    0% { transform: translate(0, 0); }
    100% { transform: translate(-5%, 3%); }
  }

  .content {
    position: relative;
    max-width: 700px;
    text-align: center;
  }

  .greeting {
    font-size: 1.1rem;
    color: var(--accent);
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  h1 {
    font-size: clamp(3rem, 8vw, 5.5rem);
    font-weight: 800;
    line-height: 1.1;
    margin: 0;
    background: linear-gradient(135deg, var(--text) 0%, var(--accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .tagline {
    font-size: clamp(1.2rem, 3vw, 1.6rem);
    color: var(--text-secondary);
    margin-top: 0.5rem;
    font-weight: 500;
  }

  .description {
    color: var(--text-muted);
    font-size: 1.1rem;
    line-height: 1.6;
    max-width: 500px;
    margin: 1.5rem auto;
  }

  .cta {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
    flex-wrap: wrap;
  }

  .btn {
    padding: 0.75rem 1.75rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .btn:hover {
    transform: translateY(-2px);
  }

  .btn.primary {
    background: var(--accent);
    color: #fff;
    box-shadow: 0 4px 20px rgba(109, 40, 217, 0.4);
  }

  .btn.primary:hover {
    box-shadow: 0 6px 30px rgba(109, 40, 217, 0.6);
  }

  .btn.secondary {
    border: 2px solid var(--surface-border);
    color: var(--text);
  }

  .btn.secondary:hover {
    border-color: var(--accent);
    box-shadow: 0 4px 20px rgba(109, 40, 217, 0.15);
  }
</style>
