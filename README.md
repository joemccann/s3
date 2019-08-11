# SYNOPSIS

🏗 ️An opinionated, async/await AWS S3 client, primarily for CRUD operations against JSON or text files (binary formats not supported).

## USAGE

```sh
npm i -S joemccann/s3
```

In your Node.js app:

```js
const S3 = require('s3')

const options = {
  bucket: 'my-test-bucket'
}

const s3 = new S3(options)

;(async () => {

  const key = `test-file.json`
  const value = { name: 'foo', more: [1, 2, 3] }
  const args = { key, value }
  const { err, data } = await s3.put(args)
  if(err) console.error(err)
  console.log(data) // ETag value

})()

```

## API

```js
//
// Put an object
// Returns an err or the ETag value of the object
//
const key = `test-file.json`
const value = { name: 'foo', more: [1, 2, 3] }
const args = { key, value }
const { err, data } = await s3.put(args)

//
// Get an object
// Returns an err or the stringified value of the object
//
const key = `test-file.json`
const args = { key }
const { err, data } = await s3.get(args)

//
// Deletes an object
// Returns an err or {}
//
const key = `test-file.json`
const args = { key }
const { err, data } = await s3.del(args)
```

## TESTS

```sh
npm i -D
npm test
```

> NOTE: This S3 client doesn't explicitly pass your AWS configuration profile; it assumes it is in your `~/.aws/` directory.  You can pass it as an option in the constructor.

## AUTHORS

- [Joe McCann](https://twitter.com/joemccann)

## LICENSE

MIT
