# Vue-French

Here will be provided most of the documentation for the hashconj.com website.
The project is organized into `vue-fr` and `server` to separate the frontend
and backend respectively. The frontend is primarily written in `vue.js` while
the backend uses `express.js` and `mysql`.


## Overview:

### What is a conjugation?

Put simply, a conjugation is the way a verb changes its form to show who is doing the action, when it happens, or how it happens.

Examples: I run. She runs. We were running

French has a similar system of conjugation. The french equivalents of the above conjugations would be:<br>

Je cours. Elle court. Nous courions.

The <a href="hashconj.com">Hashconj</a> website supports 18 of these conjugation forms for most verbs.

### How does this work?

Before diving into the schema and the implementation, I want to first explain at a high-level how these conjugations are being made.

For all mostly regular conjugations that follow a specific pattern, I start with the infinitive, or the base verb. In English this would be something like to run or to eat. In french this is always a single word. For example, 'to run' is 'courir' and 'to eat' is 'manger'. From this infinitive, I remove and add letters to the end to form all the conjugations. Some conjugation forms also require me to add a specific form of an auxiliary verb before the verb. For example, 'He ate' would be 'Il ***a*** mangé'. What I am typically storing for each pattern is the amount of letters I need to remove from the end of the word and what letters I need to add back. A stored procedure handles everything else.

Using this system makes it very easy to add new verbs. All I have to do is write the infinitive form of the verb, it's English translation, a few verb specific attributes and it's pattern group and it's ready to conjugate.

For verbs that don't follow a specific pattern at all (like the two most common verbs), there is a **super irregular** table that stores the more verbose conjugations.

### The Schema

Here is the schema for how I'm storing conjugation data in the database:

![schema](schema.png)

Without going too in depth, I'll try to explain how everything works together.

The center point of this schema is the `verbgroup` table. It stores all the unique patterns for all the verbs with mostly regular conjugations.

The `psimple`, `pastparticiple` and `future` tables are essentially tables to simplify the `verbgroups` table and prevent unnecessary redundancy by putting the number of characters to remove and what characters to add inside of tables for those specific tenses.
