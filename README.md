# World Stadiums

World Stadiums is a web platform where registered users can contribute to a comprehensive database of football stadiums from around the globe. Users have the ability to add, edit, rate, and comment on football stadiums, creating a dynamic and interactive hub for football enthusiasts. The application is built using JavaScript, EJS, Express, Node.js, MongoDB, HTML5, CSS3, and Bootstrap 5. Several third-party libraries and services, such as Mapbox, Cloudinary, Passport.js, Mongoose, Helmet, Joi, UUID, Sanitize-html, and Multer, enhance the functionality and security of the application.

## Features

- **User Authentication:** Utilizes Passport.js for secure user authentication.
- **Stadium Management:** Allows users to add new stadiums, edit existing ones, and contribute to the growing database.
- **Rating and Comments:** Users can rate and provide comments on their favorite (or least favorite) stadiums.
- **Map Integration:** Utilizes Mapbox for an interactive map display of stadium locations.
- **Image Handling:** Cloudinary and Multer are employed for efficient and secure image storage and retrieval.
- **Data Validation:** Joi is used for input validation, ensuring data integrity.
- **Security:** Helmet enhances security by setting various HTTP headers.
- **Unique Identifiers:** UUID generates unique identifiers for each stadium entry.
- **Sanitization:** Sanitize-html helps prevent Cross-Site Scripting (XSS) attacks by sanitizing user input.

## Prerequisites

Make sure you have the following installed:

- Node.js and npm
- MongoDB
- Cloudinary Account (for image storage)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/kubagoly97/worldStadiums.git
cd world-stadiums
```

2. Install dependencies:

```bash
npm install
```

3. Configure the environment variables:

   - Create a `.env` file in the root directory.
   - Provide values for the following variables:

     ```env
     PORT=3000
     MONGODB_URI=your_mongodb_uri
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     SESSION_SECRET=your_session_secret
     ```

4. Run the application:

```bash
nodemon
```

Visit [http://localhost:3000](http://localhost:3000) to explore World Stadiums!

## Contributing

We welcome contributions! If you'd like to enhance the project, feel free to fork the repository and submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Happy exploring the world of football stadiums with World Stadiums! ⚽🏟️

<img width="1440" alt="Zrzut ekranu 2023-12-5 o 12 09 12" src="https://github.com/kubagoly97/worldStadiums/assets/142389870/9e9b9bd4-6393-4ffd-aafe-c993c3868061">
<img width="1552" alt="Zrzut ekranu 2023-12-5 o 11 37 28" src="https://github.com/kubagoly97/worldStadiums/assets/142389870/53499fd1-0b51-45ce-81c4-8bea44c96d55">

