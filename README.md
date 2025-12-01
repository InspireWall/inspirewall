# InspireWall - Email Backend (Express)

This minimal Express backend accepts email subscriptions at `/api/subscribe`.
It supports a couple of modes:

- Local storage only: if `MAILCHIMP_API_KEY` and `MAILCHIMP_LIST_ID` are not set, emails are saved to `data/emails.json`.
- Mailchimp integration: if `MAILCHIMP_API_KEY` and `MAILCHIMP_LIST_ID` are set, the server will try to add the subscriber to Mailchimp and still log a local backup.

## Setup

1. Install dependencies

```powershell
cd server; npm install
```

2. Create an `.env` file (optional):

```
MAILCHIMP_API_KEY=your-mailchimp-api-key-usX
MAILCHIMP_LIST_ID=your-mailchimp-list-id
ADMIN_SECRET=dev-secret
CORS_ORIGIN=http://localhost:3000
PORT=3001
```

3. Run the server locally

```powershell
npm run dev
# or:
npm start
```

4. In development, keep the server accessible at `http://localhost:3001` and your static site at `http://localhost:3000`. The client code will POST to `/api/subscribe` on the same origin; configure your hosting or reverse-proxy accordingly.

## Endpoints

- `POST /api/subscribe` - Accepts JSON body `{ email }`. Returns `{ success: true }` or error status.
- `GET /api/emails?secret=<<ADMIN_SECRET>>` - Returns locally-stored emails. Keep `ADMIN_SECRET` private.

Example test with curl:

```bash
curl -X POST 'http://localhost:3001/api/subscribe' -H 'Content-Type: application/json' -d '{ "email": "test@example.com" }'
```

## Deployment

- Vercel / Netlify: Convert to serverless endpoint (one file per function). If using Vercel, place similar logic inside `api/subscribe.js`.
- Docker: Create a Dockerfile around the Express app.

Security: Do not commit your Mailchimp API key to source control. Use environment variables.
