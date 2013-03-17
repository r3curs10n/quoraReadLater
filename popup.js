//I have to add this file as the new policy in chrome extensions, inline javascript cannot be executed

window.addEventListener("load", function()
{

  document.getElementById("search")
          .addEventListener("click", send_url, false);
}, false);


function send_url() {   
 var url = "http://oxforddictionaries.com/definition/english/"+form.query.value+"?q="+form.query.value;
	//	var url = "http://csea.iitg.ernet.in/search.php?query="+form.query.value+"&search=1";
		window.open(url, '_blank'); 
		return false;
}
