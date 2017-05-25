大智慧云平台连接模块, 支持Http和WebSocket
---

### 使用
1.global

    <script src="dzhyun-connection.min.js"></script>
    <script>
        var conn = new DzhyunConnection('ws://10.15.144.101/ws');
        conn.on('message', function(data) {
            ...
        });
        conn.request('/quote/dyna?qid=1&obj=SH000001&sub=0&output=json')
    </script>

2.requirejs

    <script src="require.js"></script>
    <script>
        require.config({
            paths: {
                connection: 'dist/dzhyun-connection.min' // connection路径
            }
        });
        require(['connection'], function(DzhyunConnection) {
            new DzhyunConnection('http://10.15.144.101/quote/dyna').request('qid=1&obj=SH000001&sub=0&output=json').on('message', function(data) {...})
        });
    </script>
    
3.nodejs
安装

    npm install dzhyun-connection

使用

    var DzhyunConnection = require('dzhyun-connection');
    ...
