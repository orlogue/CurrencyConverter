# Currency Converter

## First step

Create `.env` based on `.env.example` and put API key there

Run `npm install`

## Commands
### For development
`npm run lint` to run ESLint check

`npm run dev` to run server

`npm run lint && npm run dev` to run both

### For production
`npm run build` to generate static files into `/dist`

`npm run preview` to run server

### Warning
As free API limits concurrent requests (10 / min), `Strict mode` is disabled by default to prevent double API-request. 
To enable it, add it to `main.tsx`

