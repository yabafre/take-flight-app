import Amadeus from 'amadeus';

const amadeus = new Amadeus({
    clientId: process.env.EXPO_PUBLIC_AMADEUS_API_KEY,
    clientSecret: process.env.EXPO_PUBLIC_AMADEUS_API_SECRET
})

export function GET(req, { keyword }) {
    amadeus.referenceData.locations.get({
        keyword,
        subType: 'CITY'
    }).then((response) => {
        Response.json(response.data);
    }).catch((response) => {
        Response.json(response.data);
    });
}