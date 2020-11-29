import React, {Component} from 'react';
import Header from './header/header';
import Content from './content';
import {defaultWidth, defaultHeight, WidthContext} from './context';
import Modal from './modal/modal';

export default class ScrollableTabs extends Component {
  idToDelete = null;
  state = {
    tabsState: [
      {
        id: 1,
        value: 'First tab content',
      },
      {
        id: 2,
        value: 'Second tab content',
      },
      {
        id: 3,
        value: 'Third tab content',
      },
    ],
    currentTabId: 1,
    showModal: false,
  };

  onAddingTab = () => {
    this.setState((prevState) => {
      const {length} = prevState.tabsState;

      if (length < 10) {
        const lastId = prevState.tabsState[length - 1].id;
        const newTab = {
          id: lastId + 1,
          value: `${lastId + 1}th demo content`,
        };

        const newTabsState = prevState.tabsState.concat(newTab);

        return {
          tabsState: newTabsState,
        };
      }
    });
  };

  onRemovingTab = (id) => {
    const currentTabIdIndex = this.state.tabsState.findIndex(
      (state) => state.id === id
    );

    const newTabsState = this.state.tabsState.filter(
      (state) => state.id !== id
    );

    const newState = {
      tabsState: newTabsState,
    };

    if (this.state.currentTabId === id) {
      // id there is a single tab after deletion, activate it
      const tabIndexToSelect = newTabsState.length < 2 ? 0 : currentTabIdIndex;
      newState.currentTabId = newTabsState[tabIndexToSelect].id;
    }

    this.setState(newState);
  };

  getContentValue() {
    const currentTab = this.state.tabsState.filter(
      ({id}) => id === this.state.currentTabId
    );

    return currentTab[0].value;
  }

  showRightChevron() {
    const {currentTabId, tabsState} = this.state;
    const lastElement = tabsState[tabsState.length - 1];

    return currentTabId !== lastElement.id;
  }

  showLeftChevron() {
    const {currentTabId, tabsState} = this.state;
    const firstElement = tabsState[0];

    return currentTabId !== firstElement.id;
  }

  onSelectingTab = (id) => {
    this.setState({
      currentTabId: id,
    });
  };

  openModal = (id) => {
    this.idToDelete = id;
    this.setState({
      showModal: true,
    });
  };

  closeModal = (confirm) => {
    if (confirm) {
      this.onRemovingTab(this.idToDelete);
    }

    this.setState({
      showModal: false,
    });
  };

  onModalClose = (id) => {};

  render() {
    const width = this.props.width || defaultWidth;
    const height = this.props.height || defaultHeight;

    return (
      <WidthContext.Provider value={width}>
        <div style={{width, height, border: '1px solid #aaa69d'}}>
          <Header
            tabsState={this.state.tabsState}
            showRightChevron={this.showRightChevron()}
            showLeftChevron={this.showLeftChevron()}
            currentTabId={this.state.currentTabId}
            onAdd={this.onAddingTab}
            onRemove={this.openModal}
            onSelect={this.onSelectingTab}
          />
          <Content value={this.getContentValue()} />
          <Modal show={this.state.showModal} closeModal={this.closeModal} />
        </div>
      </WidthContext.Provider>
    );
  }
}
