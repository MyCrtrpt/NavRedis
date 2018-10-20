/*
 *  Document   : readyLogin.js
 *  Author     : pixelcave
 *  Description: Custom javascript code used in Login page
 */

var ReadyLogin = function() {

    return {
        init: function() {
            $('#form-login').submit(function(e){
                key= $("#username").val()+"@"+$('#hostname').val()+":"+$('#port').val();
                keyspace={
                        host:$('#hostname').val(),
                        port:$('#port').val(),
                        user:$("#username").val(),
                        password:$("#password").val()
                    }
                connectContent=window.localStorage.getItem("connectKey");
                if(connectContent==null){
                    connectKey=[];
                }else{
                    connectKey=JSON.parse(connectContent)
                }
                connectKey.push(keyspace)
                window.localStorage.setItem("connectKey",JSON.stringify(connectKey));
            });
           
        }
    };
}();