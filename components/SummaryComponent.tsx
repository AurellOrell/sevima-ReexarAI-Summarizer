import React, { useState, useEffect } from "react";
import clipboardCopy from "clipboard-copy";

const SummarizeComponent: React.FC = () => {
  const [paragraph, setParagraph] = useState("");
  const [summary, setSummary] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  //   const [count, setCount] = useState(0);

  //   const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  //     const paragraph = event.target.value;
  //    setParagraph(paragraph);
  //     setCount(paragraph.length);
  //  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = () => {
    if (!paragraph) {
      return; // Jika input kosong, jangan melakukan proses ringkasan
    }

    setIsLoading(true);

    // Panggil API atau lakukan proses merangkum paragraf
    fetch("https://api.example.com/summarize", {
      method: "POST",
      body: JSON.stringify({ paragraph }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Setelah mendapatkan hasil dari API atau proses merangkum
        // paragraf, setSummary() dengan hasilnya dan setIsLoading(false)
        setSummary(data.summary);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  };
  
  const handleCopyText = () => {
    clipboardCopy(paragraph);
    setIsCopied(true);
  };

  useEffect(() => {
    setCharacterCount(paragraph.slice(0, 1000).length);
  }, [paragraph]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const paragraph = event.target.value;
    setParagraph(paragraph.slice(0, 1000));
  };

  return (
    <div className="flex w-full">
      <div className="grid h-50 flex-grow card bg-base-300 rounded-box">
        <div className="py-5 px-3">
          <label className="block">
            <span className="block text-lg font-medium">
              Type/paste the text to be summarised *{" "}
            </span>
          </label>

          <textarea
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
            // onChange={handleChange}
            className="textarea textarea-accent textarea-lg w-full max-w-3xl text-sm mt-6"
            placeholder="The fox and the owl were always Argumentative. They would often bicker about nonsense things until one day, the owl decided that it was enough. The owl flew up into the sky and declared that from now on, they would only argue when there was something worth arguing about."
            rows={5}
          />
          <p className="text-sm text-right text-gray-500">
            {characterCount}/1000
          </p>

          <div className="form-control mt-6">
            <button
              onClick={handleSummarize}
              disabled={!paragraph}
              className="btn btn-accent rounded-full "
            >
              Generate
              {isLoading && <p className="loading loading-dots loading-sm"></p>}
            </button>
          </div>
        </div>
      </div>

      <div className="divider divider-horizontal"></div>
      <div className="grid h-auto flex-grow card bg-base-300 rounded-box">
        <div className="py-5 px-3">
          <label className="block">
            <span className="block text-xl font-medium">Results</span>
          </label>

          <form className="border border-accent rounded-lg mt-6">
          {!isLoading && summary && <p className="py-5 px-4">{summary}</p>}
          </form>

          <div className="form-control items-end mt-6">
            <div className="justify-end">
              <button
                onClick={handleCopyText}
                className="btn btn-outline btn-accent rounded-full"
              >
                Copy{" "}
                {isCopied && <span className="text-accent text-md">OK!</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarizeComponent;
