
enum __TYPES__ {
  String = '[object String]',
  Number = '[object Number]',
  Boolean = '[object Boolean]',
  Undefined = '[object Undefined]',
  Null = '[object Null]',
  Object = '[object Object]',
  Function = '[object Function]',
  Array = '[object Array]',
  Date = '[object Date]',
  RegExp = '[object RegExp]',
}

function isType(o: any, type: __TYPES__) {
  let t = reaType(o);
  return t === type
}

function reaType(o): string {
  let $typeof = Object.prototype.toString;
  return $typeof.call(o);
}

export { isType, __TYPES__, reaType }