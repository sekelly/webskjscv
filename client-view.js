ZoomMtg.setZoomJSLib('https://source.zoom.us/2.9.5/lib', '/av')

ZoomMtg.preLoadWasm()
ZoomMtg.prepareWebSDK()
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US')
ZoomMtg.i18n.reload('en-US')

// setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
var signatureEndpoint = 'https://yckfd07uph.execute-api.us-east-1.amazonaws.com/latest'
var sdkKey = 'PfPapLCavJc2ZBjMkssNeqboLdBOpoAEXQTc'
var meetingNumber = '99617077912'
var role = 1
var leaveUrl = 'https://zoom.us/meeting/tJUufuqorzgoGdUQDaDc5zm-STxdbXHY59VB/postsurvey?tk=h_r0kCufIz56_H6nWdQLVK50n90v5sLSwmW6WQZn7ng.DQMAAAAVR3K17xZLbzBrSG9rVFNrdTV6U1ctRlNkSDBBF2tlbGx5Lm1hZ2FvYXlAZ21haWwuY29tCktlbE1hZ2FvYXkAAAAAAAAAAAAAAAAAAAAAAAAYdzcrRFpLYzhUVmFTb2dPU0p2dHhDUT09AA'
var userName = 'UserJS'
var userEmail = ''
var passWord = '123'
// pass in the registrant's token if your meeting or webinar requires registration. More info here:
// Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/meetings#join-meeting-with-registration-required
// Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/webinars#join-webinar-with-registration-required
var registrantToken = ''

function getSignature() {
  fetch(signatureEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      meetingNumber: meetingNumber,
      role: role
    })
  }).then((response) => {
    return response.json()
  }).then((data) => {
    console.log(data)
    startMeeting(data.signature)
  }).catch((error) => {
  	console.log(error)
  })
}

function startMeeting(signature) {

  document.getElementById('zmmtg-root').style.display = 'block'

  ZoomMtg.init({
    leaveUrl: leaveUrl,
    success: (success) => {
      console.log(success)
      ZoomMtg.join({
        signature: signature,
        sdkKey: sdkKey,
        meetingNumber: meetingNumber,
        userName: userName,
        userEmail: userEmail,
        passWord: passWord,
        tk: registrantToken,
        success: (success) => {
          console.log(success)
        },
        error: (error) => {
          console.log(error)
        },
      })
    },
    error: (error) => {
      console.log(error)
    }
  })
}
