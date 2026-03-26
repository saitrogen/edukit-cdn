# EduKit CDN

**EduKit CDN** is a lightweight, zero-dependency JavaScript library for creating interactive educational components. Designed for seamless integration with AI tools like Google Gemini Canvas, EduKit allows educators and AI assistants to generate rich, interactive learning experiences using only JSON data. The CDN script handles all rendering, styling, and interactivity—no custom code required.

---

## 🚀 CDN URLs

### Production (v1 - Stable)
```
https://cdn.jsdelivr.net/gh/saitrogen/edukit-cdn@main/v1/edukit.js
```

### Development (v2 - Latest)
```
https://cdn.jsdelivr.net/gh/saitrogen/edukit-cdn@main/v2/edukit.js
```

---

## 🎯 Quick Start

### Minimal Template
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EduKit Demo</title>
</head>
<body>
  <div id="app"></div>

  <script src="https://cdn.jsdelivr.net/gh/saitrogen/edukit-cdn@main/v1/edukit.js"></script>
  <script>
    EduKit.render("#app", {
      component: "quiz",
      theme: "light",
      data: {
        title: "Sample Quiz",
        questions: [
          {
            q: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            answer: "4"
          }
        ]
      }
    });
  </script>
</body>
</html>
```

---

## 📚 Component Reference

### 1. Quiz Component

Interactive multiple-choice quiz with score tracking and optional negative marking.

**JSON Schema:**
```json
{
  "component": "quiz",
  "theme": "light",
  "data": {
    "title": "string",
    "negativeMarking": true,
    "questions": [
      {
        "q": "string",
        "options": ["string", "string", "string", "string"],
        "answer": "string"
      }
    ]
  }
}
```

**Complete HTML Template:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EduKit Quiz</title>
</head>
<body>
  <div id="app"></div>

  <script src="https://cdn.jsdelivr.net/gh/saitrogen/edukit-cdn@main/v1/edukit.js"></script>
  <script>
    EduKit.render("#app", {
      component: "quiz",
      theme: "light",
      data: {
        title: "NEET Biology Quiz",
        negativeMarking: true,
        questions: [
          {
            q: "Which organelle is known as the powerhouse of the cell?",
            options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
            answer: "Mitochondria"
          },
          {
            q: "What is the primary function of ribosomes?",
            options: ["DNA replication", "Protein synthesis", "Lipid metabolism", "Energy production"],
            answer: "Protein synthesis"
          }
        ]
      }
    });
  </script>
</body>
</html>
```

**Behavior:**
- Displays questions one at a time with multiple choice options
- Shows optional negative marking warning banner if `negativeMarking: true`
- Tracks score and displays final results
- Shows question counter (e.g., "2 / 10")

---

### 2. Flashcard Component

Interactive flashcards with flip animation for term/definition study.

**JSON Schema:**
```json
{
  "component": "flashcard",
  "theme": "dark",
  "data": {
    "title": "string",
    "cards": [
      {
        "term": "string",
        "definition": "string"
      }
    ]
  }
}
```

**Complete HTML Template:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EduKit Flashcards</title>
</head>
<body>
  <div id="app"></div>

  <script src="https://cdn.jsdelivr.net/gh/saitrogen/edukit-cdn@main/v1/edukit.js"></script>
  <script>
    EduKit.render("#app", {
      component: "flashcard",
      theme: "dark",
      data: {
        title: "Chemistry Flashcards",
        cards: [
          {
            term: "Hydrogen (H)",
            definition: "Atomic number 1, lightest element, most abundant in the universe"
          },
          {
            term: "Carbon (C)",
            definition: "Atomic number 6, basis of organic chemistry, forms 4 covalent bonds"
          }
        ]
      }
    });
  </script>
