<script>
  import { onMount } from "svelte";

  let { version = "0", hits = "---" } = $props();

  let clock = $state("00:00:00");
  let uptime = $state("0d 0h 0m");

  const DEPLOY_EPOCH = new Date("2026-04-15T16:23:00Z").getTime();

  function tick() {
    const now = new Date();
    clock = now.toLocaleTimeString("en-GB", { hour12: false });

    const diff = Date.now() - DEPLOY_EPOCH;
    const days = Math.floor(diff / 86400000);
    const hrs = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    uptime = `${days}d ${hrs}h ${mins}m`;
  }

  onMount(() => {
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  });
</script>

<div class="nav-container">
  <div class="sys-header">
    <h1><span class="user">guest@sys</span>:<span class="path">~</span>$ cd silky.moe<span class="cursor">_</span></h1>
    <p class="version">v{version}</p>
  </div>

  <div class="sys-motd">
    <p>> SYSTEM STATUS: [ONLINE]</p>
    <p>> PGP_MASTER_FP:</p>
    <div class="fingerprint-wrap">
      <p class="fp-line">968F 9FE9 CA23 9F0B 3E0E</p>
      <p class="fp-line">4F5D C4E8 8EF0 AACB BFDB</p>
    </div>
  </div>

  <nav class="directory-list">
    <ul>
      <li><a href="/">./root</a></li>
      <li><a href="/about">./about_me</a></li>
      <li><a href="/logs">./system_logs/</a></li>
      <li><a href="/infrastructure">./infrastructure/</a></li>
      <li><a href="/media">./media_cache/</a></li>
      <li><a href="/pgp_public.asc" target="_blank">./public_key.asc</a></li>
    </ul>
  </nav>

  <div class="sys-status">
    <p>> SYS_CLOCK: <span class="val">{clock}</span></p>
    <p>> UPTIME: <span class="val">{uptime}</span></p>
    <p>> LOAD_AVG: <span class="val">0.42 0.37 0.31</span></p>
    <p>> SESSIONS: <span class="val">1 active</span> (<span class="val">{hits}</span> historic)</p>
  </div>
</div>

<style>
  .nav-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: 100%;
  }

  .sys-header h1 {
    font-size: 1rem;
    font-weight: normal;
    margin: 0;
  }

  .cursor {
    animation: blink 1s step-end infinite;
  }

  .version {
    font-size: 0.75rem;
    opacity: 0.4;
    margin: 0.25rem 0 0;
  }

  .sys-motd {
    font-size: 0.85rem;
    opacity: 0.85;
    border: 1px dashed var(--phosphor);
    padding: 0.75rem;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .sys-motd {
    font-size: 0.85rem;
    opacity: 0.85;
    border: 1px dashed var(--phosphor);
    padding: 0.75rem;
    background-color: rgba(10, 8, 5, 0.6); /* Matches the warmer bg */
  }
  
  .sys-motd p { 
    margin: 0 0 0.25rem 0; 
  }

  .fingerprint-wrap {
    margin-top: 0.5rem;
    padding-left: 0.5rem;
    border-left: 2px solid var(--phosphor); /* Adds a "data block" visual indicator */
  }

  .fp-line {
    font-size: 0.7rem;
    letter-spacing: 1px;
    margin: 0 !important;
    line-height: 1.2;
    white-space: nowrap;
  }

  .directory-list ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .directory-list a {
    display: block;
    padding: 0.25rem 0;
    transition: none; /* Keeps the snap instant */
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .sys-status {
    margin-top: auto;
    font-size: 0.75rem;
    opacity: 0.7;
    border-top: 1px dashed var(--phosphor);
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .sys-status p {
    margin: 0;
  }

  .sys-status .val {
    opacity: 1;
    color: var(--phosphor);
  }
</style>