import fs from 'fs';
import path from 'path';

export const formatTargetDir = (targetDir: string) => {
  return targetDir.trim().replace(/\/+$/g, '');
}

export const pkgFromUserAgent = (userAgent: string | undefined) => {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(' ')[0];
  const pkgSpecArr = pkgSpec.split('/');
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
}

export const updatePackageJson = (pkgJsonPath: string, version: string, name?: string) => {
  let content = fs.readFileSync(pkgJsonPath, 'utf-8');
  content = content.replace(/workspace:\*/g, `^${version}`);
  const pkg = JSON.parse(content);
  if (name) pkg.name = name;
  fs.writeFileSync(pkgJsonPath, JSON.stringify(pkg, null, 2));
};

export const copyFolder = (src: string, dist: string, version: string, name?: string) => {
  const renameFiles: Record<string, string> = {
    gitignore: '.gitignore',
  };

  // Skip local files
  const skipFiles = ['node_modules', 'dist'];

  fs.mkdirSync(dist, { recursive: true });

  for (const file of fs.readdirSync(src)) {
    if (skipFiles.includes(file)) {
      continue;
    }

    const srcFile = path.resolve(src, file);
    const distFile = renameFiles[file]
      ? path.resolve(dist, renameFiles[file])
      : path.resolve(dist, file);
    const stat = fs.statSync(srcFile);

    if (stat.isDirectory()) {
      copyFolder(srcFile, distFile, version);
    } else {
      fs.copyFileSync(srcFile, distFile);

      if (file === 'package.json') {
        updatePackageJson(distFile, version, name);
      }
    }
  }
}
