
/* eslint-disable import/no-cycle */

import Accordion from './Accordion';
import Block from './Block';
import Button from './atomic/atoms/Button';
import Card from './Card';
import Checkbox from './Checkbox';
import DeckSwiper from './DeckSwiper';
import Icon from './atomic/ions/Icon';
import Input from './atomic/atoms/Input';
import TextArea from './atomic/atoms/TextArea';
import NavBar from './NavBar';
import Radio from './Radio';
import Slider from './Slider';
import Switch from './Switch';
import Text from './atomic/ions/Text';
import Toast from './Toast';
import Link from './atomic/atoms/Link';


import theme, { withBazz, BazzProvider, useBazzTheme } from './theme';

import galioConfig from './config/galio.json';

const GalioFont = require('./fonts/galio.ttf');

export {
  Accordion,
  Block,
  Button,
  Card,
  Checkbox,
  DeckSwiper,
  Icon,
  Input,
  TextArea,
  NavBar,
  Radio,
  Slider,
  Text,
  Link,
  Toast,
  Switch,
  theme,
  withBazz,
  BazzProvider,
  useBazzTheme,
  galioConfig,
  GalioFont,
};