ZoomMtg.setZoomJSLib('https://source.zoom.us/2.9.5/lib', '/av')

ZoomMtg.preLoadWasm()
ZoomMtg.prepareWebSDK()
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US')
ZoomMtg.i18n.reload('en-US')

// setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
var signatureEndpoint = 'https://ybami8c770.execute-api.us-east-1.amazonaws.com/latest'
var sdkKey = 'XgkIvvHHyAK9na3ZPQVuB8fSU8T3kKghPSWR'
var meetingNumber = '99223103673'
var role = 1
var leaveUrl = 'https://zoom.us/meeting/tJ0vdeqprjgsHddmdQLBrVkBbjFYs3YyXnRj/postsurvey?tk=JrE89kjj9zfg3UyB3AkUGEzQgI4ZIAGQSNrExqtrB7U.DQMAAAAXGihouRYtSllvZXp5S1RfYU5oMENjSTh2SWxRFW1hZG1heEBrZWxtYWdhb2F5LmNvbQdNYWQgTWF4AAAAAAAAAAAAAAAAAAAAAAAAGFV6K3NQTGRjUXpxaW1CdUV2WTJiaGc9PQA'
var userName = 'ClientView'
var userEmail = ''
var passWord = ''
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
