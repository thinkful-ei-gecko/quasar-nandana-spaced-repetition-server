# Spaced repetition - Learn Morse Code!

This app helps people memorize Morse Code. The app will display the alphabet in Morse code, and ask you to recall the alphabetic representation for each encoded letter.

[Live App](https://m-o-r-s-e.now.sh/)  
Demo username: admin<br/>
Demo password: pass<br/>
[Client Repo](https://github.com/thinkful-ei-gecko/quasar-nandana-spaced-repetition-client)  
[API Repo](https://github.com/thinkful-ei-gecko/quasar-nandana-spaced-repetition-server)  

## API EndPoints
### Overview
| Method | Endpoint            | Usage                      | Returns      |
| ------ | --------            | -----                      | -------      |
| POST   | [/api/auth/token](#`/api/auth/token`)     | Authenticate a user        | JWT          | 
| PUT    | [/api/auth/token](#/api/auth/token)     | Re-authenticate a user     | JWT          | 
| POST   | [/api/user](#/api/user)          | Register a new user        | User Object  | 
| GET    | [/api/language](#/api/language)       | Get language data          |  Object      | 
| GET    | [/api/language/head](#`/api/language/head`)  | Get first word from db     |  Object  | 
| POST   | [/api/language/guess](#`/api/language/guess`) | Send answer given by user  |  Object  | 

### Authentication
#### `/api/auth/token`

### User Registration
#### `/api/user`

### Language
#### `/api/language`
##### OK response
| Fields          | Type    | Description                           |
| ---             | ---     | ---                                   |
| language        | Object  | Contains data specific to the user including total score and the next letter to learn                            |
| words           | Array   | Array of objects containing data for each letter     |


#### `/api/language/head`
###### OK response
| Fields              | Type    | Description                           |
| ---                 | ---     | ---                                   |
| nextWord            | String  | Next symbol to translate              |
| wordCorrectCount    | Int     | # correct answers for next symbol     |
| wordIncorrectCount  | Int     | # incorrect answers for next symbol   |
| totalScore          | Int     | User's total score                    |

#### `/api/language/guess`
##### POST
###### Request Body (JSON)
| Fields |  Type  | Description |
| ---    | ---    | ---         |
| guess  | String | Contains the user's translation guess. Regarding morse code, should be an upper or lowercase letter. |

###### OK response
| Fields              | Type    | Description |
| ---                 | ---     | ---         |
| nextWord            | String  | Next symbol to translate                |
| wordCorrectCount    | Int     | # correct answers for next symbol |
| wordIncorrectCount  | Int     | # incorrect answers for next symbol|
| totalScore          | Int     | User's total score |
| answer              | String  | Correct Answer |
| isCorrect           | Bool    | Was user's guess correct? |

## Technologies Used

Back-End * Node.js * Express.js * knex * PostgreSQL