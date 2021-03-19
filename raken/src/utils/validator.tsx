import { encrypt, decrypt } from '../utils/secureStorage'

export const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

export const regexNumber = RegExp("^[0-9]+$");

export const birthdayRegex = RegExp(
    "([0-9]{2})\/([0-9]{2})\/([0-9]{4})"
);


export const formValid = ({ formErrors, ...rest }: any) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach((val: any) => {
        val.length > 0 && (valid = false);

    });

    // validate the form was filled out
    Object.values(rest).forEach((val: any) => {
        val === null && (valid = false);
       ///   console.log(val)
    });


    return valid;
};


export const handleChange = (e: any, formErrors: any, state: any, setState: (arg: any) => void) => {
    e.preventDefault();
    const { name, value } = e.target;
    // let pass = name == "password" ? value : ""


    switch (name) {

        case "firstname":
            formErrors.firstname =
                value.length < 3 ? "minimum 3 characaters required" : "";
            break;
        case "lastname":
            formErrors.lastname =
                value.length < 3 ? "minimum 3 characaters required" : "";
            break;
        case "adress":
            formErrors.adress =
                value.length < 3 ? "minimum 3 characaters required" : "";
            break;
        case "zip_code":
            formErrors.zip_code =
                value.length < 3 ? "minimum 3 characaters required" : regexNumber.test(value) ? "" : "Ce champs doit etre un nombre";
            break;
        case "city":
            formErrors.city =
                value.length < 3 ? "minimum 3 characaters required" : "";
            break;
        case "country":
            formErrors.country =
                value.length < 3 ? "minimum 3 characaters required" : "";
            break;

        case "email":
            formErrors.email = emailRegex.test(value)
                ? ""
                : "invalid email address";
            break;
        case "password":
            formErrors.password = value.length < 6 ? "minimum 6 characaters required" : "";
            break;
        case "c_password":
            formErrors.c_password = value.length < 6 ? "minimum 6 characaters required" : state.password != value ? "Les deux champs doivent etre identiques" : "";
            break;
        case "phone_number":
            formErrors.phone_number =
                value.length < 6 ? "minimum 6 characaters required" : regexNumber.test(value) ? "" : "Ce champs doit etre un nombre";
            break;
        default:
            break;
    }

    setState({ formErrors, [name]: value })

   
    setState({ ...state, [name]: value })
};


// login props

export const handleSubmitUpdate = (e: React.FormEvent<EventTarget>, state: any, setErrors: (arg: any) => void, updateProfile:() => void) => {
    e.preventDefault();

    var errors = {}
    var value: any = null;
    const {
        firstname,
        lastname,
        email,
        phone_number,
    } = state.formErrors

    for (const property in state) {
        if (property == "formErrors")
            value = state[property];

    }

    for (const property in state) {
        if (property != "formErrors" && state.password)
            errors = { ...errors, password: state.password != state.c_password ? "Les deux champs doivent etre identiques" : "", c_password: state.password != state.c_password ? "Les deux champs doivent etre identiques" : "" }

        const val = property != "formErrors" ? state[property] == null && property != "phone_number" ? 'Ce champs ne peut etre vide' : value[property] : ""
        if (property != "formErrors" || state[property] == null)
            errors = { ...errors, [property]: val }
    }
    setErrors({ ...state.formErrors, errors })

    setTimeout(() => {
        setErrors({ ...state.formErrors, errors })
        if (firstname.length != 0 || lastname.length != 0 || email.length != 0 || phone_number.length != 0) {
            console.error(errors)
            setErrors({ ...state.formErrors, errors })
        } else {
            updateProfile()
           // document.location.href = `/account`;
        }
    }, 1000)
};



export const handleSubmitPassword = (e: React.FormEvent<EventTarget>, state: any, setErrors: (arg: any) => void, changePassword:() => void) => {
    e.preventDefault();

    var errors = {} as any
    var value: any = null;
    const {
        password,
        c_password
    } = state.formErrors

    for (const property in state) {
        if (property == "formErrors")
            value = state[property];
    }
    for (const property in state) {
        if (property != "formErrors" && state.password)
            errors = { ...errors, password: state.password != state.c_password ? "Les deux champs doivent etre identiques" : "", c_password: state.password != state.c_password ? "Les deux champs doivent etre identiques" : "" }

        const val = property != "formErrors" ? state[property] == null ? 'Ce champs ne peut etre vide' : value[property] : ""
        if (property != "formErrors" || state[property] == null)
            errors = { ...errors, [property]: val }
    }
    setErrors({ ...state.formErrors, errors })

    if (errors.password.length != 0 || errors.c_password.length != 0) {
       // console.error(errors)
        setErrors({ ...state.formErrors, errors })
    } else {
        changePassword()
       // document.location.href = `/account/change-password`;
    }
};


export const handleSubmitAdresse = (e: React.FormEvent<EventTarget>, state: any, setErrors: (arg: any) => void, addAdresse:(arg: any) => void) => {
    e.preventDefault();
    // console.log(setErrors )


    if (!state.firstname || !state.lastname || !state.adress || !state.zip_code || !state.city || !state.country || !state.phone_number) {

        setErrors({
            firstname: !state.formErrors.firstname ? state.firstname == null ? 'Ce champs ne peut etre vide' : '' : state.formErrors.firstname,
            lastname: !state.formErrors.lastname ? state.lastname == null ? 'Ce champs ne peut etre vide' : "" : state.formErrors.lastname,
            adress: !state.formErrors.adress ? state.adress == null ? 'Ce champs ne peut etre vide' : "" : state.formErrors.adress,
            zip_code: !state.formErrors.zip_code ? state.zip_code == null ? 'Ce champs ne peut etre vide' : "" : state.formErrors.zip_code,
            city: !state.formErrors.city ? state.city == null ? 'Ce champs ne peut etre vide' : "" : state.formErrors.city,
            country: !state.formErrors.country ? state.country == null ? 'Ce champs ne peut etre vide' : "" : state.formErrors.country,
            phone_number: !state.formErrors.phone_number ? state.phone_number == null ? 'Ce champs ne peut etre vide' : "" : state.formErrors.phone_number,
        });

    } else {
        const adress_more = state.adress_more
        const more_info = state.more_info

        const state20 = {...state, adress_more, more_info}
        if(!state.adress_more)
        delete state.adress_more;
        if(!state.more_info)
        delete state.more_info;
        



        if (formValid(state)) {
            addAdresse(state20)
          //  console.log(state20)
         

           // document.location.href = `/account/address-book/`;;
        } else {
            console.error(state.formErrors);
        }
    }
};



interface loginProps {
    email: string | null
    password: string | null
    formErrors: {
        email: string
        password: string,
    }
}
