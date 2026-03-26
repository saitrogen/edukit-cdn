// edukit.js — hosted on CDN
(function () {
  window.EduKit = {
    render: function (selector, config) {
      const el = document.querySelector(selector);
      if (!el) {
        console.warn("EduKit: no element found for selector \"" + selector + "\"");
        return;
      }

      // Schema validation
      const validComponents = ["quiz", "flashcard", "truefalse", "fillblank", "matchpairs", "matchcolumns", "assertionreason"];
      if (!config.component) {
        console.warn("EduKit: missing required field 'component'");
        return;
      }
      if (validComponents.indexOf(config.component) === -1) {
        console.warn("EduKit: unsupported component \"" + config.component + "\"");
        return;
      }
      if (!config.data) {
        console.warn("EduKit: missing required field 'data' for component '" + config.component + "'");
        return;
      }

      // Validate component-specific required fields
      const validators = {
        quiz: function(data) {
          if (!data.title) {
            console.warn("EduKit: missing required field 'title' for component 'quiz'");
            return false;
          }
          if (!data.questions || !Array.isArray(data.questions)) {
            console.warn("EduKit: missing required field 'questions' for component 'quiz'");
            return false;
          }
          return true;
        },
        flashcard: function(data) {
          if (!data.title) {
            console.warn("EduKit: missing required field 'title' for component 'flashcard'");
            return false;
          }
          if (!data.cards || !Array.isArray(data.cards)) {
            console.warn("EduKit: missing required field 'cards' for component 'flashcard'");
            return false;
          }
          return true;
        },
        truefalse: function(data) {
          if (!data.title) {
            console.warn("EduKit: missing required field 'title' for component 'truefalse'");
            return false;
          }
          if (!data.questions || !Array.isArray(data.questions)) {
            console.warn("EduKit: missing required field 'questions' for component 'truefalse'");
            return false;
          }
          return true;
        },
        fillblank: function(data) {
          if (!data.title) {
            console.warn("EduKit: missing required field 'title' for component 'fillblank'");
            return false;
          }
          if (!data.questions || !Array.isArray(data.questions)) {
            console.warn("EduKit: missing required field 'questions' for component 'fillblank'");
            return false;
          }
          return true;
        },
        matchpairs: function(data) {
          if (!data.title) {
            console.warn("EduKit: missing required field 'title' for component 'matchpairs'");
            return false;
          }
          if (!data.pairs || !Array.isArray(data.pairs)) {
            console.warn("EduKit: missing required field 'pairs' for component 'matchpairs'");
            return false;
          }
          return true;
        },
        matchcolumns: function(data) {
          if (!data.title) {
            console.warn("EduKit: missing required field 'title' for component 'matchcolumns'");
            return false;
          }
          if (!data.columnA || !Array.isArray(data.columnA)) {
            console.warn("EduKit: missing required field 'columnA' for component 'matchcolumns'");
            return false;
          }
          if (!data.columnB || !Array.isArray(data.columnB)) {
            console.warn("EduKit: missing required field 'columnB' for component 'matchcolumns'");
            return false;
          }
          if (!data.correctMapping) {
            console.warn("EduKit: missing required field 'correctMapping' for component 'matchcolumns'");
            return false;
          }
          if (!data.options || !Array.isArray(data.options)) {
            console.warn("EduKit: missing required field 'options' for component 'matchcolumns'");
            return false;
          }
          return true;
        },
        assertionreason: function(data) {
          if (!data.title) {
            console.warn("EduKit: missing required field 'title' for component 'assertionreason'");
            return false;
          }
          if (!data.questions || !Array.isArray(data.questions)) {
            console.warn("EduKit: missing required field 'questions' for component 'assertionreason'");
            return false;
          }
          return true;
        }
      };

      if (!validators[config.component](config.data)) {
        return;
      }

      // Generate unique ID for theming
      const containerId = "edukit-" + Math.random().toString(36).substr(2, 9);

      // Apply theme
      const theme = config.theme || "light";
      const themeStyles = {
        light: {
          background: "#ffffff",
          text: "#333333",
          buttonBg: "#4a90e2",
          buttonText: "#ffffff",
          buttonHover: "#357abd",
          border: "#cccccc",
          correctBg: "#4caf50",
          wrongBg: "#f44336",
          cardBg: "#f9f9f9"
        },
        dark: {
          background: "#1e1e1e",
          text: "#e0e0e0",
          buttonBg: "#9c27b0",
          buttonText: "#ffffff",
          buttonHover: "#7b1fa2",
          border: "#444444",
          correctBg: "#66bb6a",
          wrongBg: "#ef5350",
          cardBg: "#2a2a2a"
        },
        colorful: {
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          text: "#ffffff",
          buttonBg: "#ff6b6b",
          buttonText: "#ffffff",
          buttonHover: "#ee5a52",
          border: "#ffffff",
          correctBg: "#51cf66",
          wrongBg: "#ff8787",
          cardBg: "rgba(255, 255, 255, 0.1)"
        }
      };

      const currentTheme = themeStyles[theme];

      // Inject theme styles
      const styleEl = document.createElement("style");
      styleEl.textContent =
        "#" + containerId + " { background: " + currentTheme.background + "; color: " + currentTheme.text + "; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 12px; }" +
        "#" + containerId + " button { background: " + currentTheme.buttonBg + "; color: " + currentTheme.buttonText + "; border: none; padding: 12px 24px; margin: 8px 0; width: 100%; cursor: pointer; border-radius: 8px; font-size: 16px; transition: background 0.3s; }" +
        "#" + containerId + " button:hover { background: " + currentTheme.buttonHover + "; }" +
        "#" + containerId + " button:disabled { opacity: 0.6; cursor: not-allowed; }" +
        "#" + containerId + " .edukit-correct { background: " + currentTheme.correctBg + " !important; }" +
        "#" + containerId + " .edukit-wrong { background: " + currentTheme.wrongBg + " !important; }" +
        "#" + containerId + " input[type='text'] { width: 100%; padding: 10px; border: 2px solid " + currentTheme.border + "; border-radius: 8px; font-size: 16px; background: " + currentTheme.cardBg + "; color: " + currentTheme.text + "; box-sizing: border-box; }" +
        "#" + containerId + " .edukit-card { background: " + currentTheme.cardBg + "; border: 2px solid " + currentTheme.border + "; border-radius: 12px; padding: 40px; margin: 20px 0; min-height: 200px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.6s; transform-style: preserve-3d; position: relative; }" +
        "#" + containerId + " .edukit-card.flipped { transform: rotateY(180deg); }" +
        "#" + containerId + " .edukit-card-front, #" + containerId + " .edukit-card-back { backface-visibility: hidden; position: absolute; width: 100%; }" +
        "#" + containerId + " .edukit-card-back { transform: rotateY(180deg); }" +
        "#" + containerId + " .edukit-nav { display: flex; justify-content: space-between; margin-top: 20px; }" +
        "#" + containerId + " .edukit-nav button { width: auto; min-width: 100px; }" +
        "#" + containerId + " table { width: 100%; border-collapse: collapse; margin: 20px 0; }" +
        "#" + containerId + " th, #" + containerId + " td { border: 1px solid " + currentTheme.border + "; padding: 12px; text-align: left; }" +
        "#" + containerId + " th { background: " + currentTheme.cardBg + "; font-weight: bold; }" +
        "#" + containerId + " .edukit-warning { background: #fff3cd; color: #856404; padding: 12px; border-radius: 8px; margin-bottom: 16px; border: 1px solid #ffeaa7; }" +
        "#" + containerId + " .edukit-match-item { padding: 12px; margin: 8px 0; background: " + currentTheme.cardBg + "; border: 2px solid " + currentTheme.border + "; border-radius: 8px; cursor: pointer; transition: all 0.3s; }" +
        "#" + containerId + " .edukit-match-item.selected { border-color: " + currentTheme.buttonBg + "; background: " + currentTheme.buttonBg + "; color: " + currentTheme.buttonText + "; }" +
        "#" + containerId + " .edukit-match-item.matched { background: " + currentTheme.correctBg + "; color: white; cursor: default; }" +
        "#" + containerId + " .edukit-radio { display: block; margin: 12px 0; padding: 12px; background: " + currentTheme.cardBg + "; border: 2px solid " + currentTheme.border + "; border-radius: 8px; cursor: pointer; }" +
        "#" + containerId + " input[type='radio'] { margin-right: 8px; cursor: pointer; }";

      document.head.appendChild(styleEl);

      // Component renderers
      const renderers = {
        quiz: function(data) {
          let current = 0, score = 0;

          function renderQuestion() {
            const q = data.questions[current];

            const container = document.createElement("div");
            container.id = containerId;

            const heading = document.createElement("h2");
            heading.textContent = data.title;
            container.appendChild(heading);

            // Negative marking warning
            if (data.negativeMarking) {
              const warning = document.createElement("div");
              warning.className = "edukit-warning";
              warning.textContent = "⚠️ Negative marking: -¼ per wrong answer";
              container.appendChild(warning);
            }

            const prompt = document.createElement("p");
            const bold = document.createElement("b");
            bold.textContent = "Q" + (current + 1) + ":";
            prompt.appendChild(bold);
            prompt.appendChild(document.createTextNode(" " + q.q));
            container.appendChild(prompt);

            q.options.forEach(function (opt) {
              const btn = document.createElement("button");
              btn.textContent = opt;
              btn.addEventListener("click", function () {
                if (opt === q.answer) score++;
                current++;
                if (current < data.questions.length) {
                  renderQuestion();
                } else {
                  const result = document.createElement("div");
                  result.id = containerId;
                  result.style.textAlign = "center";
                  result.style.padding = "40px";
                  const scoreHeading = document.createElement("h2");
                  scoreHeading.textContent = "Score: " + score + "/" + data.questions.length + " 🎉";
                  result.appendChild(scoreHeading);
                  el.replaceChildren(result);
                }
              });
              container.appendChild(btn);
            });

            const counter = document.createElement("small");
            counter.textContent = (current + 1) + " / " + data.questions.length;
            container.appendChild(counter);

            el.replaceChildren(container);
          }

          renderQuestion();
        },

        flashcard: function(data) {
          let current = 0;
          let flipped = false;

          function renderCard() {
            const card = data.cards[current];

            const container = document.createElement("div");
            container.id = containerId;

            const heading = document.createElement("h2");
            heading.textContent = data.title;
            container.appendChild(heading);

            const cardEl = document.createElement("div");
            cardEl.className = "edukit-card";

            const front = document.createElement("div");
            front.className = "edukit-card-front";
            const frontText = document.createElement("h3");
            frontText.textContent = card.term;
            frontText.style.textAlign = "center";
            front.appendChild(frontText);

            const back = document.createElement("div");
            back.className = "edukit-card-back";
            const backText = document.createElement("p");
            backText.textContent = card.definition;
            backText.style.textAlign = "center";
            back.appendChild(backText);

            cardEl.appendChild(front);
            cardEl.appendChild(back);

            cardEl.addEventListener("click", function() {
              flipped = !flipped;
              if (flipped) {
                cardEl.classList.add("flipped");
              } else {
                cardEl.classList.remove("flipped");
              }
            });

            container.appendChild(cardEl);

            const counter = document.createElement("p");
            counter.style.textAlign = "center";
            counter.textContent = "Card " + (current + 1) + " of " + data.cards.length;
            container.appendChild(counter);

            const nav = document.createElement("div");
            nav.className = "edukit-nav";

            const prevBtn = document.createElement("button");
            prevBtn.textContent = "← Previous";
            prevBtn.disabled = current === 0;
            prevBtn.addEventListener("click", function() {
              if (current > 0) {
                current--;
                flipped = false;
                renderCard();
              }
            });
            nav.appendChild(prevBtn);

            const nextBtn = document.createElement("button");
            nextBtn.textContent = "Next →";
            nextBtn.disabled = current === data.cards.length - 1;
            nextBtn.addEventListener("click", function() {
              if (current < data.cards.length - 1) {
                current++;
                flipped = false;
                renderCard();
              }
            });
            nav.appendChild(nextBtn);

            container.appendChild(nav);
            el.replaceChildren(container);
          }

          renderCard();
        },

        truefalse: function(data) {
          let current = 0, score = 0, answered = false;

          function renderQuestion() {
            const q = data.questions[current];

            const container = document.createElement("div");
            container.id = containerId;

            const heading = document.createElement("h2");
            heading.textContent = data.title;
            container.appendChild(heading);

            const prompt = document.createElement("p");
            const bold = document.createElement("b");
            bold.textContent = "Statement " + (current + 1) + ":";
            prompt.appendChild(bold);
            prompt.appendChild(document.createTextNode(" " + q.statement));
            container.appendChild(prompt);

            const trueBtn = document.createElement("button");
            trueBtn.textContent = "TRUE";
            trueBtn.addEventListener("click", function() {
              if (answered) return;
              answered = true;
              if (q.answer === true) {
                trueBtn.classList.add("edukit-correct");
                score++;
              } else {
                trueBtn.classList.add("edukit-wrong");
                falseBtn.classList.add("edukit-correct");
              }
              trueBtn.disabled = true;
              falseBtn.disabled = true;
              setTimeout(function() {
                current++;
                answered = false;
                if (current < data.questions.length) {
                  renderQuestion();
                } else {
                  showResults();
                }
              }, 1500);
            });
            container.appendChild(trueBtn);

            const falseBtn = document.createElement("button");
            falseBtn.textContent = "FALSE";
            falseBtn.addEventListener("click", function() {
              if (answered) return;
              answered = true;
              if (q.answer === false) {
                falseBtn.classList.add("edukit-correct");
                score++;
              } else {
                falseBtn.classList.add("edukit-wrong");
                trueBtn.classList.add("edukit-correct");
              }
              trueBtn.disabled = true;
              falseBtn.disabled = true;
              setTimeout(function() {
                current++;
                answered = false;
                if (current < data.questions.length) {
                  renderQuestion();
                } else {
                  showResults();
                }
              }, 1500);
            });
            container.appendChild(falseBtn);

            const counter = document.createElement("small");
            counter.textContent = (current + 1) + " / " + data.questions.length;
            container.appendChild(counter);

            el.replaceChildren(container);
          }

          function showResults() {
            const result = document.createElement("div");
            result.id = containerId;
            result.style.textAlign = "center";
            result.style.padding = "40px";
            const scoreHeading = document.createElement("h2");
            scoreHeading.textContent = "Score: " + score + "/" + data.questions.length + " 🎉";
            result.appendChild(scoreHeading);
            el.replaceChildren(result);
          }

          renderQuestion();
        },

        fillblank: function(data) {
          let current = 0, score = 0;

          function renderQuestion() {
            const q = data.questions[current];

            const container = document.createElement("div");
            container.id = containerId;

            const heading = document.createElement("h2");
            heading.textContent = data.title;
            container.appendChild(heading);

            const prompt = document.createElement("p");
            const bold = document.createElement("b");
            bold.textContent = "Q" + (current + 1) + ":";
            prompt.appendChild(bold);
            prompt.appendChild(document.createTextNode(" " + q.sentence));
            container.appendChild(prompt);

            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Type your answer here...";
            container.appendChild(input);

            const feedback = document.createElement("p");
            feedback.style.marginTop = "16px";
            feedback.style.fontWeight = "bold";
            container.appendChild(feedback);

            const submitBtn = document.createElement("button");
            submitBtn.textContent = "Submit";
            submitBtn.addEventListener("click", function() {
              const userAnswer = input.value.trim().toLowerCase();
              const correctAnswer = q.answer.toLowerCase();

              if (userAnswer === correctAnswer) {
                feedback.textContent = "✓ Correct!";
                feedback.style.color = currentTheme.correctBg;
                score++;
              } else {
                feedback.textContent = "✗ Incorrect. The answer is: " + q.answer;
                feedback.style.color = currentTheme.wrongBg;
              }

              submitBtn.disabled = true;
              input.disabled = true;

              setTimeout(function() {
                current++;
                if (current < data.questions.length) {
                  renderQuestion();
                } else {
                  showResults();
                }
              }, 2000);
            });
            container.appendChild(submitBtn);

            const counter = document.createElement("small");
            counter.textContent = (current + 1) + " / " + data.questions.length;
            container.appendChild(counter);

            el.replaceChildren(container);
          }

          function showResults() {
            const result = document.createElement("div");
            result.id = containerId;
            result.style.textAlign = "center";
            result.style.padding = "40px";
            const scoreHeading = document.createElement("h2");
            scoreHeading.textContent = "Score: " + score + "/" + data.questions.length + " 🎉";
            result.appendChild(scoreHeading);
            el.replaceChildren(result);
          }

          renderQuestion();
        },

        matchpairs: function(data) {
          const shuffleArray = function(arr) {
            const newArr = arr.slice();
            for (let i = newArr.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              const temp = newArr[i];
              newArr[i] = newArr[j];
              newArr[j] = temp;
            }
            return newArr;
          };

          const leftItems = shuffleArray(data.pairs.map(function(p, i) { return { text: p.left, index: i }; }));
          const rightItems = shuffleArray(data.pairs.map(function(p, i) { return { text: p.right, index: i }; }));

          let selectedLeft = null;
          let selectedRight = null;
          let matched = [];

          function render() {
            const container = document.createElement("div");
            container.id = containerId;

            const heading = document.createElement("h2");
            heading.textContent = data.title;
            container.appendChild(heading);

            const instruction = document.createElement("p");
            instruction.textContent = "Click one item from each column to match them.";
            container.appendChild(instruction);

            const grid = document.createElement("div");
            grid.style.display = "grid";
            grid.style.gridTemplateColumns = "1fr 1fr";
            grid.style.gap = "20px";
            grid.style.marginTop = "20px";

            const leftCol = document.createElement("div");
            const rightCol = document.createElement("div");

            leftItems.forEach(function(item) {
              const div = document.createElement("div");
              div.className = "edukit-match-item";
              div.textContent = item.text;

              if (matched.indexOf(item.index) !== -1) {
                div.classList.add("matched");
              } else if (selectedLeft === item.index) {
                div.classList.add("selected");
              }

              div.addEventListener("click", function() {
                if (matched.indexOf(item.index) !== -1) return;

                selectedLeft = item.index;

                if (selectedRight !== null) {
                  if (selectedLeft === selectedRight) {
                    matched.push(item.index);
                    selectedLeft = null;
                    selectedRight = null;

                    if (matched.length === data.pairs.length) {
                      setTimeout(function() {
                        showCompletion();
                      }, 500);
                    }
                  } else {
                    setTimeout(function() {
                      selectedLeft = null;
                      selectedRight = null;
                      render();
                    }, 800);
                  }
                }

                render();
              });

              leftCol.appendChild(div);
            });

            rightItems.forEach(function(item) {
              const div = document.createElement("div");
              div.className = "edukit-match-item";
              div.textContent = item.text;

              if (matched.indexOf(item.index) !== -1) {
                div.classList.add("matched");
              } else if (selectedRight === item.index) {
                div.classList.add("selected");
              }

              div.addEventListener("click", function() {
                if (matched.indexOf(item.index) !== -1) return;

                selectedRight = item.index;

                if (selectedLeft !== null) {
                  if (selectedLeft === selectedRight) {
                    matched.push(item.index);
                    selectedLeft = null;
                    selectedRight = null;

                    if (matched.length === data.pairs.length) {
                      setTimeout(function() {
                        showCompletion();
                      }, 500);
                    }
                  } else {
                    setTimeout(function() {
                      selectedLeft = null;
                      selectedRight = null;
                      render();
                    }, 800);
                  }
                }

                render();
              });

              rightCol.appendChild(div);
            });

            grid.appendChild(leftCol);
            grid.appendChild(rightCol);
            container.appendChild(grid);

            el.replaceChildren(container);
          }

          function showCompletion() {
            const result = document.createElement("div");
            result.id = containerId;
            result.style.textAlign = "center";
            result.style.padding = "40px";
            const heading = document.createElement("h2");
            heading.textContent = "All pairs matched! 🎉";
            result.appendChild(heading);
            el.replaceChildren(result);
          }

          render();
        },

        matchcolumns: function(data) {
          let selectedOption = null;
          let submitted = false;

          function render() {
            const container = document.createElement("div");
            container.id = containerId;

            const heading = document.createElement("h2");
            heading.textContent = data.title;
            container.appendChild(heading);

            const instruction = document.createElement("p");
            instruction.textContent = "Match the items from Column I with Column II:";
            container.appendChild(instruction);

            const table = document.createElement("table");

            const thead = document.createElement("thead");
            const headerRow = document.createElement("tr");
            const th1 = document.createElement("th");
            th1.textContent = "Column I";
            const th2 = document.createElement("th");
            th2.textContent = "Column II";
            headerRow.appendChild(th1);
            headerRow.appendChild(th2);
            thead.appendChild(headerRow);
            table.appendChild(thead);

            const tbody = document.createElement("tbody");
            const maxLen = Math.max(data.columnA.length, data.columnB.length);

            for (let i = 0; i < maxLen; i++) {
              const row = document.createElement("tr");

              const cell1 = document.createElement("td");
              if (i < data.columnA.length) {
                const label = String.fromCharCode(65 + i); // A, B, C...
                cell1.textContent = "(" + label + ") " + data.columnA[i];
              }

              const cell2 = document.createElement("td");
              if (i < data.columnB.length) {
                const label = String.fromCharCode(112 + i); // p, q, r...
                cell2.textContent = "(" + label + ") " + data.columnB[i];
              }

              row.appendChild(cell1);
              row.appendChild(cell2);
              tbody.appendChild(row);
            }
            table.appendChild(tbody);
            container.appendChild(table);

            const optionsTitle = document.createElement("p");
            optionsTitle.style.marginTop = "20px";
            optionsTitle.style.fontWeight = "bold";
            optionsTitle.textContent = "Choose the correct matching:";
            container.appendChild(optionsTitle);

            data.options.forEach(function(option, idx) {
              const label = document.createElement("label");
              label.className = "edukit-radio";

              const radio = document.createElement("input");
              radio.type = "radio";
              radio.name = "matchcolumns";
              radio.value = idx;

              if (submitted) {
                radio.disabled = true;
                // Compare mappings by checking all key-value pairs (order-independent)
                let isCorrect = true;
                const optKeys = Object.keys(option.mapping);
                const correctKeys = Object.keys(data.correctMapping);
                if (optKeys.length !== correctKeys.length) {
                  isCorrect = false;
                } else {
                  for (let k = 0; k < optKeys.length; k++) {
                    const key = optKeys[k];
                    if (option.mapping[key] !== data.correctMapping[key]) {
                      isCorrect = false;
                      break;
                    }
                  }
                }
                if (isCorrect) {
                  label.style.background = currentTheme.correctBg;
                  label.style.color = "white";
                  label.style.borderColor = currentTheme.correctBg;
                }
              }

              radio.addEventListener("change", function() {
                selectedOption = idx;
              });

              label.appendChild(radio);
              label.appendChild(document.createTextNode(option.label));
              container.appendChild(label);
            });

            if (!submitted) {
              const submitBtn = document.createElement("button");
              submitBtn.textContent = "Submit Answer";
              submitBtn.style.marginTop = "20px";
              submitBtn.addEventListener("click", function() {
                if (selectedOption === null) {
                  alert("Please select an option");
                  return;
                }
                submitted = true;
                render();
              });
              container.appendChild(submitBtn);
            }

            el.replaceChildren(container);
          }

          render();
        },

        assertionreason: function(data) {
          let current = 0, score = 0;

          function renderQuestion() {
            const q = data.questions[current];

            const container = document.createElement("div");
            container.id = containerId;

            const heading = document.createElement("h2");
            heading.textContent = data.title;
            container.appendChild(heading);

            const qLabel = document.createElement("p");
            qLabel.style.fontWeight = "bold";
            qLabel.textContent = "Question " + (current + 1) + ":";
            container.appendChild(qLabel);

            const assertionP = document.createElement("p");
            const assertionLabel = document.createElement("strong");
            assertionLabel.textContent = "Assertion (A): ";
            assertionP.appendChild(assertionLabel);
            assertionP.appendChild(document.createTextNode(q.assertion));
            container.appendChild(assertionP);

            const reasonP = document.createElement("p");
            const reasonLabel = document.createElement("strong");
            reasonLabel.textContent = "Reason (R): ";
            reasonP.appendChild(reasonLabel);
            reasonP.appendChild(document.createTextNode(q.reason));
            container.appendChild(reasonP);

            const optionsTitle = document.createElement("p");
            optionsTitle.style.marginTop = "20px";
            optionsTitle.style.fontWeight = "bold";
            optionsTitle.textContent = "Choose the correct option:";
            container.appendChild(optionsTitle);

            const options = [
              "Both A and R are true, and R is the correct explanation of A",
              "Both A and R are true, but R is NOT the correct explanation of A",
              "A is true, but R is false",
              "A is false, but R is true"
            ];

            let selectedAnswer = null;
            let answered = false;

            options.forEach(function(optText, idx) {
              const label = document.createElement("label");
              label.className = "edukit-radio";

              const radio = document.createElement("input");
              radio.type = "radio";
              radio.name = "ar-option";
              radio.value = idx + 1;

              radio.addEventListener("change", function() {
                selectedAnswer = idx + 1;
              });

              label.appendChild(radio);
              label.appendChild(document.createTextNode((idx + 1) + ". " + optText));
              container.appendChild(label);
            });

            const submitBtn = document.createElement("button");
            submitBtn.textContent = "Submit Answer";
            submitBtn.style.marginTop = "20px";
            submitBtn.addEventListener("click", function() {
              if (selectedAnswer === null) {
                alert("Please select an option");
                return;
              }
              if (answered) return;
              answered = true;

              if (selectedAnswer === q.answer) {
                score++;
              }

              // Highlight correct answer
              const labels = container.querySelectorAll(".edukit-radio");
              labels.forEach(function(label, idx) {
                const radio = label.querySelector("input");
                radio.disabled = true;
                if (idx + 1 === q.answer) {
                  label.style.background = currentTheme.correctBg;
                  label.style.color = "white";
                  label.style.borderColor = currentTheme.correctBg;
                }
              });

              submitBtn.disabled = true;

              setTimeout(function() {
                current++;
                answered = false;
                if (current < data.questions.length) {
                  renderQuestion();
                } else {
                  showResults();
                }
              }, 2000);
            });
            container.appendChild(submitBtn);

            const counter = document.createElement("small");
            counter.style.display = "block";
            counter.style.marginTop = "16px";
            counter.textContent = (current + 1) + " / " + data.questions.length;
            container.appendChild(counter);

            el.replaceChildren(container);
          }

          function showResults() {
            const result = document.createElement("div");
            result.id = containerId;
            result.style.textAlign = "center";
            result.style.padding = "40px";
            const scoreHeading = document.createElement("h2");
            scoreHeading.textContent = "Score: " + score + "/" + data.questions.length + " 🎉";
            result.appendChild(scoreHeading);
            el.replaceChildren(result);
          }

          renderQuestion();
        }
      };

      // Render the selected component
      renderers[config.component](config.data);
    }
  };
})();
