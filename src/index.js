// 
var Info=require('./package.json');
const app = require('electron').remote.app;
const shell = require('electron').shell;


setInterval(function(){
    $.get("https://raw.githubusercontent.com/MyCrtrpt/NavRedis/master/package.json",function(res){
        if(res.version!=Info.version){
            $('#update').addClass("text-success")
        }
    },'json')
},1000*60*10)



window.addEventListener('contextmenu', (e) => {
   
  
}, false)

function open(url){
    shell.openExternal(url)
}

$("#version").text(Info.version);
$("#author").text("@"+Info.author).attr("href",`javascript:open("${Info.repository.url}")`)
$("#exit").click(function(){
    app.quit();
})

function send_Command(cmd,argv,callback=null){
    console.log(callback);
    if(callback==null){
        c=function(e,r){
            console.log("回调结果");
            console.log(r);
            console.log(e);
           if(e==null){
                $("#res").text(r); 
    
                syncRes(this.command,this.args,r);
                var  cmd=$("#command").val().split(" ")[0].toLowerCase()

                switch  (cmd) {
                    case "select":
                        $("#db").text("DB#"+$("#command").val().split(" ")[1])
                        break
                    default:
                }
                $("#save_btn").removeAttr('disabled');
                $("#res_edit").removeAttr('disabled')
           }else{
            $("#res_edit").attr("disabled",true)
            $("#save_btn").attr("disabled",true)
            
                $("#res").text(e.message);
                $("#save").text(e.message);   
                syncRes(this.command,this.args,e.message);
           }
        }
    }else{
        c=callback
    }
    currentSession.redis.send_command(cmd,argv,c);
}

$("#keys").keydown((e)=>{
    
    e = event ? event :(window.event ? window.event : null); 
    if(e.keyCode==13){ 
    }else{
        return;
    }
    if($("#keys").val()==""){
        return;
    }
    // keys
    send_Command("keys",[$("#keys").val()])
})

$("#command").keydown((e)=>{
    
    e = event ? event :(window.event ? window.event : null); 
    if(e.keyCode==13){ 
    }else{
        return;
    }

    var cmd=$("#command").val().split(" ")[0];
    var argv=$("#command").val().split(" ").slice(1);
    send_Command(cmd,argv)
})

connectKey=JSON.parse(window.localStorage.connectKey==undefined?'[]':window.localStorage.connectKey);
currentSession={};

function setting(i){
    alert('修改'+i)
}
function save(){
    var cmd= $("#res_edit").data("command");
    var args= $("#res_edit").data("args");
    if(cmd!=="set"){
        alert('当前版本只支持 get set 修改')
    }
    args.push($("#res_edit").val())
    $("#save_cmd").text(cmd+" "+args.join(" "));
    send_Command(cmd,args,function(e,r){
        console.log("save回调");
        console.log(this);
        $("#save_result").text(r)
    });
    args.pop();
}

function syncRes(type,args,res){
    console.log(type,args,res)
    switch(type){
        case "get":
            command="set"
            break;
        // case "set":
        //     command="set"
        //     break;
        // case "hget":
        //     command="hset"
        //     break;
        // case "hset":
        //     command="hset"
        //     break;
        default:
            command="";
    }
    $("#res_edit").data("command",command)
    $("#res_edit").data("args",args)
    $("#res_edit").text(res);  
}

function connect(i){
    $(".session").removeClass("active");
    $("#session"+i).addClass("active");
    if(i==-1){
        $('.page-content-redis').hide();
        $('.page-content-dashboard').show();
        return;
    }else{
        $('.page-content-dashboard').hide();
        $('.page-content-redis').show();
    }
    if(connectKey[i].redis!=undefined){
        return
    }
    $('#db').text('DB#0');
    connectMeta=connectKey[i];
    var redis = require("redis"),
    client = redis.createClient(connectMeta);
    client.on("error", function (err) {
        $("#session_status_"+i).addClass('text-danger')
    });
    client.on("connect", function (err) {
        $("#session_status_"+i).addClass('text-success')
        client.send_command("info",null,function(e,r){
            $("#res").text(r);   
            syncRes(command,"",r);        
        })
    });
    client.on("disconnect", function (err) {
        $("#session_status_"+i).addClass('text-success')
        client.send_command("info",null,function(e,r){
            $("#res").text(r);           
        })
    });
    connectKey[i].redis=client
    window.currentSession=connectKey[i];
}

$().ready(()=>{
    var connectList=$('#connectList');
    var defaultString=`<li>
    <a href="javascript:connect(-1)"><i class=" gi gi-compass sidebar-nav-icon"></i><span class="sidebar-nav-mini-hide">Dashboard</span></a>
</li>
<li class="sidebar-separator">
    <i class="fa fa-ellipsis-h"></i>
</li>`
    // connectList=window.localStorage.connectKey;
    connectKey=JSON.parse(window.localStorage.connectKey==undefined?'[]':window.localStorage.connectKey);
    connectKey.forEach((e,i)=>{
        if(e.name==undefined){
            defaultString+=`<li class="session" id="session${i}"><a href="javascript:connect(${i})" ><i id="session_status_${i}" class="fa fa-circle sidebar-nav-icon"></i><span class="sidebar-nav-mini-hide" data-id="i">${e.user+"@"+e.host}<i  click="setting(${i})" class="fa fa-gear session_setting"></i></span></a></li>`
        }else{
            defaultString+=`<li class="session" onmouseover="$('#description').text('${e.name}')" id="session${i}"><a href="javascript:connect(${i})" ><i id="session_status_${i}" class="fa fa-circle sidebar-nav-icon"></i><span class="sidebar-nav-mini-hide" alt="${e.name}" data-id="i">${e.name.substring(0,20)} <i  click="setting(${i})" class="fa fa-gear session_setting"></i></span></a></li>`
        }
    })

 connectList.html(defaultString)    


 $(".session").mouseup(function(event){
    console.log(event);
    (event) => {
        var e = event || window.event;
        let nType = e.button;
        if (2 === nType) {
            showRightClickMenu();
        }
        e.stopPropagation();
    }
});
})



$("#NavRedis").click(()=>{
    window.location.href="login.html"
})