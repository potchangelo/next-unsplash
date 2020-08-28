# Next Unsplash by Zinglecode

Unsplash-Cloned web-app (for educational purposes only)

[Back-end API](https://github.com/potchangelo/express-unsplash/)

## Table of Contents

* [How to Install and Run Offline](#how-to-install-and-run-offline)
* [Credits](#credits)

## How to Install and Run Offline

0. Please install and run [Back-end API](https://github.com/potchangelo/express-unsplash/) on your machine before running this project.

1. Download this project, then open project folder in code editor (VSCode or Anything).

2. Create .env.local file in project folder, then type your configuration like this.

Template
```
NEXT_PUBLIC_HOST={front-end-url}
NEXT_PUBLIC_API_HOST={back-end-url}
NEXT_PUBLIC_TITLE={website-based-title}
```

Example
```
NEXT_PUBLIC_HOST=http://localhost:3000
NEXT_PUBLIC_API_HOST=http://localhost:8080
NEXT_PUBLIC_TITLE=Unsplash-Cloned
```

3. Open Terminal or Command Prompt at project folder, then install packages.

```
npm install
```

4. Start running Next.js web-app.

```
npm run dev
```

5. Check if web-app. is working properly by open these URLs in browser.

```
http://localhost:3000/
```

## Credits

The project was inspired by https://unsplash.com/.

### Stack used in the project

- Next.js (React Framework)
- React Query
- React Feather
- Bulma
