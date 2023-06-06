import { h, render, Component } from "preact";
import IphonePage from "../IphonePage";
import style from './style';
import style_iphone from '../button/style_iphone';
import Button from '../button';

export default class Iphone extends Component {
        // a constructor with initial set states
        constructor(props){
            super(props);
            // button display state
            this.state = {
                city: "London"
            }
        }

        setCity = (city) => {
            this.setState({
                city: city
            })
        }

        // the main render method for the iphone component
        render() {
            return (
                <IphonePage></IphonePage>
            );
        }
    
    }