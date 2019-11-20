# Spaced repetition - Learn Morse Code!

This app helps people memorize Morse Code.The app will display the alphabets in Morse code, and ask you to recall the corresponding alphabet.

See this app live at: <br/>
Demo username: admin<br/>
Demo password: pass<br/>
client Repo https://github.com/thinkful-ei-gecko/quasar-nandana-spaced-repetition-client<br/>
API Repo https://github.com/thinkful-ei-gecko/quasar-nandana-spaced-repetition-server<br/>

## API EndPoints

POST/api/auth/token -Login to the system 

POST/api/user - SignUp New Users.

GET/api/language - Get alphabet list with morse code to learn.

GET/api/language/head -Get the the first alphabet in the list to practice.

POST/api/languge/guess - Post your answer for the alphabet.

### Technologies Used

#### Back-End * Node.js * Express.js * PostgreSQL