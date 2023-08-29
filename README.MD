# Currency Converter

## First step

Create `.env` based on `.env.example` and put API key there

Run `npm install`

## Commands
### Linting
`npm run lint:es` to run ESLint check

`npm run lint:es:fix` to fix ESLint errors

`npm run lint:css` to run Stylelint check

`npm run lint:css:fix`to fix Stylelint errors

### For development
`npm run dev` to run server

### For production
`npm run build` to generate static files into `/dist`

`npm run preview` to run server

### Warning
As free API limits concurrent requests (10 / min), `Strict mode` is disabled by default to prevent double API-request. 
To enable it, add it to `main.tsx`

