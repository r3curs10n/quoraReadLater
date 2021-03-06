$(document).ready( function() {

	var items = $(".feed_item");
	$(items).addClass("rl_added");
	var i=0;
	for (i=0; i<items.length; i++){
		addReadLaterButton(items[i]);
	}
	

	var items = $(".answer_border:not(.rl_added)");
	$(items).addClass("rl_added");
	var i=0;
	for (i=0; i<items.length; i++){
		addReadLaterButton(items[i]);
	}
	
	//Caution: Possible infinite recursion
	//Modifying inserted element will trigger another inserted event for the same element => fall into infinite recursion
	//Solution: Add 'rl_added' class before modifying, and use filter 'NOT rl_added' for inserted event
	$(".main").on("DOMNodeInserted", ".feed_item:not(.rl_added)", function(){
		addReadLaterButton(this);
	});
	
	$(".main").on("DOMNodeInserted", ".answer_border:not(.rl_added)", function(){
		addReadLaterButton(this);
	});
	
	function addReadLaterButton(ele){
		var link = $(ele).find(".item_action_bar").find(".answer_permalink").attr("href");
		if (link == null){
			link = $(ele).find(".board_item_title").find("a").attr("href");
			if (link == null) return;
		}
		var tit = $(ele).find(".board_item_title").find("a").text();
		link = "<span class='bullet'> • </span><span><a href='#' title='" + tit + "' hreff='" + link + "' class='r_later share_link' >Read Later</a></span>"
		$(ele).addClass("rl_added");
		$(ele).find(".item_action_bar").append(link);
	}
	
	$(".main").on("click", ".r_later", function(event) {
		console.log('sdfsdf');
		var kv = $(this).attr('hreff');
		var tit = $(this).attr('title');
		var mobj = {};
		var vals = {};
		vals['title'] = tit;
		vals['value'] = kv;
		mobj[kv]=vals;
		chrome.storage.sync.set(mobj);
		$(this).text("Added to Reading List");
		$(this).removeClass("share_link");
		return false;
	});
	
	//For ask to answer
	$(".pager_next_link").after("<span class='bullet'> • </span><a href='#' class='mmore'>Many More</a>");
	$(".mmore").on("click", function(){
		$(".pager_next_link").trigger("click");
		$(".pager_next_link").trigger("click");
		$(".pager_next_link").trigger("click");
		$(".pager_next_link").trigger("click");
	});
	
});



