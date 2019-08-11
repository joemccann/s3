const test = require('tape')
const S3 = require('../index')
let s3 = null

test('sanity', t => {
  t.ok(true)
  t.end()
})

const clean = async () => {
  // TODO: DELETE FILE
  process.exit(0)
}

//
// Delete the test table on failure and finish.
//
test.onFailure(clean)
test.onFinish(clean)

test('setup', async t => {
  s3 = new S3({ bucket: 'pro.cryptdex.trade/public' })
  t.ok(s3.s3, 'Verify the s3 object.')
  t.end()
})

test('passing put', async t => {
  const key = `test-file.json`
  const value = { name: 'foo', more: [1, 2, 3] }

  const args = { key, value }

  const { err, data } = await s3.put(args)

  t.ok(!err, err && err.message)
  t.ok(data.ETag)
  t.end()
})

test('failing put - no key', async t => {
  const key = ``
  const value = { name: 'foo', more: [1, 2, 3] }

  const args = { key, value }

  const { err, data } = await s3.put(args)

  t.ok(!data)
  t.ok(err.message, `No key to put.`)
  t.end()
})

test('failing put - no value', async t => {
  const key = `foo`

  const args = { key, value: null }

  const { err, data } = await s3.put(args)

  t.ok(!data)
  t.ok(err.message, `No value to put.`)
  t.end()
})

test('passing get', async t => {
  const key = `test-file.json`

  const args = { key }

  const { err, data } = await s3.get(args)

  t.ok(!err, err && err.message)
  t.deepEquals(data, JSON.stringify({ name: 'foo', more: [1, 2, 3] }))
  t.end()
})

test('failing get - no key', async t => {
  const args = { key: '' }

  const { err, data } = await s3.get(args)

  t.ok(!data)
  t.ok(err.message, `No key to get.`)
  t.end()
})

test('passing del', async t => {
  const key = `test-file.json`

  const args = { key }

  const { err, data } = await s3.del(args)

  t.ok(!err, err && err.message)
  t.ok(data)
  t.deepEquals(data, {})
  t.end()
})

test('failing del - no key', async t => {
  const args = { key: '' }

  const { err, data } = await s3.del(args)

  t.ok(!data)
  t.ok(err.message, `No key to delete.`)
  t.end()
})
