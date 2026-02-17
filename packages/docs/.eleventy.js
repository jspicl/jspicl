const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (config) {
  config.addPlugin(syntaxHighlight, {
    init: ({Prism}) => {
      Prism.languages["bash-with-tab"] = {
        ...Prism.languages.bash,
        function: /jspicl(-cli)?/g
      };

      Prism.languages["js-with-tab"] = Prism.languages.js;
    }
  });

  // Passthrough copy for assets (CSS, images, JS)
  config.addPassthroughCopy("assets");

  // Filter to strip HTML and create search excerpts
  config.addFilter("stripHtml", function (content) {
    if (!content) return "";
    return content
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  });

  // Escape quotes for JSON embedding
  config.addFilter("escapeQuotes", function (str) {
    if (!str) return "";
    return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ");
  });

  config.addCollection("sortedPosts", function (collection) {
    return collection.getFilteredByGlob("**/*.md").sort(function (a, b) {
      const nameA = a.data.sort;
      const nameB = b.data.sort;

      return String(nameA).localeCompare(nameB);
    });
  });
};
