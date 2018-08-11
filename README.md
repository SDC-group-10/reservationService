# Air PnP Reservation Service

# API Endpoints for CRUD app

Miniumum requirements:

Create: POST('/reservation', () => {db.makeReservation()});
Create: POST('/booked_date', () => {db.makeBooking()});
Read: GET('/reservation:id', () => {db.getReservation(id)});
READ: GET('/booked_date:id', () => {db.getBookedDate(id)});

Advanced Content:

Destory: DELETE('/reservation:id', () => {db.removeReservation()});
Destory: DELETE('/booked_date:id', () => {db.removeBookedDate()});
Update: PUT('/reservation:id', () => {db.changeReservation()});
Update:  PUT('/booked_date:id', () => {db.changeBookedDate()});
