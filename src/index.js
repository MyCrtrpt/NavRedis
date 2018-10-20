// 

window.addEventListener('contextmenu', (e) => {
    const {remote} = require('electron')
    const {Menu, MenuItem} = remote
    const menu=new Menu();
    menu.append(new MenuItem({label: 'connect', click() { console.log('新建session') }}))
    menu.append(new MenuItem({label: 'disconnect', click() { console.log('关闭session') }}))
}, false)


$("#command").keydown((e)=>{
    
    e = event ? event :(window.event ? window.event : null); 
    if(e.keyCode==13){ 
    }else{
        return;
    }

    command=$("#command").val().split(" ")[0];
    argv=$("#command").val().split(" ").slice(1);


    currentSession.redis.send_command(command,argv,function(e,r){
       console.log(e);
       if(e==null){
        $("#res").text(r);   
        var  command=$("#command").val().split(" ")[0].toLowerCase()
        switch  (command) {
            case "select":
                $("#db").text("DB#"+$("#command").val().split(" ")[1])
                break
            default:
        }
       }else{
        $("#res").text(e.message);   
       }
    })
})

connectKey=JSON.parse(window.localStorage.connectKey==undefined?'[]':window.localStorage.connectKey);
currentSession={};

function setting(i){
    alert('修改'+i)
}

function connect(i){
    $(".session").removeClass("active");
    $("#session"+i).addClass("active");
    if(i==-1){
        $('#page-content-redis').hide();
        $('#page-content-dashboard').show();
        return;
    }else{
        $('#page-content-dashboard').hide();
        $('#page-content-redis').show();
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
            defaultString+=`<li class="session" id="session${i}"><a href="javascript:connect(${i})" ><i id="session_status_${i}" class="fa fa-circle sidebar-nav-icon"></i><span class="sidebar-nav-mini-hide" data-id="i">${e.name} <i  click="setting(${i})" class="fa fa-gear session_setting"></i></span></a></li>`
        }
    })

 connectList.html(defaultString)    
})

$("#NavRedis").click(()=>{
    window.location.href="login.html"
})