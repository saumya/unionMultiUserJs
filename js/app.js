
//==============================================================================
// VARIABLES
//==============================================================================
var orbiter;
var chatRoom;

//==============================================================================
// INITIALIZATION
//==============================================================================
function init () {
  console.log('init');
  // Create the Orbiter instance, used to connect to and communicate with Union,
  // then enable automatic reconnection (one attempt every 15 seconds)
  orbiter = new net.user1.orbiter.Orbiter();
  orbiter.getConnectionMonitor().setAutoReconnectFrequency(15000);
  orbiter.getLog().setLevel(net.user1.logger.Logger.DEBUG);
    
  // If required JavaScript capabilities are missing, abort
  if (!orbiter.getSystem().isJavaScriptCompatible()) {
    displayChatMessage("Your browser is not supported.");
    return;
  }
  
  // Register for Orbiter's connection events
  orbiter.addEventListener(net.user1.orbiter.OrbiterEvent.READY, readyListener, this);
  orbiter.addEventListener(net.user1.orbiter.OrbiterEvent.CLOSE, closeListener, this);
  
  //displayChatMessage("Connecting to Union...");
  displayChatMessage("Connecting ...");

  // Connect to Union Server
  orbiter.connect("tryunion.com", 80);
}

//==============================================================================
// ORBITER EVENT LISTENERS
//==============================================================================
// Triggered when the connection is ready
function readyListener (e) {
  displayChatMessage("Connected.");
  //displayChatMessage("Joining chat room...");
  displayChatMessage("Joining room...");
  
  // Create the chat room on the server
  chatRoom = orbiter.getRoomManager().createRoom("chatRoom_saumya");
  chatRoom.addEventListener(net.user1.orbiter.RoomEvent.JOIN, joinRoomListener);
  chatRoom.addEventListener(net.user1.orbiter.RoomEvent.ADD_OCCUPANT, addOccupantListener);
  chatRoom.addEventListener(net.user1.orbiter.RoomEvent.REMOVE_OCCUPANT, removeOccupantListener);  
  
  // Listen for chat messages
  chatRoom.addMessageListener("CHAT_MESSAGE", chatMessageListener);
  
  // Join the chat room
  chatRoom.join();
}

// Triggered when the connection is closed
function closeListener (e) {
  //displayChatMessage("Orbiter connection closed.");
  displayChatMessage("Connection Lost.");
}

//==============================================================================
// CHAT ROOM EVENT LISTENERS
//==============================================================================
// Triggered when the room is joined
function joinRoomListener (e) {
  displayChatMessage("Chat ready!");
  displayChatMessage("Number of people now online: " + chatRoom.getNumOccupants());
  displayChatMessage("Number of people now online: " + chatRoom.getNumOccupants());
}

// Triggered when another client joins the chat room
function addOccupantListener (e) {
  if (chatRoom.getSyncState() != net.user1.orbiter.SynchronizationState.SYNCHRONIZING) { 
    /*
    displayChatMessage("User" + e.getClientID() + " joined the chat."
                       + " People chatting: " + chatRoom.getNumOccupants());
    */
    displayChatMessage("Number of people now online: " + chatRoom.getNumOccupants());
  }
}
  
// Triggered when another client leaves the chat room
function removeOccupantListener (e) {
  /*
  displayChatMessage("User" + e.getClientID() + " left the chat."
                     + " People chatting: " + chatRoom.getNumOccupants());
  */
  displayChatMessage("Number of people now online: " + chatRoom.getNumOccupants());
}
  
//==============================================================================
// CHAT SENDING AND RECEIVING
//==============================================================================
// Sends a chat message to everyone in the chat room
function sendMessage (msg) {
  /*
  var outgoing = document.getElementById("outgoing");
  if (outgoing.value.length > 0) {
    chatRoom.sendMessage("CHAT_MESSAGE", "true", null, outgoing.value);
     outgoing.value = "";
    // Focus text field again after submission (required for IE8 only)
    setTimeout(function () {outgoing.focus();}, 10);
  }
  */
  chatRoom.sendMessage("CHAT_MESSAGE", "true", null, msg);
}

// Triggered when a chat message is received
function chatMessageListener (fromClient, message) {
  //displayChatMessage("User" + fromClient.getClientID() + ": " + message);
  //Some string HACK
  console.log(message);
  var messageArray = message.split(',');
  var msgType = messageArray[0];

  if(msgType==='p'){
    var pageNum = messageArray[1];
    var isBackNum = messageArray[2];
    var p='#page_'+pageNum;
    if(isBackNum==='1'){
      $.mobile.changePage(p,{ transition: "flow", reverse: true, changeHash: true, reloadPage :false });
    }else{
      $.mobile.changePage(p,{ transition: "flow", reverse: false, changeHash: true, reloadPage :false });
    };
  }else{
    var chatMsg = messageArray[1];
    $(".msgPane").html(chatMsg);
  }

  
}

// Displays a single chat message
function displayChatMessage (message) {
  //console.log('TODO: displayChatMessage : ');
  /*
  // Make the new chat message element
  var msg = document.createElement("span");
  msg.appendChild(document.createTextNode(message));
  msg.appendChild(document.createElement("br"));

  // Append the new message to the chat
  var chatPane = document.getElementById("chatPane");
  chatPane.appendChild(msg);
  
  // Trim the chat to 500 messages
  if (chatPane.childNodes.length > 500) {
    chatPane.removeChild(chatPane.firstChild);
  }
  chatPane.scrollTop = chatPane.scrollHeight;
  */
  $(".chatPane").html(message);
}