const shareMsg = 'I used EvacFlorida to plan my trip around traffic, you should too! https://evacflorida.com';

const domain = window.origin;

export const ShareLinks = {
    shareMsg: shareMsg,
    fbShareMsg: "https://www.facebook.com/dialog/feed?&app_id=432677524272813&link="+domain+"&display=popup&quote=" + shareMsg + "&hashtag=#EvacuationPLanning",
    ttShareMsg: "https://twitter.com/intent/tweet?url="+domain+"&via=EvacFlorida&text=" + shareMsg + " #EvacuationPlanning",
    setShareMsg: (data, callback) => {
        if (data.is_leaving) {
            let date = data.date.substr(0, 10);
            let time = data.date.substr(-5);
            callback("mailto:?subject=Don't worry, I'll be ok!&body=I'm evacuating for the hurricane. My plan is to leave on " + date + ' at ' + time + '. ' + shareMsg);
        } else {
            callback('mailto:?subject=I\'m not leave for the hurricane&body=I don\'t plan on leaving, how about you? Share your plans anonymously on '+domain+'.');
        }
    }
};