</body>
</html>
```

**Behavior:**
- Shows one card at a time with term on front
- Click card to flip and reveal definition (smooth CSS animation)
- Previous/Next navigation buttons
- Card counter (e.g., "Card 3 of 8")

---

### 3. True/False Component

Simple true/false statement quiz with instant feedback.

**JSON Schema:**
```json
{
  "component": "truefalse",
  "theme": "light",
  "data": {
    "title": "string",
    "questions": [
      {
        "statement": "string",
        "answer": true
      }
    ]
  }
}
```

**Complete HTML Template:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EduKit True/False</title>
</head>
<body>
  <div id="app"></div>

  <script src="https://cdn.jsdelivr.net/gh/saitrogen/edukit-cdn@main/v1/edukit.js"></script>
  <script>
    EduKit.render("#app", {
      component: "truefalse",
      theme: "light",
      data: {
        title: "Physics - Laws of Motion",
        questions: [
          {
            statement: "Newton's first law states that an object at rest stays at rest unless acted upon by an external force.",
            answer: true
          },
          {
            statement: "Acceleration is directly proportional to mass when force is constant.",
            answer: false
          }
        ]
      }
    });
  </script>
</body>
</html>
```

**Behavior:**
- Displays statement with TRUE and FALSE buttons
- Highlights correct/incorrect answer after selection
- Auto-advances to next question after 1.5s
- Final score at end

---

### 4. Fill in the Blank Component

Text input questions with case-insensitive answer checking.

**JSON Schema:**
```json
{
  "component": "fillblank",
  "theme": "colorful",
  "data": {
    "title": "string",
    "questions": [
      {
        "sentence": "The ___ is the powerhouse of the cell.",
        "answer": "mitochondria"
      }
    ]
  }
}
```

**Complete HTML Template:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EduKit Fill in the Blank</title>
</head>
<body>
  <div id="app"></div>

  <script src="https://cdn.jsdelivr.net/gh/saitrogen/edukit-cdn@main/v1/edukit.js"></script>
  <script>
    EduKit.render("#app", {
      component: "fillblank",
      theme: "colorful",
      data: {
        title: "Biology - Cell Organelles",
        questions: [
          {
            sentence: "The ___ is known as the powerhouse of the cell.",
            answer: "mitochondria"
          },
          {
            sentence: "The ___ is responsible for protein synthesis in the cell.",
            answer: "ribosome"
          }
        ]
      }
    });
  </script>
</body>
</html>
```

**Behavior:**
- Displays sentence with `___` replaced by text input
- Submit button validates answer (case-insensitive)
- Shows correct/incorrect feedback with the right answer
- Final score at end

---

### 5. Match Pairs Component

Interactive drag-style matching between two shuffled columns.

**JSON Schema:**
```json
{
  "component": "matchpairs",
  "theme": "light",
  "data": {
    "title": "string",
    "pairs": [
      {
        "left": "string",
        "right": "string"
      }
    ]
  }
}
```

**Complete HTML Template:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EduKit Match Pairs</title>
</head>
<body>
  <div id="app"></div>

  <script src="https://cdn.jsdelivr.net/gh/saitrogen/edukit-cdn@main/v1/edukit.js"></script>
  <script>
    EduKit.render("#app", {
      component: "matchpairs",
      theme: "light",
      data: {
        title: "Chemistry - Elements and Symbols",
        pairs: [
          { left: "Sodium", right: "Na" },
          { left: "Potassium", right: "K" },
          { left: "Iron", right: "Fe" },
          { left: "Gold", right: "Au" }
        ]
      }
    });
  </script>
</body>
</html>
```

**Behavior:**
- Two columns with shuffled items
- Click one item from each column to match
- Matched pairs turn green and are locked
- Completion message when all pairs matched

---

### 6. Match Columns Component

NEET-style column matching with labeled options (A-p, B-q format).

**JSON Schema:**
```json
{
  "component": "matchcolumns",
  "theme": "dark",
  "data": {
    "title": "string",
    "columnA": ["string", "string", "string"],
    "columnB": ["string", "string", "string"],
    "correctMapping": { "0": "0", "1": "1", "2": "2" },
    "options": [
      {
        "label": "A-p, B-q, C-r",
        "mapping": {"0": "0", "1": "1", "2": "2"}
      }
    ]
  }
}
```

