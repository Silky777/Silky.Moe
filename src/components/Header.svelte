<script>
  let scrolled = $state(false);

  $effect(() => {
    const onScroll = () => (scrolled = window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  });
</script>

<header class:scrolled>
  <nav>
    <a href="/" class="logo">~/silky.moe</a>
    <ul>
      <li><a href="#stuff">stuff</a></li>
      <li><a href="#about">about</a></li>
      <li><a href="#guestbook">links</a></li>
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
    padding: 0.75rem 1.5rem;
    transition: background 0.3s;
    font-family: var(--mono);
    font-size: 0.85rem;
  }

  header.scrolled {
    background: rgba(10, 10, 15, 0.92);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--surface-border);
  }

  nav {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    color: var(--pink);
    text-decoration: none;
    font-weight: 700;
  }

  .logo:hover {
    text-decoration: underline wavy;
  }

  ul {
    display: flex;
    list-style: none;
    gap: 1.5rem;
    margin: 0;
    padding: 0;
  }

  ul a {
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.15s;
  }

  ul a:hover {
    color: var(--cyan);
  }

  @media (max-width: 480px) {
    ul { gap: 1rem; }
    .logo { font-size: 0.8rem; }
  }
</style>
