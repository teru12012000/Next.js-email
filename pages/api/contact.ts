import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
export default function sendGmail(req:NextApiRequest,res:NextApiResponse){
  const transpoter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    auth:{
      user:process.env.GMAILUSER,
      pass:process.env.GMAILPASSWORD,
    }
  });


  const toHostMailData={
    from:req.body.email,
    to:"sion2769@gmail.com",
    subject:`[お問い合わせ] ${req.body.name}様より`,
    text:`${req.body.massage} Send from ${req.body.email}`,
    html:`
      <p>【名前】</p>
      <p>${req.body.name}</p>
      <p>【メッセージ内容】</p>
      <p>${req.body.message}</p>
      <p>【メールアドレス】</p>
      <p>${req.body.email}</p>
    `
  };

  transpoter.sendMail(toHostMailData,function(err,info){
    if(err){
      window.alert('エラーです');
    }else{
      window.alert('送信しました')
    };
    return res.send("成功しました")
  })
  res.send("sucsess")
}