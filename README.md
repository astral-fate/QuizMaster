# MongoDB and JSON Quiz Application

An interactive web-based quiz application specializing in MongoDB and JSON technologies.

## Deployment Instructions for GitHub Pages

1. First, create a new repository on GitHub and push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

2. Build the application:
```bash
npm run build
```

3. Create a new branch called `gh-pages`:
```bash
git checkout -b gh-pages
```

4. Move the contents of `dist/public` to the root of the `gh-pages` branch:
```bash
cp -r dist/public/* .
```

5. Commit and push the `gh-pages` branch:
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

6. On GitHub:
   - Go to your repository settings
   - Navigate to "Pages"
   - Select the `gh-pages` branch as the source
   - Save the changes

Your application will be available at: `https://your-username.github.io/repository-name/`

## Development

To run the application locally:

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:5000`
