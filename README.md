# Sticky Notes Web Application

## 📌 Project Overview

Sticky Notes is a modern, user-friendly web application designed to help users create, manage, and organize their notes efficiently. Built with vanilla JavaScript and styled with Tailwind CSS, this application provides a seamless note-taking experience.

## ✨ Features

- 📝 Create notes with text, date, and time
- 🎨 Randomly generated pastel-colored notes
- 📦 Local storage persistence
- 🗑️ Easy note deletion
- 📱 Responsive mobile-friendly design
- 🔒 Form validation
- 🌈 Playful note interactions

## 🚀 Technologies Used

- HTML5
- Vanilla JavaScript
- Tailwind CSS
- Local Storage API

## 🔧 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/sticky-notes.git
```

2. Navigate to the project directory:

```bash
cd sticky-notes
```

3. Open `index.html` in your browser or use a local development server

## 📂 Project Structure

```
sticky-notes/
│
├── index.html           # Main HTML file
├── script.js            # Main entry point JavaScript
├── style.css            # Custom CSS styles
│
├── src/
│   ├── formManger.js    # Form management logic
│   ├── createNote.js    # Note creation logic
│   ├── utils.js         # Utility functions
│   ├── defaultNote.js   # Default notes for first-time users
│   ├── deleteBtn.js     # Delete button SVG generation
│   ├── formValidation.js# Form input validation
│   └── trackingActiveNote.js  # Note interaction tracking
│
├── asset/
│   ├── ficon.svg        # Favicon
│   ├── image.svg        # Pin or other decorative SVG
│   └── ...              # Other assets
│
├── README.md            # Project documentation
│
└── LICENSE              # Project license
```

## 🌟 Key Components

- `FormManger`: Handles form interactions and note creation
- `createNewNote`: Generates dynamic note elements
- `FormValidation`: Validates user input
- `trackingActiveNote`: Manages note activation and deletion

## 💡 Usage

1. Enter your note text.
2. Select a date and time.
3. Click "Click To Save".
4. Interact with notes by hovering or clicking.
5. Reset form by clicking on the headline.

## 🔍 Note Interaction

- **Desktop**: Hover to activate & delete button.
- **Mobile**: Click to activate & delete button.
- Click outside to deactivate.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🎉 Acknowledgments

- Tailwind CSS

---

**Happy Note-Taking! 📝✨**
