import * as vscode from "vscode";
import { execFile } from "child_process";
import { basename } from "path";
import { colorFor } from "./colorFor";

export function activate(context: vscode.ExtensionContext) {
  const item = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    1000
  );
  context.subscriptions.push(item);

  const refresh = () => render(item);
  refresh();
  context.subscriptions.push(
    vscode.window.onDidChangeWindowState((s) => s.focused && refresh())
  );
}

async function render(item: vscode.StatusBarItem) {
  const root = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
  if (!root) {
    item.hide();
    return;
  }
  const branch = await gitBranch(root);
  if (!branch) {
    item.hide();
    return;
  }
  const folder = basename(root);
  item.text = `● ${folder} (${branch})`;
  item.color = colorFor(folder);
  item.tooltip = root;
  item.show();
}

function gitBranch(cwd: string): Promise<string | null> {
  return new Promise((resolve) => {
    execFile(
      "git",
      ["rev-parse", "--abbrev-ref", "HEAD"],
      { cwd },
      (err, stdout) => {
        if (err) return resolve(null);
        const ref = stdout.trim();
        if (ref && ref !== "HEAD") return resolve(ref);
        // detached HEAD → short SHA
        execFile("git", ["rev-parse", "--short", "HEAD"], { cwd }, (e, out) =>
          resolve(e ? null : out.trim())
        );
      }
    );
  });
}

export function deactivate() {}
