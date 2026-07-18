# 🗺️ MapCanvas

**MapCanvas** is a web application that lets users create beautiful, customizable map posters from locations around the world. Whether it's your hometown, a memorable travel destination, or a place with sentimental value, MapCanvas transforms geographic locations into elegant poster designs.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

- 📍 Search and select locations
- 🗺️ Interactive map preview
- 🎨 Customize map styles and colors
- 📝 Add personalized titles and subtitles
- 🌗 Light & Dark Mode
- 📱 Responsive design
- 💾 Export poster designs *(coming soon)*
- 🖼️ Gallery of saved designs *(coming soon)*

---

## 📸 Preview

> Add screenshots of your application here.

### Home Page

```
/screenshots/home.png
```

### Editor

```
/screenshots/editor.png
```

---

## 🛠️ Built With

- **React.js**
- **Vite**
- **Tailwind CSS**
- **Framer Motion**
- **React Router DOM**
- **Leaflet** *(for interactive maps)*
- **Mapbox / OpenStreetMap** *(depending on implementation)*

---

## 📂 Project Structure

```text
src/
│
├── assets/
│
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ThemeToggle.jsx
│   └── ...
│
├── context/
│   └── ThemeContext.jsx
│
├── pages/
│   ├── HomePage.jsx
│   ├── EditorPage.jsx
│   ├── GalleryPage.jsx
│   └── AboutPage.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/mapcanvas.git
```

### 2. Navigate to the project

```bash
cd mapcanvas
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will run at:

```
http://localhost:5173
```

---

## 📦 Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## 🌙 Dark Mode

MapCanvas supports Light and Dark themes using Tailwind CSS.

The selected theme is:

- stored in Local Storage
- automatically applied throughout the application

---

## 🎯 Future Features

- [ ] User authentication
- [ ] Save poster designs
- [ ] Download as PNG/PDF
- [ ] More map themes
- [ ] Additional typography options
- [ ] Poster templates
- [ ] Shareable links
- [ ] Cloud storage integration

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/your-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature/your-feature
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Jeremy Rellama**

- GitHub: https://github.com/yourusername

---

### ⭐ If you found this project helpful, consider giving it a star!
