function welcome(){
    let welcome_text = '欢迎光顾七鳄の学习格~'
    if(document.referrer!==''){
        let referrer=document.referrer.split("/")[2];
        welcome_text="欢迎你，来自"+referrer.toUpperCase()+"的用户！";
        if(referrer.toUpperCase()==document.domain.toUpperCase())return;
    }
    swal({
        title: " 欢迎！",
        text: welcome_text+'\n本博客在国家公祭日网站变灰',
        timer: 36000000,
        showConfirmButton: true
    });
}
$(document).ready(()=>{
    welcome()
})