//import { dataMgr } from "../mgr/Mgr";
import { StringUtil as strUtil } from "./StringUtil";

/**
* name 
*/
export class TimeTools {
	constructor() {

	}

	/**
	 * 格式化时间
	 * @param time 时间（秒）
	 * @param style auto当时间不到h时，不出现h这段。h:m:s，不管是不是大于0都存在这个
	 */
	static format(time: number, style: "auto" | "h:m:s" = "auto"): string {
		var s = time % 60;
		time = Math.floor(time / 60);
		var m = time % 60;
		var h = Math.floor(time / 60);
		if (style == "h:m:s") {
			return this.fullNumLen(h) + ":" + this.fullNumLen(m) + ":" + this.fullNumLen(s);
		}
		return (h > 0 ? (this.fullNumLen(h) + ":") : "") + this.fullNumLen(m) + ":" + this.fullNumLen(s);
	}

	/**对以毫秒为单位的时间戳进行格式化 hh:mm 格式 */
	static hhmmFormat(timeStamp: number, fmt: string[] = [':', '']): string {
		if (timeStamp < 0) timeStamp = 0;
		let obj = TimeTools.getTimeObj(timeStamp / 1000);
		var str: string = strUtil.formatString("{0}" + fmt[0] + "{1}" + fmt[1],
			strUtil.padLeft((obj.h + obj.d * 24).toString(), "0", 2),
			strUtil.padLeft(obj.m.toString(), "0", 2)
		);
		return str;
	}

	/**对以毫秒为单位的时间戳进行格式化 mm:ss 格式 */
	static mmssFormat(timeStamp: number): string {
		if (timeStamp < 0) timeStamp = 0;
		let obj = TimeTools.getTimeObj(timeStamp / 1000);
		var str: string = strUtil.formatString("{0}:{1}",
			strUtil.padLeft(obj.m.toString(), "0", 2),
			strUtil.padLeft(obj.s.toString(), "0", 2)
		);
		return str;
	}

	/**对以毫秒为单位的时间戳进行格式化 ssmsms 格式 */
	static ssmsmsFormat(timeStamp: number): string {
		if (timeStamp < 0) timeStamp = 0;
		let obj = TimeTools.getTimeObj(timeStamp / 1000);
		let ms = timeStamp % 1000;
		var str: string = strUtil.formatString("{0}:{1}",
			strUtil.padLeft(obj.s.toString(), "0", 2),
			strUtil.padLeft(Math.ceil(ms / 100).toString(), "0", 2)
		);
		return str;
	}

	static getTimeObj(timeStamp: number) {
		if (timeStamp < 0) timeStamp = 0;
		var day: number = Math.floor(timeStamp / 3600 / 24);
		var hour: number = Math.floor((timeStamp % (3600 * 24)) / 3600);
		var minute: number = Math.floor(timeStamp % 3600 / 60);
		var second: number = Math.floor(timeStamp % 60);
		return { d: day, h: hour, m: minute, s: second };
	}

	/** 自定义任何格式用字符串显示时间
	 *  MM月dd日 = 10月10日
	 *  hh:mm = 10:10      */
	static dateFormat(dateTime: any, fmt: string): string {
		var date: Date;
		if (dateTime instanceof Date) date = dateTime;
		if (!isNaN(dateTime)) date = new Date(dateTime);
		if (date == null) return "";
		var o = {
			"M+": date.getMonth() + 1,                  //月份   
			"d+": date.getDate(),                       //日   
			"h+": date.getHours(),                      //小时   
			"m+": date.getMinutes(),                    //分   
			"s+": date.getSeconds(),                    //秒   
			"q+": Math.floor((date.getMonth() + 3) / 3),//季度   
			"S": date.getMilliseconds()                 //毫秒   
		};
		if (/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}

	static fullNumLen(num: number, len: number = 2): string {
		var numStr = num.toString();
		while (numStr.length < len) {
			numStr = "0" + numStr;
		}
		return numStr;
	}

	/**获取今日零点时间戳 */
	static getDayZore(now: number = Date.now()): number {
		var d = new Date(now);
		d.setHours(0, 0, 0, 0);
		return d.getTime();
	}

	/**获取明日零点时间戳 */
	static getDayZoreTomorrow(now: number = Date.now()): number {
		var d = this.getDayZore();
		return d + 24 * 3600000;
	}

	/** 获取创角到现在是第几天 */
	// static getPlayerDaysFromCreate(time: number) {
	// 	let createTime = TimeTools.getDayZore(time);
	// 	let day = (dataMgr.serverTime - createTime) / (24 * 3600000)
	// 	return Math.ceil(day);
	// }

	/**
	 * 转换成时间戳
	 * @param str  可以是 "小时:分" 或者 "小时:分:秒"
	 * @param now 
	 */
	static getTimeFromHourStr(str: string, now: number = Date.now()) {
		var d = new Date(now);
		var arr = String(str).split(":");
		var timeArr = [];
		for (var i = 0; i < 3; i++) {
			timeArr[i] = parseInt(arr[i]) || 0;
		}
		d.setHours(timeArr[0], timeArr[1], timeArr[2], 0);
		return d.getTime();
	}

	/**获取当前的本机时间 */
	static getCrtTime(): number {
		let d = new Date();
		return d.getTime();
	}

	/**
	 * 字符串持续时间转成数字(秒)
	 * @param str 10s  10m  10h 
	 */
	static timeStrToNumber(str: string): number {
		if (str == "-1") return -1;
		if (typeof str != "string") return str;
		var timeCode = str.charAt(str.length - 1);
		if (timeCode == "s") return parseInt(str.substr(0, str.length - 1));
		if (timeCode == "m") return parseInt(str.substr(0, str.length - 1)) * 60;
		if (timeCode == "h") return parseInt(str.substr(0, str.length - 1)) * 3600;
		if (timeCode == "d") return parseInt(str.substr(0, str.length - 1)) * 86400;
		return parseInt(str.substr(0, str.length - 1));
	}

	/**
	 * 判断两个时间是不是同一天
	 * @param time1
	 * @param time2 
	 */
	static isSameDay(time1: number, time2: number): boolean {
		var d = new Date(time1);
		d.setHours(0, 0, 0, 0);
		var zore1 = d.getTime();
		d.setTime(time2);
		d.setHours(0, 0, 0, 0);
		if (zore1 == d.getTime()) return true;
		return false;
	}
}