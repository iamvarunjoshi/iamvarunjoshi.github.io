
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    // load streetview
   // var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
   // $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    // load nytimes
	var nytimesUrl='https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=ZmcxDm22TYVBaqbmtATGf9AbfNhflQuS'
	$.getJSON(nytimesUrl, function( data ) {
		$nytHeaderElem.text('New York Times Articles About ' + cityStr);
		
		
		articles=data.response.docs;
		
		for(var i=0;i<articles.length;i++){
			var article = articles[i];
			$nytElem.append('<li class="article">'+
			'<a href="'+ article.web_url+'">'+article.headline.main+'</a>'+
			'<p>' + article.snippet + '</p>' +
			'</li>');
		};
		}).error(function(e){
			$nytHeaderElem.text(' New York Times Articles Could Not be Loaded ');
		});
		
		//Wikipedia Requests
	    // load wikipedia data
			var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';
			var wikiRequestTimeout = setTimeout(function(){
				$wikiElem.text("failed to get wikipedia resources");
			}, 8000);

			$.ajax({
				url: wikiUrl,
				dataType: "jsonp",
				//jsonp: "callback",
				success: function( response ) {
					var articleList = response[1];

					for (var i = 0; i < articleList.length; i++) {
						articleStr = articleList[i];
						var url = 'https://en.wikipedia.org/wiki/' + articleStr;
						$wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
					};
					//error handling is not available in jsonp
					//we use set timeout request if we can don't get info within 8 sec then it will show that data's not available.
					clearTimeout(wikiRequestTimeout);
				}
			});
    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);
//24 willie mays plaza
//san francisco, ca
// key: ZmcxDm22TYVBaqbmtATGf9AbfNhflQuS
