import React, { useEffect } from 'react'
import './breadcrumb.css'
import withBreadcrumbs from "react-router-breadcrumbs-hoc";


export default function Breadcrumbs(props: BreadcrumbsPROPS) {

    const { urlPath, condition, name } = props

    const Breadcrumbs = withBreadcrumbs()(({ breadcrumbs }, key) => (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {breadcrumbs.map(({ breadcrumb }: any, key) => <li key={key} className="breadcrumb-item"><a href={breadcrumb.key}>{name ? key == breadcrumbs.length - 1 ? name : breadcrumb : breadcrumb.props.children == 'Cart' ? 'Votre Panier' : breadcrumb.props.children == 'Home' ? 'Acceuil' : breadcrumb.props.children == 'Account' ? 'Mon Compte' : breadcrumb.props.children == 'Eshop' ? 'Eshop' : breadcrumb.props.children.includes(condition) ? urlPath : breadcrumb}</a></li>)}
            </ol>
        </nav>
    ));

    return (
        <Breadcrumbs />
    )
}


interface BreadcrumbsPROPS {
    urlPath?: string | null
    condition?: string
    name?: String
}