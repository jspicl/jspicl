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
  config.addPassthroughCopy("assets");
  config.addCollection("sortedPosts", function (collection) {
    return collection.getFilteredByGlob("**/*.md").sort(function (a, b) {
      const nameA = a.data.sort;
      const nameB = b.data.sort;

      return String(nameA).localeCompare(nameB);
    });
  });
};
