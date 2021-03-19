import iconProfil from '../../assets/icons/avatar_white.png'
import shoppingBag from '../../assets/icons/shopping-bag_white.png'

export const MenuItems = [
    {
        title:'Acceuil',
        url: '#',
        iconsLink:'',
        cName:  'nav-links',
        path:''
    },
    {
        title:'E-Shop',
        url: '#',
        iconsLink:'',
        cName:  'nav-links',
        path:'/eshop'
    },
    {
        title:'Compte',
        url: '#',
        iconsLink:iconProfil,
        cName:  'nav-links',
        path:'/connexion'
    },
    {
        title:'Panier',
        url: '#',
        iconsLink:shoppingBag,
        cName:  'nav-links',
        path:'/cart'
    },

]