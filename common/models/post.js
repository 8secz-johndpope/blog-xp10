var loopback = require('loopback');
var slugify = require('slugify');

module.exports = function(Post) {

  // Register a 'publish' remote method: /Posts/some-id/publish
  Post.remoteMethod(
    'publish',
    {
      http: {path: '/:id/publish', verb: 'put'},
      accepts: {arg: 'id', type: 'string', required: true, http: { source: 'path' }},
      returns: {root: true, type: 'object'},
      description: 'Marks a Post as published.'
    }
  );

  // the actual function called by the route to do the work
  Post.publish = function(id, cb) {
    Post.findById(id, function(err, record){
      record.updateAttributes({isPublished: true, publishedDate: new Date()}, function(err, instance) {
        if (err) cb(err);
        if (!err) cb(null, instance);
      })
    })
  };
  // PUBLISH

  // Register an 'upvote' remote method: /Posts/some-id/upvote
  Post.remoteMethod(
    'upvote',
    {
      http: {path: '/:id/upvote', verb: 'post'},
      accepts: {arg: 'id', type: 'string', required: true, http: { source: 'path' }},
      returns: {root: true, type: 'object'},
      description: 'Marks a Post as upvoted.'
    }
  );

  // Remote hook called before running function
  Post.beforeRemote('upvote', function(ctx, user, next) {
    Post.findById(ctx.req.params.id, function(err, record){
      // do not let the user upvote their own record
      if (record.authorId === ctx.req.accessToken.userId) {
        var err = new Error("User cannot upvote their own Post post.");
        err.status = 403;
        next(err);
      // do no let the user upvote a comment more than once
      } else if (record.upvotes.indexOf(ctx.req.accessToken.userId) != -1) {
        var err = new Error("User has already upvoted the Post.");
        err.status = 403;
        next(err);
      } else {
        next();
      }
    })
  });

  // the actual function called by the route to do the work
  Post.upvote = function(id, cb) {
    // get the current context
    var ctx = loopback.getCurrentContext();
    Post.findById(id, function(err, record){
      // get the calling user who 'upvoted' it from the context
      record.upvotes.push(ctx.active.accessToken.userId);
      record.updateAttributes({numOfUpVotes: record.upvotes.length, upvotes: record.upvotes}, function(err, instance) {
        if (err) cb(err);
        if (!err) cb(null, instance);
      })
    })
  };
  // UPVOTE

  // Register a 'downvote' remote method: /Posts/some-id/downvote
  // Note: essentially the same code as upvote
  Post.remoteMethod(
    'downvote',
    {
      http: {path: '/:id/downvote', verb: 'post'},
      accepts: {arg: 'id', type: 'string', required: true, http: { source: 'path' }},
      returns: {root: true, type: 'object'},
      description: 'Marks a Post as downvoted.'
    }
  );

  // Remote hook called before running function
  Post.beforeRemote('downvote', function(ctx, user, next) {
    Post.findById(ctx.req.params.id, function(err, record){
      // do not let the user downvote their own record
      if (record.authorId === ctx.req.accessToken.userId) {
        var err = new Error("User cannot downvote their own Post post.");
        err.status = 403;
        next(err);
      // do no let the user downvote a comment more than once
      } else if (record.downvotes.indexOf(ctx.req.accessToken.userId) != -1) {
        var err = new Error("User has already downvoted the Post.");
        err.status = 403;
        next(err);
      } else {
        next();
      }
    })
  });

  // the actual function called by the route to do the work
  Post.downvote = function(id, cb) {
    // get the current context
    var ctx = loopback.getCurrentContext();
    Post.findById(id, function(err, record){
      // get the calling user who 'downvoted' it from the context
      record.downvotes.push(ctx.active.accessToken.userId);
      record.updateAttributes({numOfDownVotes: record.downvotes.length, downvote: record.downvotes}, function(err, instance) {
        if (err) cb(err);
        if (!err) cb(null, instance);
      })
    })
  };
  // DOWNVOTE

  // Call an operation hook that runs before each record is saved
  Post.observe('before save', function filterProperties(ctx, next) {
    // TODO ensure the slug is unique per user
    // If there is a record in the context
    if (ctx.instance) {
      // slugify the title
      if (ctx.instance.slug === undefined) {
        ctx.instance.slug = slugify(ctx.instance.title).toLowerCase();
      }
      // Ensure a valid createdDate
      if (ctx.instance.createdDate === undefined) {
        ctx.instance.createdDate = new Date();
      }
      // Ensure the lines, dislikes and tags are an empty array
      if (ctx.instance.upvotes === undefined) ctx.instance.upvotes = [];
      if (ctx.instance.downvotes === undefined) ctx.instance.downvotes = [];
      if (ctx.instance.tags === undefined) ctx.instance.tags = [];
    }
    next();
  });

};