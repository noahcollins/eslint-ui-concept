eslint-ui-concept
=================

A concept web UI and docs site for [ESLint](https://github.com/nzakas/eslint/) project.

## Install

Clone this repo, then `npm install` and `bower install` to get up it and running. A few dev dependencies have been temporarily removed to ensure Windows compatibility, so there's no mocha tests or favicon generation. Not to worry since this is just a rapid prototype!

## Grunt Tasks

`grunt preview` will build the basic site at `localhost:9000`.

`grunt production` builds the project and does image optimization, concatenation, file revving, and so on. It uses port 9001.

## To-Do List

### Documentation browsing experience

Progressing well. Next: work with ESLint contributors to define info architecture for docs landing page.

### Demo page (interactive) experience

#### Embedded editor component
- IBM Orion project identified as likely best option: see if it's easily embeddable.
- Otherwise embed CodeMirror, as it's a known quantity.
- Include JavaScript editor module.
- Set a basic syntax highlight theme that matches the current colors.

#### Parser messages

Explore and test different refinements for presenting parser messages. They need to be readable but relatively space-efficient.

per message
- message in the form \[rule name]\[token]\[count]\[line number]
- line number is either a single integer or a range
- colors for warning, error, success
- links on tokens jump to line numbers
- links on rule name to rule docs? and/or a tooltip?

grouping
- by line number
- by message type
- subtype, e.g. \[variable name] \[!= | ==] \[etc]

filtering
- automatically collapse certain warnings...
- collapse to single line or two lines
- or collapse at certain thresholds like message count
- Try a concept for rule configuration in the web UI. It'll be a challenge due to the sheer number of rules available, but it's worth exploring.

## The Design

### Forms

ESLint is a tool. Its use involves concepts like transformation, correction, uniformity, and modularity. For the logo concept I started with a thick hexagon shape, intended to evoke standard hexagonal bolt heads and nuts.

The outer hex is rotated 18 degrees to convey a sense of motion or activity. It also creates a slight visual imbalance (more on that in a moment). The inner hex is straightened to convey a sense of alignment and balance. The visual metaphor: the outer and inner hex shapes represent your code before and after ESLint, respectively -- the outside is active but imbalanced, while the inside is aligned and calm.

### Typography

Using various weights of Adobe's Source Sans Pro for now. It's a great compact UI face. This includes the ESLint logotype.

### Colors

Why purple? It's not used much in the JS tooling space, so it helps keep things visually distinct. If anyone has strong reactions to that one way or another, there are plenty of other colors that would make sense.