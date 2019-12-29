# save first

http://10.1.5.202/deploy/http/operate/savenotice


monitor10.200.2.13


POST 保存通知

```json
{
    "requestMethod": "GET",// GET, POST
    "url": "string",
    "paramType": 0,// 参数类型 0:get 1:post/form-data 2:post/json
    "paramList": [
        {
            "key": "string",
            "value": "string",
            "desc": "string"
        }
    ],// get / post
    "json": "string",// post
    "authType": 0,// 认证类型 0:NoAuth 1:BasicAuth 2:token
    "account": "string",
    "password": "string",
    "token": "string",
    "upgrade_id": "string",// 关联项目id
}

```

## get second

http://10.1.5.202/deploy/http/operate/upgradelist
http://10.1.5.202/deploy/http/operate/getnotice?upgrade_id=monitor10.200.2.13
http://10.1.5.202/deploy/http/operate/getnotice?monitor10.200.2.13

