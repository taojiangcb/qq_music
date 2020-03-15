/**
* name 
*/
export class StringUtil {
	constructor() {

	}


	static pad(num: number, n: number): string {
		var nlen: number = num.toString().length;
		var nums = Array(n > nlen ? (n - nlen + 1) : 0);
		return nums.join("0") + num;
	}

	/* @language zh_cn
	 * 格式化字符串函数
	 * @format 字符串的格式 例如:hellow {0} good moring
	 * @args 对应{0} {1}...的填充参数
	 * @version 1.0
	 * @platform web native pc
	 */
	static formatString(format: string, ...args): string {
		format = StringUtil.replace(format, "\\n", "\n");
		var len: number = args.length;
		for (var i = 0; i < len; i++) {
			format = StringUtil.replace(format, "{" + i + "}", "" + args[i]);
		}
		return format;
	}

	public static padLeft(p_string: string, p_padChar: string, p_length: number): string {
		var s: string = p_string;
		while (s.length < p_length) { s = p_padChar + s; }
		return s;
	}
	/**
	 * replace(xx{i}x{2}, "{i}", xxx);
	 * @param input
	 * @param replace
	 * @param replaceWith
	 */
	static replace(input: string, replace: string, replaceWith: string): string {

		if (input == null) return "";
		if (replace == null) return "";
		if (replaceWith == null) return "";

		//change to StringBuilder
		var sb: string = "";
		var found: boolean = false;

		var sLen: number = input.length;
		var rLen: number = replace.length;

		for (var i = 0; i < sLen; i++) {
			if (input.charAt(i) == replace.charAt(0)) {
				found = true;
				for (var j = 0; j < rLen; j++) {
					if (!(input.charAt(i + j) == replace.charAt(j))) {
						found = false;
						break;
					}
				}

				if (found) {
					sb += replaceWith;
					i = i + (rLen - 1);
					continue;
				}
			}
			sb += input.charAt(i);
		}
		return sb;
	}

	static cutName(name: string, def: number = 6) {
		if (name.length <= def) return name;
		let temp = '';
		let total = def * 2;
		let crt = 0;
		let pattern = new RegExp("[A-Za-z0-9]+");
		for (let i = 0; i < name.length; i++) {
			if (crt >= total) { break; }
			let num = pattern.test(name.charAt(i)) ? 1 : 2;
			crt += num;
			temp += name.charAt(i);
		}
		return temp;
	}
}