# Schoolder

## Getting Started

Start with including maillist and link do local mongoDB instance in student.js file. It will allow you to stay in contact with your students and keep the data about homework on your computer.

### Installing

To first build of this app you will need Node.js with npm. In main folder use command:
```
npm install
```
next go to /client directory and again use:
```
npm install
```

## Deployment

To deploy your app use 2 or three separated command lines. 
In the first one navigate to /client dir and use:
```
npm start
```
In the second one stay in main dir and use:
```
npm start
```
The last one will be used when you would like to check new mails from student. In main dir use:
```
node manage-mailbox.js
```
Then go to localhost:3000/ to check new homeworks from your students
