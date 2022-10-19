# FullSTack

## Current Progress

* Express (-EJS) -> server
* Mongoose + Mongodb -> Database
* Express + Mongoose -> Backend -> CRUD
* Login + Sessions + Hashing
* Express + Mongoose + React -> FullStack (+ Login + hash)

MERN -> Mongodv + Express + React + Node

## Project 3
* Full stack - Express + Mongoose + React
* Login + hash -> User Model
* 2 related Models -> 1 do CRUD
* Do validations

### Planning

* User Story - Doc, Txt
* Wireframe - Figma / Hand drawn
* Data - 3 Schema -> Fields & Types
* Seed Data - Google sheet -> Field (Col), Document (Row), Collection (Sheet)

## Request / Response Cycle

Client ---Request (URL)--> Server -> Function ---Response (JSON) --> Client


## Suggestion
Build a Login with React + Express + Mongoose

### User Story for Login

* Goto to Login Form -> username & password input boxes
* Fill in the Login Form
* Press the submit button
* Success -> Redirect to Landing Page
* Fail -> Stay on Login Page + Show Error Message

### Developer Story For Login

* User press submit -> React -> prevent default -> Request ( + body ) -> "/api/login" (POST)


* (setup a express route -> /api/login) 
#### Inside the route /api/login

* Extract `req.body` -> cleartext password + username
* Encrypt cleartext Password
* Check Encrypt against Database
* Success - send Response -> 200
* Fail - send Response -> 401


## Get Started

* 2 apps directories in 1 folder -> `git init`
  * Client -> React -> Vite
  * Server -> Express -> HelloWorld -> "/" + Mongoose -> local / cloud

```txt
└── apps
    ├── client
    └── server
```
### CORS

Security error

Host A (Hacker) -> HTML + JS (Client - Browser) ---request--> Host Bank (Cors Error)

Localhost:3000 is considered a different host compared to localhost:5173


## Database

Password cannot be in the clear, stored as a hash

What is a hash?
Hash is one way
Cleartext -> hashing function -> hash
Given a fixed input -> hash output is always the same
Given 2 different input -> no collision -> 2 different output
hash is fast compared to encryption

hash ---X--> function ---X-> cleartext (Cannot happen)

Same as encryption? Difference
Encryption is 2 way

Cleartext + key -> encryption function -> encryption text
encryption text + key -> decryption function (inverse of encryption) -> plaintext

encoding  & decoding ? No key 

wk 17 - 15 Oct - Login (Remote)
wk 18 - 22 Oct - Other (Campus)
wk 19 - 29 Oct - Geekcamp (Remote)
wk 20 - 5 Nov - P3 Soft Launch (Campus)
wk 21 - 12 Nov - P3 Presentation  (Remote)