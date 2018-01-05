import React, { Component } from 'react';
import injectSheet from 'react-jss';

import matchaLogo from '../images/photos_selected/Header/matcha.jpg';
import VisitLogo from '../images/photos_selected/Header/people-notifications.png';
import ChatLogo from '../images/photos_selected/Header/talk-icon.png';
import LikeLogo from '../images/photos_selected/Header/heart.png';
import account from '../images/photos_selected/Header/account.png';

import ButtonNormal from './ButtonNormal';
import StickerNotification from './StickerNotification';
import DropdownMenu from './DropdownMenu';

class Header extends Component {
  state = {
    showIcons: false,
    showNotifLike: false,
    showNotifVisit: false,
  };

  componentWillMount() {
    const { pathname } = this.props;

    const tmp = [
      '/profile',
      '/profile/modify',
      '/research',
      '/deleteAccount',
      '/chat',
    ];

    if (tmp.includes(pathname)) {
      this.setState({ showIcons: true });
    }
  }

  handleClickEvent = nameIcon => {
    this.setState({
      showNotifLike: false,
      showNotifVisit: false,
      [nameIcon]: !this.state[nameIcon],
    });
  };

  render() {
    const {
      classes,
      pathname,
      numberNotifChat,
      numberNotifLike,
      numberNotifVisit,
      history,
    } = this.props;
    const { showNotifVisit, showNotifLike } = this.state;
    let text;
    let location;

    const icons = [
      <div className={classes.stickerNotification}>
        <StickerNotification text={numberNotifChat} />
        <img src={ChatLogo} alt="" />
      </div>,
      <div className={classes.stickerNotification}>
        <button onClick={() => this.handleClickEvent('showNotifLike')}>
          <StickerNotification text={numberNotifLike} />
          <img src={LikeLogo} alt="" />
          {showNotifLike && <DropdownMenu />}
        </button>
      </div>,
      <div className={classes.stickerNotification}>
        <button onClick={() => this.handleClickEvent('showNotifVisit')}>
          <StickerNotification text={numberNotifVisit} />
          <img src={VisitLogo} alt="" />
          {showNotifVisit && <DropdownMenu />}
        </button>
      </div>,
      <div className={classes.stickerNotification}>
        <img src={account} alt="" />
      </div>,
    ];

    switch (pathname) {
      case '/login':
        text = 'REGISTER';
        location = '/register';
        break;
      case '/':
      case '/register':
        text = 'LOGIN';
        location = '/login';
        break;
      case '/profile':
      case '/profile/modify':
      case '/research':
      case '/deleteAccount':
      case '/chat':
        text = 'LOGOUT';
        location = '/login';
        break;
      default:
        text = 'TEXT HERE';
    }

    return (
      <div className={classes.container}>
        <img className={classes.matchaLogo} src={matchaLogo} alt="" />
        <div className={classes.notifications}>
          {this.state.showIcons && icons}
          <ButtonNormal
            text={text}
            onClick={() => {
              history.push(location);
            }}
          />
        </div>
      </div>
    );
  }
}
Header.defaultProps = {
  numberNotifChat: '1',
  numberNotifLike: '0',
  numberNotifVisit: '14',
};

const styles = {
  '@global': {
    button: {
      background: 'transparent',
      border: 'none',
      outline: 'none',
      padding: '0',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    img: {
      height: '30px',
      marginRight: '15px',
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottom: '1px solid #D8D8D8',
    height: '100px',
    padding: '0 30px',
    position: 'relative',
  },
  matchaLogo: {
    height: '70px',
    margin: 'auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  stickerNotification: {
    position: 'relative',
  },
  notifications: {
    display: 'flex',
    alignItems: 'flex-end',
  },
};

export default injectSheet(styles)(Header);
