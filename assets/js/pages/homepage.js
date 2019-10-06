import React from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

export default function Homepage() {
    return (
        <Container>
            <Grid container>
                <Grid item xs={6}>
                    <span>Heyo</span>
                </Grid>
            </Grid>
        </Container>
    );
}