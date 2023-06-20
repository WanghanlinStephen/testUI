import createReactClass from "create-react-class";
import SortIcon from '../assets/sort.png';
import SortUpIcon from '../assets/sort-up.png';
import SortDownIcon from '../assets/sort-down.png';

const SortStatesFlow = {
  nosort: 'asc',
  asc: 'desc',
  desc: 'nosort'
}

const SortIcons = {
  asc: SortUpIcon,
  desc: SortDownIcon,
  nosort: SortIcon
}

const SortPointer = createReactClass({
  getInitialState: function () {
    return {
      sort: 'nosort'
    }
  },

  handleClickSort() {
    const nextSort = SortStatesFlow[this.state.sort];
    if (this.props.handleSort) {
      this.props.handleSort(nextSort);
    }

    this.setState({
      sort: nextSort
    })

  },

  render: function () {

    const sort = this.state.sort;
    return <img
      src={SortIcons[sort]} width={20}
      onClick={this.handleClickSort}
      style={{
        marginLeft: '10px',
        cursor: 'pointer'
      }}
    />;
  }
})

export default SortPointer;