import {
  Panel,
  Button,
  InputGroup,
  FormControl,
  DropdownButton,
  MenuItem,
  OverlayTrigger, Tooltip
} from "react-bootstrap";
import SearchIcon from '../assets/search.png';
import AccountTable from "./AccountTable";
import createReactClass from 'create-react-class';
import Pagination from "react-js-pagination";
import 'bootstrap/dist/css/bootstrap.css';
const TooltipWrapper = ({message, children}) => {
  return <OverlayTrigger placement={'top'} overlay={<Tooltip>
    <strong>{message}</strong>
  </Tooltip>}>
    {children}
  </OverlayTrigger>
}
const ExistingAccounts = createReactClass({
  getInitialState: function() {
    return {
      query: '',
      filterKeys: [{
        label: 'Any Filter',
        key: ''
      }, {
        label: 'Account Type',
        key: 'accountType'
      }, {
        label: 'Region',
        key: 'region'
      }],
      activeFilterKey: '',
      accounts: [],
      currentPage: 1,
      countPerPage: 10,
      accountTotal: 20,
      selectedAccounts: []
    };
  },

  fetchAccounts() {
    fetch(`./accounts.json?page=${this.state.currentPage}&countPerPage=${this.state.countPerPage}`)
      .then(res => res.json())
      .then(data => {

        let accounts = data;

        if (this.state.activeFilterKey) {
          accounts = accounts.filter(account => {
            return account[this.state.activeFilterKey].toUpperCase().includes(this.state.query.toUpperCase())
          })
        }

        this.setState({
          accounts: accounts
        })
      })
  },


  componentDidMount() {
    this.fetchAccounts();
  },

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.fetchAccounts();
    }
  },

  handleSearch: function() {
    this.fetchAccounts();

  },

  handleChange: function(e) {
    this.setState({ query: e.target.value });
  },

  handleKeyPress: function(e) {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  },

  handleSelectFilterKey: function (filterKey) {
    this.setState({
      activeFilterKey: filterKey
    })
  },


  handleSelectPage: function (page) {
    if (page <= 0) {
      this.setState({
        currentPage: 1
      })
    } else if (page > Math.ceil(this.state.accountTotal / this.state.countPerPage)) {
      this.setState({
        currentPage: Math.ceil(this.state.accountTotal / this.state.countPerPage)
      })
    } else {
      this.setState({
        currentPage: page
      })
    }
  },

  handleSort (key, sort) {
    if (sort === 'nosort') {
      return this.fetchAccounts();
    }

    let newAccounts = [...this.state.accounts];
    if (newAccounts.length === 0) {
      return;
    }

    const firstAccount = newAccounts[0];
    const sortKeyType = typeof firstAccount[key];

    if (sortKeyType === 'string') {
      newAccounts = newAccounts.sort((prev, next) => {
        return sort === 'asc' ? prev[key].localeCompare(next[key]) : next[key].localeCompare(prev[key]);
      });
    }

    if (sortKeyType === 'number') {
      newAccounts = newAccounts.sort((prev, next) => {
        return sort === 'asc' ? (prev[key] > next[key] ? 1 : -1) : (next[key] > prev[key] ? 1 : -1);
      });
    }

    this.setState({
      accounts: newAccounts
    })

  },

  handleSelectAccounts(accounts) {
    this.setState({
      selectedAccounts: [...new Set([...this.state.selectedAccounts, ...accounts])]
    })
  },

  handleCancelSelectAccounts(accounts) {
    this.setState({
      selectedAccounts: this.state.selectedAccounts.filter(item => {
        return !accounts.includes(item)
      })
    })
  },

  handlePageChange(pageNumber) {
    this.setState({
      currentPage: pageNumber
    })
  }
  ,
  render: function() {

    // const renderPagination = () => {
    //   const paginations = [];
    //   for (let i = 0; i < Math.ceil(this.state.accountTotal / this.state.countPerPage); i ++) {
    //     paginations.push(
    //       <Pagination.Item
    //         active={this.state.currentPage === i + 1}
    //         onClick={() => {
    //         this.handleSelectPage(i + 1)
    //       }}>
    //         {i + 1}
    //       </Pagination.Item>
    //     )
    //   }
    //
    //   return (
    //     <Pagination>
    //       <Pagination.Prev
    //         onClick={() => {
    //           this.handleSelectPage(this.state.currentPage - 1)
    //         }}
    //       />
    //       {paginations}
    //       <Pagination.Next onClick={() => {
    //         this.handleSelectPage(this.state.currentPage + 1)
    //       }}/>
    //     </Pagination>
    //   )
    // }



    return (
      <div style={{marginTop: '20px'}}>
        <Panel>
          <Panel.Heading>
            <div style={{display: 'flex'}}>
              <h4 style={{marginRight: 'auto'}}>
                Existing Accounts ({this.state.accountTotal}/150)
                <small>
                  <TooltipWrapper message={'Info here...'}>
                    <Button bsStyle={'link'}>Info</Button>
                  </TooltipWrapper>
                </small>
              </h4>

            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <InputGroup>
                <InputGroup.Addon>
                  <img src={SearchIcon} width={20}/>
                </InputGroup.Addon>
                <FormControl value={this.state.query}
                             onKeyPress={this.handleKeyPress}
                             onChange={this.handleChange}
                             placeholder={'Find resources'} type="text" />
              </InputGroup>

              <div style={{marginLeft: '30px', marginRight: 'auto'}}>
                <DropdownButton title={this.state.activeFilterKey || 'Any filter'}>
                  {this.state.filterKeys.map(filterKey => {
                    return (
                      <MenuItem
                        onClick={() => {
                          this.handleSelectFilterKey(filterKey.key);
                        }}
                        active={this.state.activeFilterKey === filterKey.key}
                        key={filterKey.key}
                        eventKey="Any filter">
                        {filterKey.label}
                      </MenuItem>
                    )
                  })}
                </DropdownButton>
                <Button>Property: Item</Button>
              </div>
              <Pagination
                activePage={this.state.currentPage}
                itemsCountPerPage={this.state.countPerPage}
                totalItemsCount={this.state.accountTotal}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange.bind(this)}
              />
            </div>
          </Panel.Heading>
          <Panel.Body>
            <AccountTable
              handleSelectAccounts={this.handleSelectAccounts}
              handleCancelSelectAccounts={this.handleCancelSelectAccounts}
              selectedAccounts={this.state.selectedAccounts}
              handleSort={this.handleSort}
              accounts={this.state.accounts}
            />
          </Panel.Body>
        </Panel>
      </div>
    )
  }
});

export default ExistingAccounts;