**Complete HTML Template:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EduKit Match Columns</title>
</head>
<body>
  <div id="app"></div>

  <script src="https://cdn.jsdelivr.net/gh/saitrogen/edukit-cdn@main/v1/edukit.js"></script>
  <script>
    EduKit.render("#app", {
      component: "matchcolumns",
      theme: "dark",
      data: {
        title: "NEET Biology - Cell Organelles",
        columnA: ["Mitochondria", "Ribosome", "Nucleus"],
        columnB: ["ATP production", "Protein synthesis", "DNA storage"],
        correctMapping: { "0": "0", "1": "1", "2": "2" },
        options: [
          { label: "A-q, B-p, C-r", mapping: {"0":"1","1":"0","2":"2"} },
          { label: "A-p, B-q, C-r", mapping: {"0":"0","1":"1","2":"2"} },
          { label: "A-r, B-q, C-p", mapping: {"0":"2","1":"1","2":"0"} },
          { label: "A-p, B-r, C-q", mapping: {"0":"0","1":"2","2":"1"} }
        ]
      }
    });
  </script>
</body>
</html>
```

**Behavior:**
- Displays two-column table with auto-generated labels (A, B, C... and p, q, r...)
- Radio button options below for selecting matches
- Highlights correct answer on submit
- NEET exam-style formatting

---

### 7. Assertion-Reason Component

NEET-style assertion-reason questions with 4 fixed options.

**JSON Schema:**
```json
{
  "component": "assertionreason",
  "theme": "light",
  "data": {
    "title": "string",
    "questions": [
      {
        "assertion": "string",
        "reason": "string",
        "answer": 1
      }
    ]
  }
}
```

**Complete HTML Template:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EduKit Assertion-Reason</title>
</head>
<body>
  <div id="app"></div>

  <script src="https://cdn.jsdelivr.net/gh/saitrogen/edukit-cdn@main/v1/edukit.js"></script>
  <script>
    EduKit.render("#app", {
      component: "assertionreason",
      theme: "light",
      data: {
        title: "NEET Biology - Assertion and Reason",
        questions: [
          {
            assertion: "Mitochondria is known as the powerhouse of the cell.",
            reason: "Mitochondria synthesizes ATP via cellular respiration.",
            answer: 1
          },
          {
            assertion: "Ribosomes are the site of protein synthesis.",
            reason: "Ribosomes contain DNA which codes for proteins.",
            answer: 2
          }
        ]
      }
    });
  </script>
</body>
</html>
```

**Behavior:**
- Displays Assertion (A) and Reason (R) statements
- Always shows these 4 fixed options:
  1. Both A and R are true, and R is the correct explanation of A
  2. Both A and R are true, but R is NOT the correct explanation of A
  3. A is true, but R is false
  4. A is false, but R is true
- `answer` field is 1-indexed (1-4)
- Highlights correct option on submit
- Final score at end

---

## 🎨 Theming

All components support three built-in themes via the `theme` parameter:

