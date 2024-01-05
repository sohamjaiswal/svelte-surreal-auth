# SvelteKit Surreal Auth

## Credit where it's due
NGL I was pretty lost when I started this out due to how surrealdb interacts with the server AND THE CLIENT DIRECTLY!! 

and the repo below helped me greatly develop an implementation that JUST WORKED
https://github.com/oskar-gmerek/surreal-sveltekit

## Current ISSUES
with my current experience I'd say that you'd require to have 2 separate surreal clients in your sveltekit app, one for client side and another for server side interactions if you use the app and db both on the docker compose vnet... as just one would break the app for networks outside that specific network scope (client side breaks)

## Workaround 
Only the db is running in docker, the web app is being hosted native currently... 
