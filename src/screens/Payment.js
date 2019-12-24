import React from 'react';
import { Platform } from 'react-native';
import Paytm from '@philly25/react-native-paytm';
 
// Data received from PayTM
const paytmConfig = {
    MID: 'Value from PayTM dashboard',
    WEBSITE: 'Value from PayTM dashboard',
    CHANNEL_ID: 'WAP',
    INDUSTRY_TYPE_ID: 'Retail',
    CALLBACK_URL: 'https://securegw.paytm.in/theia/paytmCallback?ORDER_ID='
};
 
export default class Payment extends React.Component {
    componentWillMount() {
        Paytm.addListener(Paytm.Events.PAYTM_RESPONSE, this.onPayTmResponse);
    }
    
    componentWillUnmount() {
        Paytm.removeListener(Paytm.Events.PAYTM_RESPONSE, this.onPayTmResponse);
    }
    
    onPayTmResponse = (resp) => {
        const {STATUS, status, response} = resp;
    
        if (Platform.OS === 'ios') {
          if (status === 'Success') {
            const jsonResponse = JSON.parse(response);
            const {STATUS} = jsonResponse;
    
            if (STATUS && STATUS === 'TXN_SUCCESS') {
              // Payment succeed!
            }
          }
        } else {
          if (STATUS && STATUS === 'TXN_SUCCESS') {
            // Payment succeed!
          }
        }
      };
    
    runTransaction(amount, customerId, orderId, mobile, email, checkSum, mercUnqRef) {
        const callbackUrl = `${paytmConfig.CALLBACK_URL}${orderId}`;
        const details = {
            mode: 'Staging', // 'Staging' or 'Production'
            MID: paytmConfig.MID,
            INDUSTRY_TYPE_ID: paytmConfig.INDUSTRY_TYPE_ID,
            WEBSITE: paytmConfig.WEBSITE,
            CHANNEL_ID: paytmConfig.CHANNEL_ID,
            TXN_AMOUNT: `${amount}`, // String
            ORDER_ID: orderId, // String
            EMAIL: email, // String
            MOBILE_NO: mobile, // String
            CUST_ID: customerId, // String
            CHECKSUMHASH: checkSum, //From your server using PayTM Checksum Utility 
            CALLBACK_URL: callbackUrl,
            MERC_UNQ_REF: mercUnqRef, // optional
        };
        
        Paytm.startPayment(details);
    }
}