import React from 'react';

export default function Footer(){
    return (
        <span>&copy; {(new Date()).getFullYear()} EvacFlorida.com</span>
    );
}