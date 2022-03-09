import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";
import {useState} from "react";

function App() {

    const [str1, setStr1] = useState("")
    const [str2, setStr2] = useState("")


    const levenshteinDistance = (str1 = '', str2 = '') => {
        const track = Array(str2.length + 1).fill(null).map(() =>
            Array(str1.length + 1).fill(null));
        for (let i = 0; i <= str1.length; i += 1) {
            track[0][i] = i;
        }
        for (let j = 0; j <= str2.length; j += 1) {
            track[j][0] = j;
        }
        for (let j = 1; j <= str2.length; j += 1) {
            for (let i = 1; i <= str1.length; i += 1) {
                const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
                track[j][i] = Math.min(
                    track[j][i - 1] + 1, // deletion
                    track[j - 1][i] + 1, // insertion
                    track[j - 1][i - 1] + indicator, // substitution
                );
            }
        }
        return track[str2.length][str1.length];
    }


    return (
        <>
            <h1>Levenshtein</h1>
            <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-sm"><p>Wort 1</p></span>
                </div>
                <input onChange={(event) => {
                    setStr1(event.target.value)
                }} type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-sm"><p>Wort 2</p></span>
                </div>
                <input onChange={(event) => {
                    setStr2(event.target.value)
                }} type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <p>Wort1 : {str1}</p>
            <p>Wort2 : {str2}</p>
            <p>Levenshtein Distance: {levenshteinDistance(str1,str2)}</p>
        </>
    );
}

export default App;