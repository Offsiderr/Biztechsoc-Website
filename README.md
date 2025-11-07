# BiztechSOC Website

Static marketing site for the Business and Technology Society (BiztechSOC) at the University of Canterbury.

## Edit the site on your computer

1. **Install prerequisites**
   - [Node.js 20+](https://nodejs.org/en/download/) (includes npm)
   - [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) if you plan to deploy
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the local server**
   ```bash
   npm start
   ```
   This starts an Express server that serves the site at [http://localhost:8080](http://localhost:8080).
4. **Edit the content**
   - Update markup in [`index.html`](./index.html). The layout now uses Bootstrap 5 components and utilities.
   - Adjust styles in [`assets/css/styles.css`](./assets/css/styles.css). Bootstrap variables such as `--bs-primary` are already configured.
   - Add interactions in [`assets/js/main.js`](./assets/js/main.js).
5. **Stop the server** with `Ctrl + C` when you are done.

## Deploy

### Google App Engine (standard)

1. Authenticate and select a project:
   ```bash
   gcloud auth login
   gcloud config set project <your-project-id>
   ```
2. Deploy using the included `app.yaml`:
   ```bash
   gcloud app deploy
   ```
3. Open the live site:
   ```bash
   gcloud app browse
   ```

### Cloud Build (optional CI/CD)

The repository includes a sample [`cloudbuild.yaml`](./cloudbuild.yaml). Trigger it from Cloud Build to automatically install dependencies and deploy on merge.

## Contributor checklist

- [ ] Update event dates and locations in `index.html`
- [ ] Verify navigation links point to active sections or pages
- [ ] Replace placeholder project links with real destinations
- [ ] Confirm the contact email and social links are current
- [ ] Run `npm start` locally to smoke test the site before deploying
