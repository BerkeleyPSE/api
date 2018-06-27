# Berkeley Pi Sigma Epsilon API

The Application Programming Interface (API) for UC Berkeley's marketing & business fraternity Pi Sigma Epsilon, Zeta Chi Chapter.

The API is located at [api.berkeleypse.org](http://api.berkeleypse.org).

Visit us at [berkeleypse.org](http://berkeleypse.org).

---

## Table of Contents

- [Terminology](#terminology)
- [Infrastructure](#infrastructure)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [File Structure](#file-structure)
- [Contributors](#contributors)

---

## Terminology

The following terms are used throughout this documentation.

- **repository** (repo): [GitHub](https://github.com) is a platform used to store code in a one area, a _repository_. Netlify and Heroku -- our hosting/deployment services -- connect to our GitHub repositories.

- **viewer** (audience): those who visit our website to learn about our fraternity, apply for membership, etc.

- **administrator**: refers to the _Vice President of Marketing_ or the _Director of Technology_, who both have all-access to make and deploy changes to the website, and allow other developers to do the same. As most accounts were created with the Vice President of Marketing email, they may have to grant access to the Director of Technology and others.

- **developer** (contributor, collaborator): anyone who makes changes to code for the website or api, and may not necessarily have access to deploy.

- **local development**: changes made on a developer's computer but _not_ in production.

- **production** (live, like _alive_): the website or api as they are when visiting [berkeleypse.org](http://berkeleypse.org) or [api.berkeleypse.org](http://api.berkeleypse.org), respectively. When a developer deploys code, it goes from in _development_ to in _production_.

- **website** (frontend, client): what viewers see and interact with. Our website is http://berkeleypse.org.

- **api** (API, backend, server): what viewers do _not_ see. The website makes requests for data (or gives data) to the API. The API takes the data from the database and gives it to the website for viewers to interact with. Our code for the API is located in a separate GitHub repository, [berkeleypse/api](https://github.com/BerkeleyPSE/api). Our API is http://api.berkeleypse.org.

- **database**: where our data is stored. We use a NoSQL MongoDB database, hosted by mLab. In development, we use the database `pse-website-dev` with fake data to make changes. In production, the database `pse-website` is used. Data changes in the development database do _not_ affect data in the production database. Our databases store data on our Brothers and Careers pages, as well as the submissions for our Registration Form and Prospective Member Applications.

---

## Infrastructure

### Git & GitHub

Our code is stored in GitHub repositories. Git is a version control system used to track different versions of our code. In example, our _production_ code is on the `master` git branch of our repository, while our _development_ code should be developed on their own separate branches. GitHub makes for easy collaboration between developers. [Here's a great guide](https://git-scm.com/book/en/v1/Getting-Started) to understanding and using Git.

### GoDaddy

The website's domain (berkeleypse.org) is hosted by [GoDaddy](https://www.godaddy.com/).

### Heroku

[Heroku](https://heroku.com) is used to deploy our [API](http://api.berkeleypse.org). More on this in the **Getting Started** section.

### Netlify

The [website](http://berkeleypse.org) is deployed on [Netlify](https://www.netlify.com/). More on that in the [website repository](https://github.com/BerkeleyPSE/website).

---

## Getting Started

Several steps are needed before you can actively develop the website.

### Environment Variables

Environment variables are those whose values differ based on whether the website/api are being run in _development_ or in _production_. In development, each developer must have their unique set of environment variables. These allow the developer to interact with the development database and use the Google OAuth 2.0 sign in for the API. You need a `variables.env` file in your local development directory of the API. More on this at the end of the section.

### GitHub

You must be a Collaborator on the [website repository](https://github.com/berkeleypse/website) **and** this repository to contribute and develop. The Administrator (VP of Marketing) or the Director of Technology must add you as a Collaborator via the BerkeleyPSE GitHub account.

1.  As Administrator, log into the BerkeleyPSE GitHub account.
2.  For the [website](https://github.com/berkeleypse/website) and [API](https://github.com/berkeleypse/api) repositories, perform steps 3 to 5.
3.  Click on the **Settings** tab in the navigation bar.
4.  Click on the **Collaborators** option in the side bar.
5.  Add a Collaborator by their GitHub username.

The new Collaborator must accept access to contribute to these repositories via the email connected to their GitHub account -- they will then have "push access".

Developers should contribute to a repository using their personal GitHub account rather than the BerkeleyPSE account. This allows all repository Collaborators to easily track who made which changes, and build out their own GitHub profile as they contribute to the project.

### Cloning Repositories

You may clone and make changes to the repositories without being a Collaborator, but you will not be able to push your changes to these repositories.

You will want to have a directory (folder) on your computer dedicated to PSE code and development.

Open up a terminal window. Navigate into your PSE directory.

Run the following commands:

```bash
git clone https://github.com/BerkeleyPSE/website.git # clone the website repo
git clone https://github.com/BerkeleyPSE/api.git # clone the api repo
```

Respectively, these will create directories name **website** and **api**.

### Node & npm

Node and npm (node package manager) are required to contribute to these repositories.

You can download Node and npm [here](https://nodejs.org/en/download/). I recommend using [yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable) as an alternative for npm. If you have a Mac, you can easily install it using [Homebrew](https://brew.sh/).

After download, ensure installation. Restart your terminal, open a window, and then run:

```bash
node -v # Confirm node is installed
npm -v # Confirm npm is installed
yarn -v # Confirm yarn is installed (not required)
```

Your node version should be >= 8.9.3.
Your npm version should be >= 5.8.0.
Your yarn version should be >= 1.7.0.

### mLab

In order to transact with the development database, you must be a Database User on the corresponding [mLab](https://mlab.com) MongoDB database.

There are two databases.

1.  `pse-website-dev` -- The _development_ database.
2.  `pse-website` -- The _production_ database.

To grant/gain access to the _development_ database:

1.  As Administrator, log into the mLab account.
2.  Click on the development database deployment, `pse-website-dev`.
3.  Click on the **Users** tab.
4.  Click on **Add database user**.
5.  Enter a `USERNAME` and `PASSWORD` for the new Database User.
6.  Share these credentials with the new Database User.

Further instruction is at the end of the Getting Started section.

### Heroku

_The steps in this section are **necessary** if you are developing/making changes to the API._

[Heroku](#https://heroku.com) is used to deploy the API live at [api.berkeleypse.org](http://api.berkeleypse.org).

You must be a Collaborator on the Heroku application to deploy it. An Administrator must add a Collaborator via the BerkeleyPSE Heroku account.

1.  As Administrator, log into the BerkeleyPSE Heroku account.
2.  Click on the **Access** tab.
3.  Click on **Add a Collaborator**.
4.  Add a Collaborator by their email.

Collaborators must use their personal Heroku accounts.

Once you are given access a Collaborator, open a terminal and navigate to where you cloned the API repository, likely in the `PSE/api` directory created earlier in **Cloning Repositories** section. Then, run:

In the `api/` directory, run the command:

```bash
git remote add heroku https://git.heroku.com/berkeleypse.git
```

Ensure this new remote was added:

```bash
git remote
# heroku
# origin
```

You must now download the Heroku command line interface. You can find the instructions to do so [here](https://devcenter.heroku.com/articles/heroku-cli). This will make it simple to deploy to Heroku via your terminal.

Once installed, navigate to the `api/` directory. Then, run:

```bash
heroku login
# Enter your Heroku username
# Enter your Heroku password
```

These must be the credentials given Collaborator access.

### Netlify

_Not all developers should have access to the Netlify account_.

An Administor (Vice President of Marketing or Director of Technology) may log into the Netlify account by signing in via the BerkeleyPSE GitHub account.

### variables.env

Your final `variables.env` file should be located at the root (top-level) of the `api/` directory. It should contain the following key/values. Anything in brackets [] require your action to complete.

- The `USERNAME` and `PASSWORD` are your personal Database User credentials, created in the mLab section above.
- The `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` can be found in the `Accounts Information` Google Sheet located in the Google Drive of the Vice President of Marketing and Director of Technology.
- The `COOKIE_KEY` is a random alphanumeric string you create. It can literally be `sjalfajsdlkfsjadh1223lkj2l3kjwlkfjwlerjty5lk5j2434sdkla31`.

When finished, your `variables.env` file should look as such:

```
NODE_ENV=development
MONGO_URI=mongodb://[USERNAME]:[PASSWORD]@ds113736.mlab.com:13736/pse-website-dev
GOOGLE_CLIENT_ID=[GOOGLE_CLIENT_ID]
GOOGLE_CLIENT_SECRET=[GOOGLE_CLIENT_SECRET]
COOKIE_KEY=[COOKIE_KEY]
NEW_RELIC_NO_CONFIG_FILE=true
```

---

## Contributing

### Trello

[Trello](https://trello.com/) is used to develop the website in an organized manner. The board for this website development can be found [here](https://trello.com/b/gDzSTiOa/pse-api). An Administrator must add you to both the PSE Trello team and the board for you to view it.

### Git & GitHub

To develop the API, you need only run it in development. But to make sense of the changes you make, you should run it simultaneously with the website in development.

Open two terminal windows.

In the first, navigate to your `PSE/api` directory and run:

```bash
npm install # install the node_modules necessary
yarn install # alternative to above if using yarn instead of npm

npm run dev # start development on the api/server
yarn run dev # alternative to above if using yarn instead of npm
```

This will start the API at http://localhost:8000. Navigate to this URL in your browser (i.e. Google Chrome).

In the second, navigate to your `PSE/website` directory and run:

```bash
npm install # install the node_modules necessary
yarn install # alternative to above if using yarn instead of npm

npm run start # start development on the website/client
yarn run start # alternative to above if using yarn instead of npm
```

This will start the website at http://localhost:3000. Navigate to this URL in your browser.

You should see data in the Fulltime table on the /careers page and brother headshots on the /brothers page.

In this repo, we have two git _remotes_. The `origin` remote always points to this GitHub repository. The `heroku` remote points to the GitHub repository that reflects the code in production.

As you contribute to the API, use Git and GitHub as follows.

If you're making simple one-time updates -- fixing minor bugs or spelling/grammar errors -- work directly on the `master` branch. When you are finished, navigate to your `PSE/api` directory in your terminal, and run the following:

```bash
git status # you should be on the master branch and see a list of new/modified/deleted files
git add -A # add all the changes
git commit -m "[message about the changes you've made]" # commit the changes to the repo
git push origin master # push your changes to GitHub on the master branch
```

To deploy these changes to Heroku, run the command:

```bash
git push heroku master
```

If you're spending more than a day making improvements (from the [Trello board](https://trello.com/b/gDzSTiOa/pse-api)) -- creating a new page, making a new Model, View, Controller -- work on a branch separate from `master`.

To create a new branch:

```bash
git checkout master # ensure you are on the master branch
git pull origin master # ensure your master branch is up-to-date
git checkout -b NEW_BRANCH # create a new branch stemming from master
```

Your new branch should be named after the feature you're developing -- i.e. `contact-flow`.

Commit your changes to this new branch as necessary. When this feature is finished and looks great in local development on your branch (as well as whatever branch you're using on the website repo), create a pull request from your development branch into the `master` branch via the [GitHub repository](https://github.com/berkeleypse/api/pulls) in your browser. Merge your branch into the `master` branch and close the pull request.

Then,

```bash
git push heroku master
```

---

## File Structure

The MVC framework stands for Model-View-Controller and is the backbone on which the API is built. Our API is built with Express, a Node JS framework which supports MVC development.

### routes

First, a route, such as `{ORIGIN}/brothers/all` is requested. `{ORIGIN}` is a placeholder for `http://localhost:8000` if we are in _development_ and `http://api.berkeleypse.org` if we are in _production_. You can find the different possible routes in the `routes/` directory.

### controllers

When a route is hit, the respective _controller_ calls a function which GETs or POSTs data from or to the database. In example, the `brothers/all` route is found, and the respective controller, found in `controllers/brothers` calls the `getAllExt` function. This function gets all the brothers in the database and returns it in JSON (JavaScript Object Notation) format.

### models

The data in the database is formatted according to a _model_. The model denotes the fields of the data. The `Brother` model, located in `models/Brother` has fields for `name`, `email`, `pseClass`, `majors`, and more.

### views

Data can be returned simply in JSON format -- this is how we want the data when we use it in the **website**, or it can be given to a _view_ and shown to a developer on the API, whether to view or edit the data.

### handlers

The most prominent _handler_ we use is `Passport JS`, to allow developers to sign into their Google Account and view/edit/delete (a.k.a. CRUD operations). The other handlers are essentially middleware functions to ensure developers are signed in and allowed to edit the data.

### constants

This directory contains the constants required for the `brotherForm`. More constants can be added here.

### public

### app.js

This file creates the Express server and applies the middleware and handlers the application should use, including the views and routes.

### start.js

This file connects the Express server to the database and its models, then starts the server.

### helpers.js

This file contains helper functions for processing and validating data.

### data

This directory contains scripts to load fake data into the development database.

---

## Contributors

**Rahul Rangnekar**

- B.A. Computer Science & B.A. Economics, UC Berkeley 2018
- Vice President of Marketing, PSE Zeta Chi, 2016-2017
- [GitHub](https://github.com/rahrang)
- [LinkedIn](https://linkedin.com/in/rahrang)
- [Website](http://rahulrangnekar.com)
