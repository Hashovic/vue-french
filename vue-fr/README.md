# Vue-Fr

This is the frontend portion of the site written in vue.js. I chose vue because of it's relative simplicity and popularity in the community.<br/><br/>
Most of the important code in vue files will be found in the `/src` directory and below I will briefly explain each portion

## assets

For my case this simply stores the `styles.css` file. For this project, I used `tailwindcss` so I imported it inside the `styles.css` file along with an
easy way to switch between light and dark mode using classes.

## components

All the components that make up all the pages in the site live here. I'll try to briefly explain each component

### Clipboard

This directory stores a few components related to clipboard functionality. For the site, you can copy share links and these components are used to put that link in a modal
and animate the clipboard svg when it's clicked.

### Modals

The other modals that are not part of the `/Clipboard` directory are stored here. They are all essentially the same modal with minor tweaks for different use cases.
`IconModal.vue` is used for icon buttons that open up modals, `Modal.vue` is used for a basic modal template and `TutorialModal.vue` opens up a quick tutorial.

### AddIssue

Deals with adding user submitted issues to the database. This is mostly handled in express but it is called through this component.

### AdminComponent

All the Admin related operations for issues, like adding, solving and deleting issues, are stored in here.

### Checkbox

Implements a single checkbox with a small label

### ConjItem

Used as a component of `ConjTable.vue` to compartmentalize each individual type of french conjugation

### ConjSearchBar

The search bar that searches for conjugations in the database. Implements an autocomplete feature that makes choosing verbs much more convenient.

### ConjTable

Organizes many `ConjItem.vue` components to create a complete table of french conjugations.

### NavbarItem

This is the Navbar of the site with all the links, icons and hamburger menu (for small screen sizes).

### PracticeComponent

All the functionality for the practice part of the site lives here.

### PracticeForm

This is where settings and options for the pratice are chosen including the verb, the pronoun and the tenses to practice

### PracticeSearchBar

Similar to `ConjSearchBar.vue` however has slightly different functionality to make it more convenient for `PracticeForm.vue`

### PracticeUnit

These are all the individual parts of `PracticeComponent.vue` for each different tense that was selected. This implements functionality
for irregular french verbs as well, like essayer, that have two different conjugations for the same tense.

### Radio

Implements a single radio checkbox that is meant to be used alongside other radio boxes with the same groupname.

### RadioCheck

Combines `Checkbox.vue` and `Radio.vue` into a single component for advanced functionality for `PracticeForm.vue`. Allows for a radio box to allow or deny
the option of using checkboxes and set values for the checkboxes based on the value of the radio box.

### RadioRadio

Similar to `RadioCheck.vue` except it uses only radio checkboxes to implement additional functionality for `PracticeForm.vue`

### ServerDown

Creates a server down message in case there was a failed attempt to access the server. This would be a server issue not a user issue.

### SolutionComponent

This component appears after the completion of a practice. It shows the score and what answers were correct and what answers were incorrect and the corrected versions.

### SolutionUnit

All the invidual parts of `SolutionComponent.vue`. It functions analagous to `PracticeComponent.vue` and `PracitceUnit.vue`.

### VerbNotFound

The message that appears if the verb that was searched was not in the database.

## router

This directory simply stores the index.js file that is used for all the routing in the site. For example, going to the `/` route takes you home and going to
the `/practice` route takes you to practice. All that logic is stored here

## stores

Contains some preferences used throughout the site in local storage. The getters and setters were placed here to conveniently access them anywhere else in the site.

## utils

Contains some files used for reused js throughout the site

### helpers.js

This has all the functions that are either used multiple times or are simply too clunky to be in the `script setup` part of the template.

### tenseLists.js

This has all the tense lists in a conveniently accessible place with all the different tenses and orderings based on the chosen tense option (ie. all tenses, all but rare tenses, etc.)

## views

This directory contains all the .vue files that are dependent on the route. Whenever the route changes, a new "view" is chosen. So the same app exists but with a different view for the main
content of the site. (This is more clearly seen in the `App.vue` file). Most of the views are named in a straightforward way so I won't go into their functionality in detail.

## App.vue

This is the main vue file that deals with how everything is rendered in the site. There is a `RouterView` element that controls which `view` appears in that slot which is controlled by the `index.js` file in the `router` directory.

## main.js

This just creates and mounts the `App.vue` file




