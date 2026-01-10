import path from "path";
import type {Plugin} from "esbuild";
import chokidar, {type FSWatcher} from "chokidar";

interface WatchPluginOptions {
  onChange?: (path: string) => void;
}

// async function changeEvents(eventName: string, filePath: string) {
//   console.log("Detected a change", eventName, filePath);
//   if (buildHandle) {
//     await watcher.close();
//     setTimeout(() => {
//       watcher = chokidar.watch([path.resolve(input)]);
//       watcher.on("change", changeEvents);
//       console.log("rebuilding", watcher.getWatched());
//       buildHandle && buildHandle.rebuild();
//     }, 1000);
//   }
// }

function registerWatcherEvents(
  watcher: FSWatcher,
  entryFile: string,
  options: WatchPluginOptions
) {
  const {onChange} = options;

  watcher.on("change", async (changedFilePath) => {
    // A file was changed, rebuild the watch list
    Object.entries(watcher.getWatched()).forEach(([basePath, files]) =>
      files.forEach((file) => watcher.unwatch(path.resolve(basePath, file)))
    );

    watcher.add(entryFile);
    onChange?.(changedFilePath);
  });
}
export function watchPlugin(
  input: string,
  options: WatchPluginOptions = {}
): Plugin {
  return {
    name: "watcher",
    setup(build) {
      const entryFile = path.resolve(input);
      let watcher = chokidar.watch(entryFile);
      registerWatcherEvents(watcher, entryFile, options);

      build.onResolve({filter: /.*/}, (args) => {
        const filePath = path.resolve(`${args.path}.js`);
        watcher.add(filePath);
        console.log("onResolve", args.path);
        return null;
      });
    }
  };
}
