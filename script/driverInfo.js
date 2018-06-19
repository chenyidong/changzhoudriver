function createSocket(){

  socketManager = api.require('socketManager');
    socketManager.createSocket({
        host: '221.208.158.3',
        port: 15331
    }, function(ret, err) {
        api.hideProgress();
       console.log("返回结果:"+JSON.stringify(ret));

         currentSid=ret.sid//socket的sid
         if(ret.state==101){
           send();
         }
         if(ret.state ==  103){
           if(dTime == 100){
             dTime = 60000;
             window.clearInterval(timeInterval);
             setTimeInterval();
           }
           infoRefell(ret.data)//刷新结果
         }
        if(ret.state==201  ){
          //  alert("创建失败!")
          dTime=100;
          closeSocket();
          createSocket();
          window.clearInterval(timeInterval);
          setTimeInterval();
        }
        if(ret.state==202  ){
          //alert("连接失败!")
            dTime=100;
            closeSocket();
            createSocket();
            window.clearInterval(timeInterval);
            setTimeInterval();
        }
        if(ret.state==203){
          //alert("异常断开!")
            dTime=100;
            closeSocket();
            createSocket();
            window.clearInterval(timeInterval);
            setTimeInterval();
        }
        if(ret.state==204){
          //alert("正常断开!")
        }
        if(ret.state==205){
          //alert("与服务器断开,请重新进入页面")
          dTime=100;
          closeSocket();
          createSocket();
          window.clearInterval(timeInterval);
          setTimeInterval();
        }
    });
}



function closeSocket(){
  socketManager.closeSocket({
      sid: currentSid
  }, function(ret, err) {

  });
}
function send(){
  socketManager.write({
        sid: currentSid,
        data: '@#caiji#'+id+'#@\r\n'
    }, function(ret, err) {

    });
}

/**
* 对实时信息赋值
*/
  function infoRefell(jieguo){
    if(jieguo!=null){
      var jieguoArr =jieguo.split("#");
        document.getElementById("wendu").innerHTML="温度:"+jieguoArr[3]+'℃'
        document.getElementById("yali").innerHTML="压力:"+jieguoArr[4]+'mmhg'
        var state=jieguoArr[5];
        if(state=="0"){
            document.getElementById("driverState").innerHTML='设备运行正常'
        }else if(state=="1"){
            document.getElementById("driverState").innerHTML='设备断电状态'
        }else{
            document.getElementById("driverState").innerHTML='设备异常状态'
        }
    }
  }
