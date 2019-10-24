#!/usr/bin/env node
const minimist = require('minimist')
const stylelintOnly = require('.')
const tempfile = require('tempfile')
const {spawnSync} = require('child_process')
const {writeFileSync} = require('fs')

const options = minimist(process.argv.slice(2), {
  '--': true,
  default: {
    files: '.'
  }
})

const rules = options._
const restArgs = options['--']

stylelintOnly(rules, options).then(config => {
  const path = options.o || tempfile('.json')
  writeFileSync(path, JSON.stringify(config, null, 2), 'utf8')
  const args = ['stylelint', '--config', path, ...restArgs]
  const {status} = spawnSync('npx', args, {stdio: 'inherit'})
  process.exit(status)
})
