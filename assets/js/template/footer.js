import React from 'react';
import Container from "@material-ui/core/Container";

export default function Footer() {
    return (
        <Container>
            &copy; {(new Date()).getFullYear()} EvacFlorida.com
        </Container>
    );
}