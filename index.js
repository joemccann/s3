const AWS = require('aws-sdk')

class S3 {
  constructor (args) {
    this.opts = args || {}
    this.s3 = new AWS.S3(this.opts.s3)
    this.bucket = this.opts.bucket || 'public'
  }

  async get (body) {
    const {
      key: Key
    } = body

    if (!Key) return { err: new Error('No key to get.') }

    const params = {
      Bucket: this.bucket,
      Key
    }

    try {
      const { Body } = await this.s3.getObject(params).promise()
      return { data: Body.toString('utf-8') }
    } catch (err) {
      return { err }
    }
  }

  async put (body) {
    const {
      key: Key,
      value,
      ACL = 'public-read'
    } = body

    if (!Key) return { err: new Error('No key to put.') }
    if (!value) return { err: new Error('No value to put.') }

    let Body = null
    let data = null

    try {
      Body = JSON.stringify(value)
    } catch (err) {
      return { err }
    }

    const params = {
      Bucket: this.bucket,
      Key,
      Body,
      ACL
    }

    try {
      data = await this.s3.putObject(params).promise()
      return { data }
    } catch (err) {
      return { err }
    }
  }

  async del (body) {
    const {
      key: Key
    } = body

    if (!Key) return { err: new Error('No key to delete.') }

    const params = {
      Bucket: this.bucket,
      Key
    }

    let data = null

    try {
      data = await this.s3.deleteObject(params).promise()
      return { data }
    } catch (err) {
      return { err }
    }
  }
}

module.exports = S3
