// const BACKEND_API = "http://34.93.9.166:5004/";
const BACKEND_API = "https://beta.teachmint.com/";

const sendLogEventServer = (eventID, data) => {
    let fd = new FormData();
    // fd.append("event_id", eventID);
    fd.append("data", JSON.stringify(data));

    fetch(`/handle-backend-event/${eventID}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        body: fd,
    });
};

/*
    Firebase initialization
*/
firebase.initializeApp({
    apiKey: "AIzaSyC86r_KE3JS7lhSBFq8x1mpR9WqucpS7_M",
    authDomain: "excellent-math-274709.firebaseapp.com",
    databaseURL: "https://excellent-math-274709.firebaseio.com",
    projectId: "excellent-math-274709",
    storageBucket: "excellent-math-274709.appspot.com",
    messagingSenderId: "554736302166",
    appId: "1:554736302166:web:cc281dcb31c5211c0563f7",
    measurementId: "G-3YS9P6ZDWX",
});
const firebaseAnalytics = firebase.analytics();

const uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            var r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        }
    );
};

const getAppID = () => {
    let appId = window.localStorage.getItem("app_id");
    if (!appId) {
        appId = uuidv4();
        window.localStorage.setItem("app_id", appId);
    }
    return appId;
};

const sendEvent = async (eventId, data) => {
    data.app_id = getAppID();

    // send data to backend
    sendLogEventServer(eventId, data);

    // send events to firebase
    firebaseAnalytics.logEvent(eventId, data);
};

/*
  #eventId-> WEBSTORE_JOIN_CLASSROOM_REQUEST
  #btnType-> Contact; Join_classroom; Join_live_session; Reserve_your_spot
  #pageName-> main_page; video_lecture_page
*/
const storeContactBtnClicked = (eventId, btnType, classId, pageName) => {
    sendEvent(eventId, {
        btnType,
        classId,
        pageName,
    });
};

/*
  #eventId-> WEBSTORE_VIDEO_PLAY_EVENT     
  #pageName-> main_page; video_lecture_list
*/
const viewVideoBtnClicked = (eventId, videoId, pageName) => {
    sendEvent(eventId, { videoId, pageName });
};

/*
  #eventId-> WEBSTORE_VIEW_ALL_CLICK
  #btnType-> demo_video
*/
const viewAllBtnClicked = (eventId, btnType) => {
    sendEvent(eventId, { btnType });
};

/*
  #eventId-> WEBSTORE_DIGITAL_CHANNEL
  #smType-> facebook; youtube
*/
const socialMediaBtnClicked = (eventId, smType) => {
    sendEvent(eventId, { smType });
};

/*
  #eventId-> WEBSTORE_CTA_BTN
  #smType-> play_store, app_store
*/
const ctaBtnClicked = (eventId, smType) => {
    sendEvent(eventId, { smType });
};

/*
  #eventId-> WEBSTORE_FIXED_WHATSAPP_SHARE
*/
const whatsappShareBtnClicked = (eventId) => {
    sendEvent(eventId, {});
};
