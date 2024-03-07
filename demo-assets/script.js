// Runs the encoding/decoding function
let generate = () => {

	let msg = document.getElementById('message').value;
	let key = document.getElementById('key').value;

	// If key length is longer than the message, concat the key
	if (msg.length < key.length) {
		key = key.substring(0, msg.length);
		document.getElementById('key').value = key;
	}

	// If the key length is shorter than the message,
	// generate a new key
	if (msg.length != key.length) {
		key = OneTimePad.generateKey(msg.length);
		document.getElementById('key').value = key;
	}

	// Clean up display
	document.getElementById('message').value = msg.toUpperCase();
	document.getElementById('key').value = key.toUpperCase();

	let cipher = OneTimePad.encode(key, msg);

	if (cipher != false) {
		document.getElementById('cipher').value = cipher;
	}

};
