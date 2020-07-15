# Monitor de pedidos
Sistema de control de pedidos conectado con firebase, requiere crear cuenta en firebase y el login en otro sistema,
Reglas en bd firebase (Realtime Database):
```
{
  /* Visit https://firebase.google.com/docs/database/security to learn more about security rules. */
  "rules": {
    "$uid": {
      ".indexOn": ["fecha", "hora"],
      ".write": "$uid === auth.uid",
      ".read": "$uid === auth.uid",
      "$pedido": {
        "estado":{
					".validate": "newData.isNumber() &&
          							newData.val() >= 0 &&
                        newData.val() <= 4"
        },
        "repartidor":{
          // Valida que el repartidor exista
          // /repartidores/ index
          ".validate": "newData.isNumber()"
        },
        "comentario":{
          // Valida el texto largo
          ".validate": "newData.isString()"
        },
        "fecha":{
          ".read": "$uid === auth.uid"
        }
      }
    }
  }
}
```
La regla anterior considera que la lectura de json es solo para usuarios logeados y para escribir solo en estado, repartidor, comentario, fecha.

Un ejemplo del archivo en formato Json con el que trabaja el sistema:
[1 Pedido JSON](https://github.com/xacux/monitorPedidos/blob/master/src/store/pedido.json).


## Instalación del proyecto
```
npm install
```

### Para pruebas
```
npm run serve
```

### Para producción
```
npm run build
```

### Web para el diseño
Vuetifyjs [Diseño](https://vuetifyjs.com/).
Material Design [Iconos](https://material.io/).