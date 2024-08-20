<div align="center">
  <br>
  <h1> :small_airplane: TravelHub :small_airplane:</h1>
  <h3>Travel and Accommodation Booking Platform</h3>
</div>
<br>

<div align="center">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" height="30" />
    <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" height="30" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30" />
    <img src="https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white" height="30" />
    <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" height="30" />
    <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" height="30" />
    <img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" height="30" />
    <img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E" height="30" />
    <img src="https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" height="30" />
    <img src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white" height="30" />
    <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" height="30" />
    <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" height="30" />
</div>


## Table of Contents
- [What is TravelHub?](#-what-is-travelhub)
- [Table of Contents](#table-of-contents)
- [Design](#design)
- [Getting Started](#getting-started)
- [Acknowledgements](#acknowledgements)
- [Contact](#-contact)


## :stars: What is TravelHub?
TravelHub is an all-in-one travel booking platform developed with React and TypeScript, aimed at delivering a seamless and user-friendly experience for finding and booking accommodations.
The application boasts an easy-to-navigate interface with powerful features that serve both travelers and administrators.
Users can look for hotels, access detailed information, and make reservations, while the admin panel facilitates efficient management of cities, hotels, and rooms.



## :dart: Features
1. **User-Friendly Interface** <br>
TravelHub offers a clean, intuitive interface that enhances the user experience for both travelers and administrators. The streamlined booking process ensures easy navigation and hassle-free reservations for users of all backgrounds.

2. **Responsive Design** <br>
The platform is fully responsive, providing optimal performance across all screen sizes. Whether on desktops, tablets, or mobile devices, users can expect a consistent and enjoyable experience without compromising functionality or aesthetics.

3. **Accessibility** <br>
TravelHub is designed with inclusivity in mind, adhering to accessibility standards. The platform is optimized for screen readers, ensuring that users with special needs can navigate and utilize its features effectively.

4. **Secure System** <br>
Best-in-class security practices are implemented throughout TravelHub. Protected routing ensures that only authenticated users can access the platform. Regular users are directed to user-specific pages, while administrators have secure access to the admin portal, safeguarding sensitive information.

5. **Graceful Error Handling** <br>
TravelHub enhances the user experience by providing clear and informative feedback during operations. Users receive success notifications for completed actions and error alerts when issues arise. The application also effectively handles HTTP errors, such as:
	 - **401 (Unauthorized)**   -> Displays a dedicated page for this error.
	 - **404 (Page Not Found)** -> Displays a dedicated page for this error.
	 - **500 (Server Error)**   -> Uses an error boundary to catch unexpected errors and displays a specific page with a "Try Again" option, allowing users to attempt their actions once more.

6. **Dynamic Home Page** <br>
TravelHub offers a visually captivating homepage designed to engage users from the start. Key sections include:
	 - **Featured Deals**: Showcases special hotel offers with star ratings and essential details for quick and easy comparison.
	 - **Recently Visited Hotels**: A personalized section displaying the last hotels a user visited, making it convenient to revisit or book again.
	 - **Trending Destinations**: A curated list of popular cities, presented with attractive visuals to spark interest and inspire travel plans.

7. **Robust Search Functionality** <br>
TravelHub provides a powerful and user-friendly search experience with:
	 - **Central Search Bar**: Allows users to easily find hotels, with an interactive calendar for selecting check-in and check-out dates.
	 - **Guest and Room Controls**: Users can specify the number of adults, children, and room preferences.
	 - **Infinite Scroll**: Displays search results on a dedicated page with seamless infinite scrolling, allowing users to browse hotels without page reloads.
	 - **Comprehensive Filters**: Advanced filtering options for refining search results by price range, star rating, amenities, and room types, ensuring users find exactly what they’re looking for.

8. **Detailed Hotel Pages** <br>
Each hotel has a dedicated page packed with all the information a user needs to make an informed booking decision, including:
	 - **High-Quality Image Galleries**: Featuring fullscreen view options for an immersive visual experience.
	 - **Comprehensive Information**: Detailed descriptions, guest reviews, and an interactive map highlighting nearby attractions.
	 - **Available Rooms**: Users can view room descriptions, images, and prices, with an easy "Add to Cart" option for booking.

9. **Secure Checkout Process** <br>
TravelHub ensures a smooth and secure checkout experience by providing:
	 - **Cart Overview**: A checkout page displaying all selected rooms with options to remove any, alongside a summary of total items and price.
	 - **User-Friendly Forms**: Simple forms for entering personal and payment details securely.
	 - **Booking Confirmation**: Upon completion, users are directed to a confirmation page that provides booking details, including confirmation number, hotel address, and total price, with the option to save the booking confirmation as a PDF.

10. **Comprehensive Admin Portal** <br>
TravelHub includes an admin portal designed for easy management of the website’s content and data:
	- **Intuitive Management Tools**: TravelHub includes an admin portal designed for easy management of the website’s content and data.
	- **Detailed Grids**: Provides a clear overview of all data, allowing admins to view, update, create, or delete entities with ease, ensuring the website remains up-to-date and well-maintained.



## :paintbrush: Website Design
Below are the key components and resources used in the design process:

 - **Initial Flow**: the initial flow of the website was outlined using FTS, which can be viewed here -> [Excalidraw Flow](https://excalidraw.com/)
![image](https://github.com/user-attachments/assets/2e4b1dec-52a4-4bdd-b52b-c7b6e56196a1)

 - **Prototyping**: Figma was utilized to create the initial design for TravelHub. You can explore the design by following this link -> [Figma Prototype](https://www.figma.com/design/G2NaaHuF1Frc0mZsddlVBk/TravelHub?node-id=87-42&t=W9HSAhkRVwwJHbor-1)
![image](https://github.com/user-attachments/assets/099fe12c-be9f-4a9d-9f5b-435b2a02ab4d)

 - **Icons**: Bootstrap Icons were used throughout the website for a cohesive visual language. You can view the available icons here -> [Bootstrap Icons](https://icons.getbootstrap.com/)

 - **Typography**: Google Fonts was used for the website's typography, incorporating the following fonts:  
	- **Main Font:** "League Spartan"  
	- **Secondary Font:** "Montserrat"  
You can explore the font options here: [Google Fonts](https://fonts.google.com/)

 - **Color Reference**: the following color palette was utilized in the design to create a harmonious visual identity:
<div align="center"> 

| Color | Hex |
| --------------- | ---------------------------------------------------------------- |
| Primary Color | ![#b25e39](https://via.placeholder.com/10/b25e39?text=+) #b25e39 |
| Secondary Color1 | ![#f3f3f3](https://via.placeholder.com/10/f3f3f3?text=+) #f3f3f3 |
| Secondary Color2 | ![#bebfb5](https://via.placeholder.com/10/bebfb5?text=+) #bebfb5 |
| Secondary Color3 | ![#b28e6a](https://via.placeholder.com/10/b28e6a?text=+) #b28e6a |
| Secondary Color4 | ![#473d3a](https://via.placeholder.com/10/473d3a?text=+) #473d3a |
</div>



## Project Management and Tracking
For the development process of TravelHub, I utilized **Linear.app**, a project management tool designed to help track tasks, deadlines, and overall progress. Below is the workflow overview:
1. Workspace Creation: I created a new workspace in Linear specifically for the TravelHub project.
2. Timeline Setup: I established the start and expected finish times for the application development.
3. Milestones Definition: Major milestones were defined along with deadlines for each. Breaking the project into manageable tasks simplifies tracking and management.
4. Development Process: I initiated the development by implementing the first milestone, followed by subsequent ones.
5. Task Management: Each new milestone was divided into multiple issues or 'todos,' which I implemented sequentially until the milestone was completed. <br>
Below is a snapshot of the workspace showing the project details and major milestones.
![image](https://github.com/user-attachments/assets/a86e6e14-17d8-4477-be49-cd4e5a45d094)



## :space_invader: **Technologies Used**
This project utilizes a variety of modern technologies and libraries to create a robust and efficient web application. The following technologies are used in TravelHub:

Frontend Technologies
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static types for better development experience and code quality.
- **React Router DOM**: A routing library for managing navigation and rendering different components based on the URL.
- **Axios**: A promise-based HTTP client for making API requests.
- **Formik**: A library for building forms in React with easy validation and state management.
- **Yup**: A schema builder for value parsing and validation.
- **Date-fns**: A library for date manipulation and formatting.
- **Leaflet**: A JavaScript library for interactive maps.
- **React-Leaflet**: A React wrapper for Leaflet to easily integrate maps into React applications.

Development Tools
- **ESLint**: A tool for identifying and fixing problems in JavaScript/TypeScript code.
- **Prettier**: A code formatter that enforces a consistent style.
- **React Scripts**: Scripts for running and building React applications.

Testing Libraries
- **React Testing Library**: A set of utilities for testing React components.
- **Jest**: A JavaScript/TypeScript testing framework for unit testing components and functions.
- **Jest-DOM**: Custom matchers for Jest to test the state of the DOM.

Other Dependencies
- **JWT Decode**: A library for decoding JSON Web Tokens.
- **jsPDF**: A library for generating PDF documents in JavaScript.
- **React Error Boundary**: A React component for handling errors in the component tree gracefully.




### :eye: Preview
You can access a live demo of this application here -> https://shopping-list-makeup-store.netlify.app/ 

### :joystick: Getting Started 
To run this application locally, follow these steps:
1. Clone the repository:
   ```
   git clone https://github.com/dohmeid/.git
   ```
2. Go to folder 
   ```
   cd 
   ```
3. Install the required dependencies from package.json
   ```
   npm i
   ```

4. Start the development server using:
   ```
    npm start

## Acknowledgements
TravelHub was created as the capstone project for my Front-End Development internship at [Foothill Technology Solutions](https://www.foothillsolutions.com/).
This project incorporates all the skills and technologies I acquired during this experience. 
I want to extend my gratitude to FTS for offering this incredible opportunity, as well as for their guidance and support along the way.

## :handshake: Contact
If you have any questions or comments about TravelHub, please contact **[Doha Hmeid](doha.hmeid@gmail.com)** via  doha.hmeid@gmail.com.

<p align="center">
  <img alt="Sloan, the sloth mascot" width="250px" src="https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/31047/af153cd6-9994-4a68-83f4-8ddf3e13f0bf.jpg">
  <br>
  :heart:	<strong>Happy Coding</strong> :heart:	<br>
  [ :arrow_up_small: Back to Top ](#table-of-contents)
</p>
