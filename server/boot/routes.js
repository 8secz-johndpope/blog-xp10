/**
* This boot script defines custom Express routes not tied to models
**/

module.exports = function(app) {

  var Post = app.models.Post;

  /**
  * Defines a routes so that blogs are accessible by user
  * and slug: /jeffdonthemic/hello-world instead of id.
  **/
  app.get('/post/:slug', function(req, res) {
    Post.findOne({ where: {slug:req.params.slug}, include: 'comments'}, function(err, record){
      if (err) res.send(err);
      if (!err && record) {
        res.send(record);
      } else {
        res.send(404);
      }
    });
  });

}
