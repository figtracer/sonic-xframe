// Sonic the Hedgehog (1991) for xframes: assembled bit-perfect (REV01) from the Sonic Retro disassembly
// (https://github.com/sonicretro/s1disasm) and run in Genesis Plus GX through xframes' Nostalgist build.
// The frame body only needs: <script type="module" src="https://cdn.jsdelivr.net/gh/<owner>/<repo>@<commit>/sonic.js"></script>
const SHA256 = "1b7f6635bd713f37f3c2f44f302b872c2e3c5f56e63637918dad4637146900fd";
const ROM = new URL("sonic1.bin", import.meta.url).href;
const TITLE = new URL("title.png", import.meta.url).href;
const BUTTONS = { arrowup: "up", w: "up", arrowdown: "down", s: "down", arrowleft: "left", a: "left", arrowright: "right", d: "right", " ": "b", z: "b", j: "b", x: "a", k: "a", c: "y", enter: "start" };

document.head.append(Object.assign(document.createElement("style"), { textContent: `
  xf-app > .xf-main { padding: 0; position: relative; overflow: hidden; background: #000; }
  xf-app > .xf-main > canvas { position: absolute; inset: 0; width: 100% !important; height: 100% !important; display: block; outline: 0; object-fit: contain; image-rendering: pixelated; background: #000; }
  #cover { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 16px; overflow: auto; background: #0a1a5c; color: #fff; text-align: center; }
  #cover[hidden] { display: none; }
  .art { width: 100%; max-width: 300px; aspect-ratio: 320 / 224; object-fit: cover; border-radius: var(--xf-radius); image-rendering: pixelated; }
  #status { margin: 0; min-height: 1.5em; }
  #progress { width: min(320px, 80%); height: 4px; background: rgba(255, 255, 255, .15); }
  #progress div { width: 0; height: 100%; background: #ffd400; transition: width .1s linear; }
  #play { min-width: 140px; }
  .note { margin: 0; max-width: 400px; color: rgba(255, 255, 255, .7); font-size: 12px; line-height: 1.5; }
  .note a { color: #ffd400; }
  #pad { position: absolute; inset: 0; pointer-events: none; touch-action: none; user-select: none; -webkit-user-select: none; }
  #pad[hidden] { display: none; }
  #stick, #pad button { position: absolute; pointer-events: auto; border: 2px solid rgba(255, 255, 255, .35); background: rgba(0, 0, 0, .25); color: rgba(255, 255, 255, .85); touch-action: none; }
  #stick { left: 16px; bottom: 16px; width: 132px; height: 132px; border-radius: 50%; }
  #stick i { position: absolute; left: 50%; top: 50%; width: 52px; height: 52px; margin: -26px; border-radius: 50%; background: rgba(255, 255, 255, .35); }
  #jump { right: 18px; bottom: 30px; width: 92px; height: 92px; min-height: 0; padding: 0; border-radius: 50%; font-weight: 600; }
  #start { right: 18px; top: 14px; min-height: 0; padding: 6px 12px; font-size: 12px; }
  #pad .on { background: rgba(255, 212, 0, .45); }
` }));

const app = document.createElement("xf-app");
app.innerHTML = `
  <canvas id="screen" tabindex="-1"></canvas>
  <div id="cover">
    <img class="art" src="${TITLE}" alt="Sonic the Hedgehog title screen">
    <p id="status">Sonic the Hedgehog (1991), rebuilt from source</p>
    <div id="progress" hidden><div></div></div>
    <button id="play" type="button" disabled>Loading…</button>
    <p class="note" id="keys">Arrows move, Space, Z or X jumps, Enter starts and pauses.</p>
    <p class="note" id="touch" hidden>Your left thumb moves, Jump jumps, Start starts and pauses.</p>
    <p class="note">Assembled bit-perfect (REV01) from the <a href="https://github.com/sonicretro/s1disasm" target="_blank" rel="noopener">Sonic Retro disassembly</a>, running in Genesis Plus GX.</p>
  </div>
  <div id="pad" hidden><div id="stick"><i></i></div><button id="start" type="button" data-button="start">Start</button><button id="jump" type="button" data-button="b">Jump</button></div>`;
document.body.append(app);

const $ = id => document.getElementById(id);
const canvas = $("screen"), cover = $("cover"), status = $("status"), progress = $("progress"), play = $("play"), pad = $("pad");
const touch = matchMedia("(pointer: coarse)").matches;
const say = text => (status.textContent = text);
$("touch").hidden = !touch;
$("keys").hidden = touch;

