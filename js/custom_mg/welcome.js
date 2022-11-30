function welcome(){
    let welcome_text = '沉痛哀悼，敬爱的江泽民同志与世长辞'
    if(document.referrer!==''){
        let referrer=document.referrer.split("/")[2];
        if(referrer.toUpperCase()==document.domain.toUpperCase())return;
    }
    swal({
        title: " 沉痛哀悼！",
        text: welcome_text+'\n愿您在天堂安好，天堂没有痛苦！',
        imageUrl: "http://img.cjyun.org/a/10008/202211/63671ac64b76714f4575db85c17e9a4b.jpeg",
        timer: 3000,
        showConfirmButton: false
    });
}
$(document).ready(()=>{
    welcome()
})