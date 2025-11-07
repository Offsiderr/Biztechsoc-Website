# BiztechSOC Website

Static website scaffold for the Business and Technology Society (BiztechSOC) at the University of Canterbury.

## Getting started

### Prerequisites

- [Node.js 18+](https://nodejs.org/en/download/) and npm
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) (for deployment)

### Install dependencies

```
npm install
```

### Run locally

```
npm start
```

The Express server will host the static site at `http://localhost:8080`.

## Deploying to Google App Engine

1. Authenticate and select your Google Cloud project:
   ```
   gcloud auth login
   gcloud config set project <your-project-id>
   ```
2. Deploy the application using the included `app.yaml`:
   ```
   gcloud app deploy
   ```
3. Visit the deployed site:
   ```
   gcloud app browse
   ```

## Project structure

```
.
├── app.yaml              # App Engine deployment configuration
├── cloudbuild.yaml       # Optional Cloud Build configuration
├── index.html            # Landing page markup
├── server.js             # Express server for static hosting
├── assets/
│   ├── css/
│   │   └── styles.css    # Global styles and layout utilities
│   ├── js/
│   │   └── main.js       # Basic interactivity helpers
│   └── img/              # Placeholder for future imagery
├── package.json          # Node.js project metadata and scripts
└── README.md
```

## Customization tips

- Update the navigation, hero, and section content in `index.html`.
- Extend the color palette and component styles in `assets/css/styles.css`.
- Add additional scripts or integrations in `assets/js/main.js`.
- Modify `server.js` if you need custom routing or middleware.
