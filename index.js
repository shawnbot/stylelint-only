const anymatch = require('anymatch')
const printConfig = require('stylelint/lib/printConfig')

module.exports = function stylelintOnly(rules, options = {files: '.'}) {
  return printConfig(options).then(config => {
    const matchesRule = anymatch(rules)
    for (const rule of Object.keys(config.rules)) {
      if (!matchesRule(rule)) {
        delete config.rules[rule]
      }
    }
    return config
  })
}
