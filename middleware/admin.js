module.exports = function(req, res, next){
  if(!req.user.isAdmin) return res.status(403).send('Access denied')
  // 403 is forbidden 
  next()
}
