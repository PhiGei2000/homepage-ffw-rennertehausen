import Card from "../../components/card"

const data = {
    vorstand: [
        {
            role: "1. Vorsitzender",
            name: "Mike Stahl",
            image: "/img/vorstand/V1.png"
        },
        {
            role: "2. Vorsitzender",
            name: "Philipp Geil",
            image: "/img/vorstand/V2.png"
        },
        {
            role: "3. Vorsitzender",
            name: "Horst Schäfer"
        },
        {
            role: "Schriftführer",
            name: "Robin Feike"
        },
        {
            role: "Kassiererin",
            name: "Bianca Clemens"
        }],
    wehrfuerung: [
        {
            role: "Wehrführer",
            name: "Christian Schubert",
            image: "/img/vorstand/WF1.png"
        },
        {
            role: "stellv. Wehrführer",
            name: "Andreas Noleppa",
            image: "/img/vorstand/WF2.png"
        }
    ],
    jugendfeuerwehr: [
        {
            role: "Jugendwartin",
            name: "Jana Hesse",
            image: "/img/vorstand/JW1.png"
        },
        {
            role: "stellv. Jugendwart",
            name: "David Schubert",
            image: "/img/vorstand/JW2.png"
        }
    ]
}

function getCard(item: {
    role: string;
    name: string;
    image?: string;
}, index: number) {
    if (item.image != null) {
        return (
            <div className="col">
                <Card className="m-2" key={index} image={{ src: item.image }}>
                    <h5 className="card-title">{item.role}</h5>
                    <p className="card-text">{item.name}</p>
                </Card>
            </div>);
    }
    else {
        return (
            <div className="col">
                <Card className="m-2" key={index}>
                    <h5 className="card-title">{item.role}</h5>
                    <p className="card-text">{item.name}</p>
                </Card>
            </div>);
    }
}

export default function Vorstand() {
    return (
        <>
            <h1>Vorstand</h1>
            <div className="row row-cols-1 row-cols-md-3 align-items-end">
                {
                    data.vorstand.map(getCard)
                }
            </div>
            <h1 className="mt-3">Wehrf&#252;hrung</h1>
            <div className="row row-cols-1 row-cols-md-3 align-items-end">
                {
                    data.wehrfuerung.map(getCard)
                }
            </div>
            <h1 className="mt-3">Jugendfeuerwehr</h1>
            <div className="row row-cols-1 row-cols-md-3 align-items-end">
                {
                    data.jugendfeuerwehr.map(getCard)
                }
            </div>
        </>
    )
}
