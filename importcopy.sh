# auto import of environment variables
# run on terminal: ./import.sh

heroku config:set NODE_ENV=""  &&
heroku config:set MONGODB_URL=""
