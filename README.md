# Find Movies Project

Application that allows users to search for movies and TV series.

![Find Movies Project preview image](https://github.com/elise-bigdevsoon/big-dev-soon-find-movies/blob/main/project-preview.png?raw=true)

## Project brief

Step into the world of **Find Movies**, an application that bridges the gap between cinematic wonders and avid viewers. Deliver a seamless exploration experience to users, letting them discover, search, and delve deep into the intriguing realms of movies and TV series.

### What you will learn

- **API Integration**: Familiarize yourself with the intricacies of external API consumption, specifically with services like TMDB. Learn to decode documentation, manage API keys, and understand how to fetch and display data efficiently.

- **Dynamic Search Techniques**: Harness advanced JavaScript methodologies to implement real-time, debounced searches. Grasp the significance of delivering instant, yet optimized, user feedback.

- **Modern UX/UI Design**: Infuse style and functionality by implementing advanced UX practices like skeleton loading. Deepen your understanding of designing for varying data states, including error boundaries.

- **Infinite Scrolling and Data Pagination**: Engage with modern techniques to handle and display vast sets of data in a user-centric manner. Experience the nuances of creating a continuous browsing experience with infinite scrolling.

### Requirements

- Start by researching and exploring an API such as [TMDB](https://developer.themoviedb.org/docs/getting-started), studying its documentation to understand what data it returns, and configuring it with your API key. Use images from the API for rendering movie and series posters.
- Add a movies search bar with debouncing, loading, and empty states for search results to the navigation, along with a logo, showing around 5 results.
- Create a "Featured Today" section on the homepage, with tabs for Movies and Series, displaying around 20 random movies and series. Add infinity scroll left and right functionality for browsing through titles.
- Implement a "Premieres and announcements" section on the homepage, similar to "Featured Today" but filtered by year (e.g. 2023) and without tabs. Add infinity scroll left and right functionality for browsing through titles.
- When a user clicks on a movie or series, open the details page in a separate URL, allowing for refreshing and separate browsing.
- Add skeleton animation loading to both pages for a better user experience.
- Handle API request failures by showing only the navigation and error boundary page.
