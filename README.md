# GitHub Analytics Hub

## Overview
GitHub Analytics Dashboard is a web application that provides comprehensive analytics for GitHub users and their repositories. The dashboard allows users to search for a GitHub user, view their repositories, and explore detailed analytics such as stars, forks, open issues, recent commits, and contributors.

## Features
1. **User Search**: An input box to search for GitHub users and show a list of cards with the responses.
2. **User Repository Table**: Displays a list of a user's repositories with columns for the name, description, stars, forks, and open issues.
3. **Sorting**: Allows sorting repositories by name, stars, forks, or open issues.
4. **Search Filter**: Filters repositories by name within the user's list.
5. **Commit History Visualization**: Shows a graph of the commit activity over the last year for a selected repository.
6. **Contributors List**: Lists contributors for each repository and their contribution count.
7. **Repository Detail View**: Includes the README file, a list of recent commits, and open issues.
8. **Rate Limit Handling**: Handles GitHub's API rate limiting gracefully by caching data or informing the user.

## Tech Stack
- **Frontend**: HTML, CSS, Javascript
- **Backend**: Node.js with Express
- **Data Fetching**: Axios
- **Visualization**: Chart.js
- **Database**: MongoDB
- **Styling**: Styled-components or traditional CSS

