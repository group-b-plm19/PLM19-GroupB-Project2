
// const fs = require('fs');

const kbd = require('kbd');

export class IO {
	read() {
		return kbd.getLineSync();
	}

	input(file?) {
		//set global file pointer
		//from path `file` or stdin

		//as far as I know no files are used. just stdin/stdout
	}

	write(msg) {
		process.stdout.write(msg);
	}

	close() {
		//presumably close the global file pointer
	}
}