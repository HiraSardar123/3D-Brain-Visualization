# 3D Human Organs Interactive Website

## Overview
This project is an interactive web application that allows users to explore 3D models of human organs, including the brain, heart, and lungs. Built using HTML, CSS, JavaScript, and Three.js, the website provides educational content, interactive flashcards, and a simple chatbot for learning about human anatomy.

## Features
- **3D Models**: Interactive 3D visualization of the brain, heart, and lungs using GLTF models and Three.js.
- **Organ Information**: Detailed descriptions and educational content for each organ and its substructures (e.g., brain lobes).
- **Flashcards**: Clickable flashcards for self-testing knowledge about the brain.
- **Chatbot**: A simple chatbot that answers questions about the organs.
- **Contact Form**: Users can send messages via a contact form (demo only, no backend).
- **Responsive Design**: Modern, responsive UI for desktop and mobile devices.

## File Structure
```
├── about.html           # About page with contributors and project info
├── Anatomy.html         # 3D brain anatomy viewer
├── Anatomy.js           # JS for Anatomy.html (3D model logic)
├── brain.html           # 3D brain model viewer
├── brain.js             # JS for brain.html (3D model logic)
├── chatbot.html         # Chatbot interface
├── chatbot.js           # JS for chatbot logic
├── contact.html         # Contact form page
├── contact.js           # JS for contact form handling
├── flashcards.html      # Brain flashcards page
├── heart.html           # 3D heart model viewer
├── heart.js             # JS for heart.html (3D model logic)
├── index.html           # Landing page
├── lungs.html           # 3D lungs model viewer
├── lungs.js             # JS for lungs.html (3D model logic)
├── script.js            # (Legacy/utility) Shared JS for models/interactions
├── styles.css           # Main stylesheet
├── images/              # Organ icons and images
│   ├── anatomy.PNG
│   ├── brain-icon.PNG
│   ├── chatbot-icon.PNG
│   ├── fc.PNG
│   ├── heart-icon.PNG
│   └── lungs-icon.PNG
├── *.glb, *.fbx, *.mp4  # 3D models and demo videos
├── README.md            # Project documentation (this file)
└── .vscode/             # VS Code settings
```

## Technologies Used
- **HTML5/CSS3**: Structure and styling
- **JavaScript (ES6+)**: Interactivity and logic
- **Three.js**: 3D rendering and model loading
- **GLTFLoader**: For loading .glb 3D models

## How to Run
1. **Clone or Download** this repository.
2. **Open `index.html`** in your web browser. No server is required for basic functionality.
3. For full 3D model support, use a modern browser (Chrome, Firefox, Edge).

## Pages and Functionality
- **index.html**: Home page with navigation and feature highlights.
- **Anatomy.html**: Explore brain anatomy in 3D, including lobes and internal structures.
- **brain.html**: View and interact with a 3D brain model.
- **heart.html**: View and interact with a 3D heart model.
- **lungs.html**: View and interact with a 3D lungs model.
- **flashcards.html**: Test your knowledge with interactive brain flashcards.
- **chatbot.html**: Ask questions about organs and get instant answers.
- **about.html**: Learn about the project and contributors.
- **contact.html**: Send a message (demo only).

## 3D Models
- `.glb` and `.fbx` files are used for 3D rendering. These are loaded dynamically using Three.js and GLTFLoader.
- Example models: `final-model.glb`, `braincomp.glb`, `brainlobes.glb`, `brainstem.glb`, `internal-brain.glb`.

## Customization
- **Add new organs**: Create new HTML/JS files following the pattern of `heart.html`/`heart.js` or `lungs.html`/`lungs.js`.
- **Update 3D models**: Replace or add new `.glb` files and update the corresponding JS to load them.
- **Edit content**: Update the HTML or JS files for new information or features.

## Contributors
- **Doctor Faisal Shafait** - Professor, National University of Sciences and Technology (NUST)
- **Doctor Junaid Younas** - Assistant Professor, NUST
- **Hira Sardar** - Student, NUST

## License
This project is for educational purposes. All rights reserved.

---
For questions or suggestions, please use the contact form on the website.