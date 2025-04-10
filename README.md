# English Dictionary App

## Setup

```bash
`npm create vite@latest thesaurus-app --template react`
```

## Backend

This project uses the json-server library for the backend.

## Deploy
```bash
# Add to reposotory
git add <file>
git commit -m "comment"
git push

# Push to Github Pages
npm run predeploy # tsc and build
npm run deploy # gh-pages
```

## Push to Remote GitHub Repository

```bash
git add <file>
git commit -m "comment"
git push
```

## Git & GitHub Setup

```bash
git init
# git add <file>
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/aaron-san/english-dictionary-app.git
git add README.md
git push -u origin main
```

## Remove Origin (Start over)

```bash
git remote remove origin
```

## Add GitHub Pages Dependency App

```bash
npm install gh-pages --save-dev
```

### package.json:

```javascript
"scripts": {
"server": "concurrently \"json-server --watch db.json\" \"node ./export-xl.cjs\"",
"dev": "concurrently \"npm run server\" \"vite\"",
"build": "vite build",
"preview": "vite preview --port 8080",
"predeploy": "tsc && vite build",
"deploy": "gh-pages -d dist"
},
```

## Building the App

You may run npm run build command to build the app.

npm run build
By default, the build output will be placed at dist. You may deploy this dist folder to any of your preferred platforms.

## Testing the App Locally

Once you've built the app, you may test it locally by running npm run preview command.

npm run preview
The vite preview command will boot up a local static web server that serves the files from dist at http://localhost:4173. It's an easy way to check if the production build looks OK in your local environment.

You may configure the port of the server by passing the --port flag as an argument.

package.json

{
"scripts": {
"preview": "vite preview --port 8080"
}
}
Now the preview command will launch the server at http://localhost:8080.
