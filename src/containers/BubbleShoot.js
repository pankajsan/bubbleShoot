import React, { useEffect, useState } from 'react';
import { Circle } from '../components/Circle';
import { Input } from '../components/Input';

export const BubbleShoot = (props) => {

    const [bubbles, setBubbles] = useState([]);
    const [bubbleNumber, setBubbleNumber] = useState("")
    const [shotBubbles, setShotBubbles] = useState([]);

    useEffect(() => {
        const bubbleColors = []
        while(bubbleColors.length < 5) {
            const color = `#${Math.floor(Math.random()*123456745).toString(16).slice(0,6)}`;
            if(!bubbleColors.includes(color) && color.length === 7) {
                bubbleColors.push(color)
            }
        }
        const bubbles = bubbleColors.map((bubbleColor, i) => {
            return {
                id: i,
                color: bubbleColor,
                isShot: false,
            }
        })

        setBubbles(bubbles)
    }, [])

    const setBubbleToShoot = (e) => {
        setBubbleNumber(e.target.value === "" || (e.target.value > 0 && e.target.value <= 5) ? e.target.value : bubbleNumber)
    }

    const shootBubble = () => {
        const availableBubble = bubbles.filter(bubble => !bubble.isShot)[bubbleNumber - 1];
        if (availableBubble) {
            const updatedBubbles = bubbles.map((bubble) => {
                if (bubble.id == availableBubble.id) {
                    setShotBubbles([...shotBubbles, { ...bubble, isShot: true}])
                    return { ...bubble, isShot: true}
                } else {
                    return bubble
                }
            });
            setBubbles(updatedBubbles);
        }
    }

    const resetBubble = (bubbleNumber) => {
        const updatedBubbles = bubbles.map(bubble => bubble.id == bubbleNumber ? { ...bubble, isShot: false} : bubble);
        setShotBubbles(updatedBubbles.filter(bubble => bubble.isShot))
        setBubbles(updatedBubbles);
    }

    return(
        <div className='container'>
            <h1>Bubble Shoot</h1>
            <div className='shoot'>
                {shotBubbles.map((bubble, index) => <Circle onClick={resetBubble} bubble={bubble} key={index} />)}
            </div>
            <div className='bubbles'>
                {bubbles.map((bubble, index) => !bubble.isShot && <Circle bubble={bubble} key={index} />)}
            </div>
            <div className='input'>
                <Input type="number" onInput={setBubbleToShoot} value={bubbleNumber} />
                <Input type="button" onClick={shootBubble} value="Shoot" />
            </div>
        </div>
    )
}