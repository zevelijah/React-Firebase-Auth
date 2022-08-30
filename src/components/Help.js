import React from "react"

export default function Help() {
    return (
        <>
            <div>
                <h1>Help</h1>
                <hr/>
                <h3>Making and Editing Decks</h3>
                <p>When you click on "Make Deck" in your profile card at the top right, you will see a little card With a few elements. The Name, description, and publblicity
                checkbox. Enter in the name and description and press "update", saving the deck. You can imeadiataly take it public, or you can wait. You add cards by typing the question and answer
                in their respective slots and pressing "add card." The relavant metadata will apear in a crude table below the button.
                Depending on when you're reading this, there will be a delete button on each row for it's card. When pressed, This is permanent. Even if it doesn't disappear, reload the page and it willl no longer exsist.<br/><br/>
                
                If you wish to edit further, you can go to "Your Decks" and click on it, or you can save the link.</p>
                <hr/>
                <h3>Playing Decks</h3>
                <p>On the deck page there is button called "Play Deck". On clicking, you will see the first question, and some buttons. Keep In mind
                that the "previous question" button shouldn't do anything on this first question. Importantly, there is a "Show answer" button. 
                How you play is by guessing the answer to the present question, and then clicking the button to see if you're right. Once you click, 
                answer will replace the question and a "Show Question" button will replace the show answer. If you have someone with you, you can have them
                turn you the other way as he presses "show answer", and you can guess the question instead. Anyway, once your done with that card 
                you can press "next question" and repeat the process. If you press that button on the last card the question/answer zone will be replaced
                with a button to go back to the deck page.</p>
                <hr/>
                <h3>Looking at Other Peoples Decks</h3>
                When you make the deck public by checking that box, your deck will be visible in the "Public Decks". Anyone can see, play, and save the link
                to your project (though making it private again will make the link unusable to them). Admins will always be able to see your decks thourgh their own means.
                <hr/>
                <h3>Contact Us for further Questions?</h3>
                <p>I'll make a hotline later, but it's low on my list of prioritys.</p>
                <hr/>
                <h2>Why this website's so awful...</h2>
                <p>If you are read this, then I guess I've done something right. This was a homeschool project of mine. The github page for it is 
                    nested inside of an unrealted project I was using to build my Authentication (don't worry, he did it for educational 
                    puposes on youtube, so I'm allowed to suposedly). Like so many of my projects, I abadoned it for months without the care to even get rid
                    of it. But I got back to it. I'm really eager to launch my secound website, no matter how unready it is. I will make pretty and fun later, I hope.
                    It's the somewhat unnesasary bits I can most trust myself to procrastinate, and yet that I'm least likely to, because they are simpler and therefore more enjoyable for me. 
                    While I should be fixing the numerous spelling errors on this page, or fixing some feautures, my litteral child's brain is having to much fun 
                    writing it. I'm sure many kids reading this could easily agree. <br/><br/>
                    But I'm getting ahead of myself. I'm very eager to realase this website, even in pre-alpha. I'm not the most efficent worker, and not a good coder.
                    Some are such good buisnessmen that they don't need to worry about what the organization acctually does. I've got little chance of ever being one of them.
                    You know that other website I mentioned? It was a cute little staic website, designed for very specific group of people that it turns out, I didn't know any of.
                    It was (<a href="https://diplomacy-helper.web.app/">and still is</a>) just there to teach people about different methods of playing the game Diplomacy online.
                    Not exactly something thats going to upheave the social order. But I still take pride in it. I rely on word of mouth marketing to tell people why they should give this website 
                    any amount of their sadly finite lives. Can you please Help me?<br/>
                    Sincerly,<br/>
                    If you know anything about me, please don't spoil it.</p>
            </div>
        </>
    );
}