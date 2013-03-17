$(document).ready( function() {
	//console.log("add");
	
	updateList();
	
	function updateList(){
	chrome.storage.sync.get( null, function (items){
		console.log(items);
		$(".lst").html("");
		var i=0;
		for (var k in items){
			//console.log(items[k]['title'] + 'aa');
			var lin; var tit;
			if (items[k].value.indexOf("http") == 0){
				lin = items[k]['value'];
				tit = items[k]['value'].replace(/\-/g, " ").split("://")[1].split("/")[1];
				
			} else {
				lin = "http://www.quora.com" + items[k]['value'];
				tit = items[k]['value'].replace(/\-/g, " ").split("/");
				if (tit[2].indexOf('answer')==0){
					tit = tit[1] + "?";
				} else {
					tit = tit[2] + "?";
				}
			}
			if (items[k]['title'] != '') tit = items[k]['title'];
			$(".lst").append("<a target='_blank' class='oplink' key='" + k + "' href='" + lin + "'><li>" + tit + "</li></a>");
			i++;
		}
		if (i==0) $(".lst").html("<li>Reading List is empty!</li>");
		
		$('.oplink').click( function() {
			chrome.storage.sync.remove($(this).attr("key"));
			//return false;
		});
	});
	}
	
	$(".clr").click(function(){
		chrome.storage.sync.clear();
		updateList();
	});
	
	
});
