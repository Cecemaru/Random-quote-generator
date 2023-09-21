"use client";

import { useEffect, useState } from "react";

const apiUrl = "https://api.quotable.io";

const limitQuote = 3;

export default function Home() {
  const [quotes, setQuotes] = useState(false);

  const [authorQuotes, setAuthorQuotes] = useState(false);

  function fetchRandomQuote() {
    fetch(`${apiUrl}/random`)
      .then((response) => response.json())
      .then((data) => setQuotes(data));
  }

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  function handleRandomQuote() {
    fetchRandomQuote();
    setAuthorQuotes(false);
  }

  function fetchAllQuote() {
    fetch(`${apiUrl}/quotes?slug=${quotes.authorSlug}&limit=${limitQuote}`)
      .then((response) => response.json())
      .then((data) => setAuthorQuotes(data.results));
  }

  function handleAuthorQuote() {
    fetchAllQuote();
  }

  return (
    <main className="flex min-h-screen  flex-col max-w-5xl justify-between p-5 mx-auto">
      <div className="flex justify-end gap-2">
        <button className="flex gap-2" onClick={handleRandomQuote}>
          <p>random</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
            />
          </svg>
        </button>
      </div>

      <section className="max-w-xl mx-auto">
        {authorQuotes ? (
          <ul>
            <h1 className="mb-14 pl-8 font-bold text-xl">{quotes.author}</h1>
            {authorQuotes.map((authorQuote) => (
              <li className="mb-20 text-xl" key={authorQuote._id}>
                {authorQuote.content}
              </li>
            ))}
          </ul>
        ) : (
          <>
            {quotes && (
              <>
                <ul className="mb-20">
                  <li className="text-2xl">{quotes.content}</li>
                </ul>

                <button
                  className="flex justify-between items-center hover:bg-black hover:text-white w-full text-left px-8 py-12 duration-500 author-button"
                  onClick={handleAuthorQuote}
                >
                  <div>
                    <div className="text-xl font-bold">{quotes.author}</div>

                    <div>{quotes.tags[0]}</div>
                  </div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </button>
              </>
            )}
          </>
        )}
      </section>

      <footer className="text-center">
        created by Cecemaru - devChallenges.io
      </footer>
    </main>
  );
}
