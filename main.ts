import { walk, ensureDir } from "@std/fs";
import { join, relative, toFileUrl } from "@std/path";

const current_dir = Deno.cwd();
const template_dir = new URL("./template", import.meta.url).pathname;
for await (const entry of walk(template_dir)) {
  const path = toFileUrl(join(current_dir, relative(template_dir, entry.path)));
  if(entry.isDirectory) {
    await ensureDir(path);
    continue;
  };
  await Deno.copyFile(entry.path, path)
};

for await (const entry of walk(current_dir)) {
  if(entry.isDirectory) continue;
  if(entry.name == ".gitkeep") {
    await Deno.remove(entry.path)
  }
}