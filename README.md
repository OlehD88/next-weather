# NextJS/React Weather App

This is a nice app for checking weather conditions. Here I used AccuWeather API https://developer.accuweather.com/. The app by default will show you weather conditions at your current location.

## Current Features

- ☀️ Possibility to select a city for showing weather conditions
- ☀️ Ability to select temperature unit between Celsius and Fahrenheit
- ☀️ Show current conditions at the selected location
- ☀️ Show the next 5 days forecast for the selected location
- ☀️ Show history of weather conditions for the past 24 hours

## Start a project

For starting a project you need to do the following steps:

1. First run `npm install` to install node packages.
2. You should go to the AccuWeather website and register your app. You will get an API key there that you will need to properly use this app.
3. There is an `.env.example` file. You should rename it to `.env` and add your API key there to the variable `WEATHER_API_KEY`.
4. Then just run `npm run dev` and you should be good to go.

## Additional setup

- Currently, there are downloaded weather icons inside the `public/icons` folder. I downloaded them from this page https://developer.accuweather.com/weather-icons and currently, they are connected to the AccuWeather API.
  If those icons are updated on the AccuWeather page, you should run the `npm run get:icons` script to download them again.
- There are ESLint and Prettier integrations. To run them manually, you can run `npm run lint` and `npm run format`.
- To run unit tests, you should run `npm run test`.
- To run Storybook, you should use the script `npm run storybook`.

### Technology Used

- ✅ TypeScript
- ✅ NextJs
- ✅ [Recharts](https://recharts.org/en-US/) for daily weather chart
- ✅ [React-Toastify](https://github.com/fkhadra/react-toastify) for user notifications
- ✅ [React-Query](https://tanstack.com/query/latest) and [Axios](https://axios-http.com/) for API calls
- ✅ [Jest](https://jestjs.io/) for unit tests
- ✅ [Storybook](https://storybook.js.org/) for components sandbox
