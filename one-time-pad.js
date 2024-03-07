/**
 * Simulation of a one-time pad
 *
 * Key generation uses Math.random, which is seeded with current time
 * and is not actually uniformly random
 **/

class OneTimePad {

	/**
	 * A 5-bit mapping from values to characters
	 * 
	 * Since we are encoding in a 5-bit space and the alphabet only
	 * has 26 characters, we have to support 6 additional characters
	 */
	static valueToChar = {
		0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H',
		8: 'I', 9: 'J', 10: 'K', 11: 'L', 12: 'M', 13: 'N', 14: 'O',
		15: 'P', 16: 'Q', 17: 'R', 18: 'S', 19: 'T', 20: 'U', 21: 'V',
		22: 'W', 23: 'X', 24: 'Y', 25: 'Z', 26: '.', 27: ' ', 28: ',',
		29: '\'', 30: '-', 31: '?'
	};

	/**
	 * A 5-bit mapping from characters to values
	 */
	static charToValue = {
		'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7,
		'I': 8, 'J': 9, 'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14,
		'P': 15, 'Q': 16, 'R': 17, 'S': 18, 'T': 19, 'U': 20, 'V': 21,
		'W': 22, 'X': 23, 'Y': 24, 'Z': 25, '.': 26, ' ': 27, ',': 28,
		'\'': 29, '-': 30, '?': 31
	};

	/** 
	 * Generate a key of given length using Math.random
	 * 
	 * @param keyLength a number
	 * @returns a string key
	 */
	static generateKey(keyLength) {
		let key = '';
		for (let i = 0; i < keyLength; i++) {
			// Add a random char A-Z
			key = key.concat(
					this.valueToChar[Math.floor(Math.random() * 32)]);
		}
		return key;
	}

	/** 
	 * Encrypt a message by xoring it with the key
	 * 
	 * @param {string} key
	 * @param {string} message of same length as key
	 * @returns an encoded string or false on failure
	 */
	static encode(key, message) {

		if(key.length != message.length) return false;

		// Ensure that both inputs are all uppercase before we match them
		message = message.toUpperCase();
		key = key.toUpperCase();

		let cipher = '';
		for(var i = 0; i < message.length; i++) {
			let messageCharValue = this.charToValue[message.charAt(i)];
			let keyCharValue = this.charToValue[key.charAt(i)];

			// Error handling: if characters not supported, default to □
			if (typeof messageCharValue === 'undefined') {
				messageCharValue = 31;
			}

			if (typeof keyCharValue === 'undefined') {
				keyCharValue = 31;
			}

			// XOR each character together and build cipher
			let code = messageCharValue ^ keyCharValue;
			cipher = cipher.concat(this.valueToChar[code]);

		}
		return cipher;
	}

	/**
	 * Decoding is the same as encoding
	 */
	static decode(key, cipher) {
		this.encode(key, cipher);
	}
}