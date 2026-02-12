
const questions = [
  {
    "question": "What has 13 hearts, but no other organs?",
    "image": "https://images.unsplash.com/photo-1534068590799-09895a701e3e?w=500",
    "options": ["A deck of cards", "A classroom", "An octopus", "A hospital"],
    "correctAnswerIndex": 0,
    "difficulty": "easy",
    "isPremium": false,
    "explanation": "A standard deck of playing cards contains 13 hearts (2 through Ace).",
    "hint": "You play games with me."
  },
  {
    "question": "I am taken from a mine, and shut up in a wooden case, from which I am never released, and yet I am used by almost every person. What am I?",
    "image": "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=500",
    "options": ["Coal", "Diamond", "Pencil Lead", "Gold"],
    "correctAnswerIndex": 2,
    "difficulty": "medium",
    "isPremium": false,
    "explanation": "Pencil lead (graphite) comes from mines and is encased in wood.",
    "hint": "You use me to write."
  },
  {
    "question": "A man rides into town on Friday, stays for three days, and leaves on Friday. How is this possible?",
    "image": "https://images.unsplash.com/photo-1552885942-8c17b8f9e7b2?w=500",
    "options": ["Time travel", "His horse is named Friday", "He stayed a week", "It's a leap year"],
    "correctAnswerIndex": 1,
    "difficulty": "medium",
    "isPremium": false,
    "explanation": "The horse's name is Friday.",
    "hint": "Friday is not just a day of the week."
  },
  {
    "question": "The more there is of it, the less you see. What is it?",
    "image": "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=500",
    "options": ["Fog", "Darkness", "Light", "Water"],
    "correctAnswerIndex": 1,
    "difficulty": "easy",
    "isPremium": false,
    "explanation": "Darkness obscures vision.",
    "hint": "Turn on a light to make it go away."
  },
  {
    "question": "I turn once, what is out will not get in. I turn again, what is in will not get out. What am I?",
    "image": "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=500",
    "options": ["A Key", "A Tornado", "A Conversation", "A Revolving Door"],
    "correctAnswerIndex": 0,
    "difficulty": "medium",
    "isPremium": false,
    "explanation": "A key locks and unlocks a door.",
    "hint": "I fit in a lock."
  },
  {
    "question": "David's father has three sons: Snap, Crackle, and _____?",
    "image": null,
    "options": ["Pop", "David", "John", "Mike"],
    "correctAnswerIndex": 1,
    "difficulty": "easy",
    "isPremium": false,
    "explanation": "The father is David's father, so David is the third son.",
    "hint": "Read the first two words of the question carefully."
  },
  {
    "question": "I am an odd number. Take away a letter and I become even. What number am I?",
    "image": null,
    "options": ["Seven", "Nine", "Eleven", "Five"],
    "correctAnswerIndex": 0,
    "difficulty": "medium",
    "isPremium": true,
    "explanation": "Remove the 's' from 'Seven' and you get 'even'.",
    "hint": "It's a word play, not math."
  },
  {
    "question": "What has hands but cannot clap?",
    "image": "https://images.unsplash.com/photo-1563861826100-9cb868c06c7e?w=500",
    "options": ["A Clock", "A Person", "A Tree", "A Robot"],
    "correctAnswerIndex": 0,
    "difficulty": "easy",
    "isPremium": false,
    "explanation": "A clock has an hour hand and a minute hand.",
    "hint": "It tells you something important."
  },
  {
    "question": "You see a house with two doors. One leads to certain death and the other to freedom. There are two guards: one always tells the truth, and one always lies. You can ask one question to one guard. What do you ask?",
    "image": "https://images.unsplash.com/photo-1590845947698-8924d7409b56?w=500",
    "options": ["Which door is safe?", "Is the other guard lying?", "Which door would the other guard say leads to freedom?", "Can I leave?"],
    "correctAnswerIndex": 2,
    "difficulty": "hard",
    "isPremium": true,
    "explanation": "If you ask what the OTHER guard would say, both will point to the death door. So you choose the opposite.",
    "hint": "Use a double negative logic."
  },
  {
    "question": "What acts like a cat, looks like a cat, but isn't a cat?",
    "image": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500",
    "options": ["A Kitten", "A Lion", "A Dog", "A Painting"],
    "correctAnswerIndex": 0,
    "difficulty": "medium",
    "isPremium": false,
    "explanation": "A kitten is technically a 'young' cat, or the answer could be interpreted as 'Kit-ten' (word play), but in riddles, a Kitten is the standard answer for 'looks like a cat but isn't [an adult] cat'.",
    "hint": "It's a baby."
  },
  {
    "question": "What 4-letter word can be written forward, backward or upside down, and can still be read from left to right?",
    "image": null,
    "options": ["NOON", "MOWS", "SWIMS", "PEEP"],
    "correctAnswerIndex": 0,
    "difficulty": "hard",
    "isPremium": true,
    "explanation": "NOON reads as NOON forwards and backwards. Upside down it is still NOON.",
    "hint": "It's a time of day."
  },
  {
    "question": "I can only live where there is light, but I die if the light shines on me. What am I?",
    "image": null,
    "options": ["A Shadow", "A Vampire", "A Photo", "A Plant"],
    "correctAnswerIndex": 0,
    "difficulty": "easy",
    "isPremium": false,
    "explanation": "A shadow exists because of light, but disappears if light shines directly on the spot where the shadow is cast (by another source).",
    "hint": "You cast me on the ground."
  },
  {
    "question": "If you throw a white stone into the Red Sea, what does it become?",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500",
    "options": ["Red", "Wet", "Sinking", "Floating"],
    "correctAnswerIndex": 1,
    "difficulty": "easy",
    "isPremium": false,
    "explanation": "It becomes wet. The name of the sea doesn't change the color of the stone.",
    "hint": "Don't overthink the color."
  },
  {
    "question": "Turn me on my side and I am everything. Cut me in half and I am nothing. What am I?",
    "image": null,
    "options": ["The number 8", "The letter O", "The number 0", "A circle"],
    "correctAnswerIndex": 0,
    "difficulty": "medium",
    "isPremium": true,
    "explanation": "The number 8 on its side is the infinity symbol (everything). Cut in half (vertically) it looks like two zeros (nothing).",
    "hint": "I am a number."
  },
  {
    "question": "What goes up but never comes down?",
    "image": null,
    "options": ["Rain", "Age", "Ball", "Rocket"],
    "correctAnswerIndex": 1,
    "difficulty": "easy",
    "isPremium": false,
    "explanation": "Your age only increases.",
    "hint": "You have a birthday every year."
  },
  {
    "question": "A woman shoots her husband. Then she holds him under water for over 5 minutes. Finally, she hangs him. But 5 minutes later they both go out together and enjoy a wonderful dinner together. How can this be?",
    "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    "options": ["She used a water gun", "She is a photographer", "It was a dream", "They are magicians"],
    "correctAnswerIndex": 1,
    "difficulty": "hard",
    "isPremium": true,
    "explanation": "She took a picture (shot), developed it (water), and hung it up to dry.",
    "hint": "Think about old-school cameras."
  },
  {
    "question": "What gets wetter the more it dries?",
    "image": "https://images.unsplash.com/photo-1520593926066-8575eb20d866?w=500",
    "options": ["Sponge", "Towel", "Water", "Cloud"],
    "correctAnswerIndex": 1,
    "difficulty": "easy",
    "isPremium": false,
    "explanation": "A towel absorbs water as it dries something else.",
    "hint": "You use it after a shower."
  },
  {
    "question": "I have keys, but no locks. I have a space, but no room. You can enter, but never go outside. What am I?",
    "image": "https://images.unsplash.com/photo-1587829741301-dc798b91a603?w=500",
    "options": ["Keyboard", "Piano", "Map", "Cipher"],
    "correctAnswerIndex": 0,
    "difficulty": "medium",
    "isPremium": false,
    "explanation": "A keyboard has keys (Enter, Space, etc.).",
    "hint": "Type your answer."
  },
  {
    "question": "The person who makes it has no need of it; the person who buys it has no use for it. The person who uses it can neither see nor feel it. What is it?",
    "image": "https://images.unsplash.com/photo-1526955042838-89c565d082fa?w=500",
    "options": ["A Coffin", "A Present", "A Car", "A Meal"],
    "correctAnswerIndex": 0,
    "difficulty": "hard",
    "isPremium": true,
    "explanation": "The maker sells it. The buyer (family) doesn't use it. The user (deceased) can't see/feel it.",
    "hint": "It's for the dead."
  },
  {
    "question": "What has one eye, but can’t see?",
    "image": "https://images.unsplash.com/photo-1524250280961-39e248df920d?w=500",
    "options": ["A Hurricane", "A Needle", "A Potato", "A Cyclops"],
    "correctAnswerIndex": 1,
    "difficulty": "easy",
    "isPremium": false,
    "explanation": "A needle has an eye for thread but cannot see.",
    "hint": "You use it for sewing."
  }
];

async function upload() {
  for (const q of questions) {
    const formData = new FormData();

    formData.append("question", q.question);
    formData.append("options", JSON.stringify(q.options));
    formData.append("correctAnswerIndex", q.correctAnswerIndex);
    formData.append("difficulty", q.difficulty);
    formData.append("isPremium", q.isPremium);
    formData.append("explanation", q.explanation);
    formData.append("hint", q.hint);

    // With your updated backend route, we can send the image URL as a string too,
    // but typically FormData is for files. Since you modified the backend to accept
    // req.body.image || req.file.path, sending it this way is fine if the backend
    // parses text fields from multer even without a file, OR if we use JSON.
    // Given your seed script uses FormData, let's keep it consistent.
    if (q.image) formData.append("image", q.image);

    try {
      const res = await fetch("http://localhost:5000/api/admin/questions", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Upload failed for:", q.question, data);
      } else {
        console.log("✅ Success:", q.question);
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (err) {
      console.error("Network Error:", err);
    }
  }
}

upload();
