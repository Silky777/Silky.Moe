<script>
  let scrolled = $state(false);
  let menuOpen = $state(false);

  function handleScroll() {
    scrolled = window.scrollY > 20;
  }

  $effect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  function toggleMenu() {
    menuOpen = !menuOpen;
  }
</script>

<header class:scrolled>
  <nav>
    <a href="/" class="logo">Silky.Moe</a>
    <button class="menu-toggle" onclick={toggleMenu} aria-label="Toggle menu">
      <span class="bar" class:open={menuOpen}></span>
      <span class="bar" class:open={menuOpen}></span>
      <span class="bar" class:open={menuOpen}></span>
    </button>
    <ul class:open={menuOpen}>
      <li><a href="#about" onclick={() => (menuOpen = false)}>About</a></li>
      <li><a href="#projects" onclick={() => (menuOpen = false)}>Projects</a></li>
      <li><a href="#contact" onclick={() => (menuOpen = false)}>Contact</a></li>
    </ul>
  </nav>
</header>

<style>
  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 1rem 2rem;
    transition: background 0.3s, box-shadow 0.3s;
  }

  header.scrolled {
    background: rgba(15, 15, 20, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
  }

  nav {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--accent);
    text-decoration: none;
  }

  ul {
    display: flex;
    list-style: none;
    gap: 2rem;
    margin: 0;
    padding: 0;
  }

  ul a {
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }

  ul a:hover {
    color: var(--text);
  }

  .menu-toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
  }

  .bar {
    display: block;
    width: 24px;
    height: 2px;
    background: var(--text);
    border-radius: 2px;
    transition: transform 0.3s, opacity 0.3s;
  }

  .bar.open:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  .bar.open:nth-child(2) {
    opacity: 0;
  }
  .bar.open:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  @media (max-width: 640px) {
    .menu-toggle {
      display: flex;
    }

    ul {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(15, 15, 20, 0.98);
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2.5rem;
      transform: translateY(-100%);
      transition: transform 0.3s;
    }

    ul.open {
      transform: translateY(0);
    }

    ul a {
      font-size: 1.5rem;
    }
  }
</style>
