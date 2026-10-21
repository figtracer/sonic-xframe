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
- Rebuild the ROM: `lua build.lua` in s1disasm, which writes `s1built.bin`.
