function johnPromise(fn) {
	var value = null,
		callbacks = [] // 为数组，可能有很多个回调

	this.then = function (onFulifilled) {  // 注册回调函数
		callbacks.push(onFulifilled)
		console.log(callbacks)
		return this                        // then..then的链式调用
	}

	function resolve(value) {
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

