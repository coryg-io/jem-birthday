(function(){var t,i;i="https://api.nasa.gov/planetary/apod?api_key=uI5nmso1mWCHxbGyzVqecAYD07O8j5QGsE8tUgVw",t=function(t){"copyright"in t?$("#copyright").text("Image Credits: "+t.copyright):$("#copyright").text("Image Credits: Public Domain"),"video"===t.media_type?($("#apod_img_id").css("display","none"),$("#apod_vid_id").attr("src",t.url)):($("#apod_vid_id").css("display","none"),$("#apod_img_id").attr("src",t.url)),$("#reqObject").text(i),$("#returnObject").text(JSON.stringify(t,null,4)),$("#apod_explanation").text(t.explanation),$("#apod_title").text(t.title)},$.ajax({url:i,success:t})}).call(this);