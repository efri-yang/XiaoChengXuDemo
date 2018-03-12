<?php
// function randomFromDev($len) {
//     $fp = @fopen('./dev/urandom', 'rb');
//     $result = '';
//     if ($fp !== FALSE) {
//         $result .= @fread($fp, $len);
//         @fclose($fp);
//     } else {
//         trigger_error('Can not open /dev/urandom.');
//     }
//     // convert from binary to string
//     $result = base64_encode($result);
//     // remove none url chars
//     $result = strtr($result, '+/', '-_');

//     return substr($result, 0, $len);
// }


function randomFromDev($min = 0, $max = 0x7FFFFFFF) {
    $diff = $max - $min;
    if ($diff < 0 || $diff > 0x7FFFFFFF) {
    throw new RuntimeException("Bad range");
    }
    $bytes = mcrypt_create_iv(4, MCRYPT_DEV_URANDOM);
    if ($bytes === false || strlen($bytes) != 4) {
        throw new RuntimeException("Unable to get 4 bytes");
    }
    $ary = unpack("Nint", $bytes);
    $val = $ary['int'] & 0x7FFFFFFF;   // 32-bit safe
    $fp = (float) $val / 2147483647.0; // convert to [0,1]
    return round($fp * $diff) + $min;
}

$APPID = "wxa13afc876587df08";
$AppSecret = "0be4cca4041c9853801ed7975ced5490";
$JSCODE = $_POST["code"];

$URL = "https://api.weixin.qq.com/sns/jscode2session?appid=" . $APPID . "&secret=" . $AppSecret . "&js_code=" . $JSCODE . "&grant_type=authorization_code";
//https://api.weixin.qq.com/sns/jscode2session?appid=wxa13afc876587df08&secret=0be4cca4041c9853801ed7975ced5490&js_code=011pmrw021qkv01n1mx027TDw02pmrwQ&grant_type=authorization_code

$res = file_get_contents($URL);
$res = json_decode($res, true);

$sessionKey = $res["session_key"];
$openId = $res["openid"];
$skey = randomFromDev(30);
$svalue = $sessionKey . $openId;


$conn=mysql_connect("bdm300375458.my3w.com","bdm300375458","mysql3862749");
mysql_select_db("bdm300375458_db",$conn);
mysql_query("set names 'utf8'");
$sql = "insert into session_tbl(s_id,s_value) values('".$skey."','".$svalue."')";
$result=mysql_query($sql,$conn);
if (mysql_affected_rows()) {
    echo json_encode(array("sessionkey"=>$skey));
} else {
    echo 0;
}

?>