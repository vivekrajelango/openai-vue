export default [
    {  
        name: "Q&A",
        id: 1,
        desc: 'Answer questions based on existing knowledge.',
        option: {
            model: "text-davinci-003",
            temperature: 0.9,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.6,
            stop: [" Human:", " AI:"],
        }
    },
    {  
        name: "Grammar correction",
        id: 2,
        desc: 'Corrects sentences into standard English.'
    },
    {  
        name: "Text to command",
        id: 3,
        desc: 'Translate text into programmatic commands.'
    },
    {  
        name: "English to other languages",
        id: 4,
        desc: 'Translates English text into French, Spanish and Japanese.'
    },
]