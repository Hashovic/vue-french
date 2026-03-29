# server

This here is the backend portion of the site. It is much less complicated compared to the frontend because all it does is create APIs to access the database.

### database and issuedatabase

These two files create mysql pools that export functions that call the conjugation and issue database.<br><br>
Some require extra permissions (like some of the admin APIs) and one of them has a rate limit to prevent abuse.

### main.js

This is where all the api routes are created. For example, if I want to get all the conjugations of a verb with every pronoun, I would go to the /api/all/[verb] route, adding the verb I'm searching
for. Afterwards, a json object with all the conjugations would be returned.
