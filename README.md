# Worktree Label

Worktree Label is a VS Code extension that shows the current workspace folder and Git branch in the status bar. The folder name gets a stable colour, so open worktrees are easy to tell apart.

## Set up and build

Requires Node.js and npm.

```sh
npm install
npm run compile
```

Run `npm run watch` to compile automatically while editing.

## Package and install in VS Code

Build and package the extension:

```sh
npm install
npm run package
```

In VS Code, open the Command Palette, run **Extensions: Install from VSIX...**, and select the generated `worktree-label-0.1.0.vsix` file. Reload VS Code to activate it. The label appears when the first workspace folder is a Git repository with a branch or commit checked out.
