import { useEffect, useState } from "react";

const apiURL = "https://type.fit/api/quotes";

interface res {
    text;
    author: string;
}

const Quote: React.FC = () => {
    const [ quote, setQuote ] = useState<res>();
    const [ newQuote, setNewQuote ] = useState<boolean>(true);

    useEffect(() => {
        (async function () {
            const res = await fetch(apiURL);
            const data = await res.json();
            setQuote(data[Math.floor(Math.random() * data.length)]);
        })();
    }, [newQuote]);

    return (
        <div className="mt-3 mb-2" onClick={() => { setNewQuote(!newQuote) }}>
            {quote && (
                <>
                    <h2 className="italic text-sm">{quote.text}</h2>
                    <p className="text-xs">-{quote.author}</p>
                </>
            )}
        </div>
    );
};

export default Quote;
