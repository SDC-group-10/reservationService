# API Endpoints for CRUD app

## Miniumum requirements:
```
Create: POST('/reservation', () => {db.makeReservation()});

Read: GET('/reservation/:id', () => {db.getReservation(id)});
Read: GET('/users/:id', () => {db.getUser(username)});
Read: GET('/listings/:id', () => {db.getListing(id)});
```

## Advanced Content:

```
Destory: DELETE('/reservation:id', () => {db.removeReservation()});


Update: PUT('/reservation:id', () => {db.changeReservation()});

```
