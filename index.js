var steem = require('steem');

function updateSteemArticles(username) {
  steem.api.getDiscussionsByBlog({limit:100, tag:username}, function(err, result) {
    for (var i = 0; i < result.length; i++) {
      var tags = JSON.parse(result[i].json_metadata).tags
      hexo.post.create({
        title: result[i].title,
        _content: result[i].body,
        slug: result[i].permlink,
        date: result[i].created,
        tags: tags,
        author: result[i].author
      }, true)
    }
  });
}



if (hexo.config.steem_users) {
  for (var i = 0; i < hexo.config.steem_users.length; i++) {
    updateSteemArticles(hexo.config.steem_users[i])
  }
} else {
  console.log('No steem usernames found, please add to the _config.yml')
}