### Light Theme (Default)
```javascript
theme: "light"
```
- White background (#ffffff)
- Dark text (#333333)
- Blue buttons (#4a90e2)

### Dark Theme
```javascript
theme: "dark"
```
- Dark background (#1e1e1e)
- Light text (#e0e0e0)
- Purple buttons (#9c27b0)

### Colorful Theme
```javascript
theme: "colorful"
```
- Gradient purple background
- White text
- Bright red buttons (#ff6b6b)
- Perfect for younger students

**Example:**
```javascript
EduKit.render("#app", {
  component: "quiz",
  theme: "colorful",  // or "light" or "dark"
  data: { /* ... */ }
});
```

---

## 🤖 For AI / Gemini Canvas Users

If you're using **Google Gemini Canvas** or another AI assistant to generate educational content, paste the following instruction into your prompt to ensure the AI uses EduKit correctly:

---

### **Gemini System Prompt** (Copy-Paste This)

```
You are generating interactive educational content using EduKit CDN.

AVAILABLE COMPONENTS:
1. quiz - Multiple choice with optional negative marking
2. flashcard - Term/definition cards with flip animation
3. truefalse - True/False statements
4. fillblank - Fill in the blank text input
5. matchpairs - Match items from two shuffled columns
6. matchcolumns - NEET-style column matching with labeled options
7. assertionreason - NEET-style assertion-reason with 4 fixed options

YOUR ONLY JOB:
- Output a COMPLETE HTML file using this exact template
- Fill in the JSON data based on the user's topic
- DO NOT write any custom CSS, JavaScript, or rendering logic
- DO NOT modify the CDN script or EduKit.render() call
- ONLY provide the JSON data

TEMPLATE TO USE:
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EduKit Content</title>
</head>
<body>
  <div id="app"></div>

  <script src="https://cdn.jsdelivr.net/gh/saitrogen/edukit-cdn@main/v1/edukit.js"></script>
  <script>
    EduKit.render("#app", {
      component: "COMPONENT_NAME_HERE",
      theme: "light",
      data: {
        // YOUR JSON DATA HERE
      }
    });
  </script>
</body>
</html>

COMPONENT SCHEMAS:

Quiz:
{
  component: "quiz",
  theme: "light",
  data: {
    title: "string",
    negativeMarking: true,  // optional
    questions: [
      { q: "string", options: ["str", "str", "str", "str"], answer: "str" }
    ]
  }
}

Flashcard:
{
  component: "flashcard",
  theme: "dark",
  data: {
    title: "string",
    cards: [
      { term: "string", definition: "string" }
    ]
  }
}

True/False:
{
  component: "truefalse",
  theme: "light",
  data: {
    title: "string",
    questions: [
      { statement: "string", answer: true }
    ]
  }
}

Fill in the Blank:
{
  component: "fillblank",
  theme: "colorful",
  data: {
    title: "string",
    questions: [
      { sentence: "The ___ is the powerhouse of the cell.", answer: "mitochondria" }
    ]
  }
}

Match Pairs:
{
  component: "matchpairs",
  theme: "light",
  data: {
    title: "string",
    pairs: [
      { left: "Sodium", right: "Na" }
    ]
  }
}

Match Columns:
{
  component: "matchcolumns",
  theme: "dark",
  data: {
    title: "string",
    columnA: ["Mitochondria", "Ribosome", "Nucleus"],
    columnB: ["ATP production", "Protein synthesis", "DNA storage"],
    correctMapping: { "0": "0", "1": "1", "2": "2" },
    options: [
      { label: "A-p, B-q, C-r", mapping: {"0":"0","1":"1","2":"2"} }
    ]
  }
}

Assertion-Reason:
{
  component: "assertionreason",
  theme: "light",
  data: {
    title: "string",
    questions: [
      {
        assertion: "Mitochondria is the powerhouse of the cell.",
        reason: "Mitochondria synthesizes ATP.",
        answer: 1  // 1-4, always one of the 4 fixed options
      }
    ]
  }
}

RULES:
- Never write quiz rendering logic yourself
- Never create custom CSS styles
- Never use innerHTML for user data
- Always use the CDN URL exactly as shown
- Always output a complete, working HTML file
- Theme options: "light", "dark", "colorful"
```

---

## 🛠️ Technical Details

- **Zero Dependencies**: Pure vanilla JavaScript, no jQuery or frameworks
- **XSS Safe**: Uses `textContent` and DOM APIs, never `innerHTML` with user data
- **Mobile Responsive**: Max-width containers, full-width buttons on mobile
- **Modern Browsers**: Works in all browsers supporting ES5+ (2015+)
- **No Build Step**: Direct CDN usage, no webpack/babel required
- **Schema Validation**: Built-in validation with helpful console warnings

---

## 📦 Local Development

To test locally:

1. Clone the repository:
```bash
git clone https://github.com/saitrogen/edukit-cdn.git
cd edukit-cdn
```

2. Open any demo file in your browser:
```bash
open demos/quiz.html
# or
python3 -m http.server 8000
# then visit http://localhost:8000/demos/
```

---

## 📄 License

MIT License - feel free to use in educational projects, commercial applications, or AI-generated content.

---

## 🤝 Contributing

Contributions welcome! Please ensure:
- All DOM manipulation uses safe methods (`textContent`, `createElement`, `addEventListener`)
- No external dependencies
- Mobile responsive design
- Consistent visual style across components

---

## 🐛 Issues & Support

Report issues at: [https://github.com/saitrogen/edukit-cdn/issues](https://github.com/saitrogen/edukit-cdn/issues)

---

**Built for educators, students, and AI assistants. Made with ❤️ for accessible education.**
