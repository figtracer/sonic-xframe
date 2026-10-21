# Sonic the Hedgehog on xframes

Sonic the Hedgehog (Mega Drive, 1991), assembled bit-perfect (REV01, SHA-256 `1b7f6635…00fd`) from the
[Sonic Retro disassembly](https://github.com/sonicretro/s1disasm), running in Genesis Plus GX inside an
[xframes](https://xframes.nanocode.xyz) frame.

The whole frame body is one tag:

```html
<script type="module" src="https://cdn.jsdelivr.net/gh/<owner>/<repo>@<commit>/sonic.js"></script>
```

- `sonic.js` builds the page, loads `sonic1.bin` next to it, checks its hash, and starts the emulator
  (xframes' own `/gba/nostalgist.js`, core `genesis_plus_gx`).
- `act1.state` is a Genesis Plus GX save state on the Green Hill Act 1 title card; Play loads it so the game starts
  in Act 1 instead of the intro and attract-mode demo.
- Rebuild the ROM: `lua build.lua` in s1disasm, which writes `s1built.bin`.

## Pikachu in Green Hill: Thunder Edition

`pikachu.js` is [@gakonst's Pikachu remix](https://xframes.nanocode.xyz/f/ss4h667cpe5q) (Pikachu art patched into the
ROM in the browser) plus powers that read and write the 68000's work RAM between frames:

- **Thunderbolt** (C / ⚡): lightning hits every badnik on screen (explosion, animal and points as if hit) and takes one
  hit off a boss. Starts with 3 charges, +1 every 10 rings, misses are free.
- **Quick Attack**: jump again in the air for a forward dash, once per jump.
- **Pika Dash**: hold down, tap jump to charge, let go to launch into a roll (a spin dash).
- **Volt Shield** every 25 rings.
- **Raichu** at 50 rings: a lightning-storm evolution, then invincibility, speed shoes, free Thunderbolts and an
  automatic storm every second, draining one ring per second until Pikachu returns.
