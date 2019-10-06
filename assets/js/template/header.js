import React from 'react';
import Nav from "./nav";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

export default function Header(){
    return (
        <Container>
            <Grid container>
                <Grid item xs={6}>
                    <img src="/logo.png" alt="EVACFlorida" />
                </Grid>
                <Grid item xs={6}>
                    <Nav/>
                </Grid>
            </Grid>
        </Container>
    );
}