// @ts-ignore
import ytdl from "react-native-ytdl";

chrome.runtime.onMessageExternal.addListener((message: any, _: any, sendResponse: (result: any) => void) => {
    if (message && message.type === 'YOUTUBE_AUDIO_FETCH') {
        ytdl.getInfo(message.payload).then((info: any) => {
            let format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
            console.log('Format found!', format);
            sendResponse(format);
        });
    }
});
