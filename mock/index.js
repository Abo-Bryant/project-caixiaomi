const Mock = require('mockjs')
var Random = Mock.Random
var data = Mock.mock({
  id: '@id()',
  username: '@cname()',
  image: '@Random.image()'

})
console.log(data);
// module.exports = function (app) {
//   app.use('api/userinfo', (req, res) => {
//     res.json(data)
//   })
// }