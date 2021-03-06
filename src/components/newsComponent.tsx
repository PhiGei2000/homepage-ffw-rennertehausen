import DataComponent from './dataComponent'
import News from "../lib/news"
import { groupBy, mapToArray } from '../lib/utils';
import Link from 'next/link';
import Card from './card';
import Alarm from '../lib/alarm';

export default class NewsComponent extends DataComponent<News> {
    protected dataUrl: string = "/data/news.json"

    protected onDataLoaded(component: DataComponent<News>, data: News[]): void {
        var promises = data.map((item, index) => {
            return fetch(`/img/news/${item.id}/images.txt`)
                .then(res => {
                    if (res.ok) {
                        return res.text();
                    }

                    if (res.status == 404) {
                        return null;
                    }

                    throw new Error(res.statusText)
                })
                .then(content => {
                    if (content) {
                        const lines = content.split('\n');
                        const prefix = `/img/news/${item.id}/`;

                        item.images = lines.map(line => {
                            if (line != "") {
                                return prefix + line;
                            }
                        });
                    }

                    return item;
                });
        });

        Promise.all(promises).then((data) => {
            this.setState({
                loaded: true,
                data: data
            });
        })
    }

    renderListPage(): JSX.Element {
        const map = groupBy(this.state.data, item => Number.parseInt(item.id.substring(0, 4)));

        return (
            <>
                <h1>Aktuelles</h1>
                {
                    mapToArray(map, (year, news) => {
                        return (
                            <>
                                <h3>{year}</h3>
                                <div className="row row-cols-1 g-2">
                                    {
                                        news.map(item => {
                                            if (item.display != false) {
                                                const link = item.link ? item.link : `/aktuelles/${item.id}`;

                                                return (
                                                    <div key={item.id} className="col">

                                                        <Card href={link} orientation='horizontal' image={{
                                                            src: item.icon,
                                                            alt: ""
                                                        }}>
                                                            <div className="d-flex flex-column h-100">
                                                                <h5 className="card-title">{item.title}</h5>
                                                                <p className="card-text overflow-hidden">{item.description}</p>
                                                                <a className="card-link mt-auto align-self-end">weiterlesen</a>
                                                            </div>
                                                        </Card>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            </>
                        )
                    })
                }
            </>
        )
    }

    renderElementPage(): JSX.Element {
        const news = this.state.data.find(item => item.id === this.props.id);

        if (news && news.display != false) {
            return (
                <>
                    <h1>{news.title}</h1>
                    {
                        <p dangerouslySetInnerHTML={{ __html: news.text }}></p>
                    }
                    {
                        <div className="row mt-4">
                            <h3>Bildergalerie</h3>
                            <div className="row row-cols-2 gy-2">

                                {
                                    news.images.map((imageSrc, index) => {
                                        return (
                                            <div key={index} className="col">
                                                <img src={imageSrc} className="img-fluid" alt="" />
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
                    }
                </>
            )
        }

        return null;
    }
}
