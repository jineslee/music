<?php
    $ch = curl_init();
    $url = 'http://apis.baidu.com/geekery/music/query?s=%E5%8D%81%E5%B9%B4&size=10&page=1';
    $header = array(
        'apikey: 您自己的apikey',
    );
    // 添加apikey到header
    curl_setopt($ch, CURLOPT_HTTPHEADER  , $header);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    // 执行HTTP请求
    curl_setopt($ch , CURLOPT_URL , $url);
    $res = curl_exec($ch);

    var_dump(json_decode($res));
?>