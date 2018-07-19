const http = require('http'); // httpサーバーmodule
const hostname = 'localhost'; // ホスト名
const port = 3000; // port番号

// httpサーバーの定義
const server = http.createServer((req, res) => {

    // 全リクエストを処理
    res.statusCode = 200; // http ステータスコード
    res.setHeader('Content-Type', 'text/html; charset=UTF-8'); // HTMLを返す 日本語返すので charsetもセット

    // ルーティング (url により振り分ける）
    switch (req.url) { // req.url にリクエストされたパスが入る
        case '/':
        topPage(req,res); // トップページ用関数
        break;
        case '/up':
        upPage(req,res);  // 投稿ページ用関数
        break;
        default:
        notFoundPage(req,res); // その他ページ用関数 Not Foundページにします
        break;
    }
});

// サーバー起動
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

/////////////////////// 各ページの機能 //////////////////////////
// ヘッダ
function header(req,res) {
    res.write('<html><head><title>掲示板</title><style>* {box-sizing:border-box;}</style></head><body style="position:relative;height:100%;">');
    res.write('<header style="border:1px solid #888;padding:40px;">掲示板</header>');
    res.write('<nav><ul><li><a href="/">トップ</a></li><li><a href="/up">投稿</a></li></nav>');
}

// フッタ
function footer(req,res) {
    res.write('<footer style="position:absolute;bottom:0;width:100%;border:1px solid #888;text-align:center;padding:20px;">フッター</footer>\n'); // 共通のフッター
    res.end('</body></html>'); // res.endでもコンテンツを返せる
}

// トップページ
function topPage(req,res) {
    header(req,res);
    res.write('<h2>トップページ</h2>\n');
    res.write('<ul>');
    for(let row of posts) {
        res.write('<li>'+row+'</li>\n'); // htmlescapeは省略してます
    }
    res.write('</ul>');
    footer(req,res);
}

// 投稿ページ
var posts = []; // 掲示板データ
function upPage(req,res) {
    header(req,res);
    // リクエストメソッドで処理を変える
    // GETの処理
    if (req.method === 'GET') {
        res.write('<h2>投稿します</h2>\n');
        res.write('<form action="/up" method="post"><div><textarea name="kakikomi" style="width:80%;height:100px"></textarea><div><div><input type="submit" value="投稿"></div></form>');
        footer(req,res);
        return;
    }
    // POSTの処理
    if (req.method === 'POST') {
        // POSTデータを受け取る(共通)
        // dataイベントでPOSTされたデータがちょっとずつ来るのでdataに蓄積する
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            //パースする
            const querystring = require('querystring');
            parsedBody = querystring.parse(body);

            if (parsedBody.kakikomi) {
                posts.push(parsedBody.kakikomi);
                res.write('<h2>投稿しました</h2>\n');
                res.write(decodeURIComponent(parsedBody.kakikomi)); // htmlescape省略
            }
            footer(req,res);
        });
    }
}

// その他のページ
function notFoundPage(req,res) {
    res.statusCode = 404; // http ステータスコードを返します
    header(req,res);
    res.write('<h2>ページはありません</h2>');
    footer(req,res);
}