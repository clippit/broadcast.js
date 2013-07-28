# broadcast.js

## 用法

### 发布广播

    broadcast.publish( string name, ... )

参数：

* `name`: 消息名称
* 随后的参数会传给订阅者

### 订阅

    broadcast.subscribe( string name, function callback, [object context] )

参数：

* `name`: 消息名称
* `callback`: 回调函数
* `context`: 指定回调函数中的 `this`

返回：

一个唯一数字 `token`，可以用来取消订阅。

### 取消订阅

    broadcast.unsubscribe( number token )

参数：

* `token`: 订阅时返回的值

返回：

* `true`: 取消成功
* `false`: 取消失败，可能是没有找到相应的订阅

## 短名称

为了响应节能减排的号召，以上三个方法均有短名称，分别为 `pub`、`sub`、`unsub`。

## 测试

测试脚本使用了 [Jasmine](http://pivotal.github.io/jasmine/)。进入 `test` 目录，运行 `bower install` 安装 Jasmine，然后用浏览器打开 `index.html` 即可。
