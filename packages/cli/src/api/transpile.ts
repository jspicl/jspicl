// import {jspicl} from "@jspicl/jspicl";
// import {banner} from "./constants";

// export function transpile(javascriptCode: string, options) {
//   const {
//     includeBanner,
//     polyfillTransform,
//     jspicl: jspiclOptions = {}
//   } = options;

//   const jspiclBanner = (includeBanner && `${banner}`) || "";

//   const {code, polyfills} = jspicl(javascriptCode, jspiclOptions);
//   const polyfillOutput = polyfillTransform
//     ? polyfillTransform(polyfills)
//     : Object.values(polyfills).join("\n");

//   const lua = `${polyfillOutput}${code}`;

//   return {
//     lua,
//     polyfillOutput,
//     toString() {
//       return `${jspiclBanner}${lua}`;
//     }
//   };
// }
