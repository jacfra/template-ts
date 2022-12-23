Starting PM2 in exec mode will cause the docker process to run multiple of the same migrations when a new migration gets run on the database.

the devenv is already used to generate new migrations for an applications state

however, right now the migrations that are generated are run on each applicaiton startup, when there's a new migrations having multiple pm2 process causes the database migration to choke. If there was another process (part of the dev env to generate, and then run migrations) the application logic could be to just start the application?

or you could remove PM2 so you can just run one process and use docker-compose / kubernetes to manage the containers

i.e. keep the application as is and run the process once to sync the database and again to start the application
