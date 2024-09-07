# Denarius

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

### Preparing Cloud Environment

In order to have Denarius application functional we need to create a .env file based on our available .env.template

We need to create a Google Firebase Project in Google Console for this here: https://console.firebase.google.com/project/

After you have the access to Firebase Dashboard use the following steps:

 - Create a Web App
   - Open **Project settings**
   - Under Your apps section click the **Add app** button and click to the third **Web App** button
   - On the next page Add a nickname to your app and click to **Register app** button and then **Continue to console**
   - Now in the **Your apps** section you can see all of the details you need to put in your **.env** file
 - Create Collections
   - Open Firestore Database in Build Menu
   - Create an empty **user** and **transaction** collection
   - Create a **paymentMethod** collection with one entry:
    ```json
    {
       "id": "CfC502yaSozAyYDMuA6m",
       "name":"card",
       "priority":1
    }
    ```
   - Create a **category** collection with one or more entry following this format:
    ```json
    {
       "id": "gcmBNKez4RZldbyVprLl",
       "name":"Category 1",
       "priority":1,
       "expenseType": "Expense",
       "color": "blue"
    }
    ```
    - Possible types for `expenseType` are **'Expense'**, **'Income'**, or **'Neutral'**.
    - _Note:_ You can customize collection names in the .env file

### Install NodeJS Project

For the latest stable version

```bash
npm install
npm run build
npm run start
```

It will automatically open [http://localhost:3000](http://localhost:3000) with your primary browser.

## Contribute

There are many ways to [contribute](https://github.com/vluv99/Denarius/blob/main/CONTRIBUTING.md) to Denarius Project.
* [Submit bugs](https://github.com/vluv99/Denarius/issues) and help us verify fixes as they are checked in.
* Review the [source code changes](https://github.com/vluv99/Denarius/pulls).
* [Contribute bug fixes](https://github.com/vluv99/Denarius/blob/main/CONTRIBUTING.md).

