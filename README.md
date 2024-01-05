# SvelteKit Surreal Auth

## Credit where it's due
NGL I was pretty lost when I started this out due to how surrealdb interacts with the server AND THE CLIENT DIRECTLY!! 

and the repo below helped me greatly develop an implementation that JUST WORKED... [check it out here](https://github.com/oskar-gmerek/surreal-sveltekit)

## What is this
A basic bare bones implementation of surrealdb auth in a sveltekit app, nothing more

## Current ISSUES
with my current experience I'd say that you'd require to have 2 separate surreal clients in your sveltekit app, one for client side and another for server side interactions if you use the app and db both on the docker compose vnet... as just one would break the app for networks outside that specific network scope (client side breaks)

## Workaround 
Only the db is running in docker, the web app is being hosted native currently... 

### Pros & Cons of this
Pro:
You only need to host the db on a vps while the app can be served independently on the vps or say an edge n/w

Con: 
You dont have a choice otherwise rn lol... 

## How to run 
1. docker compose up
2. then sign into the root under db: ssa and ns: ssa
3. run the surql script given [here](db/migrations/initial.surql)
4. run the project with bun/yarn/pnpm/npm anything
5. /login and /register would be the urls of your interest
6. after registration, you'd be redirected to login page
7. after login you should see a console log in the inspector about the user you signed in with
