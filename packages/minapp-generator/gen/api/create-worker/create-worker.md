<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/createWorker.html -->

### wx.createWorker(scriptPath)

> 基础库 1.9.90 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

在使用 createWorker 前，请查阅 [多线程](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/workers.html) 文档了解基础知识和配置方法。

创建一个 Worker 线程，并返回 Worker 实例，目前限制最多只能创建一个 Worker，创建下一个 Worker 前请调用 Worker.terminate。

`scriptPath` 为 worker 的入口文件路径，需填写绝对路径。

#### Worker

**Worker 对象的方法列表：**

  方法          |  参数       |  说明                                  
----------------|-------------|----------------------------------------
  postMessage   |  Object     |  向 Worker 线程发送的消息。            
  onMessage     |  callback   |  监听 Worker 线程向当前线程发送的消息  
  terminate     |             |结束当前 Worker 线程，仅限在主线程 Worker 实例上调用。

**postMessage(message) 说明：**

向 Worker 线程发送消息，`message` 参数为需要发送的消息，必须是一个可序列化的 JavaScript 对象。

**onMessage(callback) 回调结果说明：**

  属性      |  类型     |  说明                  
------------|-----------|------------------------
  message   |  Object   |Worker 线程向当前线程发送的消息

**terminate() 说明：**

结束当前 worker 线程，仅限在主线程 Worker 对象上调用。

**示例代码：**

运行以下代码需先进行基础配置，详细请查阅 [多线程](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/workers.html) 文档了解基础知识和配置方法。

    const worker = wx.createWorker('workers/request/index.js') // 文件名指定 worker 的入口文件路径，绝对路径
    
    worker.onMessage(function (res) {
      console.log(res)
    })
    
    worker.postMessage({
      msg: 'hello worker'
    })
    
    worker.terminate()
