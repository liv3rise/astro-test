import {h} from 'preact';
import {useState} from 'preact/hooks';

export default function Greeting({messages}) {
    const randomMessage = () => messages[(Math.floor(Math.random() * messages.length))];

    const [greeting, setGreeting] = useState(randomMessage());

    return (
        <div class="flex items-center flex-col mb-5">
            <h3 class="text-2xl mb-3">{greeting}! Thank you for visiting!</h3>
            <button class="p-2 bg-slate-700 hover:bg-slate-800 transition text-slate-200 text-2xl rounded-md" onClick={() => setGreeting(randomMessage())}>New Greeting</button>
        </div>
    );
}