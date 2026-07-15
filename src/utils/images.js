const modules04 = import.meta.glob(
  '../assets/images/uploads-2026-04/*.{png,jpg,jpeg,webp}',
  { eager: true, import: 'default' }
);
const modules05 = import.meta.glob(
  '../assets/images/uploads-2026-05/*.{png,jpg,jpeg,webp}',
  { eager: true, import: 'default' }
);
const modules = { ...modules04, ...modules05 };

const byName = {};
for (const path in modules) {
  const filename = path.split('/').pop();
  byName[filename] = modules[path];
}

export function img(filename) {
  const resolved = byName[filename];
  if (!resolved) {
    throw new Error(`Image not found in assets: ${filename}`);
  }
  return resolved;
}

export function imgs(filenames) {
  return filenames.map(img);
}
