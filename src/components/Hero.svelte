<script>
  import { onMount } from "svelte";

  const phrases = ["builds things", "breaks things", "makes websites", "loves the web", "is online"];
  let index = $state(0);
  let visible = $state(true);

  onMount(() => {
    const interval = setInterval(() => {
      visible = false;
      setTimeout(() => {
        index = (index + 1) % phrases.length;
        visible = true;
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  });
</script>

<section class="hero">
  <div class="ascii-border">
    <pre class="ascii" aria-hidden="true">
  ┌──────────────────────────────────┐
  │  ★  welcome to my corner  ★     │
  │      of the internet            │
  └──────────────────────────────────┘
    </pre>
  </div>

  <h1>
    <span class="name">Silky</span><span class="dot">.</span><span class="ext">Moe</span>
  </h1>

  <p class="rotating">
    who <span class="phrase" class:visible>{phrases[index]}</span>
  </p>

  <div class="badges">
    <span class="badge pink">♡ made with love</span>
    <span class="badge cyan">☆ best viewed at 2am</span>
    <span class="badge yellow">✦ under construction forever</span>
  </div>

  <div class="arrows">
    <a href="#stuff">↓ go explore ↓</a>
  </div>
</section>

<style>
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 1.5rem;
    text-align: center;
    gap: 1.5rem;
  }

  .ascii-border {
    overflow: hidden;
  }

  .ascii {
    font-family: var(--mono);
    font-size: clamp(0.55rem, 1.8vw, 0.85rem);
    color: var(--text-muted);
    line-height: 1.4;
    white-space: pre;
  }

  h1 {
    font-family: var(--mono);
    font-size: clamp(3rem, 10vw, 7rem);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.03em;
  }

  .name {
    color: var(--pink);
  }

  .dot {
    color: var(--text-muted);
  }

  .ext {
    color: var(--cyan);
  }

  .rotating {
    font-family: var(--mono);
    font-size: 1.2rem;
    color: var(--text-secondary);
  }

  .phrase {
    display: inline-block;
    color: var(--yellow);
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.3s, transform 0.3s;
  }

  .phrase.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
    margin-top: 0.5rem;
  }

  .badge {
    font-family: var(--mono);
    font-size: 0.75rem;
    padding: 0.35rem 0.85rem;
    border: 1px dashed;
    border-radius: 2px;
  }

  .badge.pink {
    color: var(--pink);
    border-color: var(--pink);
  }

  .badge.cyan {
    color: var(--cyan);
    border-color: var(--cyan);
  }

  .badge.yellow {
    color: var(--yellow);
    border-color: var(--yellow);
  }

  .arrows {
    margin-top: 2rem;
  }

  .arrows a {
    font-family: var(--mono);
    font-size: 0.9rem;
    color: var(--text-muted);
    text-decoration: none;
    animation: bounce 2s infinite;
    display: inline-block;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(6px); }
  }
</style>
