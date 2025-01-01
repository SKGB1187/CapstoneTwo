This application is a Next.js 15 React Application. It was built for helping students study for the Scripps National Spelling Bee. The Scripps National Spelling Bee produces a list of over 4000 words each year for students to study from. This list is broken down into three categories: One Bee (1-3 grades), Two Bee (4-6 grades), and Three Bee (7-8 grades). With the lists further divided in school spelling lists and general study lists. This application takes the school spelling lists and allows students to study for the spelling bee similarly to how they would receive words in an actual spelling bee.

Back-end
- There is no back-end server for this application. Discussing what was needed for my capstone with my mentor, I was told it would be okay to have an application that was only front end. To that effect, I do not have an ERD for the application.

API
- The word lists are put in as matrices that can be read through by the application. These matrices use words from the school spelling lists that are included in the Merriam-Webster API. The API is very lacking in having all of the words on the spelling lists, thus every list has been fully tested to assure the words are contained in the API.
- The Merriam-Webster API was chosen specifically because the Scripps National Spelling Bee utilizes the Merriam-Webster dictionary for its definitions, pronunciations and sample sentences. When a student progresses to nationals the unabridged Merriam-Webster dictionary is used for studying. An unabridged version of the dictionary is not available online or in the API. To that effect the elementary and collegiate dictionary APIs have been implemented in the application.
- The school spelling lists change every year. The lists that are in this application are for 2024 and will be updated when the 2025 Scripps Spelling Bee Practice Guide is available.

Testing
- To get testing to work with next.js 15 and with Jest, a babel.config.js and jest.config.js file were created. These break functionality when running the application, so they have been renamed to filename.test.js for now. If you need to run the tests you can rename them to their original names, but make sure to return them to the filename.test.js.
