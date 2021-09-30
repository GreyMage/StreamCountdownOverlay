import '../style/main.css';
import { useRef, useState, useEffect } from "react";
import ReactDOM from 'react-dom';
/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import useOnClickOutside from './hooks/useOutsideClick';

const PAGE_PARAMS = Object.assign({
    countdown: 5,
    offset: 2,
    song: "",
    volume: 0.5,
    font: "Press Start 2P",
    fontSize: "50vh",
}, location.search.substr(1).split("&").map(x => x.split("=")).reduce((acc, i) => { acc[i[0]] = decodeURI(i[1]); return acc }, {}))
console.log("PAGE_PARAMS",PAGE_PARAMS)

const Song = new Audio(PAGE_PARAMS.song);
Song.volume = PAGE_PARAMS.volume;

const App = () => {

    const [prerollTime, setPrerollTime] = useState(PAGE_PARAMS.countdown);
    const [isCountingDown, setCountingDown] = useState(false);
    const [tickAnimate, causeTickAnimate] = useState(false);
    const [goAnimate, causeGoAnimate] = useState(false);
    const [isPlaying, setPlaying] = useState(false);

    const st = css(`
        color: white;
        font-size: ${PAGE_PARAMS.fontSize};
        font-family: "${PAGE_PARAMS.font}";

        &.animate {
            transform:scale(0);
            animation-duration: 0.8s;
            animation-name: slidein;
            animation-timing-function: ease-in;
        }

        @keyframes slidein {
            from {
                transform:scale(1)
            }
            
            to {
                transform:scale(0)
            }
        }
    `)

    const countdownWrapCss = css(`
        display: flex;
        width: 100vw;
        height: 100vh;
        justify-content: center;
        align-content: center;
        align-items: center;
        transition: 0.1s all ease-in-out;
        box-shadow: inset 0 0 0vh white;

        &.animate {
            box-shadow: inset 0 0 10vh white;
        }
    `);

    useEffect(() => {
        if (tickAnimate) setTimeout(() => { causeTickAnimate(false); }, 100);
    }, [tickAnimate])

    useEffect(() => {
        if (goAnimate) setTimeout(() => { causeGoAnimate(false); }, 100);
    }, [goAnimate])

    useEffect(() => {
        if (isCountingDown) {
            const timeLeft = parseFloat(prerollTime) - parseFloat(PAGE_PARAMS.offset);
            if (parseInt(prerollTime, 10) > parseInt(PAGE_PARAMS.offset, 10)) {
                setPlaying(false);
            }
            // time for a complicated stupid math thing.
            // its possible to supply a fractional offset, say 2.4 seconds.
            // because of this, and because this logic only fires once per second, 
            // it needs to handle the delay directly.
            if(timeLeft <= 1){
                setTimeout(()=>{
                    setPlaying(true);
                },1000*timeLeft)
            }
            if (parseInt(prerollTime, 10) == parseInt(PAGE_PARAMS.offset, 10)) {
                
            }
            if (prerollTime > 0) {
                const timer = setTimeout(() => {
                    setPrerollTime(prerollTime - 1)
                    causeTickAnimate(true);
                }, 1000);
                return () => clearTimeout(timer);
            } else {
                causeGoAnimate(true);
            }
        } else {
            setPrerollTime(PAGE_PARAMS.countdown)
            setPlaying(false);
        }
    }, [isCountingDown, prerollTime])

    useEffect(() => {
        if (isPlaying) {
            Song.play();
        } else {
            Song.pause();
            Song.currentTime = 0;
        }
    }, [isPlaying])

    const getTimerClassName = () => {
        if (isCountingDown) {
            if (tickAnimate) {
                return "";
            }
            return "animate";
        }
        return "";
    }

    const getWrapperClassName = () => {
        // if (!isCountingDown) {
        //     return "animate";
        // }
        if (goAnimate) {
            return "animate";
        }
        return "";
    }

    const getPrerollValue = () => {
        if (prerollTime > 0) return prerollTime;
        return ""
    }

    return (
        <div className="App" name="app">
            <div css={countdownWrapCss} className={getWrapperClassName()} onClick={() => { setCountingDown(!isCountingDown) }}>
                <h1 css={st} className={getTimerClassName()}>{getPrerollValue()}</h1>
            </div>
        </div>
    );
}


// on the first day
const el = document.createElement("div");
document.body.appendChild(el);
ReactDOM.render(<App />, el,)
