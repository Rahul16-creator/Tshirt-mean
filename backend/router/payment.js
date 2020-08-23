const razorpay=require('razorpay')

const RazorpayConfig={
    key_id:'',
    kew_secret:""
},
const instance=new razorpay(RazorpayConfig)

module.exports.RazorpayConfig=RazorpayCongig
module.exports.instance=instance