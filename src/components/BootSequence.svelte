<script>
  import { onMount } from "svelte";

  const lines = [
    { text: "> [SYS_INIT] Initializing environment...", delay: 0 },
    { text: "> [OK] Kernel modules loaded.", delay: 100 },
    { text: "> [OK] Memory allocation successful.", delay: 200 },
    { text: "> [OK] Connecting to main grid...", delay: 350 },
    { text: "> [OK] Secure channel established.", delay: 500 },
    { text: "> [OK] Filesystem mounted: /home/silky", delay: 650 },
    { text: "", delay: 800 },
    { text: "SYSTEM DIRECTORY OVERRIDE ACTIVE", type: "header", delay: 900 },
    { text: "> Welcome to the main console.", delay: 1050 },
    { text: "> Type a directory from the sidebar to navigate.", delay: 1200 },
    { text: "> Last login: " + new Date().toUTCString(), delay: 1350 },
    { text: "", delay: 1450 },
    { text: "> Awaiting input...", type: "prompt", delay: 1550 },
  ];

  let visibleCount = $state(0);

  onMount(() => {
    lines.forEach((line, i) => {
      setTimeout(() => {
        visibleCount = i + 1;
      }, line.delay);
    });
  });
</script>

<section class="boot">
  {#each lines.slice(0, visibleCount) as line}
    {#if line.type === "header"}
      <h2>{line.text}</h2>
    {:else if line.text === ""}
      <br />
    {:else}
      <p class:prompt={line.type === "prompt"}>{line.text}{#if line.type === "prompt"}<span class="blink">_</span>{/if}</p>
    {/if}
  {/each}
</section>

<style>
  .boot {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  p {
    margin: 0;
    opacity: 0;
    animation: fade-in 0.15s forwards;
  }

  h2 {
    font-size: 1.2rem;
    font-weight: normal;
    border-bottom: 1px solid var(--phosphor);
    display: inline-block;
    padding-bottom: 0.5rem;
    margin: 0.5rem 0;
    opacity: 0;
    animation: fade-in 0.3s forwards;
  }

  .prompt {
    opacity: 0;
    animation: fade-in 0.15s forwards;
  }

  .blink {
    animation: cursor-blink 1s step-end infinite;
  }

  @keyframes fade-in {
    to { opacity: 1; }
  }

  @keyframes cursor-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
</style>
