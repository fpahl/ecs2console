#!/usr/bin/env node

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

rl.on('line', function (line) {
  console.log(convert(line))
})

function convert (line) {
  try {
    const json = JSON.parse(line)

    const level = formatLevel(json.log.level)
    const timestamp = formatTimestamp(json['@timestamp'])
    const message = json.message

    return `${timestamp} - ${level}: ${message}`
  } catch (err) {
    return line
  }
}

function formatTimestamp (timestamp) {
  const date = timestamp.substring(0, 10)
  const time = timestamp.substring(11, 19)
  return `${date} ${time}`
}

function formatLevel (level) {
  let formatted = level.toUpperCase()
  formatted += '  '
  formatted = formatted.substring(0, 5)
  return formatted
}
