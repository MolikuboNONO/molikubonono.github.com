<?php 

$stm="邮件内容"; 

require("smtp.php"); 

########################################## 

$smtpserver = "smtp.qq.com";//SMTP服务器 

$smtpserverport = 465;//SMTP服务器端口 

$smtpusermail = "1131890142@qq.com";//SMTP服务器的用户邮箱 

$smtpemailto = "113890142@qq.com";//发送给谁 

$smtpuser = "1131890142@qq.com";//SMTP服务器的用户帐号 

$smtppass = "tewkvkvfqpudgfef";//SMTP服务器的用户密码 

$mailsubject =$_POST["subject"];//邮件主题 

$mailbody = $_POST["mMessage"];//邮件内容 

$mailtype = "HTML";//邮件格式（HTML/TXT）,TXT为文本邮件 

########################################## 
echo "<script>alert('file load')</script>"
$smtp = new smtp($smtpserver,$smtpserverport,true,$smtpuser,$smtppass);//这里面的一个true是表示使用身份验证,否则不使用身份验证. 

$smtp->debug = TRUE;//是否显示发送的调试信息 

$smtp->sendmail($smtpemailto, $smtpusermail, $mailsubject, $mailbody, $mailtype); 

echo "<script>alert('邮件发送成功');parent.document.ADDUser.cheheh.click();</script>"; 

exit; 

} 

?> 