# English Dictionary App

## Setup

```bash
`npm create vite@latest thesaurus-app --template react`
```

## Backend

This project uses the json-server library for the backend.

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
"predeploy": "tsc && vite build",
"deploy": "gh-pages -d dist"
},
```
