$(document).ready(function(){
	console.log('Ready');
	init();
});
$(document).bind('pageinit',function(event,data){
	console.log('Page init');
	return false;
});

var onUserNavigate = function(message,isBack){
	console.log('onUserNavigate');
	//sendMessage(message);
	//var p='#page_'+message;
	var m='';
	if(isBack===true){
		//$.mobile.changePage(p,{ transition: "flow", reverse: true, changeHash: true, reloadPage :false });
		m='p,'+message+',1';
	}else{
		//$.mobile.changePage(p,{ transition: "flow", reverse: false, changeHash: true, reloadPage :false });
		m='p,'+message+',0';
	}
	sendMessage(m);
};

var sendChatMessage = function(num){
	//console.log('sendChatMessage');
	var className = ".outgoing_"+num;
	var message = $(className).val();
	console.log('sendChatMessage:'+message);
	var m='chatM,'+message;
	//console.log(m);
	sendMessage(m);
	$(className).val("");
};


