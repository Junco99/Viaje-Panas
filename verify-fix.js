const fetch = require('node-fetch');

async function testFlightParsing() {
    console.log('🧪 Testing Flight Parsing Logic...');

    // Simulate what's in server.js but for a specific case
    const mockData = {
        best_flights: [
            {
                price: 150,
                total_duration: 300,
                flights: [
                    {
                        airline: 'Iberia',
                        airline_logo: 'logo_url',
                        departure_airport: { time: '2026-08-05 10:00' },
                        arrival_airport: { time: '2026-08-05 12:30' }
                    }
                ],
                layovers: []
            }
        ]
    };

    const flights = mockData.best_flights.map((flight, index) => {
        const outboundLeg = flight.flights[0];
        const outboundArrival = flight.flights[flight.flights.length - 1];

        return {
            id: `test_${index}`,
            price: `€${flight.price}`,
            airline: { name: outboundLeg.airline },
            departure: outboundLeg.departure_airport.time,
            arrival: outboundArrival.arrival_airport.time,
            duration: flight.total_duration,
            stops: flight.layovers ? flight.layovers.length : 0
        };
    });

    console.log('✅ Parsed Flights:', JSON.stringify(flights, null, 2));
}

testFlightParsing();
