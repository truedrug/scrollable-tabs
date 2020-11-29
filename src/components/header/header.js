import {Component, createRef} from 'react';
import Tab from './tabs/tab';
import './header.css';
import {WidthContext} from '../context';
import PlusIcon from '../icons/plus.svg';
import LeftChevronIcon from '../icons/chevron-left.svg';
import RightChevronIcon from '../icons/chevron-right.svg';

const tabWidth = 120;
const iconWidth = 40;

export default class extends Component {
  static contextType = WidthContext;
  tabsRef = createRef();

  areChevronsRequired() {
    return this.context < this.props.tabsState.length * tabWidth + iconWidth;
  }

  getScrollerWidth() {
    // iconWidth: each iconWidth is 40px (plus icon, left and right chevron)
    return (
      this.context -
      iconWidth -
      (this.props.showLeftChevron ? iconWidth : 0) -
      (this.props.showRightChevron ? iconWidth : 0)
    );
  }

  leftSlide = () => {
    this.tabsRef.current.scrollBy({
      left: -120,
      behavior: 'smooth',
    });
  };

  rightSlide = () => {
    this.tabsRef.current.scrollBy({
      left: 120,
      behavior: 'smooth',
    });
  };

  render() {
    let tabs = this.props.tabsState.map(({id}, index) => (
      <Tab
        key={id}
        num={id}
        hideDeleteIcon={this.props.tabsState.length === 1}
        highlightTab={this.props.currentTabId === id}
        onDelete={() => this.props.onRemove(id)}
        onSelect={() => this.props.onSelect(id)}
      />
    ));

    const areChevronsRequired = this.areChevronsRequired();

    if (!areChevronsRequired) {
      return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div className="tabs">{tabs}</div>

          <button
            className="header-button"
            style={{background: 'yellow'}}
            onClick={this.props.onAdd}>
            <img className="icon-btn add-btn" src={PlusIcon} alt="Add" />
          </button>
        </div>
      );
    }

    return (
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        {this.props.showLeftChevron ? (
          <button
            className="header-button"
            style={{background: 'red'}}
            onClick={this.leftSlide}>
            <img
              className="icon-btn chevron-btn"
              src={LeftChevronIcon}
              alt="Slide left"
            />
          </button>
        ) : null}

        <div
          ref={this.tabsRef}
          className="tabs"
          style={{width: this.getScrollerWidth()}}>
          {tabs}
        </div>
        {this.props.showRightChevron ? (
          <button
            className="header-button"
            style={{background: 'green'}}
            onClick={this.rightSlide}>
            <img
              className="icon-btn chevron-btn"
              src={RightChevronIcon}
              alt="Slide right"
            />
          </button>
        ) : null}

        <button
          className="header-button"
          style={{background: 'yellow'}}
          onClick={this.props.onAdd}>
          <img className="icon-btn add-btn" src={PlusIcon} alt="Add" />
        </button>
      </div>
    );
  }
}
