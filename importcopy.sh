# auto import of environment variables
# run on terminal: ./import.sh

heroku config:set NODE_ENV=""  &&
heroku config:set MONGODB_URL="" &&
heroku config:set GMAILUN="" &&
heroku config:set GMAILPW="" && 
heroku config:set API_SECRET=""
