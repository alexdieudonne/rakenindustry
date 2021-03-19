import moment from 'moment'
import { encrypt, decrypt } from '../utils/secureStorage'

import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux'

export const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
export const birthdayRegex = RegExp(
    "([0-9]{2})\/([0-9]{2})\/([0-9]{4})"
);

export const RAKEN_URL = "http://localhost:4100"

export const formValid = ({ formErrors, ...rest }: any) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach((val: any) => {
        val.length > 0 && (valid = false);
        //  console.log(formErrors)
    });

    // validate the form was filled out
    Object.values(rest).forEach((val: any) => {
        val === null && (valid = false);
        //  console.log(val)
    });


    return valid;
};

export function stringToDate(_date:any,_format:string,_delimiter:string)
{
            var formatLowerCase=_format.toLowerCase();
            var formatItems=formatLowerCase.split(_delimiter);
            var dateItems=_date.split(_delimiter);
            var monthIndex=formatItems.indexOf("mm");
            var dayIndex=formatItems.indexOf("dd");
            var yearIndex=formatItems.indexOf("yyyy");
            var month=parseInt(dateItems[monthIndex]);
            month-=1;
            var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
            return formatedDate;
}


function getFormattedDate(date: any) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return day + '/' + month + '/' + year;
}


export const handleChange = (e: any, formErrors: errorsProps, state: any, setState: (arg: any) => void) => {
    e.preventDefault();
    const { name, value } = e.target;

    switch (name) {
        case "firstName":
            formErrors.firstName =
                value.length < 3 ? "minimum 3 characaters required" : '';
            break;
        case "lastName":
            formErrors.lastName =
                value.length < 3 ? "minimum 3 characaters required" : "";
            break;
        case "email":
            formErrors.email = emailRegex.test(value)
                ? ""
                : "invalid email address";
            break;
        case "password":
            formErrors.password =
                value.length < 6 ? "minimum 6 characaters required" : "";
            break;
        case "birthday":
            const date = new Date(value.toString());
            var dateObject = getFormattedDate(date);
            // console.log(getFormattedDate(date))
            formErrors.birthday = birthdayRegex.test(dateObject.toString())
                ? ""
                : "invalid birthday format";
            break;
        default:
            break;
    }

    // setErrors({
    //     firstName: value.length < 3 ? "minimum 3 characaters required" : '',
    //     lastName: value.length < 3 ? "minimum 3 characaters required" : "",
    //     email: emailRegex.test(value) ?'': "minimum 6 characaters required" ,
    //     password: value.length < 6 ? "minimum 6 characaters required" : "",
    //     birthday: ''
    // });
    setState({ formErrors, [name]: value })

    const date = new Date(value.toString());
    var dateObject = getFormattedDate(date);

    setState({ ...state, [name]: name == 'birthday' ? dateObject.toString() : value })
    // console.log(state)
    // setError({...formErrors, formErrors: {[name]: value }});
};



export const handleSubmit = (e: React.FormEvent<EventTarget>, state: stateProps, setErrors: (arg: errorsProps) => void, checked: Checked, setErrorCheckBox: (arg: any) => void, addUser: any) => {
    e.preventDefault();



    if (state.firstName == null || state.lastName == null || state.email == null || state.password == null || !state.gender || !checked.box1) {
        // console.log(state)

        setErrors({
            firstName: !state.formErrors.firstName ? state.firstName == null ? 'Ce champs ne peut etre vide' : '' : state.formErrors.firstName,
            lastName: !state.formErrors.lastName ? state.lastName == null ? 'Ce champs ne peut etre vide' : '' : state.formErrors.lastName,
            email: !state.formErrors.email ? state.email == null ? 'Ce champs ne peut etre vide' : '' : state.formErrors.email,
            password: !state.formErrors.password ? state.password == null ? 'Ce champs ne peut etre vide' : '' : state.formErrors.password,
            birthday: '',
            gender: !state.formErrors.gender ? state.gender == null ? 'Ce champs ne peut etre vide' : '' : state.formErrors.gender,
        });

        setErrorCheckBox({ box1: !checked.box1 ? 'Merci d\'accepter les conditions' : '' })

    } else {

        const birthday = state.birthday
        const gender = state.gender

        delete state.birthday;

        if (formValid(state)) {

            addUser({
                firstname: state.firstName,
                lastname: state.lastName,
                email: state.email,
                password: state.password,
                birthday: birthday,
                gender: gender,
                newsletter: checked.box2,
            })

            // document.location.href = `/connexion?${encrypt('success')}`;;
        } else {
            console.log(gender)
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
    }


};






interface stateProps {
    firstName: string | null
    lastName: string | null
    email: string | null
    password: string | null
    birthday?: string | null
    gender?: string | null,
    formErrors: {
        firstName: string
        lastName: string
        email: string
        password: string,
        birthday?: string
        gender: string
    }
}

interface errorsProps {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    birthday: string,
    gender: string
}

interface Checked {
    box1: boolean,
    box2: boolean,
    formError: {
        box1: string
    }
}




// login props

export const handleSubmitLogin = (e: React.FormEvent<EventTarget>, state: loginProps, setErrors: (arg: loginErrorsProps) => void, addUser: (arg: userLoginPROPS) => void) => {
    e.preventDefault();



    if (state.email == null || state.password == null) {
       //  console.log(state)
        setErrors({
            email: !state.formErrors.email ? state.email == null ? 'Ce champs ne peut etre vide' : '' : state.formErrors.email,
            password: !state.formErrors.password ? state.password == null ? 'Ce champs ne peut etre vide' : '' : state.formErrors.password,
        });

    } else {
        if (formValid(state)) {
            console.log("ere")
            addUser({ email: state.email, password: state.password })
        } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
    }
};


export const handleChangeLogin = (e: any, formErrors: loginErrorsProps, state: any, setState: (arg: any) => void) => {
    e.preventDefault();
    const { name, value } = e.target;

    switch (name) {
        case "email":
            formErrors.email = emailRegex.test(value)
                ? ""
                : "invalid email address";
            break;
        case "password":
            formErrors.password =
                value.length < 6 ? "minimum 6 characaters required" : "";
            break;
        default:
            break;
    }

    setState({ formErrors, [name]: value })
    setState({ ...state, [name]: value })
};

interface loginProps {
    email: string | null
    password: string | null
    formErrors: {
        email: string
        password: string,
    }
}

interface userLoginPROPS {
    email: string
    password: string,
};

interface loginErrorsProps {
    email: string,
    password: string,
}



