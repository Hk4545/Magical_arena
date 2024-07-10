## Magical Arena

#### Firstly initilize the players attributes using the endpoint : http://localhost:4005/initialize

req body should be like this :
```
{
    "playerAData": {
        "name":"Hari",
        "health": 90,
        "strength": 5,
        "attack": 10
    },
    "playerBData": {
        "name": "Krishna",
        "health": 100,
        "strength": 10,
        "attack": 5
    }
}
```


#### Then use the endpoint, to start the round : http://localhost:4005/attack

