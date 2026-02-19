import path from "node:path";
import untildify from "untildify";

export function resolvePath(p: string) {
  return path.resolve(untildify(p));
}
