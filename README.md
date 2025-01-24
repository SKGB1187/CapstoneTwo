# Spelling Bee App

**Project Description**  
This application is a Next.js 15 React Application. It was built for helping students study for the Scripps National Spelling Bee. The Scripps National Spelling Bee produces a list of over 4000 words each year for students to study from. This list is broken down into three categories: One Bee (1-3 grades), Two Bee (4-6 grades), and Three Bee (7-8 grades). With the lists further divided in school spelling lists and general study lists. This application takes the school spelling lists and allows students to study for the spelling bee similarly to how they would receive words in an actual spelling bee.

<<<<<<< HEAD
## Table of Contents
1. [Features](#features)
2. [Getting Started](#getting-started)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Running the Project](#running-the-project)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)
8. [ERD](#erd)
9. [Back-end](#backend)
10. [API](#api)
11. [Deployment URL](#deploymenturl)
---

## Features

- Uses the Merriam-Webster Collegiate and Elementary Dictionary APIs to look up words from the Scripps School Spelling Bee Lists that are published each year for the National Spelling Bee.
- Allows students to work through the lists in alphabetical order, this means they can navigate away from the page and return to the point they left off.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16+ recommended)
- **npm** or **yarn**
- **Git**

You do not need to install, but should create a:
- **Neon: postgres Database**

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/SKGB1187/CapstoneTwo
   cd spellingbee
   ```

2. Install Dependencies
    ```
    npm install
    ```

3. Create environmental file
    ```
    touch .env
    ```

## Configuration

### Environment Variables

Environment variables required to run the project.

| Variable             | Description                       | Default Value |
|----------------------|-----------------------------------|---------------|
| `COLLEGIATE_API_KEY` | API key for the Collegiate API.   | Required      |
| `ELEMENTARY_API_KEY` | API key for the Elementary API.   | Required      |
| `PORT`               | Port number for the application.  | `3000`        |
| `DATABASE_URL`       | URL for Neon Database             | Required      |
| `NEXTAUTH_SECRET`    | Secret for encyption              | Required      |
| `NEXTAUTH_URL`       | URL for protected routing         | Required      |

## Running the Project

### Prisma

You may need to run the Prisma Generate command:
```bash
npm prisma generate
```

### Development

Start the development server with hot reloading:

```bash
npm run dev
# or
yarn dev
```

### Production

Build and serve the project:
```bash
npm run build
```

Start the production server
```bash
npm start
```

## Testing

To get testing to work with next.js 15 and with Jest, a babel.config.js and jest.config.js file were created. These break functionality when running the application, so they have been renamed to filename.test.js for now. If you need to run the tests you can rename them to their original names, but make sure to return them to the filename.test.js.

Run the test suite:
```bash
npm test
```

A lot of manual testing was performed on the entire application in order to make sure that the application was functioning. This was done as it is good practice and due to the difficulty with testing using Jest with React. Some but not all of the manual testing that was perfomed but cannot be seen in testing files is: login, signup, signout, state management (switch from one list to another and when you go back to the first list it picks up at the next word after the word you stopped on in the list), button/links are routing correctly, css is being applied across all pages word lists are returning words that are found by the API (words not found have been removed from the spelling lists for usability by the target audience).

## Troubleshooting

Common Issues
- API Key missing - Ensure API keys are pulled from Merriam-Webster API website. You will need to have your own API keys for both the Collegiate and the Elementary APIs in order to run this application.
- Port already in use - Stop the existing process or use a different prot by updating the .env file
- Dependencies not installed - Run npm install

## ERD

- The ERD is located in the ERD.sql file within the project folder. This is a very simple data schema.

## Back-end

- A basic backend server was implemented in the next.js 15 application utilizing the server side routing native to next.js 15. This server side routing utilizes API routes for generating server side code. The API routes that were implemented were for login and signup as well as for calling both the elementary and collegiate Merriam-Webster APIs. The database for storing the signup and login information utilizes Neon for Vercel. This is a postgres server that is easy to integrate with next.js 15 React applications.

## API

- The word lists are put in as matrices that can be read through by the application. These matrices use words from the school spelling lists that are included in the Merriam-Webster API. The API is very lacking in having all of the words on the spelling lists, thus every list has been fully tested to assure the words are contained in the API.
<<<<<<< HEAD
- The Merriam-Webster API (https://dictionaryapi.com/) was chosen specifically because the Scripps National Spelling Bee utilizes the Merriam-Webster dictionary for its definitions, pronunciations and sample sentences. When a student progresses to nationals the unabridged Merriam-Webster dictionary is used for studying. An unabridged version of the dictionary is not available online or in the API. To that effect the elementary and collegiate dictionary APIs have been implemented in the application.
- The school spelling lists change every year. The lists that are in this application are for 2024 and will be updated when the 2025 Scripps Spelling Bee Practice Guide is available.
=======
- The Merriam-Webster API was chosen specifically because the Scripps National Spelling Bee utilizes the Merriam-Webster dictionary for its definitions, pronunciations and sample sentences. When a student progresses to nationals the unabridged Merriam-Webster dictionary is used for studying. An unabridged version of the dictionary is not available online or in the API. To that effect the elementary and collegiate dictionary APIs have been implemented in the application.
- The school spelling lists change every year. The lists that are in this application are for 2024 and will be updated when the 2025 Scripps Spelling Bee Practice Guide is available.

## Deployment URL

The deployment URL is: https://capstone-two-ruby.vercel.app/
