function johnPromise(fn) {
	var state = 'pending',  // 增加状态
		value = null,
		callbacks = [] // 为数组，可能有很多个回调

	this.then = function (onFulifilled) {  // 注册回调函数
		if (state === 'pending') {
			callbacks.push(onFulifilled)
			return this                        // then..then的链式调用
		}
		onFulifilled(value)
		return this
	}

	function resolve(newValue) {
		value = newValue
		state = 'fulfilled'
		setTimeout(function () {
			callbacks.forEach(function (callback) {
				callback(value)
			})
		},0)
	}

	fn(resolve)
}

function getUserId() {
	return new johnPromise(function (resolve) {
		resolve(9876);
	});
}
getUserId().then(function (id) {
	// 一些处理
	console.log(id)
});

