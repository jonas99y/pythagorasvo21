import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const onNewDrawing = functions.database.ref("/drawings/{pushid}").onWrite(event => {
    console.log("event getriggert");
    // Only edit data when it is first created.
    if (event.data.previous.exists()) {
        console.log("no data")

        return;
    }
    // Exit when the data is deleted.
    if (!event.data.exists()) {
        console.log("no data")

        return;
    }
    const data = event.data.val();
    const topicid = data.topic;
    const drawingid = event.params ? event.params.pushid : null;
    console.log("drawing id: "+drawingid);
    console.log("topic id: "+topicid);
    let path = "topics/" + topicid + '/drawings/' + drawingid;
    const updates = {["test"]:"test"};
    admin.database().ref().update(updates);
});