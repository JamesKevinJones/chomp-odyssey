# Chomp Odyssey

A neon arcade maze game in a single HTML file. Four stages, four ghosts with
their classic personalities, and a three-phase boss fight. No images, no audio
files, no libraries: every sprite is drawn on a canvas and every sound is
synthesized with the Web Audio API.

**Play:** https://chomp-odyssey.vercel.app

## Stages

1. **The Neon Classic** — the classic maze with side warp tunnels.
2. **The Cyber Citadel** — a city grid with four warp tunnels and a central speed strip (+20%).
3. **The Labyrinth of Shadows** — asymmetric, with one-way gates, teleporter pads and a lantern-lit dark.
4. **The Core** — the Glitch King. Eat a mega-energizer and ram him, or clear every pellet to arm the power nodes and call down lightning. He spawns minions, fires energy balls, electrifies corridors and stomps.

## Controls

| Action | Keyboard | Touch |
| --- | --- | --- |
| Move | Arrow keys / WASD | Swipe, or the on-screen D-pad |
| Start | Enter | Tap |
| Pause | Space / P | PAUSE button |
| Mute / CRT effect | M / C | SOUND / CRT buttons |

## Run locally

Open `index.html` in any modern browser. There is no build step.

## Map check

```bash
node tools/check-maps.mjs
```

Validates every maze: correct size, every pellet reachable, no dead ends, and no
one-way gate that can trap a player or ghost.
