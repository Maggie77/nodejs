var express = require('express');
var app = express();
var superagent = require('superagent');
var cheerio = require('cheerio');

app.get('/',function(req,res,next){
  superagent.get('https://cnodejs.org/')
  .end(function(err,sres){
  	if(err){
  		return next(err);
  	}

  	var $ = cheerio.load(sres.text);
  	var items = [];
  	$('#topic_list .topic_title').each(function(idx,ele){
  		var $ele = $(ele);
  		items.push({
  			title:$ele.attr('title'),
  			href:$ele.attr('href')
  		})
  	});
  	res.send(items)
  })
});

app.listen(8080, function (req, res) {
  console.log('app is running at port 3000');
});