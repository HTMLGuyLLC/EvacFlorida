const colors = [
    '#3b9e1a',
    '#ad1313',
    '#1cd7e1',
    '#1334ad',
    '#6217ad',
];

export default {
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    },
    data: {
        labels: ['4pm', '5pm', '6pm', '7pm', '8pm', '9pm'],
        datasets: [
            {
                label: '75-N',
                data: [3740, 3460, 7430, 9650, 2350, 160],
                borderColor: colors[0],
                backgroundColor: colors[0],
                fill: false,
                borderWidth: 3
            },
            {
                label: '75-S',
                data: [2350, 1630, 1780, 1440, 970, 320],
                borderColor: colors[1],
                backgroundColor: colors[1],
                fill: false,
                borderWidth: 3
            },
            {
                label: 'Turnpike-N',
                data: [3530, 3160, 8430, 6330, 1670, 350],
                borderColor: colors[2],
                backgroundColor: colors[2],
                fill: false,
                borderWidth: 3
            },
            {
                label: 'Turnpike-S',
                data: [1530, 630, 740, 260, 160, 30],
                borderColor: colors[3],
                backgroundColor: colors[3],
                fill: false,
                borderWidth: 3
            },
            {
                label: '75-W',
                data: [4360, 2360, 5670, 7570, 2360, 1580],
                borderColor: colors[4],
                backgroundColor: colors[4],
                fill: false,
                borderWidth: 3
            },
        ]
    }
}