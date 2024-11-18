---
name: 'parsemath'
headline: 'Mathematical equation parser'
languages: ['JavaScript']
month: 'Jan'
year: 2023
link: ['http://github.com/sd0e/parsemath']
priority: 1
---

A library to parse complex mathematical strings, including trigonometric equations and variables.

It skips the traditional method of generating a syntax tree, instead evaluating the expression from the inside directly through a recursive method, resulting in code which often executes much more quickly than others (and sometimes orders of magnitude faster). This does not provide a performance improvement in all instances, particularly when executing the same expression multiple times, however it can be much quicker if only executing an expression once.

The library also provides the ability for implicit multiplication, custom variables, functions (such as sine) and angles in both radians and degrees.

One issue I had when developing this was determining whether text before brackets meant to evaluate a function or to perform implicit multiplication with a variable; this was resolved by checking the text against a list of operations.

I used this equation parser to create [Termigraph](/project/termigraph), a terminal-based graphing calculator.