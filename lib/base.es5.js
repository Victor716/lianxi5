function Base() {
    console.log("执行Base构造函数");
}
Base.extend = function () {
    var args = [].slice.call(arguments);
	var func = new Function();
	func.prototype = new this();
	for (var i = 0; i < args.length; i++) {
		if (args[i] && args[i] instanceof Object) {
			var keys = Object.keys(args[i])
			for (var j = 0; j < keys.length; j++) {
				var key = keys[j];
				func.prototype[key] = args[i][key];
				func[key] = args[i][key];
			}
		}
	}
    func.extend = this.extend;
    func.prototype.on = function(str, fn) {
		func.events = {};
        func.events[str] = fn
    }

    func.prototype.trigger = function(str, value) {
        var fn = func.events[str];
        if (fn && fn instanceof Function) fn.call(this, value)
    }
	return func;
}

module.exports = Base