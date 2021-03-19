import React, { Component, useEffect, useState } from 'react';
import './styles.css'
import { Collapse, Button, CardBody, Card, Label, Col, CardTitle, CardText } from 'reactstrap';
import "react-step-progress-bar/styles.css";
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme, ThemeProvider, } from '@material-ui/core/styles';
// @ts-ignore
import FloatingLabelInput from 'react-floating-label-input';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import ReactLoading from 'react-loading'
import empty from '../../../assets/empty.svg'

import { stringify } from 'querystring';
import { useDispatch, useSelector } from 'react-redux';
import { listAdresses, getAdresse, addAdress, updateListAdresses, deleteListAdresses, chooseAdresse } from '../../../redux/actions/adressActions';


interface PROPS {
    setAdresses: (arg: any) => void,
    setState: () => void,
    match?: any,
    setAdressesInput: (arg: any) => void,
    adressesInput: any,
    setNewAdress: (arg: boolean) => void,
    adressesValidators: any,

    newAdress: boolean,


    surnameValidator: boolean,
    surname: string | null,


    nameValidator: boolean,
    name: string | null,

    adressValidator: boolean,
    adress: string | null,

    adress_more: string | null,
    more_info: string | null,

    zipCodeValidator: boolean,
    zipCode: string | null,

    cityValidator: boolean,
    city: string | null,

    countryValidator: boolean,
    country: string | null,

    phoneValidator: boolean,
    phoneNumber: string | null
}




const BlackRadio = withStyles({
    root: {
        color: 'grey',
        '&$checked': {
            color: 'grey',
        },
    },
    checked: {
        color: 'grey',
        '&$checked': {
            color: 'black',
        },
    },
})((props: RadioProps) => <Radio color="default" {...props} />);


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                width: '84%',
                // padding: 0,
            },
            '& label.Mui-focused': {
                color: 'green',
            },
            '& .MuiInput-underline:after': {
                borderColor: 'black',
            },
            '& .MuiOutlinedInput-root': {


                '&.Mui-focused fieldset': {
                    borderColor: 'black',
                },
            }
        },

    }),
);

