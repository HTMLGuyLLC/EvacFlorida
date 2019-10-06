import React, {Fragment} from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Checkbox} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    item: {},
    printWrapper: {
        textAlign: 'right',
        marginTop: '.5em',
    }
}));

function printChecklist() {
    window.print();
}

export default function EvacChecklist() {
    const classes = useStyles();

    const items = [
        //basics
        'Wallet/Cash',
        'IDs/Passport',
        'Prescriptions',
        'Clothes/Shoes',
        'Jewelery',
        'Blanks/Pillows',
        'Toiletries',
        'Contacts/Glasses',
        'Water/Food/Can Opener',
        'Sanitizers/Soap',
        'Mobile Devices/Headphones',
        'Chargers/Batteries',

        //documents
        'Insurance Documents',
        'Will/Titles/Deeds',
        'Bonds/Financial Statements',
        'Birth Certs./S.S. Cards',
        'Marriage License',
        'Medical Records',

        //babies
        'Cart Seat/Stroller',
        'Bottles/Formula',
        'Diapers/Wipes',

        //pets
        'Pets/Leash/Carrier',
        'Litterbox/Waste Bags',
        'Pet Prescriptions',
        'Pictures of Pets',

        //travel
        'Maps/GPS',
        'Extra Gas',
        'Spare Tire/Jack/Tools',
        'Rope/Tie-Downs',

        //survival
        'First Aid Kid',
        'Flashlights',
        'Lighter/Matches',
        'Phone Numbers on Paper',

        //around the house
        'Secure Outdoor Items',
        'Shut Off Utilities',
        'Pictures of Home/Belongings',
        'Pack/Toss Perishables',
        'Update Pet Microchip',

    ];

    const components = [];

    items.forEach(function (item, index) {
        components.push(
            <Grid item
                  className="checklistItemPrint"
                  xs={12} sm={6} md={4} lg={3}
                  key={index}>
                <FormControlLabel
                    className={classes.item}
                    control={
                        <Checkbox/>
                    }
                    label={item}
                />
            </Grid>
        );
    });

    return (
        <Fragment>
            <Grid container>
                <Grid item xs={12} sm={8} md={6}>
                    <h2>Leaving? Are you Prepared?</h2>
                    <p>
                        Things to do/bring with you when you evacuate:
                    </p>
                </Grid>
                <Grid item xs={12} sm={4} md={6}>
                    <div className={classes.printWrapper}>
                        <Button
                            className="noPrint"
                            onClick={printChecklist}
                            variant="contained"
                            color="secondary">
                            Print List
                        </Button>
                    </div>
                </Grid>
            </Grid>
            <Grid container>
                {components}
            </Grid>
        </Fragment>
    );
};