# Project Portal

![project license](https://img.shields.io/badge/license-MIT-blue.svg)

## Description

Project Portal addresses the issue of prospective software developers being unable to build quality projects to gain practicial experience in the field. Through our application, users can build a profile detailing the languages they're proficient in, and can then view or create project cards. These cards are simply rough ideas of the kind of projects the owner intends to develop along with a list of the languages they require to implement it. Users can then join a project and engage in a group chat to further discuss the specifics of the project and decide if it's a good fit for them.

## Table of Contents

- [Usage](#usage)
    - [Screenshot](#screenshot)
- [Features](#features)
- [Contributing](#contributing)
- [Credits](#credits)
- [Roadmap](#roadmap)
- [License](#license)

------------------
    
## Usage
Visiting the website will present you with the various projects users have created. If you want to join or create a project of your own, you'll have to sign up. Once logged in you can also search for projects by name or language. Clicking on the Messages tab in the navbar will allow you to send and view messages within a project group. All users associated with that project (the owner and developers who joined) can use the private chat for discussion.

Here is the deployed link: https://proj-portal.netlify.app/

## Screenshot
![Project Portal](/assets/images/Project-Portal.jpeg)

------------------

## Features
<ul>
<li> User's are able to create accounts through the use of a MySQL database to store user details and JSON Web Token's to encrypt credentials.
<li> Ability to send and receive messages between users in the same room using Socket.io.
<li> Can create and join projects, with the site able to differentiate between the owner and developer of a project. Only owners can then delete a project.
<li> Search functionality to find projects by name and programming language.
<li> Create a user profile and add a profile picture, done using Cloudinary.
</ul>

## Contributing
If you pull or clone the repo, make sure you do the same with the corresponding back end repository. This repository contains all the code for managing the database and the Express routes used to retain data such as user login, project information, and messaging.

Here is the back end repo: https://github.com/linotmike/project-portal-back-end

------------------

## Credits
<ul>
<li> Github : https://github.com/bear-muna
<li> Github : https://github.com/amman98
<li> Github : https://github.com/krezket
<li> Github : https://github.com/linotmike
</ul>

------------------

## Roadmap
We plan to implement a feature that requires users to send a request to join a project, as opposed to being able to join a project automatically (so long that the project hasn't reached capacity). To do this, we would use Nodemailer to send an email to the project owner and they would have to approve the request.

------------------

## License
MIT License
