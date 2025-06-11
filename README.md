# Mitigasi Kita - Web App for Disaster Mitigation and Prediction in Indonesia

"Mitigasi Kita" is an application designed to help the people of Indonesia understand and prepare for various potential risks and disasters, such as earthquakes and tsunamis. This app supports public awareness and community preparedness through interactive and informative features.

![logoApp](./public/logo-app.png)

## Main Features

- 🗺️ **Risk Map**: Displays potential disaster conditions (earthquake and tsunami) based on the selected location.
- 📚 **Mitigation Education**: Guidelines for understanding and preparing for disasters.
- 🧾 **Activity History & Details**: Saves and displays user interaction records.
- 🔐 **Authentication**: Login, register, and password reset.
- 📱 **Responsive & PWA**: Fixed bottom navigation and can be installed on devices.

## Technologies Used
- React + Vite
- Leaflet + OpenStreetMap (Interactive Map)
- SweetAlert2 (Notifications & Confirmations)
- Tailwind CSS (Responsive Design)

## Project Structure
```
mitigasi-kita/
├── presenters/
├── public/
├── src
│    ├── assets
│    ├── components
│    ├── data  
│    ├── pages
│    ├── utils
│    ├── App.css
│    ├── App.jsx
│    ├── index.css
│    └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Project Architecture

MVP (Model-View-Presenter) Pattern:

- `pages/` – View components: Display UI and receive user input.
- `presenters/` – Presenter components: Handle the logic and bridge between View and Model.
- `utils/` – Model components: Handle API communication and data management.

## Prerequisites

- Node.js v20.x or higher
- npm (Node Package Manager)

## Setup and Installation
```bash
git clone https://github.com/zainalsaputra/mitigasi-kita-app-frontend.git
cd mitigasi-kita-app-frontend
npm install
npm run dev
```

## Contributing

Feel free to fork this repository and submit a pull request.

## License

MIT License - Use freely with attribution.

## Credits

Developed as part of an initiative to support **early warning systems** and **disaster mitigation** technology in Indonesia.