if (!new URLSearchParams(location.search).has("xframes-card")) {
  const hex = buffer => Array.from(new Uint8Array(buffer), byte => byte.toString(16).padStart(2, "0")).join("");
  const rom = fetch(ROM).then(async response => {
    if (!response.ok) throw new Error("the game answered " + response.status);
    const total = Number(response.headers.get("content-length")) || 524288;
    const chunks = [];
    let received = 0;
    progress.hidden = false;
    for (const reader = response.body.getReader(); ;) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      received += value.length;
      progress.firstElementChild.style.width = Math.min(100, 100 * received / total) + "%";
    }
    const bytes = new Uint8Array(await new Blob(chunks).arrayBuffer());
    if (hex(await crypto.subtle.digest("SHA-256", bytes)) !== SHA256) throw new Error("the ROM data is damaged");
    return bytes;
  });
  const emulator = import(xframe.context.origin + "/gba/nostalgist.js");

  let game = null;
  const retry = () => { play.textContent = "Try again"; play.disabled = false; play.onclick = () => location.reload(); };
  rom.then(() => { progress.hidden = true; play.textContent = "Play"; play.disabled = false; play.focus(); }, error => { progress.hidden = true; say("Could not load the game: " + error.message); retry(); });

  play.onclick = async () => {
    play.disabled = true;
    say("Starting…");
    try {
      const { Nostalgist } = await emulator;
      game = await Nostalgist.launch({
        core: "genesis_plus_gx",
        rom: new File([await rom], "sonic1.bin"),
        element: canvas,
        size: { width: 320, height: 224 },
        respondToGlobalEvents: false,
        retroarchConfig: { video_font_enable: false, menu_enable_widgets: false, savestate_thumbnail_enable: false, video_smooth: false, audio_latency: 96 },
      });
      game.resize({ width: 640, height: 480 });
      cover.hidden = true;
      pad.hidden = !touch;
      canvas.focus();
    } catch (error) {
      say("Could not start the game: " + (error?.message ?? error));
      retry();
    }
  };

  // Keyboard (and anything else that feeds xframe.input) goes straight to the emulator.
  xframe.input.on((key, down) => {
    const button = BUTTONS[key.toLowerCase()];
    if (game && button) down ? game.pressDown(button) : game.pressUp(button);
  });
  addEventListener("keydown", event => { if (game && BUTTONS[event.key.toLowerCase()] && !event.ctrlKey && !event.metaKey) event.preventDefault(); });

  // Own touch controls: xframes' <xf-gamepad> installs a fake Gamepad that crashes Nostalgist's startup.
  const held = new Set();
  const hold = (button, down) => {
    if (!game || held.has(button) === down) return;
    down ? held.add(button) : held.delete(button);
    down ? game.pressDown(button) : game.pressUp(button);
  };
  for (const node of pad.querySelectorAll("button")) {
    const press = down => event => { event.preventDefault(); node.classList.toggle("on", down); hold(node.dataset.button, down); };
    node.addEventListener("pointerdown", press(true));
    for (const type of ["pointerup", "pointercancel", "pointerleave"]) node.addEventListener(type, press(false));
  }
  const stick = $("stick"), knob = stick.firstElementChild;
  const steer = event => {
    const box = stick.getBoundingClientRect(), r = box.width / 2;
    const dx = event ? (event.clientX - box.left - r) / r : 0, dy = event ? (event.clientY - box.top - r) / r : 0;
    const scale = Math.min(1, 1 / (Math.hypot(dx, dy) || 1));
    knob.style.transform = "translate(" + dx * scale * 40 + "px, " + dy * scale * 40 + "px)";
    hold("left", dx < -0.35); hold("right", dx > 0.35); hold("up", dy < -0.5); hold("down", dy > 0.5);
  };
  stick.addEventListener("pointerdown", event => { event.preventDefault(); stick.setPointerCapture(event.pointerId); steer(event); });
  stick.addEventListener("pointermove", event => { if (stick.hasPointerCapture(event.pointerId)) steer(event); });
  for (const type of ["pointerup", "pointercancel"]) stick.addEventListener(type, () => steer(null));
  document.addEventListener("visibilitychange", () => { if (game) document.hidden ? game.pause() : game.resume(); });
}
