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

## How to progress

- **Stages 1–3:** eat every pellet in the maze, including the four big flashing
  power pellets. Fruit and ghosts are optional bonus points. The maze flashes,
  then the next stage loads.
- **Stage 4:** knock the Glitch King's health bar to zero. Either grab a rainbow
  mega-energizer from a corner and ram him (1 hit each), or eat every pellet in
  the arena so the four gold nodes light up, then step on one (2 hits).
- You start with 3 lives and earn another every 10,000 points.

Every stage opens with a briefing that explains its rules, what's new, and what
it takes to clear it. Press **H** (or the GUIDE button) at any time for the full
in-game guide.

## Controls

| Action | Keyboard | Touch |
| --- | --- | --- |
| Move | Arrow keys / WASD | Swipe, or the on-screen D-pad |
| Start | Enter | Tap |
| Pause | Space / P | PAUSE button |
| How to play | H | GUIDE button |
| Mute / CRT effect | M / C | SOUND / CRT buttons |

<details>
<summary><b>Cheat sheet (spoilers: there are secret keys)</b></summary>

The game never tells you about these. Each one announces itself the first time
you stumble on it and then shows up in the guide.

| Key | Secret |
| --- | --- |
| **F** (two-finger tap on touch) | **Time freeze.** Every ghost, minion, boss attack and hazard stops dead in an ice shell and can't hurt you. Press again to resume. |
| **1 – 4** | **Stage warp.** Jump straight to that stage, from the title screen or mid-game. |
| **N** | **Stage skip.** Clear the current stage instantly, or finish the boss. Skipped bosses pay no points. |

Testing every stage: press **4** on the title screen to go straight to the boss,
or **F** then walk through ghosts while you look around a maze.

</details>

## Run locally

Open `index.html` in any modern browser. There is no build step.

## Map check

```bash
node tools/check-maps.mjs
```

Validates every maze: correct size, every pellet reachable, no dead ends, and no
one-way gate that can trap a player or ghost.