export default function Adresses(props: PROPS) {

    const handleNewAdress = () => {
        props.setNewAdress(true)
        // props.setState()
    }

    const addAdresse = (adresse: any) => {
        dispatch(addAdress(adresse, '/checkout'))
    }

    const removeAdresse = (adresseId: number) => {
        setSelectedValue('')
        dispatch(deleteListAdresses(adresseId))
    }

    //@ts-ignore
    const listAdresse = useSelector((state) => state.adresseList);
    const { loading, error, adresses } = listAdresse;

 

    //@ts-ignore
    const adress = useSelector((state) => state.adresseGet);
    const { adresse } = adress;

    const dispatch = useDispatch()


    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const newAddress = urlParams.get('newAddress')



    const idAdress = urlParams.get('id')

    //@ts-ignore
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin

    useEffect(() => {
        // console.log(String(idAdress)) 
        if (!adresses && newAddress != 'delivery') {
            dispatch(listAdresses())
        } else if (newAddress == 'delivery') {


            if (!adresse && idAdress) {
                console.log(idAdress)
                dispatch(getAdresse(String(idAdress)))

            } if (userInfo) {
                props.setAdressesInput({
                    ...props.adressesInput,
                    surname: userInfo.firstname,
                    Name: userInfo.lastname,
                    PhoneNumber: userInfo.phone_number,

                })
            }
        }

        if (idAdress && adresse) {

            props.setAdressesInput({
                ...props.adressesInput,
                surname: adresse.firstname,
                Name: adresse.lastname,
                Adress: adresse.adress,
                AdressMore: adresse.adress_more,
                ZipCode: adresse.zip_code,
                City: adresse.city,
                Country: adresse.country,
                PhoneNumber: adresse.phone_number,
                MoreInfo: adresse.more_info
            })
        }
        if (adresses?.length > 0) {
            dispatch(chooseAdresse(adresses[0]._id))
            setSelectedValue(adresses[0]._id)
        }


    }, [dispatch, idAdress, newAddress, adresses, adresse])





    const [adresseSet, setAdress] = React.useState([
        {
            id: 1,
            name: 'Alex',
            surname: 'Dieudonne',
            adress: '19 rue de seine',
            adress_more: 'chez n\'choby',
            zipcode: '91800',
            city: 'corbeil-essonnes',
            country: 'France',
            phoneNumber: '0618105089',
            more_info: ''
        },
        {
            id: 2,
            name: 'Alex',
            surname: 'Dieudonne',
            adress: '62 rue julien lacroix',
            adress_more: 'chez n\'choby',
            zipcode: '91800',
            city: 'corbeil-essonnes',
            country: 'France',
            phoneNumber: '0618105089',
            more_info: ''
        },
    ])

    const [selectedValue, setSelectedValue] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(chooseAdresse(event.target.value))
        setSelectedValue(event.target.value);
    };

    const handleValueChange = (evt: any) => {
        // console.log(evt)

        if (evt.target.id == 'surname') {
            props.setAdressesInput({ ...props.adressesInput, surname: evt.target.value })
            if (evt.target.value.length <= 0) {
                props.setAdresses({ ...props.adressesValidators, surname: true })
            } else {
                props.setAdresses({ ...props.adressesValidators, surname: false })
            }
        } else if (evt.target.id == 'name') {
            props.setAdressesInput({ ...props.adressesInput, Name: evt.target.value })
            if (evt.target.value.length <= 0) {
                props.setAdresses({ ...props.adressesValidators, Name: true })
            } else {
                props.setAdresses({ ...props.adressesValidators, Name: false })
            }
        } else if (evt.target.id == 'adress') {
            props.setAdressesInput({ ...props.adressesInput, Adress: evt.target.value })
            if (evt.target.value.length <= 0) {
                props.setAdresses({ ...props.adressesValidators, Adress: true })
            } else {
                props.setAdresses({ ...props.adressesValidators, Adress: false })
            }
        } else if (evt.target.id == 'adress_more') {
            props.setAdressesInput({ ...props.adressesInput, AdressMore: evt.target.value })
            if (evt.target.value.length <= 0) {
                props.setAdresses({ ...props.adressesValidators, AdressMore: true })
            } else {
                props.setAdresses({ ...props.adressesValidators, AdressMore: false })
            }
        } else if (evt.target.id == 'zipcode') {
            props.setAdressesInput({ ...props.adressesInput, ZipCode: evt.target.value })
            if (evt.target.value.length <= 0) {
                props.setAdresses({ ...props.adressesValidators, ZipCode: true })
            } else {
                props.setAdresses({ ...props.adressesValidators, ZipCode: false })
            }
        } else if (evt.target.id == 'city') {
            props.setAdressesInput({ ...props.adressesInput, City: evt.target.value })
            if (evt.target.value.length <= 0) {
                props.setAdresses({ ...props.adressesValidators, City: true })
            } else {
                props.setAdresses({ ...props.adressesValidators, City: false })
            }
        } else if (evt.target.id == 'country') {
            props.setAdressesInput({ ...props.adressesInput, Country: evt.target.value })
            if (evt.target.value.length <= 0) {
                props.setAdresses({ ...props.adressesValidators, Country: true })
            } else {
                props.setAdresses({ ...props.adressesValidators, Country: false })
            }
        } else if (evt.target.id == 'phone_number') {
            props.setAdressesInput({ ...props.adressesInput, PhoneNumber: evt.target.value })
            if (evt.target.value.length <= 0) {
                props.setAdresses({ ...props.adressesValidators, PhoneNumber: true })
            } else {
                props.setAdresses({ ...props.adressesValidators, PhoneNumber: false })
            }
        } else if (evt.target.id == 'more_info') {
            props.setAdressesInput({ ...props.adressesInput, MoreInfo: evt.target.value })
        }

    }

    const formSubmit = (e: any) => {
        e.preventDefault();

        // if(parseMobile(props.adress)){

        if (newAddress == 'delivery' || adresse?.length < 0) {
            if (!props.surnameValidator == false || !props.surname ||
                props.surname.length <= 0 || !props.nameValidator == false ||
                //@ts-ignore
                props.name.length <= 0
                || !props.name ||
                !props.adressValidator == false || !props.adress ||
                props.adress.length <= 0 ||
                !props.zipCodeValidator == false || !props.zipCode ||
                props.zipCode.length <= 0 ||
                !props.city || !props.cityValidator == false ||
                props.city.length <= 0 ||
                !props.countryValidator == false || !props.country ||
                props.country.length <= 0 ||
                !props.phoneValidator == false ||
                //@ts-ignore
                props.phoneNumber?.length <= 0) {


                props.setAdresses({
                    ...props.adressesValidators,
                    Name: props.name == null ? true : false || props.name.length <= 0 ? true : false,
                    surname: !props.surname ? true : false || props.surname.length <= 0,
                    Adress: !props.adress ? true : false || props.adress.length <= 0,
                    ZipCode: !props.zipCode ? true : false || props.zipCode.length <= 0,
                    City: !props.city ? true : false || props.city.length <= 0,
                    Country: !props.country ? true : false || props.country.length <= 0,
                    PhoneNumber: !props.phoneNumber ? true : false || props.phoneNumber.length <= 0,
                })
            } else {
                if (adresseSet.length < 0 || newAddress == 'delivery') {
                    if (!idAdress) {
                        addAdresse({
                            firstname: props.name,
                            lastname: props.surname,
                            adress: props.adress,
                            adress_more: props.adress_more,
                            zip_code: props.zipCode,
                            city: props.city,
                            country: props.country,
                            phone_number: props.phoneNumber,
                            more_info: props.more_info,
                        })
                    } else {
                        //  addAdresse()
                        dispatch(updateListAdresses({
                            firstname: props.name,
                            lastname: props.surname,
                            adress: props.adress,
                            adress_more: props.adress_more,
                            zip_code: props.zipCode,
                            city: props.city,
                            country: props.country,
                            phone_number: props.phoneNumber,
                            more_info: props.more_info,
                        }, idAdress, '/checkout'))
                    }
                    //   removeParam('newAddress')
                } else if (selectedValue) {
                    props.setState()
                }
            }

        } else {
            if (selectedValue) {
                props.setState()
            }
            //     removeParam('newAddress')
            //  props.setState()
            // window.location.reload()
            // props.setNewAdress(false)
            // console.log(props.newAdress)
        }
    }

    function htmlEncode(str: string) {
        return String(str).replace(/[^\w. ]/gi, function (c) {
            return '&#' + c.charCodeAt(0) + ';';
        });
    }

    const changeText = (evt: any) => {
        console.log(htmlEncode(evt))
        // props.setAdressesInput({ Adresse: val })
    }

    function addParam(v: string) {
        window.location.search = v;
    }

    function removeParam(parameter: string) {
        window.location.href = window.location.href.split("?")[0]
    }


    // console.log(newAddress == 'delivery');



    return (
        <section className='adress-section'>
            <h2>Adresses</h2>
            <span style={{ textAlign: 'left', width: '90%' }}>L'adresse sélectionnée sera utilisée à la fois comme adresse personnelle (pour la facturation) et comme adresse de livraison.</span>
            <br></br>

            <form
                // className={adresseSet.length < 0 ? classes.root : ''} 
                onSubmit={formSubmit}
            >
                {adresseSet.length < 0 || newAddress == 'delivery' ? <div className='adress-content'>
                    <FloatingLabelInput
                        id="surname"
                        label="Prénom"
                        required
                        value={props.surname}
                        className={props.surname == '' || props.surnameValidator ? 'adress-error' : ''}
                        // onBlur={action('onBlur')}
                        onChange={(evt: any) => handleValueChange(evt)}
                    // onFocus={action('onFocus')}
                    // value={'value'}
                    />
                    {props.surname == '' || props.surnameValidator ? <div style={{ marginTop: 20, width: '100%' }}>
                        <Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc' }}>
                            <CardText color='red' style={{ color: 'red' }}>Ce champ ne peut etre vide.</CardText>
                        </Card>
                    </div> : null}

                    <br></br>
                    <FloatingLabelInput
                        id="name"
                        label="Nom"
                        required
                        className={props.name == '' || props.nameValidator ? 'adress-error' : ''}
                        onChange={(evt: any) => handleValueChange(evt)}
                        // onBlur={action('onBlur')}
                        // onFocus={action('onFocus')}
                        value={props.name}
                    />
                    {props.name == '' || props.nameValidator ? <div style={{ marginTop: 20, width: '100%' }}>
                        <Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc' }}>
                            <CardText color='red' style={{ color: 'red' }}>Ce champ ne peut etre vide.</CardText>
                        </Card>
                    </div> : null}

                    <br></br>
                    <FloatingLabelInput
                        id="adress"
                        label="Adresse"
                        required
                        value={props.adress}
                        className={props.adress == '' || props.adressValidator ? 'adress-error' : ''}
                        onChange={(evt: any) => handleValueChange(evt)}
                    // onBlur={action('onBlur')}
                    // onChange={action('onChange')}
                    // onFocus={action('onFocus')}
                    // value={'value'}
                    />
                    {props.adress == '' || props.adressValidator ? <div style={{ marginTop: 20, width: '100%' }}>
                        <Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc' }}>
                            <CardText color='red' style={{ color: 'red' }}>Ce champ ne peut etre vide.</CardText>
                        </Card>
                    </div> : null}
                    <br></br>


                    <FloatingLabelInput
                        id="adress_more"
                        label="Complément d'adresse (facultatif)"
                        fontSize={12}
                        multiline
                        value={props.adress_more}
                        onChange={(evt: any) => handleValueChange(evt)}
                    // onBlur={action('onBlur')}
                    // onFocus={action('onFocus')}
                    // value={'value'}
                    />

                    <div className='mb-4'></div>
                    <FloatingLabelInput
                        id="zipcode"
                        type={'number'}
                        label="Code postal"
                        value={props.zipCode}
                        required
                        className={props.zipCode == '' || props.zipCodeValidator ? 'adress-error' : ''}
                        onChange={(evt: any) => handleValueChange(evt)}
                    // onBlur={action('onBlur')}
                    // onFocus={action('onFocus')}
                    // value={'value'}
                    />
                    {props.zipCode == '' || props.zipCodeValidator ? <div style={{ marginTop: 20, width: '100%' }}>
                        <Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc' }}>
                            <CardText color='red' style={{ color: 'red' }}>Code postal invalide.</CardText>
                        </Card>
                    </div> : null}


                    <div className='mb-4'></div>
                    <FloatingLabelInput
                        id="city"
                        label="Ville"
                        value={props.city}
                        required
                        maxlength="64"
                        className={props.city == '' || props.cityValidator ? 'adress-error' : ''}
                        onChange={(evt: any) => handleValueChange(evt)}
                    // onBlur={action('onBlur')}
                    // onChange={action('onChange')}
                    // onFocus={action('onFocus')}
                    // value={'value'}
                    />
                    {props.city == '' || props.cityValidator ? <div style={{ marginTop: 20, width: '100%' }}>
                        <Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc' }}>
                            <CardText color='red' style={{ color: 'red' }}>Ce champ ne peut etre vide.</CardText>
                        </Card>
                    </div> : null}


                    <div className='mb-4'></div>
                    <FloatingLabelInput
                        id="country"
                        label="Pays"
                        value={props.country}
                        required
                        className={props.country == '' || props.cityValidator ? 'adress-error' : ''}
                        onChange={(evt: any) => handleValueChange(evt)}
                    // onBlur={action('onBlur')}
                    // onChange={action('onChange')}
                    // onFocus={action('onFocus')}
                    // value={'value'}
                    />
                    {props.country == '' || props.countryValidator ? <div style={{ marginTop: 20, width: '100%' }}>
                        <Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc' }}>
                            <CardText color='red' style={{ color: 'red' }}>Ce champ ne peut etre vide.</CardText>
                        </Card>
                    </div> : null}

                    <div className='mb-4'></div>
                    <FloatingLabelInput
                        id="phone_number"
                        label="Numero de téléphone"
                        value={props.phoneNumber}
                        required
                        className={props.phoneNumber == '' || props.phoneValidator ? 'adress-error' : ''}
                        onChange={(evt: any) => handleValueChange(evt)}
                        type={'number'}
                        maxlength='12'
                    // onBlur={action('onBlur')}
                    // onChange={action('onChange')}
                    // onFocus={action('onFocus')}
                    //  value={props.phoneNumber}
                    />

                    {props.phoneNumber == '' || props.phoneValidator ? <div style={{ marginTop: 20, width: '100%' }}>
                        <Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc' }}>
                            <CardText color='red' style={{ color: 'red' }}>Le numéro de téléphone est invalide.</CardText>
                        </Card>
                    </div> : null}
                    <div className='mb-2'></div>
                    <br />
                    <span className='adress-info'>Si vous voulez nous laisser un message à propos de votre commande, merci de bien vouloir le renseigner dans le champ ci-dessous</span>

                    <TextField onChange={(evt: any) => handleValueChange(evt)} value={props.more_info} placeholder="Ajoutez plus d'information" style={{ width: '100%' }} id="more_info" multiline variant="outlined" />
                </div> :
                    <div className='d-flex flex-wrap selction adresses'>
                        {loading ? <div className='loading-spinner'> <ReactLoading type={'spinningBubbles'} className='loading-spinner-content' height={80} width={60} color={"#000"} /><h2 style={{ textAlign: 'center' }}>Chargement ...</h2></div> :
                            error ? <Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc', margin: "2rem" }}>
                                <CardText color='red' style={{ color: 'red' }}>{error}</CardText>
                            </Card> :
                                adresses.length == 0 ?
                                    <div className='d-flex flex-column justify-content-center'>
                                        <h4 style={{ fontWeight: 700 }} className='text-center  font-weight-bold'>Pas d'adresses !</h4>
                                        <img className='mt-4 mh-50' style={{ maxHeight: "20rem" }} src={empty} alt="React Logo" />

                                    </div> :
                                    adresses.map((item: any, key: number) => {
                                        return (

                                            <div key={key} className={selectedValue === item._id.toString() ? "card border-dark adress-card" : "card border-grey adress-card"} >

                                                <div>
                                                    <BlackRadio
                                                        // onSubmit={(val: any) => (console.log(val))}
                                                        checked={selectedValue === item._id.toString()}
                                                        onChange={handleChange}
                                                        value={item._id.toString()}
                                                        required
                                                        color="default"
                                                        name="radio-button-demo"
                                                        inputProps={{ 'aria-label': 'E' }}
                                                        size="small"
                                                    />
                                                    <span style={{ color: selectedValue === item._id.toString() ? 'black' : 'grey' }}>Mon adresse {item.id == 1 ? '' : item.id}</span>
                                                </div>


                                                <div className="card-body ">
                                                    <p style={{ color: selectedValue === item._id.toString() ? 'black' : 'grey' }} className="card-text">{item.firstname} {item.lastname}</p>
                                                    <p style={{ color: selectedValue === item._id.toString() ? 'black' : 'grey' }} className="card-text">{item.lastname}</p>
                                                    <p style={{ color: selectedValue === item._id.toString() ? 'black' : 'grey' }} className="card-text">{item.adress}</p>
                                                    <p style={{ color: selectedValue === item._id.toString() ? 'black' : 'grey' }} className="card-text">{item.adress_more}</p>
                                                    <p style={{ color: selectedValue === item._id.toString() ? 'black' : 'grey' }} className="card-text">{item.zip_code} {item.city}</p>
                                                    <p style={{ color: selectedValue === item._id.toString() ? 'black' : 'grey' }} className="card-text">{item.phone_number}</p>
                                                </div>


                                                <div className={selectedValue === item._id.toString() ? "card-footer bg-transparent d-flex justify-space-between border-dark" : "card-footer bg-transparent d-flex justify-space-between border-grey"}>
                                                    <div className='d-flex icons_actions'>
                                                        <span className='footer-card-text' style={{ color: selectedValue === item._id.toString() ? 'black' : 'grey' }}><a href="#" onClick={() => addParam(`newAddress=delivery&id=${item._id}`)}><i className="fal fa-pencil-alt"></i>modifier</a></span>
                                                    </div>
                                                    <div onClick={() => removeAdresse(item._id)} className='d-flex icons_actions'>
                                                        <span className='footer-card-text' style={{ color: selectedValue === item._id.toString() ? 'black' : 'grey' }}><a href="#"><i className="fal fa-trash"></i>supprimer</a></span>
                                                    </div>

                                                </div>
                                            </div>)
                                    })
                        }


                        <div className='button-add-adress'>
                            {/* <i className='fal fa-plus' style={{fontSize:18}}/> */}

                            <div ><span><a onClick={() => addParam('newAddress=delivery')} ><i className="fal fa-plus" ></i>Ajouter une nouvelle adresse</a></span></div>
                        </div>


                    </div>

                }


                <div className='buttons-confirm-cancel'>
                    {/* button */}
                    <div style={{ justifyContent: 'center', display: 'flex', cursor: selectedValue ? "pointer" : newAddress == 'delivery' ? "pointer" : "not-allowed", margin: "20px auto" }}>
                        <button type={'submit'} disabled={newAddress ? false : !selectedValue ? true : false} style={{ pointerEvents: selectedValue ? "all" : newAddress == 'delivery' ? "all" : "none", }} className={selectedValue ? 'button-command' : 'confirmButton'}>
                            Confirmer
                    </button>
                    </div>
                    {newAddress == 'delivery' ? <button onClick={() => window.location.href = '/checkout'} type={'button'} className='confirmButton'>
                        Annuler
                        </button > : null}
                </div>

            </form>

        </section>
    )
}
