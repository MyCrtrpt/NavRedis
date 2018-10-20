// 

window.addEventListener('contextmenu', (e) => {
    const {remote} = require('electron')
    const {Menu, MenuItem} = remote
    const menu=new Menu();
    menu.append(new MenuItem({label: 'connect', click() { console.log('新建session') }}))
    menu.append(new MenuItem({label: 'disconnect', click() { console.log('关闭session') }}))
}, false)

$("#command").change(()=>{
    console.log($("#command").val())
    redis.send_command($("#command").val().split(" ")[0],$("#command").val().split(" ").slice(1),function(e,r){
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




function connect(i){
    if(i==-1){
        $('#page-content-redis').hide();
        $('#page-content-dashboard').hide();
    }else{
        $('#page-content-redis').show();
        $('#page-content-dashboard').show();
    }
    $('#db').text('DB#0');
    connectMeta=connectKey[i];
    
    var redis = require("redis"),
    client = redis.createClient(connectMeta);
    client.on("error", function (err) {
        alert(err)
    });
    client.on("connect", function (err) {
        client.send_command("info",null,function(e,r){

            $("#res").text(r);           
        })
    });
    window.redis=client
}

$().ready(()=>{
    var connectList=$('#connectList');
    var defaultString=`<li>
    <a href="javascript:connect(-1)" class="active"><i class=" gi gi-compass sidebar-nav-icon"></i><span class="sidebar-nav-mini-hide">Dashboard</span></a>
</li>
<li class="sidebar-separator">
    <i class="fa fa-ellipsis-h"></i>
</li>`
    // connectList=window.localStorage.connectKey;
    connectKey=JSON.parse(window.localStorage.connectKey==undefined?'[]':window.localStorage.connectKey);
    connectKey.forEach((e,i)=>{
        defaultString+=`<li>
        <a href="javascript:connect(${i})" ><i class="fa fa-terminal sidebar-nav-icon"></i><span class="sidebar-nav-mini-hide" data-id="i">${e.user+"@"+e.host+":"+e.port}</span></a>
    </li>`
    })

 connectList.html(defaultString)    
})

$("#NavRedis").click(()=>{
    window.location.href="login.html"
})