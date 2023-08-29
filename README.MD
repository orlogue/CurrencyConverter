# Currency Converter

## First step

Create `.env` based on `.env.example` and put API key there

Run `npm install`

## Commands
`npm run lint` to run ESLint check

`npm run dev` to run server

`npm run lint && npm run dev` to run both

### Warning
As free API limits concurrent requests (10 / min), `Strict mode` is disabled by default to prevent double API-request. 
To enable it, add it to `main.tsx`

