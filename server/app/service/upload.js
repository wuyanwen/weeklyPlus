import qn from 'qn'
const config1 = require('../../config.js')
const client = qn.create({
  accessKey: config1.config.qn_accessKey,
  secretKey: config1.config.qn_secretKey,
  bucket: config1.config.bucket,
  domain: config1.config.domain
})
export default client
