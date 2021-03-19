//import liraries
import React, { Component, ReactChildren, ReactChild } from 'react';
import { ComponentProps } from 'react';
import { ButtonHTMLAttributes } from 'react';
import { DetailedHTMLProps } from 'react';
import './Button.css'

const STYLES = [
    'btn--primary',
    'btn--outline'
]

const SIZES = [
    'btn--medium',
    'btn-large'
]
// children: ReactChild | ReactChildren;
interface ButtonOptions {
    children?: ReactChild | ReactChildren;
    type?: 'submit' | 'reset' | 'button';
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    buttonStyle: string,
    buttonSize?: number
}

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}: ButtonOptions) => {
    const checkButtonStyle = STYLES.includes(buttonStyle?'':buttonStyle) ? buttonStyle : STYLES[0]
    const checkButtonSize = STYLES.includes(buttonStyle) ? buttonSize : STYLES[0]

    return (
        <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
            {children}
        </button>
    )
}
