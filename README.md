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

## Add or update events

Follow these steps to publish a new meetup, workshop, or social gathering on both the homepage carousel and the dedicated
events page:

1. Open [`assets/data/events.json`](./assets/data/events.json).
2. Duplicate the most recent event object and paste it at the top of the array so the newest event appears first.
3. Update the fields:
   - `id`: A URL-safe slug such as `2024-spring-social`.
   - `title`: The public-facing event name.
   - `date`: Calendar date in `YYYY-MM-DD` format.
   - `startTime` / `endTime`: 24-hour times like `17:30`.
   - `location`: Venue or meeting link.
   - `summary`: Short teaser shown on cards.
   - `description`: Full details that display in the modal.
   - `tags`: Array of short labels (e.g., `"Workshop"`).
   - `cta`: Update `label` and `url` for the registration link.
4. Save the file and run `npm start` to verify the event renders correctly in the UI.
5. Commit your change once the preview looks good.

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
