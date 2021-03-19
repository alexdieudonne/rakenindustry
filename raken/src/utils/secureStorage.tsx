
//@ts-ignore
import SecureStorage from 'secure-web-storage'


export var CryptoJS = require("crypto-js");

// NOTE: Your Secret Key should be user inputed or obtained through a secure authenticated request.
//       Do NOT ship your Secret Key in your code.

export function hash(key:any) {
    key = CryptoJS.SHA256(key, SECRET_KEY);

    return key.toString();
}

export function decrypt(data: any) {
    data = CryptoJS.AES.decrypt(data, SECRET_KEY);

    data = data.toString(CryptoJS.enc.Utf8);

    return data;
}

export function encrypt(data: any) {
    data = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY);

    data = data.toString();

    return data;
}


export var SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

export var secureStorage = new SecureStorage(sessionStorage, {
    hash: function hash(key: any) {
        key = CryptoJS.SHA256(key, SECRET_KEY);

        return key.toString();
    },
    encrypt: function encrypt(data: any) {
        data = CryptoJS.AES.encrypt(data, SECRET_KEY);

        data = data.toString();

        return data;
    },
    decrypt: function decrypt(data: any) {
        data = CryptoJS.AES.decrypt(data, SECRET_KEY);

        data = data.toString(CryptoJS.enc.Utf8);

        return data;
    }
});

export var secureLocalStorage = new SecureStorage(localStorage, {
    hash: function hash(key: any) {
        key = CryptoJS.SHA256(key, SECRET_KEY);

        return key.toString();
    },
    encrypt: function encrypt(data: any) {
        data = CryptoJS.AES.encrypt(data, SECRET_KEY);
       

        data = data.toString();

        return data;
    },
    decrypt: function decrypt(data: any) {
        data = CryptoJS.AES.decrypt(data, SECRET_KEY);

        data = data.toString(CryptoJS.enc.Utf8);

        return data;
    }
});

export var data = {
    secret: 'data'
};

    // there is no need to stringify/parse you objects before and after storing.

    // secureStorage.setItem('data', data);
    // // stores in localStorage like:
    // // key => value
    // // "ad36d572..." => "w1svi6n..."

    // var decryptedData = secureStorage.getItem('data');
    // // returns { secret: 'data' }

    // secureStorage.removeItem('data');
    // removes the entry 'data'

    // secureStorage.key(id)
    // returns the hashed version of the key you passed into setItem with the given id.

    // secureStorage.clear();
    // clears all data in the underlining sessionStorage/localStorage.

    // secureStorage.length;
    // the number of entries in the underlining sessionStorage/localStorage.


