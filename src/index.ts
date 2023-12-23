import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'node:url'
import { consola as logger } from 'consola';
import { text, select, isCancel, cancel, note, outro } from '@clack/prompts';
import { pkgFromUserAgent, formatTargetDir, copyFolder } from './util';

const require = createRequire(import.meta.url);

function checkCancel(value: unknown) {
  if (isCancel(value)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }
}

async function main() {
  logger.info('\nAgo template start creating.');

  const cwd = process.cwd();
  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm';
  const packageRoot = path.resolve(
    fileURLToPath(import.meta.url),
    '../..'
  );

  const packageJsonPath = path.join(packageRoot, 'package.json');
  const { version } = require(packageJsonPath);

  let targetDir = (await text({
    message: 'Input target folder',
    placeholder: 'my-project',
    validate(value) {
      if (value.length === 0) {
        return `Target folder is required`;
      }
      if (fs.existsSync(path.join(cwd, value))) {
        return `"${value}" is not empty, please input another folder`;
      }
    },
  })) as string;

  checkCancel(targetDir);

  targetDir = formatTargetDir(targetDir);

  const framework = (await select({
    message: 'Select framework',
    options: [
      { value: 'react-vite', label: 'React-Vite-Mobx' },
    ],
  })) as string;

  checkCancel(framework);

  const srcFolder = path.resolve(packageRoot, `template/${framework}`);
  const commonFolder = path.join(packageRoot, `template/common`);
  const distFolder = path.join(cwd, targetDir);

  copyFolder(commonFolder, distFolder, version);
  copyFolder(srcFolder, distFolder, version, path.basename(targetDir));

  const nextSteps = [
    `cd ${targetDir}`,
    `${pkgManager} i`,
    `${pkgManager} run dev`,
  ];

  note(nextSteps.join('\n'), 'Next steps');

  outro('Done.');
}

main();