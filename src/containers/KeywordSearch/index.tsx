import React from 'react';
import { History } from 'history';
import { apiReq } from '../../helpers';
import Common from '../../constant/common';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

interface KeywordState {
    search: string;
    loading: boolean;
    keywords: Array<KeywordResult>;
}
interface KeywordProps {
    location: {
        search: string;
    };
    history: History;
}

interface KeywordResult {
    word: string;
    url: string;
    weight: string;
}

class KeywordSearch extends React.Component<KeywordProps, KeywordState> {
    public search: string | null = '';
    constructor(props: KeywordProps) {
		super(props);
		this.state = {
            search: '',
            loading: false,
            keywords: []
		};
    }

    componentDidMount () {
		this.getQueryParms();
	}

    /**
     * @description function used for get query parmeter
     */
    getQueryParms = () => {
		const params = new URLSearchParams(this.props.location.search);
		if (params.get('search')) {
            this.search = params.get('search');
            this.setState({search: this.search ? this.search : ''});
		}
		this.fetchKeyword(`?search=${this.search}`);
	}

    /**
     * @description function used for fetch keyword data
     */
    fetchKeyword = (query: string) => {
        this.setState({loading: true});
		apiReq.searchKeyword({query}).then(result => {
			this.setState({loading: false});
			if (result.status === Common.status.processed && result.data) {
                const rstd = result.data;
				this.setState({keywords: rstd.data ? rstd.data : []});
			} else {
				this.setState({keywords: []});
			}
		}).catch(err => {
			this.setState({loading: false});
			this.setState({keywords: []});
		});
    }

    /**
     * @description function used for submit data for keyword search
     */
    submitKeywordSearch = () => {
        if (this.state.search) {
            const searchQuery = `?search=${this.state.search}`;
            const searchUrl = `/search${searchQuery}`;
            this.fetchKeyword(searchQuery);
            this.props.history.push(searchUrl);
        }
    }

    /**
     * @description function used for enter text value
     */
    enterTextValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value;
        this.setState({search});
    }

    onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            this.submitKeywordSearch();
        }
    }

	render() {
		return (<div className='search-event-page'>
            <Header />
            <div className='container'>
                <div className='search-event-body'>
                        <div className='searchbox'>
                            <input type='text' name='search'
                            onChange={this.enterTextValue} onKeyDown={this.onEnterPress} value={this.state.search}></input>
                            <button type='button' onClick={this.submitKeywordSearch}><img src='/assets/images/search-icon-white.png'
                                alt='Search Icon' /></button>
                            { !this.state.loading ?
                            <span className='result-found'>{this.state.keywords.length} Result Found For
                            <em>"{this.state.search}"</em></span>
                            : '' }
                        </div>
                        {
                        this.state.loading ? <div className='search-keyword'>
                            <img src='/assets/images/loader.gif' alt='Loader Icon' />
                        </div> :
                        <div className='result-box'>
                            <h4>Our AI brings you the most suitable keywords for your search. Click on any keyword to see more details.</h4>
                            <div className='tags'>
                                {
                                    this.state.keywords.map((doc: KeywordResult, index: number) => (
                                    <a href={doc.url} className={Common.keywordColor[Math.floor(Math.random() * Common.ten)
                                    ]} key={index} target='_blank'>
                                        <span>{doc.word}</span><em></em></a>
                                    ))
                                }
                            </div>
                        </div>
                        }
                </div>
            </div>
        <Footer />
        </div>);
	}
}

export default KeywordSearch;
