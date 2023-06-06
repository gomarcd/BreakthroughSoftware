---
title: 'Open Source Calculator Code Released'
description: 'We have decided to open source our calculator project to the world. Here are some of the features of the code:'
publishedDate: 2012-10-03
tags: ["calculator", "Dijkstra's shunting yard algorithm", "lexer", "parser", "stack machine"]
---

We have decided to open source our calculator project to the world. Here are some of the features of the code:

- Implements a lexer, parser, and [Dijkstra’s shunting yard algorithm](http://en.wikipedia.org/wiki/Shunting-yard_algorithm) to convert an expression into postfix form.
- Implements a simple stack machine for parsing these expressions. When using float and double, the speed is quite fast.
- Implements a basic UI, as seen below (keep in mind that many of the features are not implemented):

![calculator](/images/calculator-168x300.png)

If you’re interested in learning more about lexing and parsing, or even if you’re just curious, you can access the [GitHub project here](https://github.com/Digipom/Calculator-for-Android). The code is licensed under the [Apache 2.0 license](http://www.apache.org/licenses/LICENSE-2.0.txt).