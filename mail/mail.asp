<%@LANGUAGE = VBSCRIPT%> 
<html>
<body>
<%recipient = "1131890142@qq.com" '此为收信人电子邮箱 
' 取得表单资料
name = Request.Form("mName")
senderEmail = Request.Form("mMail")
other=request.Form("other")
subject = "Re:" & Request.Form("mSubject")
body = Request.Form("mMessage");

if name <> "" and senderEmail <> "" and body<>"" then

' 建立 JMail 组件
set msg = Server.CreateOBject( "JMail.Message" )

' 设定将寄信的过程记录下来
msg.Logging = true
msg.silent = true

' 中文编码设定
msg.Charset = "gb2312"


' 将表单资料存入组件中
msg.From = senderEmail
msg.FromName = name
' smtp认证的关键
msg.mailserverusername="1131890142@qq.com"
msg.mailserverpassword="tewkvfvkqpudgfef" '输入你的邮箱密码

' 将收信人的资料加入组件
msg.AddRecipient recipient

' 设定信件的主题
msg.Subject = subject

' 设定信件的主体内容
msg.body = body & vbcrlf & vbcrlf & "其他联系方式：" & other

' 送出表单资料为电子邮件 ,并指定发信服务器 SMTP
if not msg.Send("smtp.qq.com" ) then
Response.write "<pre>" & msg.log & "</pre>"
else
Response.write "信件成功寄出,谢谢您的留言!!"
Response.write "<a href=javascript:history.go(-1)>返回</a>"
end if

msg.Close
set msg=nothing
else 
response.write "请将内容填写完整!!"
end if
%>
</body>
</html> 