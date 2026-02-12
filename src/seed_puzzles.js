
const puzzles = [
    {
        question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21cd?w=500",
        answer: "echo",
        difficulty: "puzzle",
        hint: "You might hear me in a canyon."
    },
    {
        question: "You see a boat filled with people, yet there is not a single person on board. How is that possible?",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500",
        answer: "married",
        difficulty: "puzzle",
        hint: "Think about relationship status."
    },
    {
        question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
        image: null,
        answer: "m",
        difficulty: "puzzle",
        hint: "Look at the letters."
    },
    {
        question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
        image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=500",
        answer: "map",
        difficulty: "puzzle",
        hint: "You use me to find your way."
    },
    {
        question: "What is seen in the middle of March and April that can’t be seen at the beginning or end of either month?",
        image: null,
        answer: "r",
        difficulty: "puzzle",
        hint: "It's a letter."
    }
];

async function seedPuzzles() {
    for (const p of puzzles) {
        // Simple JSON post since we aren't using file upload for these specifically in this script
        // But wait, the admin route expects formData? 
        // Actually, let's just use the direct mongoose model since I am in backend context?
        // No, user usually runs seed.js via node.

        // Let's us the admin route I fixed.
        const formData = new FormData();
        formData.append("question", p.question);
        formData.append("difficulty", "puzzle");
        formData.append("correctAnswerIndex", 0); // Dummy
        formData.append("options", JSON.stringify(["a", "b", "c", "d"])); // Dummy
        formData.append("answer", p.answer); // The real answer
        formData.append("hint", p.hint);
        if (p.image) formData.append("image", p.image);

        try {
            const res = await fetch("http://localhost:5000/api/admin/questions", {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            console.log(res.ok ? "✅ Added Puzzle: " + p.question : "❌ Failed: " + JSON.stringify(data));
            await new Promise(r => setTimeout(r, 200));
        } catch (e) {
            console.error(e);
        }
    }
}

seedPuzzles();
