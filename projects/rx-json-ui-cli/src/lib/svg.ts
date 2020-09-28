/*!
 * Copyright (c) 2020 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';
import * as resolvepkg from 'resolve-package-path';
import * as rm from 'rimraf';
import * as svgSprite from 'svg-sprite';
import * as vinyl from 'vinyl';

interface SvgOptions {
  icons: string;
  remove: boolean;
}

interface IconsYaml {
  namespace?: string;
  keepClassName?: boolean;
  source?: string;
  icons?: string[];
}
export function svgGenerate(outPath: string, opts: SvgOptions): void {
  const iconsets: {
    [namespace: string]: { icons: vinyl.BufferFile[]; keepClassName?: boolean };
  } = {};
  let icons: IconsYaml[];

  try {
    const src = fs.readFileSync(path.resolve(opts.icons)).toString();
    icons = yaml.safeLoadAll(src);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }

  // consolidate namespace info
  for (const def of icons) {
    const ns = def.namespace || 'default';
    const set = iconsets[ns] || (iconsets[ns] = { icons: [] });
    set.keepClassName = def.keepClassName;
    let source: string;

    if (def.source) source = path.resolve(def.source);
    else {
      const pkg = resolvepkg.default('@mdi/svg', __dirname);
      if (pkg === null) {
        console.error('Could not find @mdi/svg package');
        process.exit(1);
      }
      source = `${path.dirname(pkg)}/svg`;
    }
    if (Array.isArray(def.icons))
      for (const icon of def.icons) {
        try {
          const file = new vinyl.default({
            path: path.resolve(source, icon),
            base: source,
            contents: fs.readFileSync(
              path.resolve(source, path.extname(icon) ? icon : `${icon}.svg`)
            ),
          });
          if (file) set.icons.push(file);
        } catch (e) {
          console.error(e.message);
          process.exit(1);
        }
      }
  }

  // generate sprites

  for (const ns in iconsets) {
    // tslint:disable-line: forin

    const set = iconsets[ns];
    const spriter = new svgSprite.default({
      dest: path.resolve(outPath),
      shape: {
        transform: [
          {
            svgo: {
              plugins: [{ removeXMLNS: true }, { removeUnusedNS: true }],
            },
          },
        ],
      },
      svg: {
        xmlDeclaration: false,
        doctypeDeclaration: false,
        namespaceClassnames: !set.keepClassName,
      },
      mode: { defs: true },
    });

    for (const icon of set.icons) spriter.add(icon);

    if (opts.remove && fs.existsSync(outPath)) rm.sync(outPath);
    if (!fs.existsSync(outPath)) fs.mkdirSync(outPath, { recursive: true });

    let num = 0;

    spriter.compile((e, result) => {
      try {
        if (e) throw e;
        for (const type in result.defs) {
          // tslint:disable-line: forin

          fs.writeFileSync(path.resolve(outPath, `${ns}.svg`), result.defs[type].contents, {
            encoding: 'utf8',
            flag: 'w',
          });
          num++;
        }
      } catch (e) {
        console.error(e.message);
        process.exit(1);
      }

      console.log(`${num} svg sprite files generated.\n`);
    });
  }
}
