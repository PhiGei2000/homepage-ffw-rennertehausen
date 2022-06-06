import Link from "next/link"
import { Component } from "react";

class MenuItem {
    private href: string;
    public name: string;
    public id: string;
    public items: MenuItem[];
    public parent: MenuItem;

    constructor(href, name, id = "", items = []) {
        this.href = href;
        this.name = name;
        this.id = id;
        this.items = items;

        this.items.forEach(item => item.parent = this);

        this.parent = null;
    }

    public getHref(): string {
        if (this.parent) {
            return this.parent.getHref() + this.href;
        }
        else {
            return this.href;
        }
    }
}

const menu = {
    brand: {
        href: "/",
        text: "Home"
    },
    menu: [
        new MenuItem("/aktuelles", "Aktuelles"),
        new MenuItem("/verein", "Wir über uns", "navItemVerein", [
            new MenuItem("/vorstand", "Vorstand"),
            new MenuItem("/geschichtliches", "Geschichtliches")
        ]),
        new MenuItem("/jugendfeuerwehr", "Jugendfeuerwehr"),
        new MenuItem("/einsatzabteilung", "Einsatzabteilung", "navItemEinsatzabteilung", [
            new MenuItem("/einsaetze", "Einsätze"),
            new MenuItem("/uebungen", "Übungen"),
            new MenuItem("/fahrzeuge", "Fahrzeuge"),
            new MenuItem("/feuerwehrleistungswettkaempfe", "Feuerwehr-Leistungswettkämpfe")
        ])
    ]
};

type NavbarProps = typeof Navbar.defaultProps & {
    banner: boolean
}

export default class Navbar extends Component<NavbarProps> {
    static defaultProps = {
        banner: false
    };

    render() {
        return (
            <div className="container-fluid">
                {
                    this.props.banner &&
                    <div className="row">
                        <img className="img-fluid img-banner px-0" src="/img/banner.png" alt="" />
                    </div>
                }
                <div className="row">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark position-sticky px-0">
                        <div className="container">
                            <Link href={menu.brand.href}>
                                <a className="navbar-brand">{menu.brand.text}</a>
                            </Link>
                            <button className="navbar-toggler" role="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    {
                                        menu.menu.map((item, index) => {
                                            if (item.items.length > 0) {
                                                let subitems = item.items.map((subitem, subIndex) => {
                                                    let id = subitem.id ? subitem.id : `${item.id}Item${subIndex}`;

                                                    return (<li key={id}>
                                                        <Link href={subitem.getHref()}>
                                                            <a className="dropdown-item">{subitem.name}</a>
                                                        </Link>
                                                    </li>)
                                                });


                                                return (
                                                    <li key={index} className="nav-item dropdown">
                                                        <a className="nav-link dropdown-toggle" id={item.id} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                            {item.name}
                                                        </a>
                                                        <ul className="dropdown-menu" aria-labelledby={item.id}>
                                                            {subitems}
                                                        </ul>
                                                    </li>
                                                )
                                            }
                                            else {
                                                return (
                                                    <li key={index} className="nav-item">
                                                        <Link href={item.getHref()}>
                                                            <a className="nav-link">{item.name}</a>
                                                        </Link>
                                                    </li>
                                                )
                                            }
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}
